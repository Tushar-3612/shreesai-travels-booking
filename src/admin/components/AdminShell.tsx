"use client";

import { useState, type ReactNode } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Toaster from "./ui/Toaster";
import { logoutRequest } from "../lib/auth";
import { useRouter } from "next/navigation";
import type { AdminProfile } from "../types";

export default function AdminShell({
  profile,
  children,
}: {
  profile: AdminProfile;
  children: ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    await logoutRequest();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="adm-root flex min-h-screen bg-slate-100">
      <Sidebar
        profile={profile}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onLogout={handleLogout}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar profile={profile} onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
      <Toaster />
    </div>
  );
}
