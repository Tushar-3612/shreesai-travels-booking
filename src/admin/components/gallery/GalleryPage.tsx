"use client";

import { useRef, useState } from "react";
import {
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiChevronUp,
  FiEdit2,
  FiEye,
  FiImage,
  FiTrash2,
  FiUpload,
} from "react-icons/fi";
import { useGalleryItems } from "../../lib/db";
import type { GalleryItem } from "../../types";
import { uploadImages } from "../../lib/api";
import { toast } from "../../lib/toast";
import Card from "../ui/Card";
import PageHeader from "../ui/PageHeader";
import Modal from "../ui/Modal";
import ConfirmDialog from "../ui/ConfirmDialog";
import EmptyState from "../ui/EmptyState";
import { Field, TextInput } from "../ui/Field";

export default function GalleryPage() {
  const gallery = useGalleryItems();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const [toDelete, setToDelete] = useState<GalleryItem | null>(null);
  const [editing, setEditing] = useState<GalleryItem | null>(null);
  const [editLabel, setEditLabel] = useState("");
  const [editTag, setEditTag] = useState("");
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  const handleUpload = async (files: FileList | null) => {
    if (!files || !files.length) return;
    setUploading(true);
    try {
      const urls = await uploadImages(Array.from(files));
      const newItems = urls.map((url, i) => ({
        id: `gal-${Date.now()}-${i}`,
        src: url,
        label: `Image ${gallery.items.length + i + 1}`,
        tag: "New upload",
      }));
      gallery.setAll([...gallery.items, ...newItems]);
      toast(`${urls.length} image${urls.length > 1 ? "s" : ""} added to gallery`);
    } catch (err) {
      toast(err instanceof Error ? err.message : "Upload failed", "error");
    } finally {
      setUploading(false);
    }
  };

  const move = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= gallery.items.length) return;
    const next = [...gallery.items];
    [next[index], next[target]] = [next[target], next[index]];
    gallery.setAll(next);
  };

  const onDrop = (targetIndex: number) => {
    if (dragIndex === null || dragIndex === targetIndex) {
      setDragIndex(null);
      return;
    }
    const next = [...gallery.items];
    const [moved] = next.splice(dragIndex, 1);
    next.splice(targetIndex, 0, moved);
    gallery.setAll(next);
    setDragIndex(null);
  };

  const saveEdit = () => {
    if (!editing) return;
    gallery.update(editing.id, {
      label: editLabel.trim() || editing.label,
      tag: editTag.trim() || editing.tag,
    });
    toast("Gallery item updated");
    setEditing(null);
  };

  const confirmDelete = () => {
    if (!toDelete) return;
    gallery.remove(toDelete.id);
    toast("Image removed from gallery", "info");
    setToDelete(null);
  };

  return (
    <div>
      <PageHeader
        title="Gallery"
        subtitle={`${gallery.items.length} images - drag to reorder`}
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
              className="adm-btn adm-btn-primary"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
            >
              <FiUpload size={16} />
              {uploading ? "Uploading..." : "Upload Images"}
            </button>
          </>
        }
      />

      <Card bodyClassName="p-5">
        {gallery.items.length === 0 ? (
          <EmptyState
            icon={<FiImage size={22} />}
            title="Gallery is empty"
            description="Upload images to showcase your destinations and fleet."
            action={
              <button
                className="adm-btn adm-btn-primary adm-btn-sm"
                onClick={() => inputRef.current?.click()}
              >
                <FiUpload size={14} />
                Upload Images
              </button>
            }
          />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {gallery.items.map((item, index) => (
              <div
                key={item.id}
                draggable
                onDragStart={() => setDragIndex(index)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => onDrop(index)}
                className={`relative group rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 cursor-grab active:cursor-grabbing transition-all ${
                  dragIndex === index ? "opacity-60 ring-2 ring-blue-500" : ""
                }`}
              >
                <img src={item.src} alt={item.tag} className="w-full h-36 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 inset-x-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-white font-bold text-sm truncate">{item.label}</p>
                  <p className="text-white/70 text-[11px] truncate">{item.tag}</p>
                </div>
                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    className="w-7 h-7 rounded-lg bg-white/90 hover:bg-white flex items-center justify-center text-slate-600"
                    title="Preview"
                    onClick={() => setPreviewIndex(index)}
                  >
                    <FiEye size={13} />
                  </button>
                  <button
                    className="w-7 h-7 rounded-lg bg-white/90 hover:bg-white flex items-center justify-center text-slate-600"
                    title="Edit label & tag"
                    onClick={() => {
                      setEditing(item);
                      setEditLabel(item.label);
                      setEditTag(item.tag);
                    }}
                  >
                    <FiEdit2 size={13} />
                  </button>
                  <button
                    className="w-7 h-7 rounded-lg bg-rose-600 text-white flex items-center justify-center"
                    title="Delete"
                    onClick={() => setToDelete(item)}
                  >
                    <FiTrash2 size={13} />
                  </button>
                </div>
                <div className="absolute top-2 left-2 flex-col gap-1 hidden group-hover:flex">
                  <button
                    className="w-7 h-7 rounded-lg bg-white/90 hover:bg-white flex items-center justify-center text-slate-600"
                    title="Move up"
                    onClick={() => move(index, -1)}
                  >
                    <FiChevronUp size={13} />
                  </button>
                  <button
                    className="w-7 h-7 rounded-lg bg-white/90 hover:bg-white flex items-center justify-center text-slate-600"
                    title="Move down"
                    onClick={() => move(index, 1)}
                  >
                    <FiChevronDown size={13} />
                  </button>
                </div>
                <span className="absolute bottom-2 right-2 text-[10px] font-bold text-white/80 bg-slate-900/60 rounded-md px-2 py-0.5">
                  {index + 1}
                </span>
              </div>
            ))}
          </div>
        )}
      </Card>

      <Modal
        open={previewIndex !== null}
        onClose={() => setPreviewIndex(null)}
        title={previewIndex !== null ? gallery.items[previewIndex]?.label : ""}
        subtitle={previewIndex !== null ? gallery.items[previewIndex]?.tag : undefined}
        wide
      >
        {previewIndex !== null && gallery.items[previewIndex] && (
          <div className="relative">
            <img
              src={gallery.items[previewIndex].src}
              alt={gallery.items[previewIndex].tag}
              className="w-full max-h-[60vh] object-contain rounded-xl bg-slate-50"
            />
            <button
              className="absolute left-3 top-1/2 -translate-y-1/2 adm-icon-btn"
              title="Previous"
              onClick={() =>
                setPreviewIndex((i) =>
                  i === null ? i : (i - 1 + gallery.items.length) % gallery.items.length
                )
              }
            >
              <FiChevronLeft size={18} />
            </button>
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 adm-icon-btn"
              title="Next"
              onClick={() =>
                setPreviewIndex((i) => (i === null ? i : (i + 1) % gallery.items.length))
              }
            >
              <FiChevronRight size={18} />
            </button>
          </div>
        )}
      </Modal>

      <Modal
        open={!!editing}
        onClose={() => setEditing(null)}
        title="Edit Gallery Item"
        footer={
          <>
            <button className="adm-btn adm-btn-ghost" onClick={() => setEditing(null)}>
              Cancel
            </button>
            <button className="adm-btn adm-btn-primary" onClick={saveEdit}>
              Save Changes
            </button>
          </>
        }
      >
        {editing && (
          <div className="flex gap-5">
            <img
              src={editing.src}
              alt={editing.label}
              className="w-36 h-28 object-cover rounded-xl border border-slate-200 shrink-0"
            />
            <div className="flex-1 space-y-4">
              <Field label="Label">
                <TextInput
                  value={editLabel}
                  onChange={(e) => setEditLabel(e.target.value)}
                  placeholder="e.g. Shirdi"
                />
              </Field>
              <Field label="Tag">
                <TextInput
                  value={editTag}
                  onChange={(e) => setEditTag(e.target.value)}
                  placeholder="e.g. Sai Samadhi Mandir"
                />
              </Field>
            </div>
          </div>
        )}
      </Modal>

      <ConfirmDialog
        open={!!toDelete}
        onClose={() => setToDelete(null)}
        onConfirm={confirmDelete}
        title="Delete Gallery Image"
        message={`Are you sure you want to remove "${toDelete?.label ?? ""}" from the gallery? The file stays in the media library and can be reused.`}
      />
    </div>
  );
}
