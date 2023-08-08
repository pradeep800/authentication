import { facebookAuthUrls } from "../static/facebook-auth-urls";

function getFacebookAuthUrl() {
  const rootUrl = facebookAuthUrls.authUrl;
  const redirectUrl = process.env.FACEBOOK_OAUTH_REDIRECT_URL ?? "";
  const clientId = process.env.FACEBOOK_APP_Id ?? "";

  const options = {
    redirect_uri: redirectUrl as string,
    client_id: clientId as string,
  };

  const queryString = new URLSearchParams(options);
  console.log(
    "Click on given below url for getting authenticated with facebook"
  );
  console.log(`${rootUrl}?${queryString.toString()}`); //
}
export { getFacebookAuthUrl };
