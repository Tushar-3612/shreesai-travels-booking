import "server-only";
import { Schema, model, models, type Document, type Model } from "mongoose";
import type { AdminDestination } from "@/admin/types";

export interface DestinationDoc extends AdminDestination, Document {}

const DestinationSchema = new Schema<DestinationDoc>(
  {
    id: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true, index: true },
    city: { type: String, default: "" },
    state: { type: String, default: "" },
    image: { type: String, default: "" },
    imageAlt: { type: String, default: "" },
    description: { type: String, default: "" },
    distance: { type: Number, default: 0 },
    popular: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
      index: true,
    },
  },
  { collection: "destinations", timestamps: false }
);

export const DestinationModel: Model<DestinationDoc> =
  models.Destination || model<DestinationDoc>("Destination", DestinationSchema);
