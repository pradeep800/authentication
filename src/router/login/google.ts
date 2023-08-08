import express, { Request, Response } from "express";
import { googleOauthUrls } from "../../static/google-auth-urls";
import { logErrorAndRespond } from "../../lib/log-error-and-respond";
import jwt from "jsonwebtoken";
import { googleType } from "../../zodTypes/google-info-type";
import { getOrCreateUserForGoogle } from "../../lib/get-or-create-user";
import { createSession } from "../../lib/sessionOperations";
import { createJwt } from "../../lib/jwt";
const googleRoute = express.Router();
googleRoute.get("/", async (req: Request, res: Response) => {
  const code = req.query?.code;

  if (typeof code !== "string") {
    res.status(400).json({ error: "Please add code in query string" });
  }

  const options = {
    code: code as string,
    client_id: process.env.GOOGLE_CLIENT_ID as string,
    client_secret: process.env.GOOGLE_CLIENT_SECRET as string,
    redirect_uri: process.env.GOOGLE_OAUTH_REDIRECT_URL as string,
    grant_type: "authorization_code",
  };

  const url = `${googleOauthUrls.token}`;
  try {
    const googleTokenResult = await fetch(url, {
      method: "POST",
      body: JSON.stringify(options),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const googleTokenResultInJson = await googleTokenResult.json();

    const idToken = googleTokenResultInJson?.id_token as undefined | string;
    if (!idToken) {
      throw new Error("there is not excess token");
    }
    const data = jwt.decode(idToken);
    const isGoogleInfoPresent = googleType.safeParse(data);
    if (!isGoogleInfoPresent.success) {
      throw new Error("Data is not matching googleType");
    }
    const user = await getOrCreateUserForGoogle(isGoogleInfoPresent.data);
    const payload: Record<string, string> = { id: user.id };
    if (user.email) {
      payload.email = user.email;
    }
    const sessionToken = createJwt(payload, "7d");
    await createSession(sessionToken, user.id);
    res.json({ sessionToken });
  } catch (err) {
    logErrorAndRespond({
      err: err,
      res: res,
      errorCode: 400,
      errorMessage: "Unable to get info please try again",
      routeName: "/login/google",
    });
  }
});
export { googleRoute };
