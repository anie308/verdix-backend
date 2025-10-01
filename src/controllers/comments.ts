import { Request, Response } from "express"
import { AuthenticatedRequest } from "../middleware/auth"
import { CommentModel } from "../models/comment"
import { PostModel } from "../models/post"

export const getComments = async (req: Request, res: Response) => {
  try {
    const comments = await CommentModel.find({ post_id: req.params.postId })
      .sort({ created_at: 1 })
      .populate("user_id", "username full_name avatar_url role") 
      // ^ only return these fields from Profile

    return res.json(comments)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: "Internal server error" })
  }
}

export const createComment = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { content } = req.body || {}
    if (!content) {
      return res.status(400).json({ message: "Content is required" })
    }

    const comment = await CommentModel.create({
      post_id: req.params.postId,
      user_id: req.user!.id,
      content
    })

    // increment comments_count in post
    await PostModel.updateOne(
      { _id: req.params.postId },
      { $inc: { comments_count: 1 } }
    )

    return res.status(201).json(comment)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: "Internal server error" })
  }
}
