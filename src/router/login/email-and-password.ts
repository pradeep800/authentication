import express, { Response, Request } from "express";
import { User } from "../../db/schema/user";
import { emailAndPasswordType } from "../../zodTypes/email-and-password-info-type";
import { createJwt } from "../../lib/jwt";
import bcrypt from "bcrypt";
const emailAndPasswordRoute = express.Router();
emailAndPasswordRoute.post("/", async (req: Request, res: Response) => {
  const userInfo = emailAndPasswordType.safeParse(req.body);
  if (!userInfo.success) {
    res.status(400).json({
      error: "The request is missing the email address, password, or both.",
    });
    return;
  }
  const user = await getUser(userInfo.data.email);
  if (!user) {
    res.status(400).json({
      error: "Account not found",
    });
    return;
  }
  bcrypt.compare(
    userInfo.data.password,
    user?.password ?? "",
    function (err, result) {
      if (result) {
        const payload: Record<string, string> = { id: user.id };
        if (user.email) {
          payload.email = user.email;
        }
        res.json({ sessionToken: createJwt(payload, "7d") });
      } else {
        res.status(400).json({ error: "Wrong password" });
      }
    }
  );
});
async function getUser(email: string) {
  return await User.findOne({ email });
}
export { emailAndPasswordRoute };
