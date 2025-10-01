import { Router } from "express"
import { requireAuth } from "../middleware/auth"
import { getMyProfile, updateMyProfile, getProfileById } from "../controllers/profiles"

const router = Router()

router.get("/me", requireAuth, getMyProfile)

router.patch("/me", requireAuth, updateMyProfile)

router.get("/:id", getProfileById)

export default router