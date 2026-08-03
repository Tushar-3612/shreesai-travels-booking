"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { FiCopy, FiEye, FiFolder, FiImage, FiLink, FiRefreshCw, FiTrash2, FiUpload } from "react-icons/fi";
import { deleteMediaFile, fetchMediaItems, uploadImages } from "../../lib/api";
import type { MediaItem } from "../../types";
import { formatBytes } from "../../lib/utils";
import { toast } from "../../lib/toast";
import Card from "../ui/Card";
import PageHeader from "../ui/PageHeader";
import Modal from "../ui/Modal";
import ConfirmDialog from "../ui/ConfirmDialog";
import EmptyState from "../ui/EmptyState";

export default function MediaLibraryPage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<MediaItem | null>(null);
  const [toDelete, setToDelete] = useState<MediaItem | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const media = await fetchMediaItems();
    setItems(media);
    setLoading(false);
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const media = await fetchMediaItems();
      if (!cancelled) {
        setItems(media);
        setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleUpload = async (files: FileList | null) => {
    if (!files || !files.length) return;
    setUploading(true);
    try {
      await uploadImages(Array.from(files));
      toast("Files uploaded to media library");
      await load();
    } catch (err) {
      toast(err instanceof Error ? err.message : "Upload failed", "error");
    } finally {
      setUploading(false);
    }
  };

  const copyUrl = async (url: string) => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}${url}`);
      toast("Image URL copied to clipboard");
    } catch {
      toast("Could not copy URL", "error");
    }
  };

  const confirmDelete = async () => {
    if (!toDelete) return;
    const result = await deleteMediaFile(toDelete.name);
    if (!result.ok) {
      toast(result.error || "Failed to delete file", "error");
    } else {
      toast("File deleted from media library", "info");
      setItems((prev) => prev.filter((m) => m.name !== toDelete.name));
    }
    setToDelete(null);
  };

  return (
    <div>
      <PageHeader
        title="Media Library"
        subtitle="All uploaded images, reusable anywhere"
        actions={
          <>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              multiple
              hidden
              onChange={(e) => {
                handleUpload(e.target.files);
                e.target.value = "";
              }}
            />
            <button
              className="adm-btn adm-btn-outline"
              onClick={load}
              disabled={loading}
            >
              <FiRefreshCw size={15} className={loading ? "animate-spin" : ""} />
              Refresh
            </button>
            <button
              className="adm-btn adm-btn-primary"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
            >
              <FiUpload size={16} />
              {uploading ? "Uploading..." : "Upload Files"}
            </button>
          </>
        }
      />

      <Card bodyClassName="p-5">
        {loading ? (
          <div className="py-16 text-center">
            <FiFolder size={28} className="text-slate-300 mx-auto mb-3 animate-pulse" />
            <p className="text-sm text-slate-400 font-semibold">Loading media...</p>
          </div>
        ) : items.length === 0 ? (
          <EmptyState
            icon={<FiImage size={22} />}
            title="No files in the library"
            description="Uploaded images (package images, vehicle images, gallery and more) are stored here and can be reused anywhere."
            action={
              <button
                className="adm-btn adm-btn-primary adm-btn-sm"
                onClick={() => inputRef.current?.click()}
              >
                <FiUpload size={14} />
                Upload Files
              </button>
            }
          />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {items.map((item) => (
              <div
                key={item.name}
                className="group relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-50"
              >
                <img
                  src={item.url}
                  alt={item.name}
                  className="w-full h-32 object-cover"
                  loading="lazy"
                />
                <div className="p-3">
                  <p className="text-[11px] font-semibold text-slate-600 truncate" title={item.name}>
                    {item.name}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    {formatBytes(item.size)}
                  </p>
                </div>
                <div className="absolute inset-0 bg-slate-900/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5">
                  <button
                    className="w-8 h-8 rounded-lg bg-white/95 hover:bg-white flex items-center justify-center text-slate-600"
                    title="Preview"
                    onClick={() => setPreview(item)}
                  >
                    <FiEye size={14} />
                  </button>
                  <button
                    className="w-8 h-8 rounded-lg bg-white/95 hover:bg-white flex items-center justify-center text-slate-600"
                    title="Copy URL"
                    onClick={() => copyUrl(item.url)}
                  >
                    <FiCopy size={14} />
                  </button>
                  <button
                    className="w-8 h-8 rounded-lg bg-rose-600 hover:bg-rose-500 flex items-center justify-center text-white"
                    title="Delete file"
                    onClick={() => setToDelete(item)}
                  >
                    <FiTrash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      <Modal
        open={!!preview}
        onClose={() => setPreview(null)}
        title={preview?.name ?? ""}
        subtitle="Media file preview"
        wide
        footer={
          preview && (
            <>
              <button
                className="adm-btn adm-btn-outline"
                onClick={() => copyUrl(preview.url)}
              >
                <FiLink size={15} />
                Copy URL
              </button>
              <button
                className="adm-btn adm-btn-danger"
                onClick={() => {
                  setToDelete(preview);
                  setPreview(null);
                }}
              >
                <FiTrash2 size={15} />
                Delete File
              </button>
            </>
          )
        }
      >
        {preview && (
          <div>
            <img
              src={preview.url}
              alt={preview.name}
              className="w-full max-h-[55vh] object-contain rounded-xl bg-slate-50"
            />
            <p className="text-xs text-slate-400 mt-3 text-center break-all">
              {`${window.location.origin}${preview.url}`}
            </p>
          </div>
        )}
      </Modal>

      <ConfirmDialog
        open={!!toDelete}
        onClose={() => setToDelete(null)}
        onConfirm={confirmDelete}
        title="Delete File"
        message={`Are you sure you want to permanently delete "${toDelete?.name ?? ""}"? Any content using this image will lose it.`}
      />
    </div>
  );
}
