import { z } from "zod";
const allEnvs = z.object({
  PORT: z.string(),
  JWT_SECRET: z.string(),
  DATABASE_URL: z.string(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  GOOGLE_OAUTH_REDIRECT_URL: z.string(),
  BASE_URL: z.string(),
  FACEBOOK_APP_Id: z.string(),
  FACEBOOK_APP_SECRET: z.string(),
  FACEBOOK_OAUTH_REDIRECT_URL: z.string(), //
});
export { allEnvs };
