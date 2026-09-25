import {
  Search,
  HelpCircle,
  Bell,
  Wallet,
  ChevronDown,
  Menu,
} from "lucide-react";

type TopBarProps = {
  onMenuClick?: () => void;
};

export default function TopBar({ onMenuClick }: TopBarProps) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8 lg:py-5">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div>
          <h1 className="text-lg font-semibold text-gray-900 sm:text-xl">
            Dashboard
          </h1>
          <p className="hidden text-sm text-gray-500 sm:block">
            Hi, Debraz 👋 Ready to grow your affiliate earnings?
          </p>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-end gap-2 sm:gap-3">
        <div className="relative hidden w-full max-w-md sm:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search products, links, campaigns..."
            className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        <button className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 sm:hidden">
          <Search className="h-[18px] w-[18px]" />
        </button>

        <button className="hidden h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 sm:flex">
          <HelpCircle className="h-[18px] w-[18px]" />
        </button>

        <button className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-white">
          <Bell className="h-[18px] w-[18px]" />
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-semibold">
            5
          </span>
        </button>

        <div className="hidden items-center gap-2 rounded-xl border border-gray-200 px-3 py-2 md:flex">
          <Wallet className="h-4 w-4 text-gray-500" />
          <div className="leading-tight">
            <p className="text-[10px] font-medium tracking-wide text-gray-400">
              WALLET
            </p>
            <p className="text-sm font-semibold text-gray-900">৳42,680</p>
          </div>
        </div>

        <button className="flex shrink-0 items-center gap-2 rounded-xl px-1 py-1 hover:bg-gray-50">
          <img
            src="https://i.pravatar.cc/64?img=12"
            alt="Debraz"
            className="h-9 w-9 rounded-full object-cover"
          />
          <div className="hidden text-left leading-tight sm:block">
            <p className="text-sm font-semibold text-gray-900">Debraz</p>
            <p className="text-xs text-gray-400">Gold Partner</p>
          </div>
          <ChevronDown className="hidden h-4 w-4 text-gray-400 sm:block" />
        </button>
      </div>
    </header>
  );
}