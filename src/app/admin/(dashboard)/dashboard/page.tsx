import type { Metadata } from "next";
import DashboardPage from "@/admin/components/dashboard/DashboardPage";

export const metadata: Metadata = {
  title: "Dashboard | Admin",
  robots: "noindex, nofollow",
};

export default function DashboardRoute() {
  return <DashboardPage />;
}
