import { googleOauthUrls } from "../static/google-auth-urls";

function getGoogleAuthUrl() {
  const rootUrl = googleOauthUrls.rootUrl;
  const redirectUrl = process.env.GOOGLE_OAUTH_REDIRECT_URL ?? "";
  const clientId = process.env.GOOGLE_CLIENT_ID ?? "";

  const options = {
    redirect_uri: redirectUrl as string,
    client_id: clientId as string,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      googleOauthUrls.userInfo.email,
      googleOauthUrls.userInfo.profile,
    ].join(" "),
  };

  const queryString = new URLSearchParams(options);
  console.log("Click on given below url for getting authenticated with google");
  console.log(`${rootUrl}?${queryString.toString()}`); //
}
export { getGoogleAuthUrl };
