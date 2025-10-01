

import mongoose, { Schema, InferSchemaType } from "mongoose"

const likeSchema = new Schema(
  {
    post_id: { type: Schema.Types.ObjectId, ref: "Post", required: true, index: true },
    user_id: { type: Schema.Types.ObjectId, ref: "Profile", required: true, index: true },
  },
  { timestamps: { createdAt: "created_at", updatedAt: false } },
)

likeSchema.index({ post_id: 1, user_id: 1 }, { unique: true })

export type Like = InferSchemaType<typeof likeSchema> & { _id: string }

export const LikeModel = mongoose.models.Like || mongoose.model("Like", likeSchema)


