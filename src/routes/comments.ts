import { Router } from "express"
import { requireAuth } from "../middleware/auth"
import { getComments, createComment } from "../controllers/comments"

const router = Router()

router.get("/:postId", getComments)

router.post("/:postId", requireAuth, createComment)

export default router