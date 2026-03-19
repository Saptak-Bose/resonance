import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { env } from "./env";
import { UploadAudioOptions } from "./types";

const b2 = new S3Client({
  region: env.B2_REGION,
  endpoint: env.B2_ENDPOINT,
  credentials: {
    accessKeyId: env.B2_KEY_ID,
    secretAccessKey: env.B2_APP_KEY,
  },
});

export const uploadAudio = async ({
  buffer,
  key,
  contentType = "audio/wav",
}: UploadAudioOptions): Promise<void> => {
  await b2.send(
    new PutObjectCommand({
      Bucket: env.B2_BUCKET_NAME,
      Key: key,
      Body: buffer,
      ContentType: contentType,
    }),
  );
};

export const deleteAudio = async (key: string): Promise<void> => {
  await b2.send(
    new DeleteObjectCommand({
      Bucket: env.B2_BUCKET_NAME,
      Key: key,
    }),
  );
};

export const getSignedAudioUrl = async (key: string): Promise<string> => {
  const command = new GetObjectCommand({
    Bucket: env.B2_BUCKET_NAME,
    Key: key,
  });

  return getSignedUrl(b2, command, {
    expiresIn: 3600,
  });
};
