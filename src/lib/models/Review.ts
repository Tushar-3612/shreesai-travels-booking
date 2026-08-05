import "server-only";
import { Schema, model, models, type Document, type Model } from "mongoose";
import type { AdminReview } from "@/admin/types";

export interface ReviewDoc extends AdminReview, Document {}

const ReviewSchema = new Schema<ReviewDoc>(
  {
    id: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    route: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    text: { type: String, required: true },
    date: { type: String, required: true },
    status: { type: String, enum: ["approved", "pending", "rejected"], default: "pending", index: true },
    featured: { type: Boolean, default: false },
    source: { type: String, enum: ["seed", "user", "admin"], default: "user" },
  },
  { collection: "reviews", timestamps: false }
);

export const ReviewModel: Model<ReviewDoc> =
  models.Review || model<ReviewDoc>("Review", ReviewSchema);
