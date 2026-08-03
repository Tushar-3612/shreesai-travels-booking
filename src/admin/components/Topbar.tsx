"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiChevronDown, FiExternalLink, FiLogOut, FiMenu, FiUser } from "react-icons/fi";
import { NAV_ITEMS } from "../lib/constants";
import type { AdminProfile } from "../types";
import { logoutRequest } from "../lib/auth";
import { initials } from "../lib/utils";
import { toast } from "../lib/toast";

export default function Topbar({
  profile,
  onMenuClick,
}: {
  profile: AdminProfile;
  onMenuClick: () => void;
}) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const pathname = typeof window !== "undefined" ? window.location.pathname : "";
  const current = NAV_ITEMS.find((item) => item.href === pathname);

  const handleLogout = async () => {
    setMenuOpen(false);
    await logoutRequest();
    toast("Logged out successfully", "info");
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between gap-3 px-4 sm:px-6 sticky top-0 z-40">
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onMenuClick}
          className="adm-icon-btn lg:hidden shrink-0"
          aria-label="Toggle sidebar"
        >
          <FiMenu size={17} />
        </button>
        <h2 className="text-sm sm:text-base font-bold text-slate-800 truncate">
          {current?.label ?? "Admin Panel"}
        </h2>
      </div>

      <div className="flex items-center gap-2.5">
        <Link
          href="/"
          target="_blank"
          className="hidden sm:inline-flex adm-btn adm-btn-outline adm-btn-sm"
        >
          <FiExternalLink size={14} />
          View Website
        </Link>
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl hover:bg-slate-50 transition-colors"
          >
            {profile.photoUrl ? (
              <img
                src={profile.photoUrl}
                alt={profile.name}
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-white text-xs font-bold flex items-center justify-center">
                {initials(profile.name)}
              </div>
            )}
            <FiChevronDown size={14} className="text-slate-400" />
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-900/10 py-2">
              <div className="px-4 py-2.5 border-b border-slate-100 mb-1">
                <p className="text-sm font-bold text-slate-800 truncate">
                  {profile.name}
                </p>
                <p className="text-[11px] text-slate-400 truncate">{profile.email}</p>
              </div>
              <Link
                href="/admin/profile"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors"
              >
                <FiUser size={15} />
                My Profile
              </Link>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
              >
                <FiLogOut size={15} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
