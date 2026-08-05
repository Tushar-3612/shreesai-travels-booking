import "server-only";

import { v2, type UploadApiResponse } from "cloudinary";

v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "",
  api_key: process.env.CLOUDINARY_API_KEY || "",
  api_secret: process.env.CLOUDINARY_API_SECRET || "",
});

const isConfigured = (): boolean =>
  !!(
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  );

export async function uploadToCloudinary(
  file: File,
  folder: string = "car-booking"
): Promise<{ url: string; publicId: string; error?: string }> {
  if (!isConfigured()) {
    return { url: "", publicId: "", error: "Cloudinary is not configured" };
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve) => {
    v2.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
        allowed_formats: ["jpg", "jpeg", "png", "webp", "gif", "svg", "ico"],
      },
      (error, result) => {
        if (error || !result) {
          resolve({
            url: "",
            publicId: "",
            error: error?.message || "Upload failed",
          });
          return;
        }
        const resp = result as UploadApiResponse;
        resolve({
          url: resp.secure_url,
          publicId: resp.public_id,
        });
      }
    ).end(buffer);
  });
}

export async function deleteFromCloudinary(
  publicId: string
): Promise<{ ok: boolean; error?: string }> {
  if (!isConfigured()) {
    return { ok: false, error: "Cloudinary is not configured" };
  }
  if (!publicId) return { ok: true };
  try {
    await v2.uploader.destroy(publicId);
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Delete failed" };
  }
}

export { v2 as cloudinary };
