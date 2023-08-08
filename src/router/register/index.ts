import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import {
  emailAndPasswordType,
  strongPasswordType,
} from "../../zodTypes/email-and-password-info-type";
import { User } from "../../db/schema/user";
import { checkUserExists } from "../../lib/utils";
import { createUserEP } from "../../lib/get-or-create-user";
import { createJwt } from "../../lib/jwt";
import { createSession } from "../../lib/sessionOperations";
const registerRoute = express.Router();
registerRoute.post("/", async (req: Request, res: Response) => {
  const userInfo = emailAndPasswordType.safeParse(req.body);
  //checking if email and password are present
  if (!userInfo.success) {
    res.status(400).json({
      error: "The request is missing the email address, password, or both.",
    });
    return;
  }
  //checking if password is strong
  const isStrongPassword = strongPasswordType.safeParse(userInfo.data.password);
  if (!isStrongPassword.success) {
    res.status(400).json({
      error:
        "Please create strong password (hint:password should be 8-15 character long and it should atleast contain one special character(@#$%^&*) and one number)",
    });
    return;
  }
  const userExists = await checkUserExists(userInfo.data.email);
  if (userExists) {
    res.status(400).json({ error: "Email is already register" });
  } else {
    const password = bcrypt.hashSync(userInfo.data.password, 6);

    const user = await createUserEP(userInfo.data.email, password);
    const payload: Record<string, string> = { id: user.id };
    if (user.email) {
      payload.email = user.email;
    }
    const sessionToken = createJwt(payload, "7d");
    await createSession(sessionToken, user.id);
    res.json({ sessionToken });
  }
});

export { registerRoute };
