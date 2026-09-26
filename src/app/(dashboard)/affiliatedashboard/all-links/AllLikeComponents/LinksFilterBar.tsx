"use client";

import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";

type LinksFilterBarProps = {
  totalCount: number;
  shownCount: number;
};

export default function LinksFilterBar({
  totalCount,
  shownCount,
}: LinksFilterBarProps) {
  const [query, setQuery] = useState("");

  return (
    <div className="mb-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex flex-col gap-3 md:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by product, campaign, or URL..."
            className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        <button className="flex items-center justify-between gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 md:w-44">
          All Statuses
          <ChevronDown className="h-4 w-4 text-gray-400" />
        </button>

        <button className="flex items-center justify-between gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 md:w-44">
          Newest First
          <ChevronDown className="h-4 w-4 text-gray-400" />
        </button>
      </div>

      <div className="mt-4 border-t border-gray-100 pt-4 text-sm text-gray-500">
        Showing <span className="font-semibold text-indigo-600">{shownCount}</span>{" "}
        of {totalCount} affiliate links
      </div>
    </div>
  );
}