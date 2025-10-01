import mongoose, { Schema, InferSchemaType } from "mongoose"

const postSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "Profile", required: true, index: true },
    content: { type: String, required: true },
    image_url: { type: String },
    crop_tags: { type: [String], default: [] },
    likes_count: { type: Number, default: 0 },
    comments_count: { type: Number, default: 0 },
  },
  { timestamps: { createdAt: "created_at", updatedAt: false } },
)

export type Post = InferSchemaType<typeof postSchema> & { _id: string }

export const PostModel = mongoose.models.Post || mongoose.model("Post", postSchema)




