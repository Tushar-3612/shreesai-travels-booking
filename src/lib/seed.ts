import mongoose from "mongoose";
import type { Model } from "mongoose";

import { connectDB } from "@/lib/mongodb";
import {
  BookingModel,
  PackageModel,
  VehicleModel,
  ServiceModel,
  ReviewModel,
  GalleryModel,
  SettingModel,
  CredentialModel,
  MediaModel,
} from "@/lib/models";
import {
  seedBookings,
  seedPackages,
  seedVehicles,
  seedServices,
  seedReviews,
  seedGallery,
  seedSettings,
} from "@/admin/lib/seed";
import { ADMIN_CONFIG } from "@/admin/config";
import crypto from "node:crypto";

function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

export async function seedDatabase() {
  await connectDB();
  console.log("Connected to MongoDB");

  const modelsToClear: Array<{
    name: string;
    model: Model<Document>;
    seed: () => unknown[];
  }> = [
    { name: "bookings", model: BookingModel as unknown as Model<Document>, seed: seedBookings },
    { name: "packages", model: PackageModel as unknown as Model<Document>, seed: seedPackages },
    { name: "vehicles", model: VehicleModel as unknown as Model<Document>, seed: seedVehicles },
    { name: "services", model: ServiceModel as unknown as Model<Document>, seed: seedServices },
    { name: "reviews", model: ReviewModel as unknown as Model<Document>, seed: seedReviews },
    { name: "gallery", model: GalleryModel as unknown as Model<Document>, seed: seedGallery },
  ];

  for (const { name, model, seed } of modelsToClear) {
    await model.deleteMany({}).exec();
    const seeded = seed();
    await model.insertMany(seeded);
    console.log(`Seeded ${name} with ${seeded.length} documents`);
  }

  await SettingModel.deleteMany({}).exec();
  const defaultSettings = seedSettings();
  await SettingModel.create(defaultSettings);
  console.log("Seeded settings");

  await CredentialModel.deleteMany({}).exec();
  await CredentialModel.create({
    email: ADMIN_CONFIG.credentials.email,
    name: ADMIN_CONFIG.credentials.name,
    photoUrl: "",
    passwordHash: hashPassword(ADMIN_CONFIG.credentials.password),
  });
  console.log("Seeded credentials");

  await MediaModel.deleteMany({}).exec();
  console.log("Cleared media");

  console.log("Seed complete. Disconnecting...");
  await mongoose.disconnect();
  console.log("Done");
}
