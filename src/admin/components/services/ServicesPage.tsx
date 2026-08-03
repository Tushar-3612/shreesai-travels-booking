"use client";

import { useState } from "react";
import { FiEdit2, FiPlus, FiTool, FiTrash2 } from "react-icons/fi";
import { useServices } from "../../lib/db";
import type { AdminService } from "../../types";
import { toast } from "../../lib/toast";
import { ICON_CHOICES, ICON_MAP } from "../../lib/constants";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import PageHeader from "../ui/PageHeader";
import Modal from "../ui/Modal";
import ConfirmDialog from "../ui/ConfirmDialog";
import EmptyState from "../ui/EmptyState";
import { Field, Select, TextArea, TextInput } from "../ui/Field";

interface ServiceForm {
  name: string;
  icon: string;
  description: string;
  status: "active" | "inactive";
}

const EMPTY_FORM: ServiceForm = {
  name: "",
  icon: "FiTool",
  description: "",
  status: "active",
};

export default function ServicesPage() {
  const services = useServices();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<AdminService | null>(null);
  const [toDelete, setToDelete] = useState<AdminService | null>(null);
  const [form, setForm] = useState<ServiceForm>(EMPTY_FORM);

  const openAdd = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setModalOpen(true);
  };

  const openEdit = (service: AdminService) => {
    setEditing(service);
    setForm({
      name: service.name,
      icon: service.icon,
      description: service.description,
      status: service.status,
    });
    setModalOpen(true);
  };

  const save = () => {
    if (!form.name.trim()) {
      toast("Service name is required", "error");
      return;
    }
    const data = {
      name: form.name.trim(),
      icon: form.icon,
      description: form.description,
      status: form.status,
    };
    if (editing) {
      services.update(editing.id, data);
      toast("Service updated successfully");
    } else {
      services.add(data);
      toast("Service added successfully");
    }
    setModalOpen(false);
  };

  const confirmDelete = () => {
    if (!toDelete) return;
    services.remove(toDelete.id);
    toast("Service deleted", "info");
    setToDelete(null);
  };

  return (
    <div>
      <PageHeader
        title="Services"
        subtitle="Manage the services offered to customers"
        actions={
          <button className="adm-btn adm-btn-primary" onClick={openAdd}>
            <FiPlus size={16} />
            Add Service
          </button>
        }
      />

      {services.items.length === 0 ? (
        <Card bodyClassName="p-0">
          <EmptyState
            icon={<FiTool size={22} />}
            title="No services yet"
            description="Add services like Airport Pickup, Local Darshan and more."
            action={
              <button className="adm-btn adm-btn-primary adm-btn-sm" onClick={openAdd}>
                <FiPlus size={14} />
                Add Service
              </button>
            }
          />
        </Card>
      ) : (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {services.items.map((s) => {
            const Icon = ICON_MAP[s.icon] ?? FiTool;
            return (
              <Card key={s.id} className="p-6">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="w-13 h-13 p-3 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-lg shadow-blue-600/25">
                    <Icon size={26} />
                  </div>
                  <Badge tone={s.status === "active" ? "green" : "slate"}>
                    {s.status}
                  </Badge>
                </div>
                <h3 className="text-base font-extrabold text-slate-900 mb-2">{s.name}</h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-5 min-h-[48px]">
                  {s.description}
                </p>
                <div className="flex items-center justify-end gap-1.5 border-t border-slate-100 pt-4">
                  <button className="adm-icon-btn" title="Edit service" onClick={() => openEdit(s)}>
                    <FiEdit2 size={14} />
                  </button>
                  <button
                    className="adm-icon-btn danger"
                    title="Delete service"
                    onClick={() => setToDelete(s)}
                  >
                    <FiTrash2 size={14} />
                  </button>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? `Edit Service - ${editing.name}` : "Add Service"}
        subtitle="Service name, icon and description"
        footer={
          <>
            <button className="adm-btn adm-btn-ghost" onClick={() => setModalOpen(false)}>
              Cancel
            </button>
            <button className="adm-btn adm-btn-primary" onClick={save}>
              {editing ? "Save Changes" : "Add Service"}
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <Field label="Service Name" required>
            <TextInput
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. Airport Pickup"
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
          <Field label="Icon" hint="Choose an icon for this service">
            <div className="grid grid-cols-6 sm:grid-cols-8 gap-2">
              {ICON_CHOICES.map((key) => {
                const Icon = ICON_MAP[key];
                return (
                  <button
                    key={key}
                    type="button"
                    title={key}
                    onClick={() => setForm({ ...form, icon: key })}
                    className={`w-11 h-11 rounded-xl flex items-center justify-center border transition-all ${
                      form.icon === key
                        ? "border-blue-500 bg-blue-50 text-blue-600 shadow-sm"
                        : "border-slate-200 text-slate-400 hover:border-slate-300 hover:text-slate-600"
                    }`}
                  >
                    <Icon size={18} />
                  </button>
                );
              })}
            </div>
          </Field>
          <Field label="Description">
            <TextArea
              rows={4}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="What does this service include?"
            />
          </Field>
        </div>
      </Modal>

      <ConfirmDialog
        open={!!toDelete}
        onClose={() => setToDelete(null)}
        onConfirm={confirmDelete}
        title="Delete Service"
        message={`Are you sure you want to delete the service "${toDelete?.name ?? ""}"? This action cannot be undone.`}
      />
    </div>
  );
}
