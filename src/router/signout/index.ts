import express, { Request, Response } from "express";
import { deleteSession } from "../../lib/sessionOperations";

const signoutRoute = express.Router();
signoutRoute.get("/", async (req: Request, res: Response) => {
  const token = req.headers["x-auth-token"] as string | undefined;
  if (!token) {
    res.status(402).json({ error: "Forbidden path" });
    return;
  }

  await deleteSession(token);

  res.json({ signout: true });
});

export { signoutRoute };
