

import mongoose, { Schema, InferSchemaType } from "mongoose"

const scanSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "Profile", required: true, index: true },
    image_url: { type: String, required: true },
    plant_type: { type: String },
    predicted_disease: { type: String, required: true },
    confidence_score: { type: Number, required: true },
    suggested_treatment: { type: String },
    status: { type: String, enum: ["pending", "validated", "rejected"], default: "pending", index: true },
  },
  { timestamps: { createdAt: "created_at", updatedAt: false } },
)

export type Scan = InferSchemaType<typeof scanSchema> & { _id: string }

export const ScanModel = mongoose.models.Scan || mongoose.model("Scan", scanSchema)


