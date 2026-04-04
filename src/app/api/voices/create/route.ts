import { uploadAudio } from "@/lib/b2";
import {
  createVoiceSchema,
  MAX_UPLOAD_SIZE_BYTES,
  MIN_AUDIO_DURATION_SECONDS,
} from "@/lib/constants";
import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { parseBuffer } from "music-metadata";

export const POST = async (request: Request) => {
  const { userId, orgId } = await auth();

  if (!userId || !orgId)
    return new Response("Unauthorized", {
      status: 401,
    });

  const url = new URL(request.url);

  const validation = createVoiceSchema.safeParse({
    name: url.searchParams.get("name"),
    category: url.searchParams.get("category"),
    language: url.searchParams.get("language"),
    description: url.searchParams.get("description"),
  });

  if (!validation.success)
    return Response.json(
      {
        error: "Invalid input",
        issues: validation.error.issues,
      },
      {
        status: 400,
      },
    );

  const { category, language, description, name } = validation.data;
  const fileBuffer = await request.arrayBuffer();

  if (!fileBuffer.byteLength)
    return Response.json(
      {
        error: "Please upload a valid audio file...",
      },
      {
        status: 400,
      },
    );

  if (fileBuffer.byteLength > MAX_UPLOAD_SIZE_BYTES)
    return Response.json(
      {
        error: "File size exceeds the maximum limit of 20 MB.",
      },
      {
        status: 413,
      },
    );

  const contentType = request.headers.get("content-type");

  if (!contentType)
    return Response.json(
      {
        error: "Content-Type header is missing.",
      },
      {
        status: 400,
      },
    );

  const normalizedContentType =
    contentType.split(";")[0]?.trim() || "audio/wav";

  let duration: number;

  try {
    const metadata = await parseBuffer(
      new Uint8Array(fileBuffer),
      {
        mimeType: normalizedContentType,
      },
      {
        duration: true,
      },
    );

    duration = metadata.format.duration ?? 0;
  } catch (error) {
    return Response.json(
      {
        error:
          "Unable to process the audio file. Please ensure it is a valid audio format.",
        errorDetails: error,
      },
      {
        status: 422,
      },
    );
  }

  if (duration < MIN_AUDIO_DURATION_SECONDS)
    return Response.json(
      {
        error: `Audio duration is too short (${duration.toFixed(1)}s). It must be at least ${MIN_AUDIO_DURATION_SECONDS} seconds.`,
      },
      {
        status: 422,
      },
    );

  let createdVoiceId: string | null = null;

  try {
    const voice = await prisma.voice.create({
      data: {
        name,
        variant: "CUSTOM",
        orgId,
        description,
        category,
        language,
      },
      select: {
        id: true,
      },
    });

    createdVoiceId = voice.id;
    const b2ObjectKey = `voices/orgs/${orgId}/${voice.id}`;

    await uploadAudio({
      buffer: Buffer.from(fileBuffer),
      key: b2ObjectKey,
      contentType: normalizedContentType,
    });

    await prisma.voice.update({
      where: {
        id: voice.id,
      },
      data: {
        b2ObjectKey,
      },
    });
  } catch (error) {
    if (createdVoiceId)
      await prisma.voice
        .delete({
          where: {
            id: createdVoiceId,
          },
        })
        .catch(() => {});

    return Response.json(
      {
        error:
          "An error occurred while creating the voice. Please try again...",
        errorDetails: error,
      },
      {
        status: 500,
      },
    );
  }

  return Response.json(
    {
      name,
      message: "Voice created successfully!",
    },
    {
      status: 201,
    },
  );
};
