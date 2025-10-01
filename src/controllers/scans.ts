import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth";
import { ScanModel } from "../models/scan";
import { GoogleGenAI } from "@google/genai";

import fs from "fs";
import { env } from "../config/env";

const ai = new GoogleGenAI({ apiKey: env.geminiApiKey });

export const getScans = async (req: AuthenticatedRequest, res: Response) => {
  const scans = await ScanModel.find({ user_id: req.user!.id }).sort({
    created_at: -1,
  });
  return res.json(scans);
};

export const uploadScan = async (req: AuthenticatedRequest, res: Response) => {
  if (!req.file) return res.status(400).json({ message: "File is required" });
  const publicUrl = `/uploads/${req.file.filename}`;

  try {
    const prompt =
      "Identify the plant and any disease shown in the image. Provide a suggested treatment if a disease is identified. Return the response in JSON format with the following keys: plant_type, predicted_disease, confidence_score, suggested_treatment.";

    const imageParts = [
      {
        inlineData: {
          data: Buffer.from(fs.readFileSync(req.file.path)).toString("base64"),
          mimeType: req.file.mimetype,
        },
      },
    ];
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-001",
      contents: [prompt, ...imageParts],
    });
    let result = response.text as any;

    // ✅ Strip ```json ... ``` if present
    result = result.replace(/```json|```/g, "").trim();

    // console.log("AI Raw Result:", result);

    // ✅ Parse safely
    const {
      plant_type,
      predicted_disease,
      confidence_score,
      suggested_treatment,
    } = JSON.parse(result);

    const scan = await ScanModel.create({
      user_id: req.user!.id,
      image_url: publicUrl,
      plant_type,
      predicted_disease,
      confidence_score,
      suggested_treatment,
    });

    return res.status(201).json({ scan });

    // Parse the JSON response from the AI model
  } catch (error) {
    console.error("Error during AI detection:", error);
    return res.status(500).json({ message: "Error during AI detection" });
  }
};
