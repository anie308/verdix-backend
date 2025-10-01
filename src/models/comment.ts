

import mongoose, { Schema, InferSchemaType } from "mongoose"

const commentSchema = new Schema(
  {
    post_id: { type: Schema.Types.ObjectId, ref: "Post", required: true, index: true },
    user_id: { type: Schema.Types.ObjectId, ref: "Profile", required: true, index: true },
    content: { type: String, required: true },
  },
  { timestamps: { createdAt: "created_at", updatedAt: false } },
)

export type Comment = InferSchemaType<typeof commentSchema> & { _id: string }

export const CommentModel = mongoose.models.Comment || mongoose.model("Comment", commentSchema)


