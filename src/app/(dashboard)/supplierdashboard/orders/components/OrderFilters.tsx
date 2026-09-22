import { Search, SlidersHorizontal } from "lucide-react";
import type { SortOption } from "../types";

export function OrderFilters({
  query,
  onQueryChange,
  sort,
  onSortChange,
}: {
  query: string;
  onQueryChange: (v: string) => void;
  sort: SortOption;
  onSortChange: (v: SortOption) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <Search size={14} className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search order, customer or product..."
          className="w-56 rounded-lg border border-slate-200 bg-slate-50 py-1.5 pl-8 pr-3 text-xs text-slate-700 outline-none focus:border-indigo-400 focus:bg-white sm:w-64"
        />
      </div>

      <div className="relative">
        <SlidersHorizontal size={14} className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className="appearance-none rounded-lg border border-slate-200 bg-slate-50 py-1.5 pl-8 pr-6 text-xs text-slate-700 outline-none focus:border-indigo-400"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="amount_high">Amount: High to low</option>
          <option value="amount_low">Amount: Low to high</option>
        </select>
      </div>
    </div>
  );
}