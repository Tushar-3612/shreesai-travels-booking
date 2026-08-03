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
        <div className="h-16 flex items-center gap-3 px-5 border-b border-white/10 shrink-0">
          {profile.photoUrl ? (
            <img
              src={profile.photoUrl}
              alt={profile.name}
              className="w-9 h-9 rounded-xl object-cover"
            />
          ) : (
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 text-white font-bold text-sm flex items-center justify-center">
              {initials(profile.name)}
            </div>
          )}
          <div className="min-w-0">
            <p className="text-sm font-bold text-white truncate">{profile.name}</p>
            <p className="text-[11px] text-slate-400 truncate">{profile.email}</p>
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
