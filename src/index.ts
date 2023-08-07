import express from "express";
import dotenv from "dotenv";
import { Request, Response } from "express";
dotenv.config();
const port = process.env.PORT ?? 3008;
const app = express();
app.get("/", (req: Request, res: Response) => {
  // console.log
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
