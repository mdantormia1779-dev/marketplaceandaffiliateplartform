import { Search, SlidersHorizontal, Star, Flag, EyeOff } from "lucide-react";
import { ActiveFilter, ProductFilterValue, SortOption, STAR_FILTERS } from "../types";
import { ProductFilter } from "./ProductFilter";

export function ReviewFilters({
  activeFilter,
  onFilterChange,
  productFilter,
  onProductFilterChange,
  products,
  query,
  onQueryChange,
  sort,
  onSortChange,
  unansweredCount,
  flaggedCount,
  hiddenCount,
}: {
  activeFilter: ActiveFilter;
  onFilterChange: (v: ActiveFilter) => void;
  productFilter: ProductFilterValue;
  onProductFilterChange: (v: ProductFilterValue) => void;
  products: string[];
  query: string;
  onQueryChange: (v: string) => void;
  sort: SortOption;
  onSortChange: (v: SortOption) => void;
  unansweredCount: number;
  flaggedCount: number;
  hiddenCount: number;
}) {
  const pill = (isActive: boolean, tone: "indigo" | "emerald" | "rose" | "amber" = "indigo") =>
    `rounded-full px-3 py-1.5 text-xs font-medium transition ${
      isActive
        ? tone === "rose"
          ? "bg-rose-600 text-white"
          : tone === "amber"
          ? "bg-amber-500 text-white"
          : "bg-indigo-600 text-white"
        : tone === "emerald"
        ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
        : tone === "rose"
        ? "bg-rose-50 text-rose-700 hover:bg-rose-100"
        : tone === "amber"
        ? "bg-amber-50 text-amber-700 hover:bg-amber-100"
        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
    }`;

  return (
    <div className="mb-4 flex flex-col gap-3 rounded-xl border border-slate-100 bg-white p-3 shadow-sm lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-wrap items-center gap-2">
        <button onClick={() => onFilterChange("all")} className={pill(activeFilter === "all")}>
          All
        </button>

        {STAR_FILTERS.map((star) => (
          <button
            key={star}
            onClick={() => onFilterChange(star)}
            className={`flex items-center gap-1 ${pill(activeFilter === star)}`}
          >
            {star}{" "}
            <Star
              size={11}
              className={activeFilter === star ? "fill-white text-white" : "fill-amber-400 text-amber-400"}
            />
          </button>
        ))}

        <button
          onClick={() => onFilterChange("unanswered")}
          className={pill(activeFilter === "unanswered", "emerald")}
        >
          Unanswered ({unansweredCount})
        </button>

        {flaggedCount > 0 && (
          <button
            onClick={() => onFilterChange("flagged")}
            className={`flex items-center gap-1 ${pill(activeFilter === "flagged", "rose")}`}
          >
            <Flag size={11} /> Flagged ({flaggedCount})
          </button>
        )}

        {hiddenCount > 0 && (
          <button
            onClick={() => onFilterChange("hidden")}
            className={`flex items-center gap-1 ${pill(activeFilter === "hidden", "amber")}`}
          >
            <EyeOff size={11} /> Hidden ({hiddenCount})
          </button>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <ProductFilter products={products} value={productFilter} onChange={onProductFilterChange} />

        <div className="relative">
          <Search size={14} className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search reviews..."
            className="w-44 rounded-lg border border-slate-200 bg-slate-50 py-1.5 pl-8 pr-3 text-xs text-slate-700 outline-none focus:border-indigo-400 focus:bg-white sm:w-56"
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
            <option value="highest">Highest rated</option>
            <option value="lowest">Lowest rated</option>
          </select>
        </div>
      </div>
    </div>
  );
}