"use client";

import { Search } from "lucide-react";

const QUICK_TAGS = [
  "Generate an affiliate link",
  "Withdrawal time",
  "Commission status",
  "Referral program",
];

interface HelpSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export default function HelpSearch({ searchTerm, onSearchChange }: HelpSearchProps) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search for help... e.g. How can I generate an affiliate link?"
          className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-3 pl-11 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20"
        />
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {QUICK_TAGS.map((tag) => (
          <button
            key={tag}
            onClick={() => onSearchChange(tag)}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition cursor-pointer ${
              searchTerm === tag
                ? "border-blue-500 bg-blue-50 text-blue-700"
                : "border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}