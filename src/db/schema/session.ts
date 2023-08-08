import mongoose, { Schema } from "mongoose";

const sessionSchema = new Schema({
  userId: { type: mongoose.Types.ObjectId, require: true },
  sessionToken: { type: String, require: true }, //jwt token
});
const Session = mongoose.model("Session", sessionSchema);
export { Session };
