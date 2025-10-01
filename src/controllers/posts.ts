import { Request, Response } from "express"
import { AuthenticatedRequest } from "../middleware/auth"
import { PostModel } from "../models/post"

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await PostModel.find()
      .sort({ created_at: -1 })
      .populate("user_id", "username full_name avatar_url role") 
      // ^ choose which profile fields you want returned

    return res.json(posts)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: "Internal server error" })
  }
}


export const createPost = async (req: AuthenticatedRequest, res: Response) => {
  const { content, crop_tags, image_url } = req.body || {}
  if (!content) return res.status(400).json({ message: "Content is required" })
  const post = await PostModel.create({ user_id: req.user!.id, content, crop_tags: crop_tags || [], image_url })
  return res.status(201).json(post)
}
