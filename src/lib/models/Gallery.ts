import "server-only";
import { Schema, model, models, type Document, type Model } from "mongoose";
import type { GalleryItem } from "@/admin/types";

export interface GalleryDoc extends GalleryItem, Document {}

const GallerySchema = new Schema<GalleryDoc>(
  {
    id: { type: String, required: true, unique: true, index: true },
    src: { type: String, required: true },
    label: { type: String, required: true },
    tag: { type: String, default: "" },
  },
  { collection: "gallery", timestamps: false }
);

export const GalleryModel: Model<GalleryDoc> =
  models.Gallery || model<GalleryDoc>("Gallery", GallerySchema);
