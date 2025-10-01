

import mongoose, { Schema, InferSchemaType } from "mongoose"



const profileSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, index: true },
    full_name: { type: String },
    role: { type: String, enum: ["farmer", "verxpert"], default: "farmer", index: true },
    location: { type: String },
    bio: { type: String },
    avatar_url: { type: String },
    badges: { type: [String], default: [] },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } },
)

export type Profile = InferSchemaType<typeof profileSchema> & { _id: string }

export const ProfileModel = mongoose.models.Profile || mongoose.model("Profile", profileSchema)


