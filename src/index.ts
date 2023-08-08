import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { checkAuth } from "./middleware/checkAuth";
import { connectDB } from "./db/connect";
import { loginRoute } from "./router/login";
import { getGoogleAuthUrl } from "./lib/get-google-auth-url";
import { checkEnvs } from "./lib/check-envs";
import { getFacebookAuthUrl } from "./lib/get-facebook-auth-url";
import { registerRoute } from "./router/register";
import { protectedRoute } from "./router/protected-route";
import { signoutRoute } from "./router/signout";
dotenv.config();
const port = process.env.PORT ?? 3008;
const app = express();
app.use(express.json());

/*
 Connecting with Mongo db
*/
connectDB();

/*
 Check all environment variable 
*/
const areAllEnvPresent = checkEnvs();
if (areAllEnvPresent) {
  /*
  Print google and facebook auth url
*/
  getGoogleAuthUrl();
  getFacebookAuthUrl();

  /*
   only authenticated user can use this route
  */

  app.use("/login", loginRoute);
  app.use("/register", registerRoute);
  app.use("/signout", signoutRoute);
  app.use("/protected-route", checkAuth);
  app.use("/protected-route", protectedRoute);

  app.listen(port, () => {
    console.log(`Server is listening at port ${port}`);
  });
} else {
  throw new Error("All envs are not present");
}
