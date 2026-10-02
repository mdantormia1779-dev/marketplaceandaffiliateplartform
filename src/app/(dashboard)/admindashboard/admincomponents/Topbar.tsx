'use client';

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, Zap, CircleHelp, Bell, ChevronDown, User, Settings, LogOut, Menu } from "lucide-react";
import { getAuthUser, clearAuthUser } from "@/lib/auth"; 

interface TopbarProps {
  title?: string;
  subtitle?: string;
  onMenuClick?: () => void;
}

// Login e save kora user er shape
interface AuthUser {
  name: string;
  email: string;
  role: string;
}

// role -> dekhanor naam
const ROLE_LABELS: Record<string, string> = {
  admin: "Admin",
  supplier: "Supplier",
  affiliate: "Affiliate",
  customer: "Customer",
};


const getInitials = (name: string) => {
  const words = name.trim().split(/\s+/);
  const letters = words.length > 1 ? words[0][0] + words[1][0] : name.slice(0, 2);
  return letters.toUpperCase();
};

export default function Topbar({
  title = "Dashboard",
  subtitle = "Marketplace control center",
  onMenuClick,
}: TopbarProps) {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Login kora user ke localStorage theke pore ni (useEffect e, jate hydration error na hoy)
  useEffect(() => {
    setUser(getAuthUser());
  }, []);

  // Click outside korle dropdown bondho hoye jabe
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Sign out: saved user muche login page e niye jay
  const handleSignOut = () => {
    setDropdownOpen(false);
    clearAuthUser();
    router.push("/login");
  };

  // user load howar age / na thakle fallback
  const displayName = user?.name || "Admin";
  const displayEmail = user?.email || "";
  const displayRole = ROLE_LABELS[user?.role ?? "admin"] ?? "Admin";

  return (
    <header className="flex h-[68px] shrink-0 items-center justify-between gap-4 border-b border-slate-200 bg-white px-6 relative">
      <div className="flex items-center gap-3">
        {/* Hamburger: sudhu mobile/tablet e dekhabe (lg theke desktop e hidden) */}
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open menu"
          className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 lg:hidden"
        >
          <Menu className="h-6 w-6" />
        </button>

        <div className="leading-tight">
          <h2 className="text-[17px] font-semibold text-slate-900">{title}</h2>
          <p className="text-xs text-slate-500">{subtitle}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <label className="hidden w-80 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 md:flex">
          <Search className="h-4 w-4 text-slate-400" />
          <input
            placeholder="Search orders, products, users..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
          />
        </label>

        <button className="flex items-center gap-2 rounded-lg bg-[#1fa85a] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#189a50]">
          <Zap className="h-4 w-4" />
          Quick Actions
        </button>

        <button aria-label="Help" className="rounded-full p-2 text-slate-600 hover:bg-slate-100">
          <CircleHelp className="h-5 w-5" />
        </button>
        <button aria-label="Notifications" className="relative rounded-full p-2 text-slate-600 hover:bg-slate-100">
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-orange-400" />
        </button>

        {/* Profile & Dropdown Section */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 pl-1 cursor-pointer select-none group focus:outline-none"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1fa85a] text-xs font-semibold text-white">
              {getInitials(displayName)}
            </div>
            <div className="hidden leading-tight text-left sm:block">
              <p className="text-sm font-medium text-slate-900 group-hover:text-[#1fa85a]">{displayName}</p>
              <p className="text-[11px] text-slate-500">{displayRole}</p>
            </div>
            <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-60 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl z-50 animate-in fade-in slide-in-from-top-2">
              {/* Login kora user er nam ar email */}
              <div className="px-3 py-2.5">
                <p className="truncate text-sm font-semibold text-slate-900">{displayName}</p>
                <p className="truncate text-xs text-slate-500">{displayEmail}</p>
              </div>

              <div className="my-1.5 border-t border-slate-100"></div>

              <div className="space-y-1">
                <button
                  onClick={() => { setDropdownOpen(false); alert("Navigate to My Profile"); }}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-medium text-slate-700 hover:bg-slate-50 transition"
                >
                  <User className="h-4 w-4 text-slate-500" />
                  My profile
                </button>

                <button
                  onClick={() => { setDropdownOpen(false); alert("Navigate to Settings"); }}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-medium text-slate-700 hover:bg-slate-50 transition"
                >
                  <Settings className="h-4 w-4 text-slate-500" />
                  Settings
                </button>
              </div>

              <div className="my-1.5 border-t border-slate-100"></div>

              <button
                onClick={handleSignOut}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-medium text-amber-700 hover:bg-amber-50 transition"
              >
                <LogOut className="h-4 w-4 text-amber-600" />
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}