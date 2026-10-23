import "server-only";

import { connectDB, CredentialModel } from "@/lib/models";
import crypto from "node:crypto";
import { ADMIN_CONFIG } from "../../config";

export interface AdminProfileRecord {
  email: string;
  name: string;
  photoUrl: string;
  passwordHash: string;
}

async function getModel() {
  await connectDB();
  return CredentialModel;
}

export function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

export async function ensureCredentials(): Promise<AdminProfileRecord> {
  const defaults: AdminProfileRecord = {
    email: ADMIN_CONFIG.credentials.email,
    name: ADMIN_CONFIG.credentials.name,
    photoUrl: "",
    passwordHash: hashPassword(ADMIN_CONFIG.credentials.password),
  };

  try {
    const Model = await getModel();
    const existing = await Model.findOne().lean().exec();
    if (existing) {
      return {
        email: existing.email,
        name: existing.name,
        photoUrl: existing.photoUrl,
        passwordHash: existing.passwordHash,
      };
    }
    await Model.create(defaults).catch(() => {});
    return defaults;
  } catch (err) {
    console.warn("MongoDB ensureCredentials failed, using fallback credentials:", err);
    return defaults;
  }
}

export async function saveCredentials(
  patch: Partial<AdminProfileRecord>
): Promise<AdminProfileRecord> {
  const current = await ensureCredentials();
  const next: AdminProfileRecord = {
    email: patch.email ?? current.email,
    name: patch.name ?? current.name,
    photoUrl: patch.photoUrl ?? current.photoUrl,
    passwordHash: patch.passwordHash ?? current.passwordHash,
  };
  try {
    const Model = await getModel();
    await Model.findOneAndUpdate(
      {},
      { $set: next },
      { upsert: true }
    ).exec();
  } catch (err) {
    console.warn("MongoDB saveCredentials failed:", err);
  }
  return next;
}

export async function verifyPassword(
  email: string,
  password: string
): Promise<AdminProfileRecord | null> {
  const cleanEmail = email.trim().toLowerCase();
  const inputHash = hashPassword(password);

  // 1. Direct fast match with .env configured credentials
  const envEmail = ADMIN_CONFIG.credentials.email.trim().toLowerCase();
  const envHash = hashPassword(ADMIN_CONFIG.credentials.password);
  if (cleanEmail === envEmail && inputHash === envHash) {
    return {
      email: ADMIN_CONFIG.credentials.email,
      name: ADMIN_CONFIG.credentials.name,
      photoUrl: "",
      passwordHash: envHash,
    };
  }

  // 2. Check MongoDB database if available
  try {
    const Model = await getModel();
    const existing = await Model.findOne().lean().exec();
    if (existing) {
      if (
        existing.email.toLowerCase() === cleanEmail &&
        existing.passwordHash === inputHash
      ) {
        return {
          email: existing.email,
          name: existing.name,
          photoUrl: existing.photoUrl,
          passwordHash: existing.passwordHash,
        };
      }
    }
  } catch (err) {
    console.warn("MongoDB verifyPassword lookup failed:", err);
  }

  return null;
}
 