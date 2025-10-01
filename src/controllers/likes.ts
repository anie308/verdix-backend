import { Response } from "express"
import { AuthenticatedRequest } from "../middleware/auth"
import { LikeModel } from "../models/like"
import { PostModel } from "../models/post"

export const toggleLike = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const postId = req.params.postId
    const userId = req.user!.id

    const existing = await LikeModel.findOne({ post_id: postId, user_id: userId })

    if (existing) {
      // Unlike
      await LikeModel.deleteOne({ _id: existing._id })
      await PostModel.updateOne({ _id: postId }, { $inc: { likes_count: -1 } })
      return res.json({ liked: false })
    } else {
      // Like
      await LikeModel.create({ post_id: postId, user_id: userId })
      await PostModel.updateOne({ _id: postId }, { $inc: { likes_count: 1 } })
      return res.json({ liked: true })
    }
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: "Internal server error" })
  }
}
