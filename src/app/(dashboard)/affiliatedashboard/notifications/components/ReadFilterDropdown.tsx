import { ChevronDown } from "lucide-react";
import { READ_FILTER_LABELS, ReadFilter } from "../types";

const OPTIONS: ReadFilter[] = ["all", "unread", "read"];

export function ReadFilterDropdown({
  value,
  onChange,
}: {
  value: ReadFilter;
  onChange: (v: ReadFilter) => void;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as ReadFilter)}
        className="w-48 appearance-none rounded-lg border border-slate-200 bg-white py-2.5 pl-4 pr-9 text-sm font-medium text-slate-700 shadow-sm outline-none focus:border-indigo-400"
      >
        {OPTIONS.map((option) => (
          <option key={option} value={option}>
            {READ_FILTER_LABELS[option]}
          </option>
        ))}
      </select>
      <ChevronDown
        size={16}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
      />
    </div>
  );
}