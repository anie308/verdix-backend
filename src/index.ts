import dotenv from "dotenv";
dotenv.config();

import express from "express";


import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import cookieParser from "cookie-parser"
import path from "path"
import fs from "fs"
import { env } from "./config/env"
import { connectToDatabase } from "./config/db"

async function bootstrap() {
  await connectToDatabase()

  const app = express()
  
  app.use(helmet())
  app.use(morgan("dev"))
  app.use(express.json({ limit: "5mb" }))
  app.use(express.urlencoded({ extended: true }))
  app.use(cookieParser())
  app.use(
    cors({
      origin: env.clientOrigin,
      credentials: true,
      exposedHeaders: ["Authorization"],
    }),
  )

  // Static uploads serving
  const uploadsPath = path.resolve(env.uploadsDir)
  if (!fs.existsSync(uploadsPath)) fs.mkdirSync(uploadsPath, { recursive: true })
  app.use("/uploads", express.static(uploadsPath))

  // Health check
  app.get("/health", (_req, res) => res.json({ ok: true }))

  // Routes placeholders; will be implemented next
  app.use("/api/auth", (await import("./routes/auth")) .default)
  app.use("/api/profiles", (await import("./routes/profiles")).default)
  app.use("/api/posts", (await import("./routes/posts")).default)
  app.use("/api/comments", (await import("./routes/comments")).default)
  app.use("/api/likes", (await import("./routes/likes")).default)
  app.use("/api/scans", (await import("./routes/scans")).default)

  app.listen(env.port, () => {
    console.log(`Verdix backend listening on http://localhost:${env.port}`)
  })
}

bootstrap().catch((err) => {
  console.error("Failed to start server", err)
  process.exit(1)
})


