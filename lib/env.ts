import { z } from "zod";

const envSchema = z.object({
  EXPO_PUBLIC_API_URL: z.string().url(),
  EXPO_PUBLIC_ENV: z.enum(["dev", "preview", "prod"]).default("dev"),
});

const envObj = {
  EXPO_PUBLIC_API_URL: process.env.EXPO_PUBLIC_API_URL,
  EXPO_PUBLIC_ENV: process.env.EXPO_PUBLIC_ENV,
};

console.log(JSON.stringify(envObj, null, 2));

const env = envSchema.parse(envObj);
export { env };
