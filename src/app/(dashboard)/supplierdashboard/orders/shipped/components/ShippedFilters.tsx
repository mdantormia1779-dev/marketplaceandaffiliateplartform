// app/(dashboard)/supplierdashboard/orders/shipped/components/ShippedFilters.tsx

import { Search, SlidersHorizontal, Truck } from "lucide-react";
import { ShippedStatusFilter, SortOption, STATUS_LABELS } from "../types";

export function ShippedFilters({
  statusFilter,
  onStatusChange,
  courierFilter,
  onCourierChange,
  couriers,
  query,
  onQueryChange,
  sort,
  onSortChange,
}: {
  statusFilter: ShippedStatusFilter;
  onStatusChange: (v: ShippedStatusFilter) => void;
  courierFilter: string | "all";
  onCourierChange: (v: string | "all") => void;
  couriers: string[];
  query: string;
  onQueryChange: (v: string) => void;
  sort: SortOption;
  onSortChange: (v: SortOption) => void;
}) {
  const statusOptions: ShippedStatusFilter[] = [
    "all",
    "shipped",
    "in_transit",
    "out_for_delivery",
    "delayed",
  ];

  const pill = (isActive: boolean) =>
    `rounded-full px-3 py-1.5 text-xs font-medium transition ${
      isActive ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
    }`;

  return (
    <div className="mb-4 flex flex-col gap-3 rounded-xl border border-slate-100 bg-white p-3 shadow-sm lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-wrap items-center gap-2">
        {statusOptions.map((status) => (
          <button
            key={status}
            onClick={() => onStatusChange(status)}
            className={pill(statusFilter === status)}
          >
            {status === "all" ? "All" : STATUS_LABELS[status]}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div className="relative">
          <Truck size={14} className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <select
            value={courierFilter}
            onChange={(e) => onCourierChange(e.target.value)}
            className="appearance-none rounded-lg border border-slate-200 bg-slate-50 py-1.5 pl-8 pr-6 text-xs text-slate-700 outline-none focus:border-indigo-400"
          >
            <option value="all">All couriers</option>
            {couriers.map((courier) => (
              <option key={courier} value={courier}>
                {courier}
              </option>
            ))}
          </select>
        </div>

        <div className="relative">
          <Search size={14} className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search order, customer, tracking ID..."
            className="w-52 rounded-lg border border-slate-200 bg-slate-50 py-1.5 pl-8 pr-3 text-xs text-slate-700 outline-none focus:border-indigo-400 focus:bg-white sm:w-64"
          />
        </div>

        <div className="relative">
          <SlidersHorizontal size={14} className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="appearance-none rounded-lg border border-slate-200 bg-slate-50 py-1.5 pl-8 pr-6 text-xs text-slate-700 outline-none focus:border-indigo-400"
          >
            <option value="newest">Newest shipped</option>
            <option value="oldest">Oldest shipped</option>
            <option value="delivery_soon">Delivery soon</option>
            <option value="amount_high">Amount: High to Low</option>
            <option value="amount_low">Amount: Low to High</option>
          </select>
        </div>
      </div>
    </div>
  );
}