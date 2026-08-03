import type { Metadata } from "next";
import ServicesPage from "@/admin/components/services/ServicesPage";

export const metadata: Metadata = {
  title: "Services | Admin",
  robots: "noindex, nofollow",
};

export default function ServicesRoute() {
  return <ServicesPage />;
}
