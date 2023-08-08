import mongoose from "mongoose";
import { Session } from "../db/schema/session";
type mongooseObjectId = typeof mongoose.Types.ObjectId;
async function createSession(jwt: string, userId: mongooseObjectId) {
  await Session.create({ userId: userId, sessionToken: jwt });
}
async function deleteSession(jwt: string) {
  await Session.deleteOne({ sessionToken: jwt });
}
export { createSession, deleteSession };
