"use client";

import { useRef, useState } from "react";
import { FiImage, FiUpload, FiX } from "react-icons/fi";
import { uploadImages } from "../../lib/api";
import { toast } from "../../lib/toast";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  className?: string;
}

export default function ImageUpload({
  value,
  onChange,
  label = "Upload Image",
  className = "",
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [dragging, setDragging] = useState(false);

  const handleFiles = async (files: FileList | null) => {
    if (!files || !files.length) return;
    setBusy(true);
    try {
      const urls = await uploadImages(Array.from(files));
      if (urls.length) {
        onChange(urls[0]);
        toast("Image uploaded successfully");
      }
    } catch (err) {
      toast(err instanceof Error ? err.message : "Upload failed", "error");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className={className}>
      {value ? (
        <div className="relative rounded-2xl overflow-hidden border border-slate-200 group">
          <img src={value} alt="Uploaded preview" className="w-full h-44 object-cover" />
          <div className="absolute inset-0 bg-slate-900/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button
              type="button"
              className="adm-btn adm-btn-primary adm-btn-sm"
              onClick={() => inputRef.current?.click()}
              disabled={busy}
            >
              <FiUpload size={14} />
              Replace
            </button>
            <button
              type="button"
              className="adm-btn adm-btn-danger adm-btn-sm"
              onClick={() => onChange("")}
            >
              <FiX size={14} />
              Remove
            </button>
          </div>
        </div>
      ) : (
        <div
          className={`adm-upload ${dragging ? "dragging" : ""}`}
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            handleFiles(e.dataTransfer.files);
          }}
          role="button"
        >
          <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3">
            {busy ? (
              <FiUpload size={20} className="animate-pulse" />
            ) : (
              <FiImage size={20} />
            )}
          </div>
          <p className="text-sm font-semibold text-slate-700">
            {busy ? "Uploading..." : label}
          </p>
          <p className="text-[11px] text-slate-400 mt-1">
            Click or drag & drop - JPG, PNG, WEBP up to 5 MB
          </p>
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => {
          handleFiles(e.target.files);
          e.target.value = "";
        }}
      />
    </div>
  );
}
