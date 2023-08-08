import { z } from "zod";

const facebookType = z.object({
  id: z.string(),
  email: z.string().optional(),
  first_name: z.string(),
  last_name: z.string().optional(),
});
type FacebookType = z.infer<typeof facebookType>;
export { facebookType, FacebookType };
