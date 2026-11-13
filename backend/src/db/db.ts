import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const envPaths = [
      ".env",
      new URL("../../.env", import.meta.url).pathname,
    ];
    for (const p of envPaths) {
      try {
        process.loadEnvFile(p);
        break;
      } catch {
        // try next location
      }
    }
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error("MONGODB_URI is missing in .env file");
    }

    await mongoose.connect(uri);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};