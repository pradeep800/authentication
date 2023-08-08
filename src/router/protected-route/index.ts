import express, { Request, Response } from "express";
const protectedRoute = express.Router();
protectedRoute.get("/", async (req: Request, res: Response) => {
  res.send(req.body);
});
export { protectedRoute };
