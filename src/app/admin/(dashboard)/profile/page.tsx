import type { Metadata } from "next";
import ProfilePage from "@/admin/components/profile/ProfilePage";

export const metadata: Metadata = {
  title: "Profile | Admin",
  robots: "noindex, nofollow",
};

export default function ProfileRoute() {
  return <ProfilePage />;
}
