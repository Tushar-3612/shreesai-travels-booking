"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FiArrowRight,
  FiBriefcase,
  FiCalendar,
  FiExternalLink,
  FiFolder,
  FiImage,
  FiPlus,
  FiSettings,
  FiStar,
  FiUpload,
} from "react-icons/fi";
import { FaCarSide } from "react-icons/fa6";
import {
  useBookings,
  useGalleryItems,
  usePackages,
  useReviews,
  useVehicles,
} from "../../lib/db";
import { fetchMediaItems } from "../../lib/api";
import StatCard from "../ui/StatCard";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import { formatDate } from "../../lib/utils";

const QUICK_ACTIONS = [
  { label: "Add Package", href: "/admin/packages", icon: FiPlus },
  { label: "View Bookings", href: "/admin/bookings", icon: FiCalendar },
  { label: "Review Requests", href: "/admin/reviews", icon: FiStar },
  { label: "Upload Media", href: "/admin/media", icon: FiUpload },
  { label: "Website Settings", href: "/admin/settings", icon: FiSettings },
  { label: "View Website", href: "/", icon: FiExternalLink, external: true },
];

const STATUS_TONE: Record<string, "green" | "amber" | "rose"> = {
  Completed: "green",
  Pending: "amber",
  Cancelled: "rose",
};

export default function DashboardPage() {
  const bookings = useBookings();
  const packages = usePackages();
  const vehicles = useVehicles();
  const reviews = useReviews();
  const gallery = useGalleryItems();
  const [mediaCount, setMediaCount] = useState(0);

  useEffect(() => {
    fetchMediaItems().then((items) => setMediaCount(items.length)).catch(() => {});
  }, []);

  const pendingBookings = bookings.items.filter((b) => b.status === "Pending");
  const pendingReviews = reviews.items.filter((r) => r.status === "pending");
  const approvedReviews = reviews.items.filter((r) => r.status === "approved");
  const recentBookings = [...bookings.items]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);
  const recentReviews = [...reviews.items]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Dashboard</h1>
          <p className="text-sm text-slate-500 mt-1">
            Overview of your car rental business
          </p>
        </div>
        <Link href="/admin/bookings" className="adm-btn adm-btn-primary">
          <FiPlus size={16} />
          New Booking
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        <StatCard
          label="Total Bookings"
          value={bookings.items.length}
          icon={FiCalendar}
          tone="blue"
          href="/admin/bookings"
          hint={`${pendingBookings.length} pending`}
        />
        <StatCard
          label="Total Packages"
          value={packages.items.length}
          icon={FiBriefcase}
          tone="purple"
          href="/admin/packages"
          hint={`${packages.items.filter((p) => p.status === "active").length} active`}
        />
        <StatCard
          label="Total Vehicles"
          value={vehicles.items.length}
          icon={FaCarSide}
          tone="green"
          href="/admin/vehicles"
          hint={`${vehicles.items.filter((v) => v.status === "available").length} available`}
        />
        <StatCard
          label="Total Reviews"
          value={reviews.items.length}
          icon={FiStar}
          tone="amber"
          href="/admin/reviews"
          hint={`${approvedReviews.length} approved`}
        />
        <StatCard
          label="Pending Reviews"
          value={pendingReviews.length}
          icon={FiStar}
          tone="rose"
          href="/admin/reviews"
          hint="Awaiting moderation"
        />
        <StatCard
          label="Gallery Images"
          value={gallery.items.length}
          icon={FiImage}
          tone="slate"
          href="/admin/gallery"
        />
        <StatCard
          label="Media Files"
          value={mediaCount}
          icon={FiFolder}
          tone="blue"
          href="/admin/media"
        />
        <StatCard
          label="Vehicles Available"
          value={vehicles.items.filter((v) => v.status === "available").length}
          icon={FaCarSide}
          tone="green"
          href="/admin/vehicles"
        />
      </div>

      <div className="grid xl:grid-cols-3 gap-6">
        <Card
          title="Recent Bookings"
          subtitle="Latest customer bookings"
          className="xl:col-span-2"
          bodyClassName="p-0"
          actions={
            <Link
              href="/admin/bookings"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700"
            >
              View all <FiArrowRight size={13} />
            </Link>
          }
        >
          <div className="overflow-x-auto adm-scroll">
            <table className="adm-tbl">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Route</th>
                  <th>Date</th>
                  <th>Vehicle</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((b) => (
                  <tr key={b.id}>
                    <td>
                      <p className="font-bold text-slate-800">{b.customerName}</p>
                      <p className="text-[11px] text-slate-400">{b.phone}</p>
                    </td>
                    <td className="max-w-[180px]">
                      <p className="truncate">{b.pickup} → {b.drop}</p>
                    </td>
                    <td className="whitespace-nowrap">
                      {b.date} at {b.time}
                    </td>
                    <td>{b.vehicle}</td>
                    <td>
                      <Badge tone={STATUS_TONE[b.status] ?? "slate"}>{b.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card
          title="Recent Reviews"
          subtitle="Latest customer feedback"
          bodyClassName="p-0"
          actions={
            <Link
              href="/admin/reviews"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700"
            >
              View all <FiArrowRight size={13} />
            </Link>
          }
        >
          <div className="divide-y divide-slate-100">
            {recentReviews.map((r) => (
              <div key={r.id} className="px-6 py-4">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <p className="text-sm font-bold text-slate-800">{r.name}</p>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-amber-500 font-bold">
                      {"★".repeat(r.rating)}
                    </span>
                    {r.featured && (
                      <span className="text-[10px] font-bold text-violet-600 bg-violet-50 px-1.5 py-0.5 rounded">FEATURED</span>
                    )}
                  </div>
                </div>
                <p className="text-[11px] text-slate-400 mb-1.5">{r.route} · {formatDate(r.date)}</p>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                  {r.text}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card
        title="Quick Actions"
        subtitle="Common admin tasks"
        bodyClassName="p-5"
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {QUICK_ACTIONS.map((action) => {
            const inner = (
              <div className="adm-card p-4 text-center hover:border-blue-300 hover:shadow-md transition-all duration-200">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-2.5">
                  <action.icon size={18} />
                </div>
                <p className="text-xs font-bold text-slate-700">{action.label}</p>
              </div>
            );
            return action.external ? (
              <a key={action.label} href={action.href} target="_blank" rel="noopener noreferrer">
                {inner}
              </a>
            ) : (
              <Link key={action.label} href={action.href}>
                {inner}
              </Link>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
