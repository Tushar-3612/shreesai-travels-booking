import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_CONFIG } from "../../config";
import { signJwt, verifyJwt } from "../jwt";
import {
  ensureCredentials,
  saveCredentials,
  verifyPassword,
  hashPassword,
  type AdminProfileRecord,
} from "./credentials";

export const COOKIE_NAME = ADMIN_CONFIG.jwt.cookieName;

export async function issueSession(profile: AdminProfileRecord) {
  const token = await signJwt({ sub: profile.email, name: profile.name });
  const store = await cookies();
  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: ADMIN_CONFIG.jwt.expiresInSeconds,
  });
}

export async function clearSession() {
  const store = await cookies();
  store.set(COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
}

export async function getSessionProfile(): Promise<AdminProfileRecord | null> {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  if (!token) return null;
  const payload = await verifyJwt(token);
  if (!payload) return null;
  return ensureCredentials();
}

export async function requireAdminPage(): Promise<AdminProfileRecord> {
  const profile = await getSessionProfile();
  if (!profile) redirect("/admin/login");
  return profile;
}

export async function requireAdminApi(): Promise<AdminProfileRecord | null> {
  return getSessionProfile();
}

export async function login(
  email: string,
  password: string
): Promise<{ ok: boolean; error?: string }> {
  const profile = verifyPassword(email, password);
  if (!profile) return { ok: false, error: "Invalid email or password" };
  await issueSession(profile);
  return { ok: true };
}

export async function changePassword(
  currentPassword: string,
  newPassword: string
): Promise<{ ok: boolean; error?: string }> {
  const profile = await requireAdminApi();
  if (!profile) return { ok: false, error: "Unauthorized" };
  if (profile.passwordHash !== hashPassword(currentPassword)) {
    return { ok: false, error: "Current password is incorrect" };
  }
  if (newPassword.length < 6) {
    return { ok: false, error: "New password must be at least 6 characters" };
  }
  saveCredentials({ passwordHash: hashPassword(newPassword) });
  return { ok: true };
}

export async function updateProfile(patch: {
  name?: string;
  photoUrl?: string;
}): Promise<{ ok: boolean; profile?: AdminProfileRecord; error?: string }> {
  const profile = await requireAdminApi();
  if (!profile) return { ok: false, error: "Unauthorized" };
  const next = saveCredentials({
    name: patch.name !== undefined ? patch.name.trim() || profile.name : undefined,
    photoUrl: patch.photoUrl !== undefined ? patch.photoUrl : undefined,
  });
  return { ok: true, profile: next };
}
