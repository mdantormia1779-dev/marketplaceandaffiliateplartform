"use client";

import { Bell, ChevronDown, MessageSquare, Search } from "lucide-react";

export default function TopBar({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <header className="flex items-center justify-between gap-4 border-b border-slate-200 bg-white px-8 py-3">
      <div>
        <h1 className="text-[15px] font-semibold leading-tight text-slate-900">{title}</h1>
        <p className="mt-0.5 text-[11px] text-slate-500">{subtitle}</p>
      </div>

      <div className="flex items-center gap-5">
        <div className="relative hidden w-[240px] md:block">
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

        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-[11px] font-semibold text-white">
            AR
          </div>
          <div className="hidden leading-tight sm:block">
            <p className="text-[12px] font-medium text-slate-900">Ayesha Rahman</p>
            <p className="text-[10px] text-slate-500">Store Owner</p>
          </div>
          <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
        </div>
      </div>
    </header>
  );
}