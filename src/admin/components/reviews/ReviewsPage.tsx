"use client";

import { useMemo, useState } from "react";
import { FiCheck, FiEye, FiPlus, FiStar, FiTrash2, FiX } from "react-icons/fi";
import { useReviews } from "../../lib/db";
import type { AdminReview, ReviewStatus } from "../../types";
import { formatDate, initials } from "../../lib/utils";
import { toast } from "../../lib/toast";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import PageHeader from "../ui/PageHeader";
import Modal from "../ui/Modal";
import ConfirmDialog from "../ui/ConfirmDialog";
import EmptyState from "../ui/EmptyState";
import { Field, Select, TextArea, TextInput } from "../ui/Field";

const TABS = ["All", "Pending", "Approved", "Rejected"] as const;
type Tab = (typeof TABS)[number];

const STATUS_TONE: Record<ReviewStatus, "green" | "amber" | "rose"> = {
  approved: "green",
  pending: "amber",
  rejected: "rose",
};

const EMPTY_FORM = {
  name: "",
  route: "",
  rating: 5,
  text: "",
  status: "pending" as ReviewStatus,
};

export default function ReviewsPage() {
  const reviews = useReviews();
  const [tab, setTab] = useState<Tab>("Pending");
  const [viewing, setViewing] = useState<AdminReview | null>(null);
  const [toDelete, setToDelete] = useState<AdminReview | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);

  const merged: AdminReview[] = useMemo(() => {
    return [...reviews.items].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [reviews.items]);

  const filtered = merged.filter((r) =>
    tab === "All" ? true : r.status === tab.toLowerCase()
  );
  const counts = useMemo(() => {
    const pending = merged.filter((r) => r.status === "pending").length;
    const approved = merged.filter((r) => r.status === "approved").length;
    const rejected = merged.filter((r) => r.status === "rejected").length;
    return { all: merged.length, pending, approved, rejected };
  }, [merged]);

  const setStatus = (review: AdminReview, status: ReviewStatus) => {
    reviews.update(review.id, { status });
    if (status === "approved") {
      toast(`Review by ${review.name} approved and published`);
    } else if (status === "rejected") {
      toast(`Review by ${review.name} rejected`, "info");
    } else {
      toast("Review moved back to pending", "info");
    }
    setViewing(null);
  };

  const toggleFeatured = (review: AdminReview) => {
    reviews.update(review.id, { featured: !review.featured });
    toast(review.featured ? "Removed from featured" : "Marked as featured");
  };

  const confirmDelete = () => {
    if (!toDelete) return;
    reviews.remove(toDelete.id);
    toast("Review deleted", "info");
    setToDelete(null);
  };

  const addReview = () => {
    if (!form.name.trim() || !form.text.trim()) {
      toast("Name and review text are required", "error");
      return;
    }
    reviews.add({
      name: form.name.trim(),
      route: form.route || "Shirdi Darshan",
      rating: form.rating,
      text: form.text.trim(),
      date: new Date().toISOString().slice(0, 10),
      status: form.status,
      featured: false,
      source: "admin",
    });
    toast("Review added successfully");
    setFormOpen(false);
    setForm(EMPTY_FORM);
  };

  return (
    <div>
      <PageHeader
        title="Reviews"
        subtitle={`${counts.pending} awaiting moderation`}
        actions={
          <button
            className="adm-btn adm-btn-primary"
            onClick={() => {
              setForm(EMPTY_FORM);
              setFormOpen(true);
            }}
          >
            <FiPlus size={16} />
            Add Review
          </button>
        }
      />

      <Card bodyClassName="p-4">
        <div className="flex gap-2 mb-4 overflow-x-auto adm-scroll">
          {TABS.map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`adm-tab ${tab === t ? "active" : ""}`}>
              {t} ({counts[t.toLowerCase() as keyof typeof counts]})
            </button>
          ))}
        </div>

        <div className="overflow-x-auto adm-scroll">
          <table className="adm-tbl">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Route</th>
                <th>Rating</th>
                <th>Review</th>
                <th>Date</th>
                <th>Status</th>
                <th>Featured</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id}>
                  <td>
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                        {initials(r.name)}
                      </div>
                      <p className="font-bold text-slate-800 whitespace-nowrap">{r.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap">{r.route}</td>
                  <td>
                    <span className="text-amber-500 font-bold whitespace-nowrap">
                      {"★".repeat(r.rating)}
                      <span className="text-slate-300">{"★".repeat(5 - r.rating)}</span>
                    </span>
                  </td>
                  <td className="max-w-[260px]">
                    <p className="truncate text-slate-600">{r.text}</p>
                  </td>
                  <td className="whitespace-nowrap">{formatDate(r.date)}</td>
                  <td>
                    <Badge tone={STATUS_TONE[r.status]}>{r.status}</Badge>
                  </td>
                  <td>
                    <button
                      className={`adm-icon-btn ${r.featured ? "bg-amber-50 border-amber-200" : ""}`}
                      title={r.featured ? "Unfeature review" : "Feature review"}
                      onClick={() => toggleFeatured(r)}
                    >
                      <FiStar
                        size={14}
                        className={r.featured ? "fill-amber-400 text-amber-400" : ""}
                      />
                    </button>
                  </td>
                  <td>
                    <div className="flex items-center justify-end gap-1.5">
                      <button className="adm-icon-btn" title="View review" onClick={() => setViewing(r)}>
                        <FiEye size={14} />
                      </button>
                      {r.status !== "approved" && (
                        <button
                          className="adm-icon-btn success"
                          title="Approve review"
                          onClick={() => setStatus(r, "approved")}
                        >
                          <FiCheck size={14} />
                        </button>
                      )}
                      {r.status !== "rejected" && (
                        <button
                          className="adm-icon-btn"
                          title="Reject review"
                          onClick={() => setStatus(r, "rejected")}
                        >
                          <FiX size={14} />
                        </button>
                      )}
                      <button
                        className="adm-icon-btn danger"
                        title="Delete review"
                        onClick={() => setToDelete(r)}
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
              icon={<FiStar size={22} />}
              title={`No ${tab.toLowerCase()} reviews`}
              description={
                tab === "Pending"
                  ? "Reviews submitted from the website will appear here for approval."
                  : "There are no reviews in this category."
              }
            />
          )}
        </div>
      </Card>

      <Modal
        open={!!viewing}
        onClose={() => setViewing(null)}
        title="Review Details"
        subtitle={viewing ? `Review by ${viewing.name}` : undefined}
        footer={
          viewing && (
            <>
              {viewing.status !== "approved" && (
                <button
                  className="adm-btn adm-btn-success"
                  onClick={() => setStatus(viewing, "approved")}
                >
                  <FiCheck size={15} />
                  Approve
                </button>
              )}
              {viewing.status !== "rejected" && (
                <button
                  className="adm-btn adm-btn-outline"
                  onClick={() => setStatus(viewing, "rejected")}
                >
                  <FiX size={15} />
                  Reject
                </button>
              )}
              <button
                className="adm-btn adm-btn-danger"
                onClick={() => {
                  setToDelete(viewing);
                  setViewing(null);
                }}
              >
                <FiTrash2 size={15} />
                Delete
              </button>
            </>
          )
        }
      >
        {viewing && (
          <div>
            <div className="flex items-center gap-4 mb-5">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-white text-sm font-bold flex items-center justify-center">
                {initials(viewing.name)}
              </div>
              <div>
                <p className="font-bold text-slate-900">{viewing.name}</p>
                <p className="text-xs text-slate-400">{viewing.route} · {formatDate(viewing.date)}</p>
              </div>
              <div className="ml-auto text-right">
                <p className="text-amber-500 font-bold text-lg">{"★".repeat(viewing.rating)}</p>
                <Badge tone={STATUS_TONE[viewing.status]}>{viewing.status}</Badge>
              </div>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 rounded-2xl p-5">
              {viewing.text}
            </p>
          </div>
        )}
      </Modal>

      <ConfirmDialog
        open={!!toDelete}
        onClose={() => setToDelete(null)}
        onConfirm={confirmDelete}
        title="Delete Review"
        message={`Are you sure you want to delete the review by ${toDelete?.name ?? ""}? This will also remove it from the website.`}
      />

      <Modal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        title="Add Review"
        subtitle="Manually add a customer review"
        footer={
          <>
            <button className="adm-btn adm-btn-ghost" onClick={() => setFormOpen(false)}>
              Cancel
            </button>
            <button className="adm-btn adm-btn-primary" onClick={addReview}>
              <FiPlus size={15} />
              Add Review
            </button>
          </>
        }
      >
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Customer Name" required>
            <TextInput
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Full name"
            />
          </Field>
          <Field label="Route">
            <TextInput
              value={form.route}
              onChange={(e) => setForm({ ...form, route: e.target.value })}
              placeholder="e.g. Shirdi → Mumbai"
            />
          </Field>
          <Field label="Rating">
            <Select
              value={form.rating}
              onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
            >
              {[5, 4, 3, 2, 1].map((n) => (
                <option key={n} value={n}>
                  {n} star{n > 1 ? "s" : ""}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Status">
            <Select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value as ReviewStatus })}
            >
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </Select>
          </Field>
          <div className="sm:col-span-2">
            <Field label="Review Text" required>
              <TextArea
                rows={4}
                value={form.text}
                onChange={(e) => setForm({ ...form, text: e.target.value })}
                placeholder="Customer feedback..."
              />
            </Field>
          </div>
        </div>
      </Modal>
    </div>
  );
}
