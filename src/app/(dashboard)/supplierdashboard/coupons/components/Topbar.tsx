import { Bell, ChevronDown, MessageSquare, Search } from "lucide-react";

interface TopbarProps {
  title: string;
  subtitle: string;
  notificationCount?: number;
  storeName?: string;
  storeRole?: string;
}

export default function Topbar({
  title,
  subtitle,
  notificationCount = 0,
  storeName = "Ayesha Rahman",
  storeRole = "Store Owner",
}: TopbarProps) {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="flex flex-wrap items-center gap-4 px-6 py-4">
        <div className="mr-auto">
          <h1 className="text-xl font-semibold tracking-tight text-slate-900">{title}</h1>
          <p className="mt-0.5 text-sm text-slate-500">{subtitle}</p>
        </div>

        <div className="relative hidden w-80 md:block">
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
          {notificationCount > 0 && (
            <span className="absolute right-1 top-1 grid h-4 w-4 place-items-center rounded-full bg-rose-500 text-[10px] font-semibold text-white">
              {notificationCount}
            </span>
          )}
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
            {storeName
              .split(" ")
              .slice(0, 2)
              .map((w) => w[0])
              .join("")
              .toUpperCase()}
          </span>
          <div className="hidden leading-tight sm:block">
            <p className="text-sm font-medium text-slate-900">{storeName}</p>
            <p className="text-xs text-slate-500">{storeRole}</p>
          </div>
          <ChevronDown className="h-4 w-4 text-slate-400" />
        </div>
      </div>
    </header>
  );
}