import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSessionProfile } from "@/admin/lib/server/auth";
import LoginForm from "@/admin/components/auth/LoginForm";
import "@/admin/styles/admin.css";

export const metadata: Metadata = {
  title: "Admin Login | Sai Vaishnavi Tours and Travels",
  robots: "noindex, nofollow",
};

export default async function AdminLoginPage() {
  const profile = await getSessionProfile();
  if (profile) redirect("/admin/dashboard");
  return <LoginForm />;
}
