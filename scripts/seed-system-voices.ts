import "dotenv/config";
import path from "node:path";
import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
import {
  CANONICAL_SYSTEM_VOICE_NAMES,
  envSchema,
  systemVoiceMetadata,
} from "@/lib/constants";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";
import {
  PutObjectCommand,
  type PutObjectCommandInput,
  S3Client,
} from "@aws-sdk/client-s3";
import type { UploadAudioOptions } from "@/lib/types";

const SYSTEM_VOICES_DIR = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "system-voices",
);

const env = envSchema.parse(process.env);

const adapter = new PrismaPg({
  connectionString: env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

const b2 = new S3Client({
  region: env.B2_REGION,
  endpoint: env.B2_ENDPOINT,
  credentials: {
    accessKeyId: env.B2_KEY_ID,
    secretAccessKey: env.B2_APP_KEY,
  },
});

const readSystemVoiceAudio = async (name: string) => {
  const filePath = path.join(SYSTEM_VOICES_DIR, `${name}.wav`);
  const buffer = Buffer.from(await fs.readFile(filePath));

  return {
    buffer,
    contentType: "audio/wav",
  };
};

const uploadSystemVoiceAudio = async ({
  buffer,
  key,
  contentType,
}: UploadAudioOptions) => {
  const commandInput: PutObjectCommandInput = {
    Bucket: env.B2_BUCKET_NAME,
    Key: key,
    Body: buffer,
    ContentType: contentType,
  };

  await b2.send(new PutObjectCommand(commandInput));
};

const seedSystemVoice = async (name: string) => {
  const { buffer, contentType } = await readSystemVoiceAudio(name);

  const existingSystemVoice = await prisma.voice.findFirst({
    where: {
      variant: "SYSTEM",
      name,
    },
    select: {
      id: true,
    },
  });

  if (existingSystemVoice) {
    const b2ObjectKey = `voices/system/${existingSystemVoice.id}`;
    const meta = systemVoiceMetadata[name];

    await uploadSystemVoiceAudio({
      key: b2ObjectKey,
      buffer,
      contentType,
    });

    await prisma.voice.update({
      where: {
        id: existingSystemVoice.id,
      },
      data: {
        b2ObjectKey,
        ...(meta && {
          description: meta.description,
          category: meta.category,
          language: meta.language,
        }),
      },
    });

    return;
  }

  const meta = systemVoiceMetadata[name];

  const voice = await prisma.voice.create({
    data: {
      name,
      variant: "SYSTEM",
      orgId: null,
      ...(meta && {
        description: meta.description,
        category: meta.category,
        language: meta.language,
      }),
    },
    select: {
      id: true,
    },
  });

  const b2ObjectKey = `voices/system/${voice.id}`;

  try {
    await uploadSystemVoiceAudio({
      key: b2ObjectKey,
      buffer,
      contentType,
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
    await prisma.voice
      .delete({
        where: {
          id: voice.id,
        },
      })
      .catch(() => {});

    throw error;
  }
};

const main = async () => {
  console.log(
    `Seeding ${CANONICAL_SYSTEM_VOICE_NAMES.length} system voices...`,
  );

  for (const name of CANONICAL_SYSTEM_VOICE_NAMES) {
    console.log(`- ${name}`);
    await seedSystemVoice(name);
  }

  console.log("System voice seed completed✅");
};

main()
  .catch((error) => {
    console.error("Failed to seed system voices: ", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
