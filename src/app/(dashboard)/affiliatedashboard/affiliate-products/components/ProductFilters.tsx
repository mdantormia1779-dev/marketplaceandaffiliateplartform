"use client";

import { Search, Sparkles, SlidersHorizontal, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ProductFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  selectedCommission: string;
  onCommissionChange: (value: string) => void;
  selectedPrice: string;
  onPriceChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  isNewOnly: boolean;
  onToggleNewOnly: () => void;
  totalCount: number;
  filteredCount: number;
}

export default function ProductFilters({
  search,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedCommission,
  onCommissionChange,
  selectedPrice,
  onPriceChange,
  sortBy,
  onSortChange,
  isNewOnly,
  onToggleNewOnly,
  totalCount,
  filteredCount,
}: ProductFiltersProps) {
  return (
    <div className="mb-6 w-full rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
      {/* Top Search & Actions Row */}
      <div className="flex flex-col gap-3.5 md:flex-row md:items-center">
        {/* Search Input Box */}
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 stroke-[1.8]" />
          <Input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search products..."
            className="h-11 w-full rounded-xl border-[#e5e7eb] bg-[#f8fafc] pl-10 text-xs text-slate-800 placeholder:text-slate-400 focus-visible:bg-white focus-visible:border-slate-300 focus-visible:ring-1 focus-visible:ring-slate-300"
          />
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* New Products Filter Toggle Button */}
          <Button
            type="button"
            onClick={onToggleNewOnly}
            className={`h-11 gap-2 rounded-xl px-4 text-xs font-semibold shadow-none transition-all ${
              isNewOnly
                ? "border border-[#3b66f5] bg-blue-50 text-[#3b66f5] hover:bg-blue-100"
                : "border border-[#e5e7eb] bg-white text-slate-700 hover:bg-slate-50"
            }`}
          >
            <Sparkles
              className={`h-4 w-4 stroke-[1.8] ${
                isNewOnly ? "text-[#3b66f5]" : "text-slate-500"
              }`}
            />
            New Products
          </Button>

          {/* Popularity Dropdown - Click/Focus korle blue border hobe */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="h-11 w-[140px] appearance-none rounded-xl border border-[#e5e7eb] bg-white px-3.5 pr-8 text-xs font-medium text-slate-800 outline-none transition-all cursor-pointer focus:border-[#3b66f5] focus:shadow-[0_0_0_1px_rgba(59,102,245,0.25)]"
            >
              <option value="popularity">Popularity</option>
              <option value="rating">Rating</option>
              <option value="commission">Commission</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400 stroke-[2]" />
          </div>
        </div>
      </div>

      {/* 3-ti Wide Filter Row */}
      <div className="mt-3.5 grid w-full grid-cols-1 gap-3 sm:grid-cols-3">
        {/* Category Filter */}
        <div className="relative w-full">
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="h-11 w-full appearance-none rounded-xl border border-[#e5e7eb] bg-white px-4 pr-9 text-xs text-slate-700 outline-none transition-all focus:border-[#3b66f5] focus:shadow-[0_0_0_1px_rgba(59,102,245,0.25)] cursor-pointer"
          >
            <option value="all">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Wearables">Wearables</option>
            <option value="Home & Kitchen">Home & Kitchen</option>
            <option value="Sports">Sports</option>
            <option value="Fashion">Fashion</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 stroke-[2]" />
        </div>

        {/* Commission Filter */}
        <div className="relative w-full">
          <select
            value={selectedCommission}
            onChange={(e) => onCommissionChange(e.target.value)}
            className="h-11 w-full appearance-none rounded-xl border border-[#e5e7eb] bg-white px-4 pr-9 text-xs text-slate-700 outline-none transition-all focus:border-[#3b66f5] focus:shadow-[0_0_0_1px_rgba(59,102,245,0.25)] cursor-pointer"
          >
            <option value="all">Commission Rate (All)</option>
            <option value="10">10% and above</option>
            <option value="15">15% and above</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 stroke-[2]" />
        </div>

        {/* Price Filter */}
        <div className="relative w-full">
          <select
            value={selectedPrice}
            onChange={(e) => onPriceChange(e.target.value)}
            className="h-11 w-full appearance-none rounded-xl border border-[#e5e7eb] bg-white px-4 pr-9 text-xs text-slate-700 outline-none transition-all focus:border-[#3b66f5] focus:shadow-[0_0_0_1px_rgba(59,102,245,0.25)] cursor-pointer"
          >
            <option value="all">Price Range (All)</option>
            <option value="0-1000">৳0 - ৳1,000</option>
            <option value="1000-3000">৳1,000 - ৳3,000</option>
            <option value="3000+">৳3,000+</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 stroke-[2]" />
        </div>
      </div>

      {/* Showing Result Counter Bar */}
      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3.5 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-3.5 w-3.5 stroke-[1.8] text-slate-400" />
          <span>
            Showing <span className="font-semibold text-slate-800">{filteredCount}</span> of{" "}
            {totalCount} products
          </span>
        </div>
      </div>
    </div>
  );
}