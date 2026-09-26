"use client";

import { Search } from "lucide-react";
import DropdownSelect from "./DropdownSelect";
import type { StatusFilter, SortOption } from "./types";

const STATUS_OPTIONS: { label: string; value: StatusFilter }[] = [
  { label: "All Statuses", value: "All" },
  { label: "Active", value: "Active" },
  { label: "Paused", value: "Paused" },
  { label: "Expired", value: "Expired" },
];

const SORT_OPTIONS: { label: string; value: SortOption }[] = [
  { label: "Newest First", value: "newest" },
  { label: "Oldest First", value: "oldest" },
  { label: "Most Clicks", value: "mostClicks" },
  { label: "Highest Commission", value: "highestCommission" },
];

type LinksFilterBarProps = {
  totalCount: number;
  shownCount: number;
  statusFilter: StatusFilter;
  onStatusFilterChange: (value: StatusFilter) => void;
  sortOption: SortOption;
  onSortOptionChange: (value: SortOption) => void;
  searchQuery: string;
  onSearchQueryChange: (value: string) => void;
};

export default function LinksFilterBar({
  totalCount,
  shownCount,
  statusFilter,
  onStatusFilterChange,
  sortOption,
  onSortOptionChange,
  searchQuery,
  onSearchQueryChange,
}: LinksFilterBarProps) {
  return (
    <div className="mb-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex flex-col gap-3 md:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchQueryChange(e.target.value)}
            placeholder="Search by product, campaign, or URL..."
            className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        <DropdownSelect
          options={STATUS_OPTIONS}
          value={statusFilter}
          onChange={onStatusFilterChange}
          className="md:w-44"
        />

        <DropdownSelect
          options={SORT_OPTIONS}
          value={sortOption}
          onChange={onSortOptionChange}
          className="md:w-52"
        />
      </div>

      <div className="mt-4 border-t border-gray-100 pt-4 text-sm text-gray-500">
        Showing <span className="font-semibold text-indigo-600">{shownCount}</span>{" "}
        of {totalCount} affiliate links
      </div>
    </div>
  );
}