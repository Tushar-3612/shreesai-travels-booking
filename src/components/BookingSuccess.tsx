"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FiCheckCircle,
  FiClipboard,
  FiClock,
  FiCalendar,
  FiTruck,
  FiUser,
  FiUsers,
  FiMapPin,
  FiPhone,
  FiSend,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa6";
import { useSiteData, whatsappHref } from "@/lib/site";
import { formatDate } from "@/admin/lib/utils";
import type { AdminBooking } from "@/admin/types";

const DETAIL_ROW = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="rounded-2xl border border-border/60 bg-bg-alt p-4">
    <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-text-muted mb-1.5">
      <span className="text-primary">{icon}</span>
      {label}
    </p>
    <p className="text-sm font-semibold text-secondary break-words">
      {value || "\u2014"}
    </p>
  </div>
);

export default function BookingSuccess({ booking }: { booking: AdminBooking }) {
  const router = useRouter();
  const site = useSiteData();
  const settings = site?.settings;
  const businessName = settings?.businessName || "Sai Vaishnavi Tours and Travels";
  const phoneDisplay = settings?.phoneDisplay || booking.phone;

  const waText = `Hi ${businessName}! I just booked a taxi (Booking ID: ${booking.id}) from ${booking.pickup} to ${booking.drop} on ${booking.date} at ${booking.time}. Please confirm.`;
  const waHref = whatsappHref(settings?.whatsapp || "917498462597", waText);

  const handleNewBooking = () => {
    router.push("/book");
  };

  return (
    <section className="section-padding bg-bg-alt">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="w-24 h-24 rounded-full bg-success/15 flex items-center justify-center mx-auto mb-6">
            <FiCheckCircle size={40} className="text-success" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-secondary mb-3">
            Booking Confirmed!
          </h1>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            Your taxi booking has been received and is being processed. A member
            of our team will contact you shortly to confirm your ride.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <div className="rounded-[28px] bg-white border border-border/60 shadow-[0_20px_50px_-25px_rgba(37,99,235,0.3)] overflow-hidden">
            <div className="bg-gradient-to-br from-primary to-primary-dark px-6 sm:px-8 py-6 text-white flex items-center justify-between gap-4">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-white p-0.5 border border-white/30 shadow-md shrink-0 flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={settings?.logo || "/images/logo.jpeg"}
                    alt={businessName}
                    className="w-full h-full object-contain rounded-full"
                  />
                </div>
                <div className="min-w-0">
                  <h2 className="text-xl sm:text-2xl font-bold truncate">Booking Confirmation</h2>
                  <p className="text-white/85 text-xs sm:text-sm mt-0.5 truncate">
                    {businessName} • Ref: {booking.id}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 border border-white/20 shrink-0">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-xs sm:text-sm font-bold text-amber-300 capitalize">
                  {booking.status}
                </span>
              </div>
            </div>

            <div className="p-8 sm:p-10">
              <div className="grid sm:grid-cols-2 gap-5">
                <DETAIL_ROW icon={<FiClipboard size={15} />} label="Booking ID" value={booking.id} />
                <DETAIL_ROW icon={<FiUser size={15} />} label="Customer Name" value={booking.customerName} />
                <DETAIL_ROW icon={<FiPhone size={15} />} label="Phone Number" value={booking.phone} />
                <DETAIL_ROW icon={<FiMapPin size={15} />} label="Pickup Location" value={booking.pickup} />
                <DETAIL_ROW icon={<FiMapPin size={15} />} label="Drop Location" value={booking.drop} />
                <DETAIL_ROW icon={<FiClipboard size={15} />} label="Full Pickup Address" value={booking.pickupAddress} />
                <DETAIL_ROW icon={<FiCalendar size={15} />} label="Journey Date" value={booking.date} />
                <DETAIL_ROW icon={<FiClock size={15} />} label="Journey Time" value={booking.time} />
                <DETAIL_ROW icon={<FiTruck size={15} />} label="Vehicle" value={booking.vehicle} />
                <DETAIL_ROW icon={<FiUsers size={15} />} label="Passengers" value={String(booking.passengers ?? 1)} />
                <DETAIL_ROW icon={<FiMapPin size={15} />} label="Journey Type" value={booking.tripType} />
                <DETAIL_ROW icon={<FiClipboard size={15} />} label="Special Note" value={booking.message || "No message provided"} />
                <DETAIL_ROW icon={<FiClipboard size={15} />} label="Booking Status" value={booking.status} />
                <DETAIL_ROW icon={<FiClock size={15} />} label="Created Date" value={formatDate(booking.createdAt)} />
              </div>

              <div className="mt-10 pt-8 border-t border-border/60 flex flex-col sm:flex-row gap-4">
                <a
                  href={`tel:${settings?.phone || ""}`}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-4 rounded-2xl bg-success text-white font-bold text-lg shadow-lg shadow-success/25 hover:shadow-xl hover:shadow-success/40 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <FiPhone size={20} />
                  Call Now
                </a>
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-4 rounded-2xl bg-[#25D366] text-white font-bold text-lg shadow-md shadow-[#25D366]/30 hover:bg-[#1eb858] transition-all duration-300"
                >
                  <FaWhatsapp size={20} />
                  WhatsApp Us
                </a>
              </div>

              <div className="mt-10 text-center">
                <button
                  onClick={handleNewBooking}
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl border-2 border-border text-secondary font-semibold hover:border-primary hover:text-primary transition-all duration-300"
                >
                  <FiSend size={16} />
                  Book Another Taxi
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 text-center text-sm text-text-muted"
        >
          <p>
            Have a question?{" "}
            <Link
              href="/book"
              className="text-primary font-semibold hover:underline"
            >
              modify your booking
            </Link>
            {" "}or call{" "}
            <a
              href={`tel:${settings?.phone || ""}`}
              className="text-primary font-semibold hover:underline"
            >
              {settings?.phoneDisplay || phoneDisplay}
            </a>
            . We&apos;re here to help 24/7.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
