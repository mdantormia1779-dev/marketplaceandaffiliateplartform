import { Download, FileText, Search, SlidersHorizontal } from "lucide-react";
import { PERIODS } from "./data";
import { Period } from "./types";

interface Props {
  query: string;
  onQuery: (query: string) => void;
  period: Period;
  onPeriod: (period: Period) => void;
  onCsv: () => void;
  onPdf: () => void;
}

const control = "rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none";

export default function SalesToolbar({ query, onQuery, period, onPeriod, onCsv, onPdf }: Props) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-4">
      <div className="flex w-full max-w-md items-center gap-4">
        <label className="flex w-full max-w-xs items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
          <Search size={16} className="text-gray-400" />
          <input value={query} onChange={(event) => onQuery(event.target.value)} placeholder="Search months..." className="w-full bg-transparent text-sm outline-none placeholder:text-gray-500" />
        </label>
        <span className="inline-flex items-center gap-1.5 text-sm text-gray-500">
          <SlidersHorizontal size={14} /> Filters
        </span>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <select className={control} value={period} onChange={(event) => onPeriod(event.target.value as Period)}>
          {PERIODS.map((item) => <option key={item}>{item}</option>)}
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
