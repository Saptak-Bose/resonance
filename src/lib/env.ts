import { createEnv } from "@t3-oss/env-nextjs";
import * as z from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().min(1),
    APP_URL: z.string().min(1),
    B2_KEY_ID: z.string().min(1),
    B2_APP_KEY: z.string().min(1),
    B2_BUCKET_NAME: z.string().min(1),
    B2_REGION: z.string().min(1),
    B2_ENDPOINT: z.string().min(1),
  },
  experimental__runtimeEnv: {},
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
