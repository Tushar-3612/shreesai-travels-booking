"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { FiCalendar, FiPhone, FiMapPin, FiClock, FiUsers, FiSend, FiCheck, FiInfo } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa6";
import { useSiteData, whatsappHref, bookMessage } from "@/lib/site";
import { toast } from "@/lib/toast";
import { VEHICLES } from "@/data/packages";

const PASSENGER_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8];

const PREDEFINED_LOCATIONS = [
  "Shirdi",
  "Shirdi Sai Mandir",
  "Shirdi Airport",
  "Sainagar Shirdi Station",
  "Shirdi Temple Complex",
  "Sai Ashram Road, Shirdi",
  "Mumbai",
  "Mumbai Airport T2",
  "Pune",
  "Hinjawadi, Pune",
  "Nashik",
  "Nashik (Godavari Ghat)",
  "Chhatrapati Sambhajinagar",
  "Chhatrapati Sambhajinagar (Bibi Ka Maqbara)",
  "Trimbakeshwar",
  "Shani Shingnapur",
  "Bhimashankar",
  "Ajanta & Ellora",
];

const JOURNEY_TYPES = ["One Way", "Round Trip"] as const;

const INITIAL_FORM = {
  customerName: "",
  phone: "",
  pickup: "",
  drop: "",
  pickupAddress: "",
  date: "",
  time: "",
  vehicle: "",
  passengers: 1,
  journeyType: "One Way",
  message: "",
};

type BookingFormValues = typeof INITIAL_FORM;

function parsePrefill(raw: string | null): BookingFormValues | null {
  if (!raw) return null;
  try {
    const data = JSON.parse(decodeURIComponent(raw)) as Record<string, unknown>;
    return {
      customerName: typeof data.customerName === "string" ? data.customerName : "",
      phone: typeof data.phone === "string" ? data.phone : "",
      pickup: typeof data.pickup === "string" ? data.pickup : "",
      drop: typeof data.drop === "string" ? data.drop : "",
      pickupAddress: typeof data.pickupAddress === "string" ? data.pickupAddress : "",
      date: typeof data.date === "string" ? data.date : "",
      time: typeof data.time === "string" ? data.time : "",
      vehicle: typeof data.vehicle === "string" ? data.vehicle : "",
      passengers:
        typeof data.passengers === "number" && data.passengers >= 1
          ? data.passengers
          : typeof data.passengers === "string" && Number(data.passengers) >= 1
            ? Number(data.passengers)
            : 1,
      journeyType: data.journeyType === "Round Trip" ? "Round Trip" : "One Way",
      message: typeof data.message === "string" ? data.message : "",
    };
  } catch {
    return null;
  }
}

function buildBookingMessage(form: BookingFormValues) {
  const lines = [
    "*New Booking Request*",
    "",
    `Name: ${form.customerName || "N/A"}`,
    `Phone: ${form.phone || "N/A"}`,
    `Pickup: ${form.pickup || "N/A"}`,
    `Drop: ${form.drop || "N/A"}`,
    `Full Address: ${form.pickupAddress || "N/A"}`,
    `Journey Date: ${form.date || "N/A"}`,
    `Journey Time: ${form.time || "N/A"}`,
    `Vehicle: ${form.vehicle || "N/A"}`,
    `Passengers: ${form.passengers || 1}`,
    `Special Note: ${form.message || "N/A"}`,
    "",
    "Please confirm my booking.",
    "",
    "Thank you.",
  ];
  return lines.join("\n");
}

export default function BookingForm() {
  const site = useSiteData();
  const settings = site?.settings;
  const businessName = settings?.businessName || "Shirdi Car Rental";
  const vehicles =
    site?.vehicles?.map((v) => v.name) ?? VEHICLES.map((v) => v.name);

  const searchParams = useSearchParams();
  const prefill = useMemo(
    () => parsePrefill(searchParams.get("prefill")),
    [searchParams]
  );
  const [form, setForm] = useState<BookingFormValues>(
    () => prefill ?? { ...INITIAL_FORM }
  );
  const prefillNote = prefill?.message ?? "";
  const [submitting, setSubmitting] = useState(false);
  const [dateError, setDateError] = useState("");

  const MIN_DATE = (() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().slice(0, 10);
  })();

  const handleChange = (field: string, value: unknown) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setDateError("");

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selected = new Date(form.date);
    if (form.date && selected < today) {
      setDateError("Journey date cannot be in the past");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          passengers: Number(form.passengers),
          tripType: form.journeyType,
        }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) {
        toast(data?.error || "Could not submit your booking. Please try again.", "error");
        return;
      }

      toast("Booking Saved Successfully", "success");

      const message = buildBookingMessage(form);
      const waUrl = whatsappHref(settings?.whatsapp || "", message);
      window.open(waUrl, "_blank", "noopener,noreferrer");

      setForm({ ...INITIAL_FORM });
    } catch {
      toast("Something went wrong. Please try again.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const whatsappBookHref = whatsappHref(
    settings?.whatsapp || "",
    bookMessage(businessName, "I'm facing issues booking online. Please help me book a taxi.")
  );

  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-widest">
            Book Your Ride
          </span>
          <h1 className="section-title mt-2">
            Quick & <span className="gradient-text">Secure</span> Booking
          </h1>
          <p className="section-subtitle">
            Enter your journey details in 30 seconds and get a confirmed cab
            with transparent, all-inclusive fares.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <form
            onSubmit={handleSubmit}
            className="rounded-[28px] bg-white border border-border/60 shadow-[0_20px_50px_-25px_rgba(37,99,235,0.3)] overflow-hidden"
          >
            <div className="bg-gradient-to-br from-primary to-primary-dark px-8 py-7 text-white">
              <h2 className="text-2xl font-bold">Journey Details</h2>
              <p className="text-white/75 text-sm mt-1">
                Fill in the form below and we&apos;ll confirm your cab right away.
              </p>
            </div>

            {prefillNote && (
              <div className="flex items-start gap-3 bg-primary/5 border border-primary/15 px-8 py-4">
                <FiInfo className="text-primary shrink-0 mt-0.5" size={18} />
                <p className="text-sm font-semibold text-secondary">
                  Your trip details were pre-filled from the cost calculator.
                  <span className="block text-primary font-bold mt-0.5">{prefillNote}</span>
                </p>
              </div>
            )}

            <div className="p-8 sm:p-10">
              <div className="grid sm:grid-cols-2 gap-y-6 gap-x-6">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-bold text-secondary mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.customerName}
                    onChange={(e) => handleChange("customerName", e.target.value)}
                    placeholder="Enter your full name"
                    className="input-field"
                  />
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="block text-sm font-bold text-secondary mb-2">
                    Mobile Number *
                  </label>
                  <div className="relative">
                    <FiPhone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary shrink-0" size={18} />
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      placeholder="e.g. +91 98XXX XXXXX"
                      className="input-field pl-11"
                    />
                  </div>
                </div>

                {/* Pickup Location */}
                <div>
                  <label className="block text-sm font-bold text-secondary mb-2">
                    Pickup Location *
                  </label>
                  <div className="relative">
                    <FiMapPin className="absolute left-3.5 top-3.5 text-primary shrink-0" size={18} />
                    <input
                      type="text"
                      list="pickup-locations"
                      required
                      value={form.pickup}
                      onChange={(e) => handleChange("pickup", e.target.value)}
                      placeholder="Select or type pickup location"
                      className="input-field pl-11"
                    />
                    <datalist id="pickup-locations">
                      {PREDEFINED_LOCATIONS.map((loc) => (
                        <option key={loc} value={loc} />
                      ))}
                    </datalist>
                  </div>
                  <p className="text-[11px] text-text-muted mt-1.5">
                    Select from the list or type your own address.
                  </p>
                </div>

                {/* Drop Location */}
                <div>
                  <label className="block text-sm font-bold text-secondary mb-2">
                    Drop Location *
                  </label>
                  <div className="relative">
                    <FiMapPin className="absolute left-3.5 top-3.5 text-primary shrink-0" size={18} />
                    <input
                      type="text"
                      list="drop-locations"
                      required
                      value={form.drop}
                      onChange={(e) => handleChange("drop", e.target.value)}
                      placeholder="Select or type drop location"
                      className="input-field pl-11"
                    />
                    <datalist id="drop-locations">
                      {PREDEFINED_LOCATIONS.map((loc) => (
                        <option key={loc} value={loc} />
                      ))}
                    </datalist>
                  </div>
                  <p className="text-[11px] text-text-muted mt-1.5">
                    Select from the list or type your own address.
                  </p>
                </div>

                {/* Full Pickup Address */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-bold text-secondary mb-2">
                    Full Pickup Address *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={form.pickupAddress}
                    onChange={(e) => handleChange("pickupAddress", e.target.value)}
                    placeholder="Enter the complete pickup address (street, area, landmark, city)"
                    className="input-field resize-vertical"
                  />
                </div>

                {/* Journey Date */}
                <div>
                  <label className="block text-sm font-bold text-secondary mb-2">
                    Journey Date *
                  </label>
                  <div className="relative">
                    <FiCalendar className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary shrink-0" size={18} />
                    <input
                      type="date"
                      required
                      min={MIN_DATE}
                      value={form.date}
                      onChange={(e) => {
                        handleChange("date", e.target.value);
                        setDateError("");
                      }}
                      className="input-field pl-11"
                    />
                  </div>
                  {dateError && (
                    <p className="text-[11px] text-rose-600 font-semibold mt-1.5">{dateError}</p>
                  )}
                </div>

                {/* Journey Time */}
                <div>
                  <label className="block text-sm font-bold text-secondary mb-2">
                    Journey Time *
                  </label>
                  <div className="relative">
                    <FiClock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary shrink-0" size={18} />
                    <input
                      type="time"
                      required
                      value={form.time}
                      onChange={(e) => handleChange("time", e.target.value)}
                      className="input-field pl-11"
                    />
                  </div>
                </div>

                {/* Vehicle */}
                <div>
                  <label className="block text-sm font-bold text-secondary mb-2">
                    Vehicle *
                  </label>
                  <select
                    required
                    value={form.vehicle}
                    onChange={(e) => handleChange("vehicle", e.target.value)}
                    className="input-field"
                  >
                    <option value="">Select a vehicle</option>
                    {vehicles.map((v, i) => (
                      <option key={`${v}-${i}`} value={v}>{v}</option>
                    ))}
                  </select>
                </div>

                {/* Passengers */}
                <div>
                  <label className="block text-sm font-bold text-secondary mb-2">
                    Number of Seats / Passengers *
                  </label>
                  <div className="relative">
                    <FiUsers className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary shrink-0" size={18} />
                    <select
                      required
                      value={form.passengers}
                      onChange={(e) => handleChange("passengers", Number(e.target.value))}
                      className="input-field pl-11"
                    >
                      {PASSENGER_OPTIONS.map((n) => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? "Passenger" : "Passengers"}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Journey Type */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-bold text-secondary mb-2">
                    Journey Type *
                  </label>
                  <div className="flex flex-wrap gap-4">
                    {JOURNEY_TYPES.map((type) => (
                      <label
                        key={type}
                        className={`flex items-center gap-2.5 px-5 py-3 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                          form.journeyType === type
                            ? "border-primary bg-primary/5 text-primary font-bold"
                            : "border-border text-secondary hover:border-primary/40"
                        }`}
                      >
                        <input
                          type="radio"
                          name="journeyType"
                          value={type}
                          checked={form.journeyType === type}
                          onChange={() => handleChange("journeyType", type)}
                          className="hidden"
                        />
                        <FiCheck size={16} className={form.journeyType === type ? "text-primary" : "text-transparent"} />
                        {type}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Special Note */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-bold text-secondary mb-2">
                    Special Note (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={form.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    placeholder="Pickup instructions, flight/train number, luggage details, child seat..."
                    className="input-field resize-vertical"
                  />
                </div>
              </div>

              <div className="mt-10 flex flex-col sm:flex-row gap-4 items-stretch">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 btn-primary text-lg py-4 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {submitting ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8H4z"
                        />
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <FiSend size={20} />
                      Book Service
                    </>
                  )}
                </button>
                <a
                  href={whatsappBookHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-4 rounded-2xl bg-[#25D366] text-white font-bold text-lg shadow-md shadow-[#25D366]/30 hover:bg-[#1eb858] transition-all duration-300"
                >
                  <FaWhatsapp size={20} />
                  WhatsApp for Help
                </a>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
