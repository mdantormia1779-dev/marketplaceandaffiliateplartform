import { Download } from "lucide-react";
import { PERIODS } from "./data";
import { Period } from "./types";

interface Props {
  period: Period;
  onPeriod: (p: Period) => void;
  onExport: () => void;
}

const control = "rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none";

export default function RevenueHeader({ period, onPeriod, onExport }: Props) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Revenue</h1>
        <p className="mt-1 text-sm text-gray-600">Platform revenue, payouts and payment method distribution.</p>
      </div>
      <div className="flex items-center gap-2">
        <select className={`${control} min-w-[140px]`} value={period} onChange={(e) => onPeriod(e.target.value as Period)}>
          {PERIODS.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
        <button onClick={onExport} className={`${control} inline-flex items-center gap-2 hover:bg-gray-50`}>
          <Download size={14} /> Export
        </button>
      </div>
    </div>
  );
}
