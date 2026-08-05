import "server-only";

import path from "node:path";

import { connectDB, MediaModel } from "@/lib/models";
import { uploadToCloudinary, deleteFromCloudinary } from "@/lib/cloudinary";
import { ADMIN_CONFIG } from "../../config";
import type { MediaItem } from "../../types";

async function getModel() {
  await connectDB();
  return MediaModel;
}

export async function saveUpload(
  file: File
): Promise<{ url: string; error?: string }> {
  const ext = path.extname(file.name || "").toLowerCase();
  if (!ADMIN_CONFIG.uploads.allowedExtensions.includes(ext)) {
    return { url: "", error: `File type "${ext || "unknown"}" is not allowed` };
  }
  if (file.size > ADMIN_CONFIG.uploads.maxSizeBytes) {
    return { url: "", error: "File exceeds the 5 MB size limit" };
  }

  const result = await uploadToCloudinary(file);
  if (result.error || !result.url) {
    return { url: "", error: result.error || "Upload failed" };
  }

  const Model = await getModel();
  await Model.create({
    name: `${result.publicId}${ext}`,
    url: result.url,
    size: file.size,
    uploadedAt: new Date().toISOString(),
    publicId: result.publicId,
  });

  return { url: result.url };
}

export async function listMedia(): Promise<MediaItem[]> {
  const Model = await getModel();
  const docs = await Model.find().sort({ uploadedAt: -1 }).lean().exec();
  return docs.map((doc) => ({
    name: doc.name,
    url: doc.url,
    size: doc.size,
    uploadedAt: doc.uploadedAt,
  }));
}

export async function deleteMediaFile(
  fileName: string
): Promise<{ ok: boolean; error?: string }> {
  if (!/^[a-zA-Z0-9._/-]+$/.test(fileName)) {
    return { ok: false, error: "Invalid file name" };
  }
  const Model = await getModel();
  const doc = await Model.findOne({ name: fileName }).lean().exec();
  if (!doc) {
    return { ok: false, error: "File not found" };
  }
  if (doc.publicId) {
    await deleteFromCloudinary(doc.publicId);
  }
  await Model.deleteOne({ _id: doc._id }).exec();
  return { ok: true };
}
