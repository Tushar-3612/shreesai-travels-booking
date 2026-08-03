import type { Metadata } from "next";
import PackagesPage from "@/admin/components/packages/PackagesPage";

export const metadata: Metadata = {
  title: "Packages | Admin",
  robots: "noindex, nofollow",
};

export default function PackagesRoute() {
  return <PackagesPage />;
}
