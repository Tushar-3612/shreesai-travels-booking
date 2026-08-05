import "server-only";
import { Schema, model, models, type Document, type Model } from "mongoose";
import type { MediaItem } from "@/admin/types";

export interface MediaDoc extends MediaItem, Document {
  publicId: string;
}

const MediaSchema = new Schema<MediaDoc>(
  {
    name: { type: String, required: true, unique: true, index: true },
    url: { type: String, required: true },
    size: { type: Number, required: true },
    uploadedAt: { type: String, required: true, default: () => new Date().toISOString(), index: true },
    publicId: { type: String, default: "" },
  },
  { collection: "media", timestamps: false }
);

export const MediaModel: Model<MediaDoc> =
  models.Media || model<MediaDoc>("Media", MediaSchema);
