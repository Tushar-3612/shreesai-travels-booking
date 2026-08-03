"use client";

import { useState } from "react";
import {
  FiBriefcase,
  FiEdit2,
  FiEye,
  FiPlus,
  FiSearch,
  FiStar,
  FiTrash2,
} from "react-icons/fi";
import { usePackages } from "../../lib/db";
import type { AdminPackage } from "../../types";
import { slugify } from "../../lib/utils";
import { toast } from "../../lib/toast";
import { PACKAGE_CATEGORIES } from "../../lib/constants";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import PageHeader from "../ui/PageHeader";
import Modal from "../ui/Modal";
import ConfirmDialog from "../ui/ConfirmDialog";
import EmptyState from "../ui/EmptyState";
import { Field, Select, TextArea, TextInput } from "../ui/Field";
import ImageUpload from "../ui/ImageUpload";

interface PackageForm {
  from: string;
  to: string;
  category: string;
  distance: string;
  duration: string;
  price: string;
  priceNum: number;
  roundTrip: string;
  description: string;
  includedText: string;
  image: string;
  imageAlt: string;
  gallery: string[];
  badge: string;
  status: "active" | "inactive";
  featured: boolean;
  seoTitle: string;
  seoDescription: string;
}

const EMPTY_FORM: PackageForm = {
  from: "Shirdi",
  to: "",
  category: PACKAGE_CATEGORIES[0],
  distance: "",
  duration: "",
  price: "",
  priceNum: 0,
  roundTrip: "",
  description: "",
  includedText: "",
  image: "",
  imageAlt: "",
  gallery: [],
  badge: "",
  status: "active",
  featured: false,
  seoTitle: "",
  seoDescription: "",
};

const toForm = (p: AdminPackage): PackageForm => ({
  from: p.from,
  to: p.to,
  category: p.category,
  distance: p.distance,
  duration: p.duration,
  price: p.price,
  priceNum: p.priceNum,
  roundTrip: p.roundTrip,
  description: p.description,
  includedText: p.included.join("\n"),
  image: p.image,
  imageAlt: p.imageAlt,
  gallery: p.gallery,
  badge: p.badge,
  status: p.status,
  featured: p.featured,
  seoTitle: p.seoTitle,
  seoDescription: p.seoDescription,
});

export default function PackagesPage() {
  const packages = usePackages();
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<AdminPackage | null>(null);
  const [toDelete, setToDelete] = useState<AdminPackage | null>(null);
  const [form, setForm] = useState<PackageForm>(EMPTY_FORM);

  const filtered = packages.items.filter((p) =>
    p.route.toLowerCase().includes(search.trim().toLowerCase())
  );

  const openAdd = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setModalOpen(true);
  };

  const openEdit = (pkg: AdminPackage) => {
    setEditing(pkg);
    setForm(toForm(pkg));
    setModalOpen(true);
  };

  const save = () => {
    if (!form.from.trim() || !form.to.trim()) {
      toast("Route origin and destination are required", "error");
      return;
    }
    const route = `${form.from.trim()} → ${form.to.trim()}`;
    const slug = slugify(`${form.from} ${form.to}`) || `route-${Date.now().toString(36)}`;
    const data = {
      slug,
      route,
      from: form.from.trim(),
      to: form.to.trim(),
      category: form.category,
      distance: form.distance,
      duration: form.duration,
      price: form.price || "Custom",
      priceNum: form.priceNum,
      roundTrip: form.roundTrip,
      description: form.description,
      included: form.includedText.split("\n").map((s) => s.trim()).filter(Boolean),
      image: form.image,
      imageAlt: form.imageAlt || `${route} taxi service`,
      gallery: form.gallery,
      badge: form.badge,
      status: form.status,
      featured: form.featured,
      seoTitle: form.seoTitle || `${route} Taxi Service`,
      seoDescription: form.seoDescription || form.description,
    };
    if (editing) {
      packages.update(editing.id, data);
      toast("Package updated successfully");
    } else {
      packages.add(data);
      toast("Package added successfully");
    }
    setModalOpen(false);
  };

  const confirmDelete = () => {
    if (!toDelete) return;
    packages.remove(toDelete.id);
    toast("Package deleted", "info");
    setToDelete(null);
  };

  return (
    <div>
      <PageHeader
        title="Packages"
        subtitle="Manage routes, pricing and package details"
        actions={
          <button className="adm-btn adm-btn-primary" onClick={openAdd}>
            <FiPlus size={16} />
            Add Package
          </button>
        }
      />

      <Card bodyClassName="p-4">
        <div className="relative mb-4 max-w-md">
          <FiSearch size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search routes..."
            className="adm-inp pl-10"
          />
        </div>

        <div className="overflow-x-auto adm-scroll">
          <table className="adm-tbl">
            <thead>
              <tr>
                <th>Route</th>
                <th>Category</th>
                <th>Distance</th>
                <th>Duration</th>
                <th>Price</th>
                <th>Round Trip</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id}>
                  <td>
                    <div className="flex items-center gap-3 min-w-[220px]">
                      {p.image ? (
                        <img src={p.image} alt={p.imageAlt} className="adm-thumb w-16" />
                      ) : (
                        <div className="adm-thumb w-16 bg-slate-100 flex items-center justify-center">
                          <FiBriefcase size={16} className="text-slate-400" />
                        </div>
                      )}
                      <div>
                        <p className="font-bold text-slate-800">{p.route}</p>
                        <p className="text-[11px] text-slate-400">
                          {p.distance} · {p.duration}
                          {p.featured && (
                            <span className="ml-1.5 text-amber-500">★ Featured</span>
                          )}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td><Badge tone="blue">{p.category}</Badge></td>
                  <td className="whitespace-nowrap">{p.distance}</td>
                  <td className="whitespace-nowrap">{p.duration}</td>
                  <td className="font-bold text-slate-800 whitespace-nowrap">{p.price}</td>
                  <td className="whitespace-nowrap">{p.roundTrip}</td>
                  <td>
                    <Badge tone={p.status === "active" ? "green" : "rose"}>
                      {p.status}
                    </Badge>
                  </td>
                  <td>
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        className="adm-icon-btn"
                        title="Edit package"
                        onClick={() => openEdit(p)}
                      >
                        <FiEdit2 size={14} />
                      </button>
                      <button
                        className="adm-icon-btn success"
                        title="Toggle featured"
                        onClick={() => {
                          packages.update(p.id, { featured: !p.featured });
                          toast(p.featured ? "Removed from featured" : "Marked as featured");
                        }}
                      >
                        <FiStar size={14} className={p.featured ? "fill-amber-400 text-amber-400" : ""} />
                      </button>
                      <button
                        className="adm-icon-btn"
                        title="Toggle status"
                        onClick={() => {
                          packages.update(p.id, {
                            status: p.status === "active" ? "inactive" : "active",
                          });
                          toast(p.status === "active" ? "Package deactivated" : "Package activated");
                        }}
                      >
                        <FiEye size={14} />
                      </button>
                      <button
                        className="adm-icon-btn danger"
                        title="Delete package"
                        onClick={() => setToDelete(p)}
                      >
                        <FiTrash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <EmptyState
              icon={<FiBriefcase size={22} />}
              title="No packages found"
              description="Add your first route package to start selling trips."
              action={
                <button className="adm-btn adm-btn-primary adm-btn-sm" onClick={openAdd}>
                  <FiPlus size={14} />
                  Add Package
                </button>
              }
            />
          )}
        </div>
      </Card>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? `Edit Package - ${editing.route}` : "Add Package"}
        subtitle="Route details, pricing and images"
        wide
        footer={
          <>
            <button className="adm-btn adm-btn-ghost" onClick={() => setModalOpen(false)}>
              Cancel
            </button>
            <button className="adm-btn adm-btn-primary" onClick={save}>
              {editing ? "Save Changes" : "Add Package"}
            </button>
          </>
        }
      >
        <div className="grid sm:grid-cols-3 gap-4">
          <Field label="Route From" required>
            <TextInput
              value={form.from}
              onChange={(e) => setForm({ ...form, from: e.target.value })}
              placeholder="Shirdi"
            />
          </Field>
          <Field label="Route To" required>
            <TextInput
              value={form.to}
              onChange={(e) => setForm({ ...form, to: e.target.value })}
              placeholder="Mumbai"
            />
          </Field>
          <Field label="Category">
            <Select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              {PACKAGE_CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </Select>
          </Field>
          <Field label="Distance">
            <TextInput
              value={form.distance}
              onChange={(e) => setForm({ ...form, distance: e.target.value })}
              placeholder="180 KM"
            />
          </Field>
          <Field label="Duration">
            <TextInput
              value={form.duration}
              onChange={(e) => setForm({ ...form, duration: e.target.value })}
              placeholder="4 Hours"
            />
          </Field>
          <Field label="Price">
            <TextInput
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              placeholder="₹4,500"
            />
          </Field>
          <Field label="Round Trip Price">
            <TextInput
              value={form.roundTrip}
              onChange={(e) => setForm({ ...form, roundTrip: e.target.value })}
              placeholder="₹8,500"
            />
          </Field>
          <Field label="Badge">
            <TextInput
              value={form.badge}
              onChange={(e) => setForm({ ...form, badge: e.target.value })}
              placeholder="Most Popular"
            />
          </Field>
          <Field label="Status">
            <Select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value as "active" | "inactive" })}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </Select>
          </Field>
          <div className="sm:col-span-3">
            <Field label="Description">
              <TextArea
                rows={2}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Short package description shown on cards"
              />
            </Field>
          </div>
          <div className="sm:col-span-3">
            <Field label="Included Services" hint="One item per line">
              <TextArea
                rows={3}
                value={form.includedText}
                onChange={(e) => setForm({ ...form, includedText: e.target.value })}
                placeholder={"Fuel Included\nToll Included\nProfessional Driver"}
              />
            </Field>
          </div>
          <div className="sm:col-span-3 grid sm:grid-cols-2 gap-4">
            <Field label="Package Image">
              <ImageUpload
                value={form.image}
                onChange={(url) => setForm({ ...form, image: url })}
              />
            </Field>
            <Field label="Image Alt Text">
              <TextInput
                value={form.imageAlt}
                onChange={(e) => setForm({ ...form, imageAlt: e.target.value })}
                placeholder="Alt text for the image"
              />
            </Field>
          </div>
          <div className="sm:col-span-3">
            <Field label="Package Gallery" hint="Add multiple images for the package detail page">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {form.gallery.map((url, index) => (
                  <div key={`${url}-${index}`} className="relative rounded-xl overflow-hidden border border-slate-200 group">
                    <img src={url} alt={`Gallery ${index + 1}`} className="w-full h-20 object-cover" />
                    <button
                      type="button"
                      className="absolute top-1.5 right-1.5 w-6 h-6 rounded-lg bg-rose-600/90 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() =>
                        setForm({ ...form, gallery: form.gallery.filter((_, i) => i !== index) })
                      }
                    >
                      <FiTrash2 size={12} />
                    </button>
                  </div>
                ))}
                <ImageUpload
                  value=""
                  label="Add Image"
                  onChange={(url) => setForm({ ...form, gallery: [...form.gallery, url] })}
                />
              </div>
            </Field>
          </div>
          <div className="sm:col-span-3">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                className="w-4 h-4 accent-blue-600"
              />
              <span className="text-sm font-semibold text-slate-700">
                Feature this package on the homepage
              </span>
            </label>
          </div>
          <div className="sm:col-span-3 grid sm:grid-cols-2 gap-4">
            <Field label="SEO Title">
              <TextInput
                value={form.seoTitle}
                onChange={(e) => setForm({ ...form, seoTitle: e.target.value })}
              />
            </Field>
            <Field label="SEO Description">
              <TextInput
                value={form.seoDescription}
                onChange={(e) => setForm({ ...form, seoDescription: e.target.value })}
              />
            </Field>
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        open={!!toDelete}
        onClose={() => setToDelete(null)}
        onConfirm={confirmDelete}
        title="Delete Package"
        message={`Are you sure you want to delete the package "${toDelete?.route ?? ""}"? This action cannot be undone.`}
      />
    </div>
  );
}
