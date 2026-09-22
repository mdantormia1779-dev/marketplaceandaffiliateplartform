import { ArrowUpDown, Search } from "lucide-react";
import type { SortOption } from "../../types";
import { PAYMENT_OPTIONS, URGENCY_OPTIONS } from "../pendingConstants";
import type { PendingFilters } from "../pendingUtils";
import { FilterChipGroup } from "./FilterChipGroup";

export function PendingToolbar({
  filters,
  onChange,
}: {
  filters: PendingFilters;
  onChange: (patch: Partial<PendingFilters>) => void;
}) {
  return (
    <div className="mb-4 flex flex-col gap-3 rounded-2xl border border-slate-100 bg-white p-3 shadow-sm lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
        <FilterChipGroup
          label="Urgency"
          options={URGENCY_OPTIONS}
          value={filters.urgency}
          onChange={(urgency) => onChange({ urgency })}
        />
        <FilterChipGroup
          label="Payment"
          options={PAYMENT_OPTIONS}
          value={filters.payment}
          onChange={(payment) => onChange({ payment })}
        />
      </div>

      <div className="flex items-center gap-2">
        <div className="relative">
          <Search
            size={14}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            value={filters.query}
            onChange={(e) => onChange({ query: e.target.value })}
            placeholder="Search order, customer or product..."
            className="w-56 rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-xs text-slate-700 outline-none focus:border-indigo-400 focus:bg-white sm:w-72"
          />
        </div>

        <div className="relative">
          <ArrowUpDown
            size={14}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <select
            value={filters.sort}
            onChange={(e) => onChange({ sort: e.target.value as SortOption })}
            className="appearance-none rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-6 text-xs text-slate-700 outline-none focus:border-indigo-400"
          >
            <option value="oldest">Oldest first</option>
            <option value="newest">Newest first</option>
            <option value="amount_high">Amount: High to low</option>
            <option value="amount_low">Amount: Low to high</option>
          </select>
        </div>
      </div>
    </div>
  );
}