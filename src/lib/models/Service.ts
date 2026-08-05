import "server-only";
import { Schema, model, models, type Document, type Model } from "mongoose";
import type { AdminService } from "@/admin/types";

export interface ServiceDoc extends AdminService, Document {}

const ServiceSchema = new Schema<ServiceDoc>(
  {
    id: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true, index: true },
    icon: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ["active", "inactive"], default: "active", index: true },
  },
  { collection: "services", timestamps: false }
);

export const ServiceModel: Model<ServiceDoc> =
  models.Service || model<ServiceDoc>("Service", ServiceSchema);
