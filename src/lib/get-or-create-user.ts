import { User } from "../db/schema/user";
import { FacebookType } from "../zodTypes/facebook-info-type";
import { GoogleType } from "../zodTypes/google-info-type";

async function getOrCreateUserForGoogle(googleInfo: GoogleType) {
  const user = await User.findOne({ email: googleInfo.email });
  if (user) {
    return user;
  } else {
    const createdUser = await User.create({
      email: googleInfo.email,
      image: googleInfo.picture,
      name: googleInfo.name,
      method: "GOOGLE",
    });
    return createdUser;
  }
}
async function getOrCreateUserForFacebook(facebookInfo: FacebookType) {
  const user = await User.findOne({ facebook_id: facebookInfo.id });
  if (user) {
    return user;
  } else {
    let userName = facebookInfo.first_name;
    if (facebookInfo.last_name) {
      userName += " " + facebookInfo.last_name;
    }
    const payload: Record<string, string> = {
      facebook_id: facebookInfo.id,
      name: userName,
      method: "FACEBOOK",
    };
    if (facebookInfo.email) {
      payload.email = facebookInfo.email;
    }
    const createdUser = await User.create(payload);
    return createdUser;
  }
}
async function createUserEP(email: string, password: string) {
  const user = await User.create({
    email,
    password,
    method: "EMAILANDPASSWORD",
  });
  return user;
}

export { getOrCreateUserForGoogle, getOrCreateUserForFacebook, createUserEP };
