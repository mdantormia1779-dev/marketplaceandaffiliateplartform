"use client";

import { useEffect, useState } from "react";
import { DeviceItem } from "./types";

interface DeviceAnalyticsProps {
  items: DeviceItem[];
  delay?: number;
}

export default function DeviceAnalytics({ items, delay = 0 }: DeviceAnalyticsProps) {
  const [grown, setGrown] = useState<boolean>(false);
  const maxValue = 18000; // Fixed max value to match the 18k scale in screenshot

  useEffect(() => {
    const timer = setTimeout(() => setGrown(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6 animate-fade-up"
      style={{ animationDelay: delay + "ms" }}
    >
      <div>
        <h2 className="text-base font-bold text-slate-900">Device Analytics</h2>
        <p className="text-xs text-slate-500 mt-0.5">Visits split by device type.</p>
      </div>

      {/* Chart Area with Y-Axis Labels */}
      <div className="relative pt-2">
        {/* Y-Axis Grid Lines & Labels */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-8">
          {[
            { label: "18k", val: 18000 },
            { label: "14k", val: 14000 },
            { label: "9k", val: 9000 },
            { label: "5k", val: 5000 },
            { label: "0", val: 0 },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 w-full">
              <span className="text-[11px] font-medium text-slate-400 w-6 text-right">{item.label}</span>
              <div className="border-b border-dashed border-slate-200 w-full"></div>
            </div>
          ))}
        </div>

        {/* Bars Section */}
        <div className="h-56 flex items-end justify-around gap-6 pl-9 pt-2 relative z-10">
          {items.map((item, idx) => {
            const heightPercent = (item.value / maxValue) * 100;
            return (
              <div key={item.label} className="flex flex-col items-center gap-2 w-full max-w-[100px]">
                <div
                  className="w-12 sm:w-16 bg-indigo-500 rounded-t-lg transition-all duration-700 ease-out"
                  style={{
                    height: grown ? heightPercent + "%" : "0%",
                    transitionDelay: idx * 100 + "ms",
                  }}
                ></div>
                <span className="text-xs font-medium text-slate-600">{item.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
              <div className="flex items-center gap-2 text-slate-500 text-xs font-medium mb-3">
                <Icon className="w-4 h-4 text-slate-400" />
                <span>{item.label}</span>
              </div>
              <div>
                <p className="text-xl font-bold text-slate-900">{item.value.toLocaleString()}</p>
                <p className="text-xs text-slate-400 mt-0.5">{item.percentage} of visits</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}