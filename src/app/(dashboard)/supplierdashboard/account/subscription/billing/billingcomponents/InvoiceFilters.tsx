import { CalendarDays, ChevronDown, Filter, Search } from "lucide-react";
import { DateRange } from "./types";

interface Props {
  search: string; onSearch: (v: string) => void;
  status: string; onStatus: (v: string) => void;
  range: DateRange; onRange: (v: DateRange) => void;
}

const box = "flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-600";
const select = "appearance-none bg-transparent pr-2 outline-none";

export default function InvoiceFilters({ search, onSearch, status, onStatus, range, onRange }: Props) {
  return (
    <div className="flex flex-wrap gap-3">
      <label className={box}>
        <Search size={15} />
        <input value={search} onChange={(e) => onSearch(e.target.value)} placeholder="Search invoice"
          className="w-40 bg-transparent outline-none placeholder:text-slate-400" />
      </label>
      <label className={box}>
        <Filter size={15} />
        <select value={status} onChange={(e) => onStatus(e.target.value)} className={select}>
          <option>All statuses</option><option>Paid</option><option>Pending</option><option>Failed</option>
        </select>
        <ChevronDown size={14} />
      </label>
      <label className={box}>
        <CalendarDays size={15} />
        <select value={range} onChange={(e) => onRange(e.target.value as DateRange)} className={select}>
          <option value="all">All time</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
          <option value="year">This year</option>
        </select>
        <ChevronDown size={14} />
      </label>
    </div>
  );
}