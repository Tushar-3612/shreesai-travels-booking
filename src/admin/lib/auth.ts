export interface LoginResult {
  ok: boolean;
  error?: string;
}

export async function loginRequest(
  email: string,
  password: string
): Promise<LoginResult> {
  const res = await fetch("/api/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  try {
    return (await res.json()) as LoginResult;
  } catch {
    return { ok: false, error: "Something went wrong. Try again." };
  }
}

export async function logoutRequest(): Promise<void> {
  await fetch("/api/admin/logout", { method: "POST" });
}

export interface MeResponse {
  ok: boolean;
  email?: string;
  name?: string;
  photoUrl?: string;
}

export async function getMe(): Promise<MeResponse | null> {
  const res = await fetch("/api/admin/me", { cache: "no-store" });
  if (!res.ok) return null;
  try {
    return (await res.json()) as MeResponse;
  } catch {
    return null;
  }
}

export async function updateProfileRequest(patch: {
  name?: string;
  photoUrl?: string;
}): Promise<{ ok: boolean; error?: string }> {
  const res = await fetch("/api/admin/profile", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patch),
  });
  try {
    return (await res.json()) as { ok: boolean; error?: string };
  } catch {
    return { ok: false, error: "Failed to update profile" };
  }
}

export async function changePasswordRequest(
  currentPassword: string,
  newPassword: string
): Promise<{ ok: boolean; error?: string }> {
  const res = await fetch("/api/admin/change-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ currentPassword, newPassword }),
  });
  try {
    return (await res.json()) as { ok: boolean; error?: string };
  } catch {
    return { ok: false, error: "Failed to change password" };
  }
}
