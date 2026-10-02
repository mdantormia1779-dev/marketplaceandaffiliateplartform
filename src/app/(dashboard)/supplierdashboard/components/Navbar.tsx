"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Bell,
  ChevronDown,
  Menu,
  Search,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import { getAuthUser, clearAuthUser, getInitials, AUTH_EVENT } from "@/lib/auth";

// Onno file (ProfileSettings) eta import kore, tai export rakhlam
export type ProfileData = {
  name: string;
  email: string;
  phone: string;
  storeName: string;
};

const PROFILE_KEY = "supplier-profile";
const PROFILE_EVENT = "supplier-profile-updated";

// Login-er user ke base kore, Settings-e edit kora data (thakle) oporer e boshe
function loadProfile(): ProfileData | null {
  const auth = getAuthUser();
  if (!auth) return null; // login kora nai

  let saved: Partial<ProfileData> = {};
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (raw) saved = JSON.parse(raw);
  } catch {
    // vul data hole ignore
  }

  return {
    name: saved.name || auth.name,
    email: saved.email || auth.email,
    phone: saved.phone || "",
    storeName: saved.storeName || "",
  };
}

export default function Navbar() {
  const router = useRouter();

  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const load = () => setProfile(loadProfile());
    load();

    // Settings theke profile update hole
    const handleProfileUpdate = (event: Event) => {
      const detail = (event as CustomEvent<Partial<ProfileData>>).detail;
      if (detail) {
        setProfile((prev) => (prev ? { ...prev, ...detail } : prev));
      } else {
        load();
      }
    };

    // Bairer e click korle dropdown bondho
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    window.addEventListener(AUTH_EVENT, load);
    window.addEventListener("storage", load);
    window.addEventListener(PROFILE_EVENT, handleProfileUpdate);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener(AUTH_EVENT, load);
      window.removeEventListener("storage", load);
      window.removeEventListener(PROFILE_EVENT, handleProfileUpdate);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const displayName = profile?.name || "Guest";
  const displayEmail = profile?.email || "";
  const initials = profile ? getInitials(profile.name) : "G";

  const goToSettings = () => {
    setMenuOpen(false);
    router.push("/supplierdashboard/account/settings");
  };

  // Logout: login data ar saved profile duto-i muche login page e niye jay
  const handleLogout = () => {
    setMenuOpen(false);
    clearAuthUser();
    try {
      localStorage.removeItem(PROFILE_KEY);
    } catch {
      // ignore
    }
    window.location.href = "/login";
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* =========================
            LEFT SIDE
        ========================== */}
        <div className="flex items-center gap-3">

          {/* Mobile Menu */}
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 lg:hidden"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>

          {/* Page / Dashboard title */}
          <div>
            <h1 className="text-base font-semibold text-slate-900">
              Supplier Dashboard
            </h1>

            <p className="hidden text-xs text-slate-400 sm:block">
              Manage your store and sales
            </p>
          </div>
        </div>

        {/* =========================
            RIGHT SIDE
        ========================== */}
        <div className="flex items-center gap-2 sm:gap-3">

          {/* Search */}
          <div className="hidden md:block">
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                placeholder="Search..."
                className="h-9 w-52 rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-xs text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#315be7] focus:bg-white focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          {/* Mobile Search */}
          <button
            type="button"
            onClick={() => setMobileSearchOpen((value) => !value)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 md:hidden"
            aria-label="Search"
          >
            <Search size={18} />
          </button>

          {/* Notifications */}
          <button
            type="button"
            className="relative flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
            aria-label="Notifications"
          >
            <Bell size={18} />

            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
          </button>

          {/* Divider */}
          <div className="hidden h-7 w-px bg-slate-200 sm:block" />

          {/* =========================
              PROFILE MENU
          ========================== */}
          <div className="relative" ref={dropdownRef}>

            <button
              type="button"
              onClick={() => setMenuOpen((value) => !value)}
              className="flex items-center gap-2 rounded-xl px-1.5 py-1.5 transition hover:bg-slate-50"
              aria-expanded={menuOpen}
              aria-label="Open profile menu"
            >

              {/* Avatar */}
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white shadow-sm">
                {initials}
              </div>

              {/* User information */}
              <div className="hidden text-left sm:block">
                <p className="max-w-[140px] truncate text-xs font-semibold text-slate-800">
                  {displayName}
                </p>

                <p className="max-w-[140px] truncate text-[10px] text-slate-400">
                  {displayEmail}
                </p>
              </div>

              <ChevronDown
                size={15}
                className={`hidden text-slate-400 transition-transform sm:block ${
                  menuOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown */}
            {menuOpen && (
              <div className="absolute right-0 top-12 z-50 w-56 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">

                {/* Profile header */}
                <div className="border-b border-slate-100 px-4 py-3">
                  <div className="flex items-center gap-3">

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
                      {initials}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-800">
                        {displayName}
                      </p>

                      <p className="truncate text-xs text-slate-400">
                        {displayEmail}
                      </p>
                    </div>

                  </div>
                </div>

                {/* Menu items */}
                <div className="p-1.5">

                  <button
                    type="button"
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-700 transition hover:bg-slate-50"
                    onClick={goToSettings}
                  >
                    <User size={16} className="text-slate-400" />
                    Profile
                  </button>

                  <button
                    type="button"
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-700 transition hover:bg-slate-50"
                    onClick={goToSettings}
                  >
                    <Settings size={16} className="text-slate-400" />
                    Settings
                  </button>

                  <div className="my-1 border-t border-slate-100" />

                  <button
                    type="button"
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-rose-600 transition hover:bg-rose-50"
                    onClick={handleLogout}
                  >
                    <LogOut size={16} />
                    Logout
                  </button>

                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* =========================
          MOBILE SEARCH
      ========================== */}
      {mobileSearchOpen && (
        <div className="border-t border-slate-100 bg-white px-4 py-3 md:hidden">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              autoFocus
              type="text"
              placeholder="Search..."
              className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#315be7] focus:bg-white focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>
      )}
    </header>
  );
}