import { User } from "../db/schema/user";

async function checkUserExists(email: string) {
  const user = await User.findOne({ email: email });
  if (user) {
    return true;
  } else {
    return false;
  }
}
export { checkUserExists };
