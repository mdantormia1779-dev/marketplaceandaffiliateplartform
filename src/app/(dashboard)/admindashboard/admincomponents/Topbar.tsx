import { Search, Zap, CircleHelp, Bell, ChevronDown } from "lucide-react";

export default function Topbar() {
  return (
    <header className="flex h-[68px] shrink-0 items-center justify-between gap-4 border-b border-slate-200 bg-white px-6">
      <div className="leading-tight">
        <h2 className="text-[17px] font-semibold text-slate-900">Dashboard</h2>
        <p className="text-xs text-slate-500">Marketplace control center</p>
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

        <div className="flex items-center gap-2 pl-1">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1fa85a] text-xs font-semibold text-white">
            AR
          </div>
          <div className="hidden leading-tight sm:block">
            <p className="text-sm font-medium text-slate-900">Ava Reyes</p>
            <p className="text-[11px] text-slate-500">Super Admin</p>
          </div>
          <ChevronDown className="h-4 w-4 text-slate-400" />
        </div>
      </div>
    </header>
  );
}