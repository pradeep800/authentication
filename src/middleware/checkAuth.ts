import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Session } from "../db/schema/session";
type jwtId = {
  id: string;
};
async function checkAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.headers["x-auth-token"] as string | undefined;
  if (!token) {
    res.status(402).json({ error: "Forbidden path" });
    return;
  }

  let decodedToken: jwtId;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET as string) as jwtId;
  } catch (err) {
    res.status(402).json({ error: "Wrong Jwt" });
    return;
  }
  //check if token is also present in database
  const tokenInDb = await Session.findOne({ sessionToken: token });
  if (!tokenInDb) {
    res.status(402).json({ error: "Wrong Jwt" });
    return;
  }
  req.body.id = decodedToken.id;
  next();
}
export { checkAuth };
