"use client";

import { ChevronDown, Search, Sparkles, SlidersHorizontal } from "lucide-react";
import {
  CATEGORY_OPTIONS,
  COMMISSION_OPTIONS,
  PRICE_RANGE_OPTIONS,
  SORT_OPTIONS,
  type CategoryOption,
  type CommissionOption,
  type PriceRangeOption,
  type SortOption,
} from "./filters";

// Generic native <select> styled to match the app's buttons, with the
// dropdown chevron laid on top. Using a real <select> gives free keyboard
// support and the native options list you see in the screenshots.
function FilterSelect<T extends string>({
  value,
  options,
  onChange,
  className = "",
}: {
  value: T;
  options: readonly T[];
  onChange: (value: T) => void;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className="w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 py-2.5 pr-9 text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-100"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
    </div>
  );
}

type ProductsFilterBarProps = {
  totalCount: number;
  shownCount: number;
  query: string;
  onQueryChange: (value: string) => void;
  category: CategoryOption;
  onCategoryChange: (value: CategoryOption) => void;
  commission: CommissionOption;
  onCommissionChange: (value: CommissionOption) => void;
  priceRange: PriceRangeOption;
  onPriceRangeChange: (value: PriceRangeOption) => void;
  sort: SortOption;
  onSortChange: (value: SortOption) => void;
  newOnly: boolean;
  onToggleNewOnly: () => void;
};

export default function ProductsFilterBar({
  totalCount,
  shownCount,
  query,
  onQueryChange,
  category,
  onCategoryChange,
  commission,
  onCommissionChange,
  priceRange,
  onPriceRangeChange,
  sort,
  onSortChange,
  newOnly,
  onToggleNewOnly,
}: ProductsFilterBarProps) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5">
      {/* Search row */}
      <div className="flex flex-col gap-3 md:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search products..."
            className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        <button
          onClick={onToggleNewOnly}
          aria-pressed={newOnly}
          className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors ${
            newOnly
              ? "border-indigo-600 bg-indigo-50 text-indigo-600"
              : "border-gray-200 text-gray-700 hover:bg-gray-50"
          }`}
        >
          <Sparkles className="h-4 w-4" />
          New Products
        </button>

        <FilterSelect
          value={sort}
          options={SORT_OPTIONS}
          onChange={onSortChange}
          className="md:w-48"
        />
      </div>

      {/* Filter dropdown row */}
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <FilterSelect value={category} options={CATEGORY_OPTIONS} onChange={onCategoryChange} />
        <FilterSelect value={commission} options={COMMISSION_OPTIONS} onChange={onCommissionChange} />
        <FilterSelect value={priceRange} options={PRICE_RANGE_OPTIONS} onChange={onPriceRangeChange} />
      </div>

      {/* Results count */}
      <div className="mt-4 flex items-center gap-2 border-t border-gray-100 pt-4 text-sm text-gray-500">
        <SlidersHorizontal className="h-4 w-4" />
        Showing <span className="font-semibold text-gray-900">{shownCount}</span>{" "}
        of {totalCount} products
      </div>
    </div>
  );
}
