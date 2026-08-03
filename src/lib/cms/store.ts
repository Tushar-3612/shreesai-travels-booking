import "server-only";

import fs from "node:fs";
import path from "node:path";
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

const DATA_DIR = path.join(process.cwd(), "admin-data");

const FILE_MAP: Record<CollectionName, string> = {
  bookings: "bookings.json",
  packages: "packages.json",
  vehicles: "vehicles.json",
  services: "services.json",
  reviews: "reviews.json",
  gallery: "gallery.json",
  settings: "settings.json",
};

const SEEDERS: Record<CollectionName, () => unknown> = {
  bookings: seedBookings,
  packages: seedPackages,
  vehicles: seedVehicles,
  services: seedServices,
  reviews: seedReviews,
  gallery: seedGallery,
  settings: seedSettings,
};

function ensureDir() {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function fileFor(name: CollectionName) {
  return path.join(DATA_DIR, FILE_MAP[name]);
}

export function readCollection<T>(name: CollectionName): T {
  ensureDir();
  const file = fileFor(name);
  if (fs.existsSync(file)) {
    try {
      return JSON.parse(fs.readFileSync(file, "utf8")) as T;
    } catch {
      // corrupted file - reseed below
    }
  }
  const seeded = SEEDERS[name]() as T;
  writeCollection(name, seeded);
  return seeded;
}

export function writeCollection(name: CollectionName, value: unknown) {
  ensureDir();
  fs.writeFileSync(fileFor(name), JSON.stringify(value, null, 2), "utf8");
}

export function resetCollection(name: CollectionName) {
  const seeded = SEEDERS[name]();
  writeCollection(name, seeded);
  return seeded;
}

export function isCollectionName(value: string): value is CollectionName {
  return (COLLECTIONS as readonly string[]).includes(value);
}
