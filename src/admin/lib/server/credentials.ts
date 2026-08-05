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
  const defaults: AdminProfileRecord = {
    email: ADMIN_CONFIG.credentials.email,
    name: ADMIN_CONFIG.credentials.name,
    photoUrl: "",
    passwordHash: hashPassword(ADMIN_CONFIG.credentials.password),
  };
  await Model.create(defaults);
  return defaults;
}

export async function saveCredentials(
  patch: Partial<AdminProfileRecord>
): Promise<AdminProfileRecord> {
  const Model = await getModel();
  const current = await ensureCredentials();
  const next: AdminProfileRecord = {
    email: patch.email ?? current.email,
    name: patch.name ?? current.name,
    photoUrl: patch.photoUrl ?? current.photoUrl,
    passwordHash: patch.passwordHash ?? current.passwordHash,
  };
  await Model.findOneAndUpdate(
    {},
    { $set: next },
    { upsert: true }
  ).exec();
  return next;
}

export async function verifyPassword(
  email: string,
  password: string
): Promise<AdminProfileRecord | null> {
  const Model = await getModel();
  const existing = await Model.findOne().lean().exec();
  if (!existing) {
    const defaults = await ensureCredentials();
    if (
      defaults.email.toLowerCase() !== email.trim().toLowerCase() ||
      defaults.passwordHash !== hashPassword(password)
    )
      return null;
    return defaults;
  }
  if (existing.email.toLowerCase() !== email.trim().toLowerCase()) return null;
  if (existing.passwordHash !== hashPassword(password)) return null;
  return {
    email: existing.email,
    name: existing.name,
    photoUrl: existing.photoUrl,
    passwordHash: existing.passwordHash,
  };
}
