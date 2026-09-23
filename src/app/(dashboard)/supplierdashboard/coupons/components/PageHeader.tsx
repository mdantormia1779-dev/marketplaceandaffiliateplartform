import { Download, Plus } from "lucide-react";
import { RANGES } from "./data";

interface PageHeaderProps {
  range: string;
  onRangeChange: (range: string) => void;
  onExport: () => void;
  onNewCode: () => void;
}

export default function PageHeader({ range, onRangeChange, onExport, onNewCode }: PageHeaderProps) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-lg font-semibold tracking-tight text-slate-900">
          Manual Coupon Codes
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Create shareable codes with per-code and per-customer redemption limits.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 rounded-lg bg-slate-100 p-1">
          {RANGES.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => onRangeChange(r)}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${
                range === r
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={onExport}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
        >
          <Download className="h-4 w-4" />
          Export
        </button>
        <button
          type="button"
          onClick={onNewCode}
          className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-3.5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/30"
        >
          <Plus className="h-4 w-4" />
          New code
        </button>
      </div>
    </div>
  );
}