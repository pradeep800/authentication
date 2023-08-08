import { z } from "zod";

const googleType = z.object({
  name: z.string(),
  picture: z.string(),
  email: z.string().email(),
});
type GoogleType = z.infer<typeof googleType>;
export { googleType, GoogleType };
