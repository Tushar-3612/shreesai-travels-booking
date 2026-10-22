import "server-only";
import { Schema, model, models, type Document, type Model } from "mongoose";
import type { PricingConfig } from "@/admin/types";

export interface PricingDoc extends PricingConfig, Document {}

const PricingSchema = new Schema<PricingDoc>(
  {
    vehiclePricing: [{ type: Schema.Types.Mixed, default: [] }],
    destinationPricing: [{ type: Schema.Types.Mixed, default: [] }],
    extraCharges: { type: Schema.Types.Mixed, default: {} },
    calculator: { type: Schema.Types.Mixed, default: {} },
  },
  { collection: "pricing", timestamps: false }
);

export const PricingModel: Model<PricingDoc> =
  models.Pricing || model<PricingDoc>("Pricing", PricingSchema);
