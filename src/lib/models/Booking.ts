import "server-only";
import { Schema, model, models, type Document, type Model } from "mongoose";
import type { AdminBooking } from "@/admin/types";

export interface BookingDoc extends AdminBooking, Document {}

const BookingSchema = new Schema<BookingDoc>(
  {
    id: { type: String, required: true, unique: true, index: true },
    customerName: { type: String, required: true },
    phone: { type: String, required: true, index: true },
    pickup: { type: String, required: true },
    drop: { type: String, required: true },
    pickupAddress: { type: String, required: true },
    time: { type: String, required: true },
    date: { type: String, required: true },
    vehicle: { type: String, required: true },
    passengers: { type: Number, required: true },
    tripType: { type: String, enum: ["One Way", "Round Trip"], required: true },
    message: { type: String, default: "" },
    status: {
      type: String,
      enum: ["Pending", "Completed", "Cancelled"],
      default: "Pending",
    },
    createdAt: { type: String, required: true, default: () => new Date().toISOString() },
  },
  { collection: "bookings", timestamps: false }
);

export const BookingModel: Model<BookingDoc> =
  models.Booking || model<BookingDoc>("Booking", BookingSchema);
