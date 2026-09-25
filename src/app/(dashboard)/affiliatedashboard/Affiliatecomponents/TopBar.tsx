"use client";

import { useEffect, useState, useRef } from "react";
import {
  Search,
  HelpCircle,
  Bell,
  Wallet,
  ChevronDown,
  Menu,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import {
  AuthUser,
  getAuthUser,
  clearAuthUser,
  getInitials,
  AUTH_EVENT,
} from "../../../../lib/auth";

const defaultUser: AuthUser = {
  name: "Debraz",
  email: "debraz@marketplace.com",
  role: "affiliate",
};

type TopBarProps = {
  onMenuClick?: () => void;
};

export default function TopBar({ onMenuClick }: TopBarProps) {
  const [profile, setProfile] = useState<AuthUser>(defaultUser);
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    const loadProfile = () => {
      try {
        const savedUser = getAuthUser();
        if (!cancelled) {
          if (savedUser) {
            setProfile(savedUser);
          }
          setMounted(true);
        }
      } catch {
        if (!cancelled) {
          setMounted(true);
        }
      }
    };

    const timer = window.setTimeout(loadProfile, 0);

    const handleAuthUpdate = () => {
      const savedUser = getAuthUser();
      if (savedUser) {
        setProfile(savedUser);
      } else {
        setProfile(defaultUser);
      }
    };

    window.addEventListener(AUTH_EVENT, handleAuthUpdate);
    window.addEventListener("storage", handleAuthUpdate);

    // Close dropdown on outside click
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      window.removeEventListener(AUTH_EVENT, handleAuthUpdate);
      window.removeEventListener("storage", handleAuthUpdate);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const initials = mounted ? getInitials(profile.name) : "D";
  const displayName = mounted ? profile.name : defaultUser.name;
  const displayEmail = mounted ? profile.email : defaultUser.email;

  const handleLogout = () => {
    clearAuthUser();
    setMenuOpen(false);
    window.location.href = "/login";
  };

  return (
    <header className="flex flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8 lg:py-5 bg-white border-b border-gray-100 relative z-30">
      {/* Left Section */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 lg:hidden hover:bg-gray-50"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div>
          <h1 className="text-lg font-semibold text-gray-900 sm:text-xl">
            Analytics
          </h1>
          <p className="hidden text-sm text-gray-500 sm:block">
            Hi, {displayName} 👋 Ready to grow your affiliate earnings?
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex flex-1 items-center justify-end gap-2 sm:gap-3">
        {/* Desktop Search */}
        <div className="relative hidden w-full max-w-md sm:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search products, links, campaigns..."
            className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        {/* Mobile Search Button */}
        <button 
          onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 sm:hidden"
        >
          <Search className="h-[18px] w-[18px]" />
        </button>

        {/* Help Icon */}
        <button className="hidden h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 sm:flex">
          <HelpCircle className="h-[18px] w-[18px]" />
        </button>

        {/* Notifications */}
        <button className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-200 sm:border-0 sm:bg-indigo-600 sm:text-white text-gray-600 hover:bg-gray-50 sm:hover:bg-indigo-700">
          <Bell className="h-[18px] w-[18px]" />
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-semibold text-white">
            5
          </span>
        </button>

        {/* Wallet Widget */}
        <div className="hidden items-center gap-2 rounded-xl border border-gray-200 px-3 py-2 md:flex bg-white">
          <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
            <Wallet className="h-4 w-4" />
          </div>
          <div className="leading-tight">
            <p className="text-[10px] font-medium tracking-wide text-gray-400">
              WALLET
            </p>
            <p className="text-sm font-semibold text-gray-900">৳42,680</p>
          </div>
        </div>

        {/* Profile Dropdown Menu */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2 rounded-xl px-2 py-1.5 hover:bg-gray-50 transition"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white shadow-sm">
              {initials}
            </div>
            <div className="hidden text-left leading-tight sm:block">
              <p className="text-sm font-semibold text-gray-900">{displayName}</p>
              <p className="text-xs text-emerald-600 font-medium">Gold Partner</p>
            </div>
            <ChevronDown
              className={`hidden h-4 w-4 text-gray-400 transition-transform sm:block ${
                menuOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown Content */}
          {menuOpen && (
            <div className="absolute right-0 top-12 z-50 w-60 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
              <div className="border-b border-slate-100 px-4 py-3.5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
                    {initials}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-800">
                      {displayName}
                    </p>
                    <p className="truncate text-xs text-slate-400 mb-1">
                      {displayEmail}
                    </p>
                    <span className="inline-block rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-600 uppercase tracking-wide">
                      Gold Partner
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-1.5">
                <button
                  type="button"
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-700 transition hover:bg-slate-50"
                  onClick={() => setMenuOpen(false)}
                >
                  <User size={16} className="text-slate-400" />
                  Affiliate Profile
                </button>

                <button
                  type="button"
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-700 transition hover:bg-slate-50"
                  onClick={() => setMenuOpen(false)}
                >
                  <Settings size={16} className="text-slate-400" />
                  Settings
                </button>

                <div className="my-1 border-t border-slate-100" />

                <button
                  type="button"
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-rose-600 transition hover:bg-rose-50 font-semibold"
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

      {/* Mobile Search Input expansion */}
      {mobileSearchOpen && (
        <div className="w-full pt-2 pb-1 sm:hidden">
          <div className="relative w-full">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              autoFocus
              type="text"
              placeholder="Search products, links..."
              className="w-full rounded-xl border border-gray-200 bg-white py-2 pl-9 pr-4 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-100"
            />
          </div>
        </div>
      )}
    </header>
  );
}