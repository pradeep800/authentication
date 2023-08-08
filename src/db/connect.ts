import mongoose from "mongoose";

const connectDB = async () => {
  const connectionString = process.env.DATABASE_URL ?? "";

  try {
    await mongoose.connect(connectionString ?? "");
    console.log("Database Connected");
  } catch (err) {
    console.error(err);
  }
};
export { connectDB };
