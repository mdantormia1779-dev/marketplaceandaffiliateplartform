"use client";

import { useState } from "react";

const periods = ["7 Days", "30 Days", "3 Months", "6 Months", "1 Year"];
const series = [
  { label: "Clicks", color: "bg-blue-500" },
  { label: "Sales", color: "bg-emerald-500" },
  { label: "Commission", color: "bg-amber-500" },
];

// Lightweight placeholder trend line — swap for a real charting
// library (e.g. recharts) once wired up to live data.
const points = [30, 45, 38, 58, 50, 70, 62, 80, 74, 90, 84, 96];

function buildPath(values: number[], width: number, height: number) {
  const max = Math.max(...values);
  const step = width / (values.length - 1);
  return values
    .map((v, i) => {
      const x = i * step;
      const y = height - (v / max) * height;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

export default function PerformanceChart() {
  const [activePeriod, setActivePeriod] = useState("30 Days");
  const width = 600;
  const height = 160;

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="mb-1 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-gray-900">
            Affiliate Performance
          </h2>
          <p className="text-sm text-gray-400">
            Track clicks, sales and commission across your links.
          </p>
        </div>

        <div className="flex gap-1 overflow-x-auto rounded-xl bg-gray-50 p-1">
          {periods.map((period) => (
            <button
              key={period}
              onClick={() => setActivePeriod(period)}
              className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                activePeriod === period
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {series.map((s) => (
          <span
            key={s.label}
            className="flex items-center gap-1.5 rounded-full bg-gray-50 px-3 py-1 text-xs font-medium text-gray-600"
          >
            <span className={`h-2 w-2 rounded-full ${s.color}`} />
            {s.label}
          </span>
        ))}
      </div>

      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-40 w-full"
        preserveAspectRatio="none"
      >
        <path
          d={buildPath(points, width, height)}
          fill="none"
          stroke="#6366f1"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}