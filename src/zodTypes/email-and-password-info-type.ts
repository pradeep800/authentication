import { z } from "zod";

const emailAndPasswordType = z.object({
  email: z.string().email(),
  password: z.string(),
});
const strongPasswordType = z.string().refine((value) => {
  // Check for at least one special character and one number
  const hasSpecialCharacter = /[@#$%^&*]+/.test(value);
  const hasNumber = /[0-9]+/.test(value);

  // Check for length constraints
  const isValidLength = value.length >= 8 && value.length <= 15;

  return hasSpecialCharacter && hasNumber && isValidLength;
}, "Create Strong Password");
export { emailAndPasswordType, strongPasswordType };
