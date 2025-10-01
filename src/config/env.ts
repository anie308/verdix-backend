import dotenv from "dotenv"

dotenv.config()

export const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT || 4000),
  mongoUri: process.env.MONGO_URI || "",
  jwtSecret: process.env.JWT_SECRET,
  clientOrigin: process.env.CLIENT_ORIGIN || "http://localhost:3000",
  uploadsDir: process.env.UPLOADS_DIR || "uploads",
  geminiApiKey: process.env.GEMINI_API_KEY ,
}

