import jwt from "jsonwebtoken";
function createJwt(payload: Record<string, string>, expiresIn: string) {
  const sessionToken = jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: expiresIn,
  });
  return sessionToken;
}
export { createJwt };
