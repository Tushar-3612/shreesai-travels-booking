"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { FiLogOut } from "react-icons/fi";
import { NAV_ITEMS, NAV_SECTIONS } from "../lib/constants";
import type { AdminProfile } from "../types";
import { initials } from "../lib/utils";

export default function Sidebar({
  profile,
  open,
  onClose,
  onLogout,
}: {
  profile: AdminProfile;
  open: boolean;
  onClose: () => void;
  onLogout: () => void;
}) {
  const pathname = usePathname();

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-slate-900/50 z-[75] lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`adm-sidebar lg:translate-x-0 flex flex-col fixed lg:static inset-y-0 ${open ? "open" : ""}`}
      >
        {/* Brand Header */}
        <div className="h-16 flex items-center gap-3 px-4 border-b border-white/10 shrink-0 bg-slate-950/40">
          <img
            src="/images/logo.jpeg"
            alt="Sai Vaishnavi Tours and Travels"
            className="w-10 h-10 rounded-full object-contain bg-white p-0.5 border border-white/20 shadow-md shrink-0"
          />
          <div className="min-w-0">
            <p className="text-sm font-extrabold text-white truncate">Sai Vaishnavi</p>
            <p className="text-[10px] font-bold text-amber-400 uppercase tracking-wider truncate">Admin Portal</p>
          </div>
        </div>

        {/* User Profile Mini Bar */}
        <div className="px-4 py-2.5 border-b border-white/5 flex items-center gap-2.5 shrink-0 bg-white/[0.02]">
          {profile.photoUrl ? (
            <img
              src={profile.photoUrl}
              alt={profile.name}
              className="w-7 h-7 rounded-lg object-cover"
            />
          ) : (
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 text-white font-bold text-xs flex items-center justify-center">
              {initials(profile.name)}
            </div>
          )}
          <div className="min-w-0">
            <p className="text-xs font-semibold text-white/90 truncate">{profile.name}</p>
            <p className="text-[10px] text-slate-400 truncate">{profile.email}</p>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto adm-scroll px-3 py-4 space-y-5">
          {NAV_SECTIONS.map((section) => (
            <div key={section.key}>
              <p className="px-3 text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">
                {section.label}
              </p>
              <div className="space-y-1">
                {NAV_ITEMS.filter((item) => item.section === section.key).map(
                  (item) => {
                    const active =
                      pathname === item.href || pathname.startsWith(`${item.href}/`);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={onClose}
                        className={`adm-sidebar-link ${active ? "active" : ""}`}
                      >
                        <item.icon size={17} className="shrink-0" />
                        {item.label}
                      </Link>
                    );
                  }
                )}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-3 border-t border-white/10 shrink-0">
          <button onClick={onLogout} className="adm-sidebar-link w-full">
            <FiLogOut size={17} className="shrink-0" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
