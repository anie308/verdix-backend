import mongoose, { Schema, InferSchemaType } from "mongoose"

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, index: true },
    password_hash: { type: String, required: true },
    profile_id: { type: Schema.Types.ObjectId, ref: "Profile", required: true },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } },
)

export type User = InferSchemaType<typeof userSchema> & { _id: string }

export const UserModel = mongoose.models.User || mongoose.model("User", userSchema)


