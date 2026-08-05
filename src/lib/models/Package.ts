import "server-only";
import { Schema, model, models, type Document, type Model } from "mongoose";
import type { AdminPackage } from "@/admin/types";

export interface PackageDoc extends AdminPackage, Document {}

const PackageSchema = new Schema<PackageDoc>(
  {
    id: { type: String, required: true, unique: true, index: true },
    slug: { type: String, required: true, unique: true, index: true },
    route: { type: String, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    category: { type: String, required: true },
    distance: { type: String, required: true },
    duration: { type: String, required: true },
    price: { type: String, required: true },
    priceNum: { type: Number, required: true },
    roundTrip: { type: String, required: true },
    description: { type: String, required: true },
    included: [{ type: String }],
    image: { type: String, default: "" },
    imageAlt: { type: String, default: "" },
    gallery: [{ type: String }],
    badge: { type: String, default: "" },
    status: { type: String, enum: ["active", "inactive"], default: "active", index: true },
    featured: { type: Boolean, default: false },
    seoTitle: { type: String, default: "" },
    seoDescription: { type: String, default: "" },
  },
  { collection: "packages", timestamps: false }
);

export const PackageModel: Model<PackageDoc> =
  models.Package || model<PackageDoc>("Package", PackageSchema);
