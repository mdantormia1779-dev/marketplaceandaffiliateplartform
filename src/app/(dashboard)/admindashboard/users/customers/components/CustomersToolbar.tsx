import { Search, SlidersHorizontal, Download } from "lucide-react";

type Props = {
  search: string;
  onSearch: (v: string) => void;
  status: string;
  onStatus: (v: string) => void;
  country: string;
  onCountry: (v: string) => void;
  countries: string[];
  onExport: () => void;
};

const selectCls =
  "rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-[#1fa85a]";

export default function CustomersToolbar({
  search,
  onSearch,
  status,
  onStatus,
  country,
  onCountry,
  countries,
  onExport,
}: Props) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-4">
      <div className="relative w-full max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search by name, email or country..."
          className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm outline-none focus:border-[#1fa85a] focus:bg-white"
        />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="flex items-center gap-1.5 px-2 text-sm text-slate-500">
          <SlidersHorizontal className="h-4 w-4" /> Filters
        </span>
        <select value={status} onChange={(e) => onStatus(e.target.value)} className={selectCls}>
          <option value="All">Status: All</option>
          <option value="Active">Active</option>
          <option value="Pending">Pending</option>
          <option value="Suspended">Suspended</option>
        </select>
        <select value={country} onChange={(e) => onCountry(e.target.value)} className={selectCls}>
          <option value="All">Country: All</option>
          {countries.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <button
          onClick={onExport}
          className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
        >
          <Download className="h-4 w-4" /> Export
        </button>
      </div>
    </div>
  );
}