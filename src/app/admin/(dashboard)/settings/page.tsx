import type { Metadata } from "next";
import SettingsPage from "@/admin/components/settings/SettingsPage";

export const metadata: Metadata = {
  title: "Website Settings | Admin",
  robots: "noindex, nofollow",
};

export default function SettingsRoute() {
  return <SettingsPage />;
}
