import fs from "node:fs";
import path from "node:path";
import { ADMIN_CONFIG } from "../../config";
import type { MediaItem } from "../../types";

const MEDIA_DIR = path.join(process.cwd(), "public", "admin", "media");

function ensureDir() {
  if (!fs.existsSync(MEDIA_DIR)) fs.mkdirSync(MEDIA_DIR, { recursive: true });
}

export async function saveUpload(
  file: File
): Promise<{ url: string; error?: string }> {
  const ext = path.extname(file.name).toLowerCase();
  if (!ADMIN_CONFIG.uploads.allowedExtensions.includes(ext)) {
    return { url: "", error: `File type "${ext || "unknown"}" is not allowed` };
  }
  if (file.size > ADMIN_CONFIG.uploads.maxSizeBytes) {
    return { url: "", error: "File exceeds the 5 MB size limit" };
  }
  ensureDir();
  const name = `admin_${Date.now()}_${Math.random().toString(36).slice(2, 8)}${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync(path.join(MEDIA_DIR, name), buffer);
  return { url: `/admin/media/${name}` };
}

export function listMedia(): MediaItem[] {
  ensureDir();
  return fs
    .readdirSync(MEDIA_DIR)
    .filter((name) =>
      ADMIN_CONFIG.uploads.allowedExtensions.includes(path.extname(name).toLowerCase())
    )
    .map((name) => {
      const stat = fs.statSync(path.join(MEDIA_DIR, name));
      return {
        name,
        url: `/admin/media/${name}`,
        size: stat.size,
        uploadedAt: stat.mtime.toISOString(),
      };
    })
    .sort(
      (a, b) =>
        new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
    );
}

export function deleteMediaFile(
  fileName: string
): { ok: boolean; error?: string } {
  if (!/^[a-zA-Z0-9._-]+$/.test(fileName)) {
    return { ok: false, error: "Invalid file name" };
  }
  const full = path.join(MEDIA_DIR, fileName);
  if (!full.startsWith(MEDIA_DIR)) {
    return { ok: false, error: "Invalid file path" };
  }
  if (!fs.existsSync(full)) {
    return { ok: false, error: "File not found" };
  }
  fs.rmSync(full);
  return { ok: true };
}
