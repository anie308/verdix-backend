import { Request, Response } from "express"
import { AuthenticatedRequest } from "../middleware/auth"
import { ProfileModel } from "../models/profile"

export const getMyProfile = async (req: AuthenticatedRequest, res: Response) => {
  const profile = await ProfileModel.findById(req.user!.id)
  if (!profile) return res.status(404).json({ message: "Profile not found" })
  return res.json(profile)
}

export const updateMyProfile = async (req: AuthenticatedRequest, res: Response) => {
  const updates = (({ username, full_name, location, bio, avatar_url, badges, role }) => ({ username, full_name, location, bio, avatar_url, badges, role }))(req.body || {})
  const profile = await ProfileModel.findByIdAndUpdate(req.user!.id, updates, { new: true })
  return res.json(profile)
}

export const getProfileById = async (req: Request, res: Response) => {
  const profile = await ProfileModel.findById(req.params.id)
  if (!profile) return res.status(404).json({ message: "Profile not found" })
  return res.json(profile)
}
