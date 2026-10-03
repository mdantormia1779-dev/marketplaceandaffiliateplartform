import { Download, FileText, Search, SlidersHorizontal } from "lucide-react";
import { PERIODS, STATUSES } from "./data";
import { AffiliateStatus, Period } from "./types";

interface Props {
  query: string;
  onQuery: (q: string) => void;
  status: AffiliateStatus | "All";
  onStatus: (s: AffiliateStatus | "All") => void;
  period: Period;
  onPeriod: (p: Period) => void;
  onCsv: () => void;
  onPdf: () => void;
}

const control = "rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none";

export default function AffiliateToolbar({ query, onQuery, status, onStatus, period, onPeriod, onCsv, onPdf }: Props) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-4">
      <div className="flex flex-wrap items-center gap-3">
        <label className="flex w-72 items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
          <Search size={16} className="text-gray-400" />
          <input
            value={query}
            onChange={(e) => onQuery(e.target.value)}
            placeholder="Search affiliates..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-gray-500"
          />
        </label>
        <span className="inline-flex items-center gap-1.5 text-sm text-gray-500">
          <SlidersHorizontal size={14} /> Filters
        </span>
        <select className={control} value={status} onChange={(e) => onStatus(e.target.value as AffiliateStatus | "All")}>
          <option value="All">Status: All</option>
          {STATUSES.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <select className={control} value={period} onChange={(e) => onPeriod(e.target.value as Period)}>
          {PERIODS.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
        <button onClick={onCsv} className={`${control} inline-flex items-center gap-2 hover:bg-gray-50`}>
          <Download size={14} /> CSV
        </button>
        <button onClick={onPdf} className={`${control} inline-flex items-center gap-2 hover:bg-gray-50`}>
          <FileText size={14} /> PDF
        </button>
      </div>
    </div>
  );
}
