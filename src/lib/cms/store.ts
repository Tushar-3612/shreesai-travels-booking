import "server-only";

import {
  connectDB,
  BookingModel,
  PackageModel,
  VehicleModel,
  ServiceModel,
  ReviewModel,
  GalleryModel,
  SettingModel,
} from "@/lib/models";
import type { Model, Document } from "mongoose";
import {
  seedBookings,
  seedGallery,
  seedPackages,
  seedReviews,
  seedServices,
  seedSettings,
  seedVehicles,
} from "@/admin/lib/seed";

export const COLLECTIONS = [
  "bookings",
  "packages",
  "vehicles",
  "services",
  "reviews",
  "gallery",
  "settings",
] as const;

export type CollectionName = (typeof COLLECTIONS)[number];

const SEEDERS: Record<CollectionName, () => unknown> = {
  bookings: seedBookings,
  packages: seedPackages,
  vehicles: seedVehicles,
  services: seedServices,
  reviews: seedReviews,
  gallery: seedGallery,
  settings: seedSettings,
};

const MODEL_MAP: Record<CollectionName, Model<Document>> = {
  bookings: BookingModel as unknown as Model<Document>,
  packages: PackageModel as unknown as Model<Document>,
  vehicles: VehicleModel as unknown as Model<Document>,
  services: ServiceModel as unknown as Model<Document>,
  reviews: ReviewModel as unknown as Model<Document>,
  gallery: GalleryModel as unknown as Model<Document>,
  settings: SettingModel as unknown as Model<Document>,
};

async function getModel(name: CollectionName): Promise<Model<Document>> {
  await connectDB();
  return MODEL_MAP[name];
}

function stripMongooseFields(doc: Record<string, unknown>): Record<string, unknown> {
  const obj = JSON.parse(JSON.stringify(doc));
  delete obj._id;
  delete obj.__v;
  return obj;
}

export async function readCollection<T>(name: CollectionName): Promise<T> {
  const Model = await getModel(name);

  if (name === "settings") {
    const doc = await Model.findOne().lean().exec();
    if (doc) {
      return stripMongooseFields(doc as Record<string, unknown>) as T;
    }
    const seeded = seedSettings();
    await Model.create(seeded);
    return seeded as T;
  }

  const docs = await Model.find().lean().exec();
  if (!docs.length) {
    const seeded = SEEDERS[name]();
    await Model.insertMany(seeded);
    return seeded as T;
  }
  const cleaned = docs.map((doc: Record<string, unknown>) => stripMongooseFields(doc));
  return cleaned as T;
}

export async function writeCollection(
  name: CollectionName,
  value: unknown
): Promise<void> {
  const Model = await getModel(name);

  if (name === "settings") {
    await Model.deleteMany({}).exec();
    await Model.create(value);
    return;
  }

  await Model.deleteMany({}).exec();
  if (Array.isArray(value) && value.length > 0) {
    await Model.insertMany(value);
  }
}

export async function resetCollection(
  name: CollectionName
): Promise<unknown> {
  const Model = await getModel(name);
  const seeded = SEEDERS[name]();
  if (name === "settings") {
    await Model.deleteMany({}).exec();
    await Model.create(seeded);
  } else {
    await Model.deleteMany({}).exec();
    await Model.insertMany(seeded);
  }
  return seeded;
}

export function isCollectionName(value: string): value is CollectionName {
  return (COLLECTIONS as readonly string[]).includes(value);
}
