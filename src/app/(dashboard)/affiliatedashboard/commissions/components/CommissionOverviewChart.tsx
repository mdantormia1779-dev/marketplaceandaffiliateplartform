'use client';
import React, { useState } from 'react';

export default function CommissionOverviewChart() {
  const [activeTab, setActiveTab] = useState('Commission');
  const [activeTime, setActiveTime] = useState('30 Days');

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900">Commission Overview</h3>
          <p className="text-xs text-slate-500 mt-0.5">Commission, sales, and earnings trend over time.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Tabs */}
          <div className="flex items-center gap-1 rounded-full bg-slate-100 p-1 text-xs font-medium text-slate-600">
            {['Commission', 'Sales', 'Earnings'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-full px-3 py-1.5 transition-all ${activeTab === tab ? 'bg-white text-slate-900 shadow-sm' : 'hover:text-slate-900'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Time Filter */}
          <div className="flex items-center gap-1 rounded-full bg-slate-100 p-1 text-xs font-medium text-slate-600">
            {['7 Days', '30 Days', '3 Months', '6 Months', '1 Year'].map((time) => (
              <button
                key={time}
                onClick={() => setActiveTime(time)}
                className={`rounded-full px-3 py-1.5 transition-all ${activeTime === time ? 'bg-white text-slate-900 shadow-sm' : 'hover:text-slate-900'}`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Graphical Line Representation Placeholder / SVG Curve */}
      <div className="relative h-64 w-full pt-4">
        {/* Grid lines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-40">
          <div className="border-b border-dashed border-slate-200 w-full text-[10px] text-slate-400">6k</div>
          <div className="border-b border-dashed border-slate-200 w-full text-[10px] text-slate-400">5k</div>
          <div className="border-b border-dashed border-slate-200 w-full text-[10px] text-slate-400">3k</div>
          <div className="border-b border-dashed border-slate-200 w-full text-[10px] text-slate-400">2k</div>
          <div className="border-b border-dashed border-slate-200 w-full text-[10px] text-slate-400">0</div>
        </div>

        {/* SVG Wave */}
        <svg className="absolute inset-0 h-full w-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 800 200">
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          <path
            d="M 0 160 Q 150 140, 250 150 T 450 110 T 600 80 T 800 30 L 800 200 L 0 200 Z"
            fill="url(#chartGradient)"
          />
          <path
            d="M 0 160 Q 150 140, 250 150 T 450 110 T 600 80 T 800 30"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="3"
          />
        </svg>

        {/* Dates X-Axis */}
        <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-[11px] text-slate-400">
          <span>Sep 1</span>
          <span>Sep 4</span>
          <span>Sep 7</span>
          <span>Sep 10</span>
          <span>Sep 13</span>
          <span>Sep 16</span>
          <span>Sep 19</span>
          <span>Sep 22</span>
          <span>Sep 25</span>
          <span>Sep 28</span>
        </div>
      </div>
    </div>
  );
}