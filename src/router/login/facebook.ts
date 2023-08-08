import express, { Request, Response } from "express";
import { logErrorAndRespond } from "../../lib/log-error-and-respond";
import { getOrCreateUserForFacebook } from "../../lib/get-or-create-user";
import { createSession } from "../../lib/sessionOperations";
import { facebookAuthUrls } from "../../static/facebook-auth-urls";
import { facebookType } from "../../zodTypes/facebook-info-type";
import { createJwt } from "../../lib/jwt";
const facebookRoute = express.Router();
facebookRoute.get("/", async (req: Request, res: Response) => {
  const code = req.query?.code;

  if (typeof code !== "string") {
    res.status(400).json({ error: "Please add code in query string" });
  }

  const options = {
    code: code as string,
    client_id: process.env.FACEBOOK_APP_ID as string,
    client_secret: process.env.FACEBOOK_APP_SECRET as string,
    redirect_uri: process.env.FACEBOOK_OAUTH_REDIRECT_URL as string,
  };
  const query = new URLSearchParams(options);

  const url = `${facebookAuthUrls.accessToken}?${query.toString()}`;
  try {
    const facebookTokenResult = await fetch(url);
    const facebookTokenResultInJson = await facebookTokenResult.json();

    const accessToken = facebookTokenResultInJson?.access_token as
      | string
      | undefined;
    if (!accessToken) {
      throw new Error("No excess token");
    }
    const options2 = {
      fields: ["id", "email", "first_name", "last_name"].join(","),
      access_token: accessToken,
    };
    const queryString2 = new URLSearchParams(options2);
    const InfoUrl = `${facebookAuthUrls.me}?${queryString2}`;
    const userInfo = await fetch(InfoUrl);
    const userInfoJson = await userInfo.json();
    const isFacebookInfoPresent = facebookType.safeParse(userInfoJson);
    if (!isFacebookInfoPresent.success) {
      throw new Error("Data is not matching facebookType");
    }

    const user = await getOrCreateUserForFacebook(isFacebookInfoPresent.data);
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
      routeName: "/login/facebook",
    });
  }
});

export { facebookRoute };
