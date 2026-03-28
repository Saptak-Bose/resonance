import { createEnv } from "@t3-oss/env-nextjs";
import * as z from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().min(1),
    B2_KEY_ID: z.string().min(1),
    B2_APP_KEY: z.string().min(1),
    B2_BUCKET_NAME: z.string().min(1),
    B2_REGION: z.string().min(1),
    B2_ENDPOINT: z.string().min(1),
    CHATTERBOX_API_KEY: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.string().min(1),
    NEXT_PUBLIC_CHATTERBOX_API_URL: z.url(),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_CHATTERBOX_API_URL: process.env.NEXT_PUBLIC_CHATTERBOX_API_URL,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
