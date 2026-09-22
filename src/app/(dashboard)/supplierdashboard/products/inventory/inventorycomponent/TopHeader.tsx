import { Bell, ChevronDown, MessageSquare, Search } from "lucide-react";

export default function TopHeader({ alertCount }: { alertCount: number }) {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="flex flex-wrap items-center gap-4 px-6 py-3">
        <div className="mr-auto">
          <h1 className="text-base font-semibold tracking-tight">Inventory</h1>
          <p className="text-xs text-slate-500">Track stock levels and restock alerts.</p>
        </div>

        <div className="relative hidden w-72 md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            placeholder="Search products, orders, customers..."
            className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        <button
          type="button"
          className="relative rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-1 top-1 grid h-4 w-4 place-items-center rounded-full bg-rose-500 text-[10px] font-semibold text-white">
            {alertCount}
          </span>
        </button>
        <button
          type="button"
          className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
          aria-label="Messages"
        >
          <MessageSquare className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2 pl-2">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-blue-600 text-xs font-semibold text-white">
            AR
          </span>
          <div className="hidden leading-tight sm:block">
            <p className="text-sm font-medium">Ayesha Rahman</p>
            <p className="text-xs text-slate-500">Store Owner</p>
          </div>
          <ChevronDown className="h-4 w-4 text-slate-400" />
        </div>
      </div>
    </header>
  );
}