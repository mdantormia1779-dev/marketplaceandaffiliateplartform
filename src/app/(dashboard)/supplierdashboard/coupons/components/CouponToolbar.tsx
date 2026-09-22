import { ChevronDown, Search } from "lucide-react";
import { SORTS, TYPES } from "./data";

interface SelectProps {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  className?: string;
}

function Select({ value, onChange, options, className }: SelectProps) {
  return (
    <div className={`relative ${className ?? ""}`}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none rounded-lg border border-slate-200 bg-white py-2 pl-3 pr-9 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
    </div>
  );
}

interface CouponToolbarProps {
  query: string;
  onQueryChange: (v: string) => void;
  type: string;
  onTypeChange: (v: string) => void;
  sort: string;
  onSortChange: (v: string) => void;
  resultCount: number;
}

export default function CouponToolbar({
  query,
  onQueryChange,
  type,
  onTypeChange,
  sort,
  onSortChange,
  resultCount,
}: CouponToolbarProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative min-w-[220px] flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search by code or name..."
            className="w-full rounded-lg border border-slate-200 py-2 pl-9 pr-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
        <Select value={type} onChange={onTypeChange} options={TYPES} className="w-44" />
        <Select value={sort} onChange={onSortChange} options={SORTS} className="ml-auto w-48" />
      </div>
      <p className="mt-3 text-xs text-slate-400">
        <span className="font-medium text-slate-600">{resultCount}</span> coupon codes in view
      </p>
    </div>
  );
}