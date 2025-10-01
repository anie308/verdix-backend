import mongoose from "mongoose"
import { env } from "./env"

export async function connectToDatabase() {
  try {
    mongoose.set("strictQuery", true)
    await mongoose.connect(env.mongoUri)
    console.log("Connected to MongoDB")
  } catch (error) {
    console.error("Error connecting to MongoDB:", error)
    process.exit(1)
  }
}

