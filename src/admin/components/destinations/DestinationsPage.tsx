"use client";

import { useState } from "react";
import { FiEdit2, FiPlus, FiTrash2, FiMapPin } from "react-icons/fi";
import { useDestinations } from "../../lib/db";
import type { AdminDestination } from "../../types";
import { toast } from "../../lib/toast";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import PageHeader from "../ui/PageHeader";
import Modal from "../ui/Modal";
import ConfirmDialog from "../ui/ConfirmDialog";
import EmptyState from "../ui/EmptyState";
import { Field, Select, TextArea, TextInput } from "../ui/Field";
import ImageUpload from "../ui/ImageUpload";

interface DestinationForm {
  name: string;
  city: string;
  state: string;
  image: string;
  imageAlt: string;
  description: string;
  distance: number;
  popular: boolean;
  status: "active" | "inactive";
}

const EMPTY_FORM: DestinationForm = {
  name: "",
  city: "",
  state: "Maharashtra",
  image: "",
  imageAlt: "",
  description: "",
  distance: 0,
  popular: false,
  status: "active",
};

export default function DestinationsPage() {
  const destinations = useDestinations();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<AdminDestination | null>(null);
  const [toDelete, setToDelete] = useState<AdminDestination | null>(null);
  const [form, setForm] = useState<DestinationForm>(EMPTY_FORM);

  const openAdd = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setModalOpen(true);
  };

  const openEdit = (destination: AdminDestination) => {
    setEditing(destination);
    setForm({
      name: destination.name,
      city: destination.city,
      state: destination.state,
      image: destination.image,
      imageAlt: destination.imageAlt,
      description: destination.description,
      distance: destination.distance,
      popular: destination.popular,
      status: destination.status,
    });
    setModalOpen(true);
  };

  const save = () => {
    if (!form.name.trim()) {
      toast("Destination name is required", "error");
      return;
    }
    const data = {
      name: form.name.trim(),
      city: form.city.trim(),
      state: form.state.trim(),
      image: form.image,
      imageAlt: form.imageAlt.trim() || form.name.trim(),
      description: form.description.trim(),
      distance: Number(form.distance) || 0,
      popular: form.popular,
      status: form.status,
    };
    if (editing) {
      destinations.update(editing.id, data);
      toast("Destination updated successfully");
    } else {
      destinations.add(data);
      toast("Destination added successfully");
    }
    setModalOpen(false);
  };

  const confirmDelete = () => {
    if (!toDelete) return;
    destinations.remove(toDelete.id);
    toast("Destination deleted", "info");
    setToDelete(null);
  };

  return (
    <div>
      <PageHeader
        title="Destinations"
        subtitle="Manage destinations, distances and images"
        actions={
          <button className="adm-btn adm-btn-primary" onClick={openAdd}>
            <FiPlus size={16} />
            Add Destination
          </button>
        }
      />

      {destinations.items.length === 0 ? (
        <Card bodyClassName="p-0">
          <EmptyState
            icon={<FiMapPin size={22} />}
            title="No destinations yet"
            description="Add the places your cabs travel to."
            action={
              <button className="adm-btn adm-btn-primary adm-btn-sm" onClick={openAdd}>
                <FiPlus size={14} />
                Add Destination
              </button>
            }
          />
        </Card>
      ) : (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {destinations.items.map((d) => (
            <Card key={d.id} className="overflow-hidden" bodyClassName="p-0">
              <div className="relative">
                {d.image ? (
                  <img src={d.image} alt={d.imageAlt || d.name} className="w-full h-40 object-cover" />
                ) : (
                  <div className="w-full h-40 bg-slate-100 flex items-center justify-center">
                    <FiMapPin size={40} className="text-slate-300" />
                  </div>
                )}
                <div className="absolute top-3 right-3 flex gap-1.5">
                  {d.popular && <Badge tone="blue">Popular</Badge>}
                  <Badge tone={d.status === "active" ? "green" : "rose"}>{d.status}</Badge>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between gap-3 mb-2">
                  <h3 className="text-base font-extrabold text-slate-900">{d.name}</h3>
                  <p className="text-sm font-bold text-blue-600 whitespace-nowrap">
                    {d.distance > 0 ? `${d.distance} km` : "—"}
                  </p>
                </div>
                <p className="text-xs text-slate-500 mb-4 line-clamp-2">
                  {d.city && d.state ? `${d.city}, ${d.state}` : d.description || "No description"}
                </p>
                <div className="flex items-center justify-end gap-1.5 border-t border-slate-100 pt-4">
                  <button
                    className="adm-btn adm-btn-outline adm-btn-sm"
                    onClick={() => {
                      destinations.update(d.id, {
                        status: d.status === "active" ? "inactive" : "active",
                      });
                      toast(
                        d.status === "active"
                          ? "Destination disabled"
                          : "Destination enabled"
                      );
                    }}
                  >
                    {d.status === "active" ? "Disable" : "Enable"}
                  </button>
                  <button className="adm-icon-btn" title="Edit destination" onClick={() => openEdit(d)}>
                    <FiEdit2 size={14} />
                  </button>
                  <button
                    className="adm-icon-btn danger"
                    title="Delete destination"
                    onClick={() => setToDelete(d)}
                  >
                    <FiTrash2 size={14} />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? `Edit Destination - ${editing.name}` : "Add Destination"}
        subtitle="Destination details, distance and image"
        wide
        footer={
          <>
            <button className="adm-btn adm-btn-ghost" onClick={() => setModalOpen(false)}>
              Cancel
            </button>
            <button className="adm-btn adm-btn-primary" onClick={save}>
              {editing ? "Save Changes" : "Add Destination"}
            </button>
          </>
        }
      >
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Destination Name" required>
            <TextInput
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. Shirdi"
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
          <Field label="City">
            <TextInput
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              placeholder="e.g. Shirdi"
            />
          </Field>
          <Field label="State">
            <TextInput
              value={form.state}
              onChange={(e) => setForm({ ...form, state: e.target.value })}
              placeholder="e.g. Maharashtra"
            />
          </Field>
          <Field label="Distance (km from base)" hint="Used for cost calculation">
            <TextInput
              type="number"
              min={0}
              value={form.distance}
              onChange={(e) => setForm({ ...form, distance: Number(e.target.value) || 0 })}
            />
          </Field>
          <Field label="Popular">
            <Select
              value={form.popular ? "yes" : "no"}
              onChange={(e) => setForm({ ...form, popular: e.target.value === "yes" })}
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </Select>
          </Field>
          <Field label="Image Alt Text">
            <TextInput
              value={form.imageAlt}
              onChange={(e) => setForm({ ...form, imageAlt: e.target.value })}
              placeholder="Short description of the image"
            />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Destination Image" hint="Shown on the calculator and home page">
              <ImageUpload
                value={form.image}
                onChange={(url) => setForm({ ...form, image: url })}
                label="Upload Destination Image"
              />
            </Field>
          </div>
          <div className="sm:col-span-2">
            <Field label="Description">
              <TextArea
                rows={4}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Short description of the destination"
              />
            </Field>
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        open={!!toDelete}
        onClose={() => setToDelete(null)}
        onConfirm={confirmDelete}
        title="Delete Destination"
        message={`Are you sure you want to delete "${toDelete?.name ?? ""}"? This action cannot be undone.`}
      />
    </div>
  );
}
