import { Download, Plus } from "lucide-react";

const RANGES = ["7 days", "30 days", "90 days"] as const;
type Range = (typeof RANGES)[number];

interface PageHeaderProps {
  range: string;
  onRangeChange: (range: Range) => void;
  onExport: () => void;
  onNewCampaign: () => void;
}

export default function PageHeader({ range, onRangeChange, onExport, onNewCampaign }: PageHeaderProps) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-lg font-semibold tracking-tight text-slate-900">Affiliates</h1>
        <p className="mt-1 text-sm text-slate-500">
          Track affiliates promoting your products and manage their commission performance.
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
          onClick={onNewCampaign}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3.5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40"
        >
          <Plus className="h-4 w-4" />
          New Campaign
        </button>
      </div>
    </div>
  );
}