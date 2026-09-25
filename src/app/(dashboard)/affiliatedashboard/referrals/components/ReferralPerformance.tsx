'use client';
import { useState } from 'react';

export default function ReferralPerformance() {
  const [filter, setFilter] = useState<'7D' | '30D' | '3M' | '1Y'>('3M');

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-base font-bold text-slate-900">Referral Performance</h3>
          <p className="text-xs text-slate-500 mt-0.5">New referrals and the bonus earned from them over time.</p>
        </div>

        {/* Time Filters (7D, 30D, 3M, 1Y) */}
        <div className="flex items-center gap-1 rounded-xl bg-slate-100 p-1">
          {(['7D', '30D', '3M', '1Y'] as const).map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                filter === item ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Legend & Graph Mockup */}
      <div className="mt-6 flex items-center gap-6 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-blue-600"></span> Referrals
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500"></span> Bonus Earned
        </div>
      </div>

      {/* SVG Chart Preview */}
      <div className="mt-6 h-64 w-full relative flex items-end">
        <svg className="w-full h-full overflow-visible" viewBox="0 0 800 200">
          <path
            d="M 0 160 Q 150 120, 300 140 T 600 80 T 800 40"
            fill="none"
            stroke="#10b981"
            strokeWidth="3"
          />
          <path
            d="M 0 160 Q 150 120, 300 140 T 600 80 T 800 40 L 800 200 L 0 200 Z"
            fill="url(#gradient)"
            opacity="0.1"
          />
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#ffffff" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="mt-4 flex justify-between text-[11px] text-slate-400 font-medium">
        <span>W1</span>
        <span>W2</span>
        <span>W3</span>
        <span>W4</span>
        <span>W5</span>
        <span>W6</span>
        <span>W7</span>
        <span>W8</span>
        <span>W9</span>
        <span>W10</span>
        <span>W11</span>
        <span>W12</span>
      </div>
    </div>
  );
}