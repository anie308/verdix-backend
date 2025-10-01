import mongoose, { Schema, InferSchemaType } from "mongoose"

const validationSchema = new Schema(
  {
    scan_id: { type: Schema.Types.ObjectId, ref: "Scan", required: true, index: true },
    expert_id: { type: Schema.Types.ObjectId, ref: "Profile", required: true, index: true },
    response: { type: String, required: true },
    is_correct: { type: Boolean },
    corrected_disease: { type: String },
    corrected_treatment: { type: String },
  },
  { timestamps: { createdAt: "created_at", updatedAt: false } },
)

export type Validation = InferSchemaType<typeof validationSchema> & { _id: string }

export const ValidationModel = mongoose.models.Validation || mongoose.model("Validation", validationSchema)


