import { Router } from "express"
import { requireAuth } from "../middleware/auth"
import { getPosts, createPost } from "../controllers/posts"

const router = Router()

router.get("/", getPosts)

router.post("/", requireAuth, createPost)

export default router