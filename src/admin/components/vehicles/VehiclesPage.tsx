"use client";

import { useState } from "react";
import { FiEdit2, FiPlus, FiTrash2, FiUsers } from "react-icons/fi";
import { FaCarSide, FaGasPump, FaGauge, FaMicrochip } from "react-icons/fa6";
import { useVehicles } from "../../lib/db";
import type { AdminVehicle } from "../../types";
import { toast } from "../../lib/toast";
import { FUEL_OPTIONS, TRANSMISSION_OPTIONS } from "../../lib/constants";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import PageHeader from "../ui/PageHeader";
import Modal from "../ui/Modal";
import ConfirmDialog from "../ui/ConfirmDialog";
import EmptyState from "../ui/EmptyState";
import { Field, Select, TextArea, TextInput } from "../ui/Field";
import ImageUpload from "../ui/ImageUpload";

interface VehicleForm {
  name: string;
  image: string;
  price: string;
  seats: number;
  fuel: string;
  ac: string;
  transmission: "Manual" | "Automatic";
  description: string;
  status: "available" | "unavailable";
}

const EMPTY_FORM: VehicleForm = {
  name: "",
  image: "",
  price: "",
  seats: 4,
  fuel: "Petrol",
  ac: "Fully AC",
  transmission: "Manual",
  description: "",
  status: "available",
};

export default function VehiclesPage() {
  const vehicles = useVehicles();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<AdminVehicle | null>(null);
  const [toDelete, setToDelete] = useState<AdminVehicle | null>(null);
  const [form, setForm] = useState<VehicleForm>(EMPTY_FORM);

  const openAdd = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setModalOpen(true);
  };

  const openEdit = (vehicle: AdminVehicle) => {
    setEditing(vehicle);
    setForm({
      name: vehicle.name,
      image: vehicle.image,
      price: vehicle.price,
      seats: vehicle.seats,
      fuel: vehicle.fuel,
      ac: vehicle.ac ?? "Fully AC",
      transmission: vehicle.transmission,
      description: vehicle.description,
      status: vehicle.status,
    });
    setModalOpen(true);
  };

  const save = () => {
    if (!form.name.trim()) {
      toast("Vehicle name is required", "error");
      return;
    }
    const data = {
      name: form.name.trim(),
      image: form.image,
      price: form.price,
      seats: form.seats,
      fuel: form.fuel,
      ac: form.ac,
      transmission: form.transmission,
      description: form.description,
      status: form.status,
    };
    if (editing) {
      vehicles.update(editing.id, data);
      toast("Vehicle updated successfully");
    } else {
      vehicles.add(data);
      toast("Vehicle added successfully");
    }
    setModalOpen(false);
  };

  const confirmDelete = () => {
    if (!toDelete) return;
    vehicles.remove(toDelete.id);
    toast("Vehicle deleted", "info");
    setToDelete(null);
  };

  return (
    <div>
      <PageHeader
        title="Vehicles"
        subtitle="Manage your car fleet"
        actions={
          <button className="adm-btn adm-btn-primary" onClick={openAdd}>
            <FiPlus size={16} />
            Add Vehicle
          </button>
        }
      />

      {vehicles.items.length === 0 ? (
        <Card bodyClassName="p-0">
          <EmptyState
            icon={<FaCarSide size={22} />}
            title="No vehicles yet"
            description="Add your first car to the fleet."
            action={
              <button className="adm-btn adm-btn-primary adm-btn-sm" onClick={openAdd}>
                <FiPlus size={14} />
                Add Vehicle
              </button>
            }
          />
        </Card>
      ) : (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {vehicles.items.map((v) => (
            <Card key={v.id} className="overflow-hidden" bodyClassName="p-0">
              <div className="relative">
                {v.image ? (
                  <img src={v.image} alt={v.name} className="w-full h-44 object-cover" />
                ) : (
                  <div className="w-full h-44 bg-slate-100 flex items-center justify-center">
                    <FaCarSide size={44} className="text-slate-300" />
                  </div>
                )}
                <div className="absolute top-3 right-3">
                  <Badge tone={v.status === "available" ? "green" : "rose"}>
                    {v.status}
                  </Badge>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <h3 className="text-base font-extrabold text-slate-900">{v.name}</h3>
                  <p className="text-sm font-bold text-blue-600 whitespace-nowrap">{v.price}</p>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-600 bg-slate-100 rounded-lg px-2.5 py-1.5">
                    <FiUsers size={12} className="text-blue-500" />
                    {v.seats} Seats
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-600 bg-slate-100 rounded-lg px-2.5 py-1.5">
                    <FaGasPump size={12} className="text-blue-500" />
                    {v.fuel}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-600 bg-slate-100 rounded-lg px-2.5 py-1.5">
                    <FaGauge size={12} className="text-blue-500" />
                    {v.transmission}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-600 bg-slate-100 rounded-lg px-2.5 py-1.5">
                    <FaMicrochip size={12} className="text-blue-500" />
                    AC
                  </span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed mb-4 line-clamp-2">
                  {v.description}
                </p>
                <div className="flex items-center justify-end gap-1.5 border-t border-slate-100 pt-4">
                  <button
                    className="adm-btn adm-btn-outline adm-btn-sm"
                    onClick={() => {
                      vehicles.update(v.id, {
                        status: v.status === "available" ? "unavailable" : "available",
                      });
                      toast(
                        v.status === "available"
                          ? "Vehicle marked as unavailable"
                          : "Vehicle marked as available"
                      );
                    }}
                  >
                    {v.status === "available" ? "Mark Unavailable" : "Mark Available"}
                  </button>
                  <button className="adm-icon-btn" title="Edit vehicle" onClick={() => openEdit(v)}>
                    <FiEdit2 size={14} />
                  </button>
                  <button
                    className="adm-icon-btn danger"
                    title="Delete vehicle"
                    onClick={() => setToDelete(v)}
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
        title={editing ? `Edit Vehicle - ${editing.name}` : "Add Vehicle"}
        subtitle="Car details and availability"
        wide
        footer={
          <>
            <button className="adm-btn adm-btn-ghost" onClick={() => setModalOpen(false)}>
              Cancel
            </button>
            <button className="adm-btn adm-btn-primary" onClick={save}>
              {editing ? "Save Changes" : "Add Vehicle"}
            </button>
          </>
        }
      >
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Vehicle Name" required>
            <TextInput
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. Swift Dzire"
            />
          </Field>
          <Field label="Price">
            <TextInput
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              placeholder="₹10 / km or ₹2,500 / day"
            />
          </Field>
          <Field label="Seats">
            <TextInput
              type="number"
              min={1}
              max={30}
              value={form.seats}
              onChange={(e) => setForm({ ...form, seats: Number(e.target.value) || 1 })}
            />
          </Field>
          <Field label="Fuel">
            <Select
              value={form.fuel}
              onChange={(e) => setForm({ ...form, fuel: e.target.value })}
            >
              {FUEL_OPTIONS.map((fuel) => (
                <option key={fuel}>{fuel}</option>
              ))}
            </Select>
          </Field>
          <Field label="AC">
            <TextInput
              value={form.ac}
              onChange={(e) => setForm({ ...form, ac: e.target.value })}
              placeholder="Fully AC"
            />
          </Field>
          <Field label="Transmission">
            <Select
              value={form.transmission}
              onChange={(e) => setForm({ ...form, transmission: e.target.value as "Manual" | "Automatic" })}
            >
              {TRANSMISSION_OPTIONS.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </Select>
          </Field>
          <Field label="Status">
            <Select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value as "available" | "unavailable" })}
            >
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
            </Select>
          </Field>
          <Field label="Vehicle Image">
            <ImageUpload
              value={form.image}
              onChange={(url) => setForm({ ...form, image: url })}
              label="Upload Vehicle Image"
            />
          </Field>
          <Field label="Description">
            <TextArea
              rows={5}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Vehicle description, features and best use cases"
            />
          </Field>
        </div>
      </Modal>

      <ConfirmDialog
        open={!!toDelete}
        onClose={() => setToDelete(null)}
        onConfirm={confirmDelete}
        title="Delete Vehicle"
        message={`Are you sure you want to delete "${toDelete?.name ?? ""}" from your fleet? This action cannot be undone.`}
      />
    </div>
  );
}
