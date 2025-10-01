import { Router } from "express"
import { requireAuth } from "../middleware/auth"
import { toggleLike } from "../controllers/likes"

const router = Router()

router.post("/toggle/:postId", requireAuth, toggleLike)

export default router