"use client";

import { Search, Bell, MessageSquare, ChevronDown } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200/80 bg-white/95 px-6 py-3.5 backdrop-blur-md">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-slate-900">Sokoni</h1>
        <p className="text-xs text-slate-500 font-medium">
          All Dashboard...
        </p>
      </div>

      <div className="flex items-center gap-4">
        {/* Search Input */}
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search products, orders, customers..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2 pl-9 pr-4 text-xs text-slate-700 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        {/* Notifications & Messages */}
        <div className="flex items-center gap-2 border-r border-slate-200 pr-4">
          <button className="relative rounded-xl border border-slate-200 p-2 text-slate-600 hover:bg-slate-50 transition">
            <Bell className="h-4 w-4" />
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white">
              3
            </span>
          </button>
          <button className="rounded-xl border border-slate-200 p-2 text-slate-600 hover:bg-slate-50 transition">
            <MessageSquare className="h-4 w-4" />
          </button>
        </div>

        {/* Profile Dropdown */}
        <button className="flex items-center gap-2.5 rounded-xl p-1 hover:bg-slate-50 transition">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 font-bold text-white text-xs shadow-sm">
            AR
          </div>
          <div className="text-left hidden sm:block">
            <p className="text-xs font-bold text-slate-800 leading-tight">Ayesha Rahman</p>
            <p className="text-[11px] font-medium text-slate-400">Store Owner</p>
          </div>
          <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
        </button>
      </div>
    </header>
  );
}