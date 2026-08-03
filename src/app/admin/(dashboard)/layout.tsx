import { requireAdminPage } from "@/admin/lib/server/auth";
import AdminShell from "@/admin/components/AdminShell";
import "@/admin/styles/admin.css";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await requireAdminPage();
  return <AdminShell profile={profile}>{children}</AdminShell>;
}
