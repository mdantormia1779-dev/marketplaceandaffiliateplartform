"use client";

import { TimeRange } from "./types";

interface TrafficHeaderProps {
  selectedTimeRange: TimeRange;
  onChange: (range: TimeRange) => void;
}

const TIME_RANGES: TimeRange[] = ["7 Days", "30 Days", "3 Months", "6 Months", "1 Year"];

export default function TrafficHeader({ selectedTimeRange, onChange }: TrafficHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 animate-fade-up">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Clicks & Traffic
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          See where your clicks come from and which channels drive the most qualified traffic.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-1.5 bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
        {TIME_RANGES.map((range) => (
          <button
            key={range}
            type="button"
            onClick={() => onChange(range)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              selectedTimeRange === range
                ? "bg-slate-900 text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            {range}
          </button>
        ))}
      </div>
    </div>
  );
}