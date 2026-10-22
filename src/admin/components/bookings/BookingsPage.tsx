"use client";

import { useMemo, useState } from "react";
import {
  FiCalendar,
  FiCheckCircle,
  FiDownload,
  FiEye,
  FiPhone,
  FiPlus,
  FiSearch,
  FiTrash2,
  FiUser,
  FiClock,
  FiMapPin,
  FiMessageSquare,
  FiUsers,
  FiTag,
} from "react-icons/fi";
import { FaCarSide, FaWhatsapp } from "react-icons/fa6";
import { useBookings } from "../../lib/db";
import type { AdminBooking, BookingStatus, TripType } from "../../types";
import { downloadCsv, formatDateTime, phoneDigits, whatsappLink } from "../../lib/utils";
import { toast } from "../../lib/toast";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import PageHeader from "../ui/PageHeader";
import Modal from "../ui/Modal";
import ConfirmDialog from "../ui/ConfirmDialog";
import EmptyState from "../ui/EmptyState";
import { Field, Select, TextArea, TextInput } from "../ui/Field";

const STATUS_TONE: Record<BookingStatus, "green" | "amber" | "rose"> = {
  Completed: "green",
  Pending: "amber",
  Cancelled: "rose",
};

const STATUS_FILTERS = ["All", "Pending", "Completed", "Cancelled"] as const;

const EMPTY_FORM = {
  customerName: "",
  phone: "",
  pickup: "",
  drop: "",
  pickupAddress: "",
  date: "",
  time: "",
  vehicle: "",
  passengers: 1,
  tripType: "One Way" as TripType,
  message: "",
};

export default function BookingsPage() {
  const bookings = useBookings();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<(typeof STATUS_FILTERS)[number]>("All");
  const [selected, setSelected] = useState<AdminBooking | null>(null);
  const [toDelete, setToDelete] = useState<AdminBooking | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return bookings.items
      .filter((b) => (statusFilter === "All" ? true : b.status === statusFilter))
      .filter((b) =>
        term
          ? [b.customerName, b.phone, b.vehicle, b.pickup, b.drop, b.message]
              .join(" ")
              .toLowerCase()
              .includes(term)
          : true
      )
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [bookings.items, search, statusFilter]);

  const handleExport = () => {
    const rows: (string | number)[][] = [
      ["ID", "Customer", "Phone", "Pickup", "Drop", "Date", "Time", "Vehicle", "Trip Type", "Message", "Status", "Created"],
      ...filtered.map((b) => [
        b.id,
        b.customerName,
        b.phone,
        b.pickup,
        b.drop,
        b.date,
        b.time,
        b.vehicle,
        b.tripType,
        b.message,
        b.status,
        formatDateTime(b.createdAt),
      ]),
    ];
    downloadCsv(`bookings-${new Date().toISOString().slice(0, 10)}.csv`, rows);
    toast(`Exported ${filtered.length} bookings to CSV`);
  };

  const markCompleted = (booking: AdminBooking) => {
    bookings.update(booking.id, { status: "Completed" });
    toast(`Booking marked as completed`);
  };

  const confirmDelete = () => {
    if (!toDelete) return;
    bookings.remove(toDelete.id);
    toast("Booking deleted", "info");
    setToDelete(null);
  };

  const addBooking = () => {
    if (!form.customerName || !form.phone || !form.pickup || !form.drop || !form.pickupAddress || !form.date || !form.time || !form.vehicle || !form.passengers) {
      toast("Please fill all required fields", "error");
      return;
    }
    bookings.add({ ...form, status: "Pending", createdAt: new Date().toISOString() });
    toast("Booking added successfully");
    setFormOpen(false);
    setForm(EMPTY_FORM);
  };

  const detail = selected ?? toDelete;

  return (
    <div>
      <PageHeader
        title="Bookings"
        subtitle={`${bookings.items.length} total bookings`}
        actions={
          <>
            <button className="adm-btn adm-btn-outline" onClick={handleExport}>
              <FiDownload size={15} />
              Export CSV
            </button>
            <button
              className="adm-btn adm-btn-primary"
              onClick={() => {
                setForm(EMPTY_FORM);
                setFormOpen(true);
              }}
            >
              <FiPlus size={16} />
              New Booking
            </button>
          </>
        }
      />

      <Card bodyClassName="p-4">
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <FiSearch size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by customer, phone, vehicle or route..."
              className="adm-inp pl-10"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto adm-scroll">
            {STATUS_FILTERS.map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`adm-tab ${statusFilter === status ? "active" : ""}`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto adm-scroll">
          <table className="adm-tbl">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Pickup → Drop</th>
                <th>Date & Time</th>
                <th>Vehicle</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((b) => (
                <tr key={b.id}>
                  <td>
                    <p className="font-bold text-slate-800">{b.customerName}</p>
                    <p className="text-[11px] text-slate-400">{b.phone}</p>
                  </td>
                  <td className="max-w-[220px]">
                    <p className="truncate">{b.pickup} → {b.drop}</p>
                    <p className="text-[11px] text-slate-400">{b.tripType}</p>
                  </td>
                  <td className="whitespace-nowrap">
                    <p>{b.date}</p>
                    <p className="text-[11px] text-slate-400">{b.time}</p>
                  </td>
                  <td>{b.vehicle}</td>
                  <td>
                    <Badge tone={STATUS_TONE[b.status]}>{b.status}</Badge>
                  </td>
                  <td>
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        className="adm-icon-btn"
                        title="View booking"
                        onClick={() => setSelected(b)}
                      >
                        <FiEye size={14} />
                      </button>
                      <a
                        className="adm-icon-btn success"
                        title="Call customer"
                        href={`tel:${phoneDigits(b.phone)}`}
                      >
                        <FiPhone size={14} />
                      </a>
                      <a
                        className="adm-icon-btn"
                        title="WhatsApp customer"
                        href={whatsappLink(b.phone, `Hi ${b.customerName}! Your booking with Sai Vaishnavi Tours and Travels (${b.id}) - ${b.pickup} to ${b.drop} on ${b.date} at ${b.time}.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaWhatsapp size={14} />
                      </a>
                      {b.status !== "Completed" && (
                        <button
                          className="adm-icon-btn success"
                          title="Mark completed"
                          onClick={() => markCompleted(b)}
                        >
                          <FiCheckCircle size={14} />
                        </button>
                      )}
                      <button
                        className="adm-icon-btn danger"
                        title="Delete booking"
                        onClick={() => setToDelete(b)}
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
              icon={<FiCalendar size={22} />}
              title="No bookings found"
              description="Try adjusting your search or filter, or add a new booking."
              action={
                <button
                  className="adm-btn adm-btn-primary adm-btn-sm"
                  onClick={() => {
                    setForm(EMPTY_FORM);
                    setFormOpen(true);
                  }}
                >
                  <FiPlus size={14} />
                  Add Booking
                </button>
              }
            />
          )}
        </div>
      </Card>

      <Modal
        open={!!detail}
        onClose={() => {
          setSelected(null);
          setToDelete(null);
        }}
        title="Booking Details"
        subtitle={detail ? `Booking ID: ${detail.id}` : undefined}
        wide
        footer={
          detail && (
            <>
              {detail.status !== "Completed" && (
                <button
                  className="adm-btn adm-btn-success"
                  onClick={() => {
                    markCompleted(detail);
                    setSelected(null);
                    setToDelete(null);
                  }}
                >
                  <FiCheckCircle size={15} />
                  Mark Completed
                </button>
              )}
              <a
                className="adm-btn adm-btn-outline"
                href={`tel:${phoneDigits(detail.phone)}`}
              >
                <FiPhone size={15} />
                Call Customer
              </a>
              <a
                className="adm-btn adm-btn-primary"
                href={whatsappLink(
                  detail.phone,
                  `Hi ${detail.customerName}! Your booking with Sai Vaishnavi Tours and Travels (${detail.id}) is confirmed.`
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp size={15} />
                WhatsApp
              </a>
            </>
          )
        }
      >
        {detail && (
          <div className="grid sm:grid-cols-2 gap-4">
            <DetailRow icon={<FiTag size={15} />} label="Booking ID" value={detail.id} />
            <DetailRow icon={<FiUser size={15} />} label="Customer Name" value={detail.customerName} />
            <DetailRow icon={<FiPhone size={15} />} label="Phone" value={detail.phone} />
            <DetailRow icon={<FiMapPin size={15} />} label="Pickup" value={detail.pickup} />
            <DetailRow icon={<FiMapPin size={15} />} label="Drop" value={detail.drop} />
            <div className="sm:col-span-2">
              <DetailRow icon={<FiMapPin size={15} />} label="Full Pickup Address" value={detail.pickupAddress || detail.pickup} />
            </div>
            <DetailRow icon={<FiCalendar size={15} />} label="Journey Date" value={detail.date} />
            <DetailRow icon={<FiClock size={15} />} label="Journey Time" value={detail.time} />
            <DetailRow icon={<FaCarSide size={15} />} label="Vehicle" value={detail.vehicle} />
            <DetailRow icon={<FiUsers size={15} />} label="Passengers" value={String(detail.passengers ?? 1)} />
            <DetailRow icon={<FiMapPin size={15} />} label="Journey Type" value={detail.tripType} />
            <DetailRow icon={<FiCheckCircle size={15} />} label="Status" value={detail.status} badge />
            <DetailRow icon={<FiClock size={15} />} label="Created Date" value={formatDateTime(detail.createdAt)} />
            <div className="sm:col-span-2">
              <DetailRow icon={<FiMessageSquare size={15} />} label="Special Note" value={detail.message || "No message provided"} multiline />
            </div>
          </div>
        )}
      </Modal>

      <ConfirmDialog
        open={!!toDelete}
        onClose={() => setToDelete(null)}
        onConfirm={confirmDelete}
        title="Delete Booking"
        message={`Are you sure you want to delete the booking for ${toDelete?.customerName ?? ""} (${toDelete?.pickup ?? ""} → ${toDelete?.drop ?? ""})? This action cannot be undone.`}
      />

      <Modal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        title="New Booking"
        subtitle="Create a booking on behalf of a customer"
        wide
        footer={
          <>
            <button className="adm-btn adm-btn-ghost" onClick={() => setFormOpen(false)}>
              Cancel
            </button>
            <button className="adm-btn adm-btn-primary" onClick={addBooking}>
              <FiPlus size={15} />
              Add Booking
            </button>
          </>
        }
      >
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Customer Name" required>
            <TextInput
              value={form.customerName}
              onChange={(e) => setForm({ ...form, customerName: e.target.value })}
              placeholder="Full name"
            />
          </Field>
          <Field label="Phone" required>
            <TextInput
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="+91 98XXX XXXXX"
            />
          </Field>
          <Field label="Pickup" required>
            <TextInput
              value={form.pickup}
              onChange={(e) => setForm({ ...form, pickup: e.target.value })}
              placeholder="e.g. Sai Chhaya Hotel, Shirdi"
            />
          </Field>
          <Field label="Drop" required>
            <TextInput
              value={form.drop}
              onChange={(e) => setForm({ ...form, drop: e.target.value })}
              placeholder="e.g. Mumbai Airport T2"
            />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Full Pickup Address" required>
              <TextArea
                rows={2}
                value={form.pickupAddress}
                onChange={(e) => setForm({ ...form, pickupAddress: e.target.value })}
                placeholder="Street, area, landmark, city..."
              />
            </Field>
          </div>
          <Field label="Date" required>
            <TextInput
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />
          </Field>
          <Field label="Time" required>
            <TextInput
              type="time"
              value={form.time}
              onChange={(e) => setForm({ ...form, time: e.target.value })}
            />
          </Field>
          <Field label="Vehicle" required>
            <Select
              value={form.vehicle}
              onChange={(e) => setForm({ ...form, vehicle: e.target.value })}
            >
              <option value="">Select vehicle</option>
              <option>Swift Dzire</option>
              <option>XUV XL6</option>
              <option>7 Seater Traveller</option>
              <option>Innova Crysta</option>
              <option>Mahindra Scorpio</option>
            </Select>
          </Field>
          <Field label="Passengers" required>
            <Select
              value={form.passengers}
              onChange={(e) => setForm({ ...form, passengers: Number(e.target.value) })}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
            </Select>
          </Field>
          <Field label="Journey Type">
            <Select
              value={form.tripType}
              onChange={(e) => setForm({ ...form, tripType: e.target.value as TripType })}
            >
              <option>One Way</option>
              <option>Round Trip</option>
            </Select>
          </Field>
          <div className="sm:col-span-2">
            <Field label="Message">
              <TextArea
                rows={3}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Pickup instructions, luggage details, flight/train number..."
              />
            </Field>
          </div>
        </div>
      </Modal>
    </div>
  );
}

function DetailRow({
  icon,
  label,
  value,
  badge,
  multiline,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  badge?: boolean;
  multiline?: boolean;
}) {
  return (
    <div className={`rounded-2xl border border-slate-100 bg-slate-50/60 p-4 ${multiline ? "" : ""}`}>
      <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-slate-400 mb-1.5">
        <span className="text-blue-500">{icon}</span>
        {label}
      </p>
      {badge ? (
        <Badge tone={STATUS_TONE[value as BookingStatus]}>{value}</Badge>
      ) : (
        <p className="text-sm font-semibold text-slate-800 break-words">{value}</p>
      )}
    </div>
  );
}
