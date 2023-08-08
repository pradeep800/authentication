import express from "express";
import { googleRoute } from "./google";
import { facebookRoute } from "./facebook";
import { emailAndPasswordRoute } from "./email-and-password";
const loginRoute = express.Router();
loginRoute.use("/google", googleRoute);
loginRoute.use("/facebook", facebookRoute);
loginRoute.use("/email-and-password", emailAndPasswordRoute);
export { loginRoute };
