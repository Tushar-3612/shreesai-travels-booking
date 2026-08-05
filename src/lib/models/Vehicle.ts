import "server-only";
import { Schema, model, models, type Document, type Model } from "mongoose";
import type { AdminVehicle } from "@/admin/types";

export interface VehicleDoc extends AdminVehicle, Document {}

const VehicleSchema = new Schema<VehicleDoc>(
  {
    id: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true, index: true },
    image: { type: String, default: "" },
    price: { type: String, default: "" },
    seats: { type: Number, required: true },
    fuel: { type: String, required: true },
    ac: { type: String, required: true },
    transmission: { type: String, enum: ["Manual", "Automatic"], default: "Manual" },
    description: { type: String, default: "" },
    status: { type: String, enum: ["available", "unavailable"], default: "available", index: true },
  },
  { collection: "vehicles", timestamps: false }
);

export const VehicleModel: Model<VehicleDoc> =
  models.Vehicle || model<VehicleDoc>("Vehicle", VehicleSchema);
