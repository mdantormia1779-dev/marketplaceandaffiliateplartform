"use client";

import { useEffect, useRef, useState } from "react";
import { Bell, ChevronDown, LogOut, MessageSquare, Search, Settings, User } from "lucide-react";
import { AuthUser, getAuthUser, clearAuthUser, getInitials, AUTH_EVENT } from "@/lib/auth";

// Role onujayi label ar rong. Supplier hole "Store Owner" dekhabe
const ROLE_META: Record<string, { label: string; badge: string }> = {
  supplier:  { label: "Store Owner", badge: "bg-purple-50 text-purple-600" },
  affiliate: { label: "Affiliate",   badge: "bg-emerald-50 text-emerald-600" },
  admin:     { label: "Admin",       badge: "bg-rose-50 text-rose-600" },
  customer:  { label: "Customer",    badge: "bg-blue-50 text-blue-600" },
};

export default function TopBar({ title, subtitle }: { title: string; subtitle: string }) {
  const [user, setUser] = useState<AuthUser | null>(null); // null = login kora nai
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Login kora user ke pore ni, ar login/logout hole abar load kori
    const load = () => setUser(getAuthUser());
    load();

    window.addEventListener(AUTH_EVENT, load);
    window.addEventListener("storage", load);

    // Bairer e click korle dropdown bondho
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener(AUTH_EVENT, load);
      window.removeEventListener("storage", load);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const displayName = user?.name || "Guest";
  const displayEmail = user?.email || "";
  const initials = user ? getInitials(user.name) : "G";
  const role = ROLE_META[user?.role ?? ""] ?? { label: "Guest", badge: "bg-slate-100 text-slate-500" };

  const handleLogout = () => {
    clearAuthUser();
    setMenuOpen(false);
    window.location.href = "/login";
  };

  return (
    <header className="relative z-30 flex items-center justify-between gap-4 border-b border-slate-200 bg-white px-8 py-3">
      <div>
        <h1 className="text-[15px] font-semibold leading-tight text-slate-900">{title}</h1>
        <p className="mt-0.5 text-[11px] text-slate-500">{subtitle}</p>
      </div>

      <div className="flex items-center gap-5">
        <div className="relative hidden w-60 md:block">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search products, orders, customers…"
            className="h-9 w-full rounded-md border border-slate-200 bg-slate-50 pl-9 pr-3 text-[12px] outline-none placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <button className="relative text-slate-500 hover:text-slate-800" aria-label="Notifications">
          <Bell className="h-4 w-4" />
          <span className="absolute -right-1.5 -top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-red-500 text-[8px] font-semibold text-white">
            3
          </span>
        </button>

        <button className="text-slate-500 hover:text-slate-800" aria-label="Messages">
          <MessageSquare className="h-4 w-4" />
        </button>

        {/* Profile + Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2.5 rounded-lg px-1.5 py-1 transition hover:bg-slate-50"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-[11px] font-semibold text-white">
              {initials}
            </div>
            <div className="hidden text-left leading-tight sm:block">
              <p className="max-w-[140px] truncate text-[12px] font-medium text-slate-900">{displayName}</p>
              <p className="text-[10px] text-slate-500">{role.label}</p>
            </div>
            <ChevronDown
              className={`h-3.5 w-3.5 text-slate-400 transition-transform ${menuOpen ? "rotate-180" : ""}`}
            />
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-11 z-50 w-60 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
              <div className="border-b border-slate-100 px-4 py-3.5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                    {initials}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-800">{displayName}</p>
                    <p className="mb-1 truncate text-xs text-slate-400">{displayEmail}</p>
                    <span
                      className={`inline-block rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${role.badge}`}
                    >
                      {role.label}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-1.5">
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-700 transition hover:bg-slate-50"
                >
                  <User size={16} className="text-slate-400" />
                  Store Profile
                </button>

                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-700 transition hover:bg-slate-50"
                >
                  <Settings size={16} className="text-slate-400" />
                  Settings
                </button>

                <div className="my-1 border-t border-slate-100" />

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-rose-600 transition hover:bg-rose-50"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}