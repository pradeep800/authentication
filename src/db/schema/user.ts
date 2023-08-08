import mongoose, { Schema } from "mongoose";
import { number } from "zod";

const userSchema = new Schema({
  name: String,
  password: String,
  image: String,
  email: { type: String },
  method: {
    type: String,
    require: true,
    enum: ["EMAILANDPASSWORD", "GOOGLE", "FACEBOOK"],
  },
  facebook_id: String,
});
const User = mongoose.model("User", userSchema);
export { User };
