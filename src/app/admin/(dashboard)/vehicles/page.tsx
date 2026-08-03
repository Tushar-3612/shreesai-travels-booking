import type { Metadata } from "next";
import VehiclesPage from "@/admin/components/vehicles/VehiclesPage";

export const metadata: Metadata = {
  title: "Vehicles | Admin",
  robots: "noindex, nofollow",
};

export default function VehiclesRoute() {
  return <VehiclesPage />;
}
