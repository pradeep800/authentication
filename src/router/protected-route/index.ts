import express, { Request, Response } from "express";
const protectedRoute = express.Router();
protectedRoute.get("/", async (req: Request, res: Response) => {
  res.send({ id: req.body.id as string }); //this id can excess any information of user
});
export { protectedRoute };
