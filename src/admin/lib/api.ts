import type { MediaItem } from "../types";

export async function uploadImages(files: File[]): Promise<string[]> {
  const form = new FormData();
  files.forEach((file) => form.append("files", file));
  const res = await fetch("/api/admin/upload", { method: "POST", body: form });
  const data = await res.json().catch(() => null);
  if (!res.ok || !data?.ok) {
    throw new Error(data?.error || "Upload failed. Please try again.");
  }
  return data.urls as string[];
}

export async function fetchMediaItems(): Promise<MediaItem[]> {
  const res = await fetch("/api/admin/media", { cache: "no-store" });
  const data = await res.json().catch(() => null);
  if (!res.ok || !data?.ok) return [];
  return data.items as MediaItem[];
}

export async function deleteMediaFile(name: string): Promise<{ ok: boolean; error?: string }> {
  const res = await fetch(`/api/admin/media?file=${encodeURIComponent(name)}`, {
    method: "DELETE",
  });
  try {
    return (await res.json()) as { ok: boolean; error?: string };
  } catch {
    return { ok: false, error: "Failed to delete file" };
  }
}
