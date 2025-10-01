import { Router } from "express"
import multer from "multer"
import path from "path"
import { requireAuth } from "../middleware/auth"
import { env } from "../config/env"
import { getScans, uploadScan } from "../controllers/scans"

const router = Router()

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, env.uploadsDir),
  filename: (_req, file, cb) => cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`),
})

const upload = multer({ storage })

router.get("/", requireAuth, getScans)

router.post("/upload", requireAuth, upload.single("file"), uploadScan)

export default router