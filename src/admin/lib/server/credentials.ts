import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { ADMIN_CONFIG } from "../../config";

export interface AdminProfileRecord {
  email: string;
  name: string;
  photoUrl: string;
  passwordHash: string;
}

const DATA_DIR = path.join(process.cwd(), "admin-data");
const FILE = path.join(DATA_DIR, "credentials.json");

export function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

export function ensureCredentials(): AdminProfileRecord {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(FILE)) {
    const defaults: AdminProfileRecord = {
      email: ADMIN_CONFIG.credentials.email,
      name: ADMIN_CONFIG.credentials.name,
      photoUrl: "",
      passwordHash: hashPassword(ADMIN_CONFIG.credentials.password),
    };
    fs.writeFileSync(FILE, JSON.stringify(defaults, null, 2), "utf-8");
    return defaults;
  }
  try {
    return JSON.parse(fs.readFileSync(FILE, "utf-8")) as AdminProfileRecord;
  } catch {
    return {
      email: ADMIN_CONFIG.credentials.email,
      name: ADMIN_CONFIG.credentials.name,
      photoUrl: "",
      passwordHash: hashPassword(ADMIN_CONFIG.credentials.password),
    };
  }
}

export function saveCredentials(
  patch: Partial<AdminProfileRecord>
): AdminProfileRecord {
  const current = ensureCredentials();
  const next = { ...current };
  if (patch.email !== undefined) next.email = patch.email;
  if (patch.name !== undefined) next.name = patch.name;
  if (patch.photoUrl !== undefined) next.photoUrl = patch.photoUrl;
  if (patch.passwordHash !== undefined) next.passwordHash = patch.passwordHash;
  fs.writeFileSync(FILE, JSON.stringify(next, null, 2), "utf-8");
  return next;
}

export function verifyPassword(
  email: string,
  password: string
): AdminProfileRecord | null {
  const creds = ensureCredentials();
  if (creds.email.toLowerCase() !== email.trim().toLowerCase()) return null;
  if (creds.passwordHash !== hashPassword(password)) return null;
  return creds;
}
