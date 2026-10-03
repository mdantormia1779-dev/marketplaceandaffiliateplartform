import { Download, Search, SlidersHorizontal } from "lucide-react";
import { TYPES } from "./data";
import { Filters } from "./types";

interface Props {
  filters: Filters;
  onChange: (patch: Partial<Filters>) => void;
  onExport: () => void;
}

const control = "rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none";

export default function TransactionsToolbar({ filters, onChange, onExport }: Props) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-4">
      <label className="flex w-full max-w-sm items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
        <Search size={16} className="text-gray-400" />
        <input
          value={filters.query}
          onChange={(e) => onChange({ query: e.target.value })}
          placeholder="Search by reference, party or type..."
          className="w-full bg-transparent text-sm outline-none placeholder:text-gray-500"
        />
      </label>
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 text-sm text-gray-500">
          <SlidersHorizontal size={14} />
          Filters
        </span>
        <select
          className={control}
          value={filters.type}
          onChange={(e) => onChange({ type: e.target.value as Filters["type"] })}
        >
          <option value="All">Type: All</option>
          {TYPES.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
        <select
          className={control}
          value={filters.status}
          onChange={(e) => onChange({ status: e.target.value as Filters["status"] })}
        >
          <option value="All">Status: All</option>
          <option>Completed</option>
          <option>Pending</option>
          <option>Failed</option>
        </select>
        <button onClick={onExport} className={`${control} inline-flex items-center gap-2 hover:bg-gray-50`}>
          <Download size={14} />
          Export
        </button>
      </div>
    </div>
  );
}
