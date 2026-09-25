"use client";

import { useEffect, useState } from "react";
import { TrafficSource } from "./types";

const SOURCES: TrafficSource[] = [
  { label: "Facebook", height: "85%", count: "8.5k" },
  { label: "Instagram", height: "55%", count: "5.2k" },
  { label: "WhatsApp", height: "45%", count: "4.1k" },
  { label: "YouTube", height: "35%", count: "3.2k" },
  { label: "TikTok", height: "28%", count: "2.6k" },
  { label: "Direct", height: "20%", count: "1.8k" },
];

export default function TopTrafficSources() {
  const [grown, setGrown] = useState<boolean>(false);

  useEffect(() => {
    const timer: ReturnType<typeof setTimeout> = setTimeout(() => setGrown(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6 animate-fade-up"
      style={{ animationDelay: "450ms" }}
    >
      <div>
        <h2 className="text-base font-bold text-slate-900">Top Traffic Sources</h2>
        <p className="text-xs text-slate-500 mt-0.5">Channels sending the most visitors.</p>
      </div>

      <div className="h-56 flex items-end justify-between gap-4 pt-6 px-4 relative">
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-40">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="border-b border-dashed border-slate-200 w-full" />
          ))}
        </div>

        {SOURCES.map((source: TrafficSource, idx: number) => (
          <div key={source.label} className="flex flex-col items-center gap-2 z-10 w-full">
            <div
              className="w-12 sm:w-16 bg-indigo-500 rounded-t-lg transition-all duration-700 ease-out hover:bg-indigo-600"
              style={{
                height: grown ? source.height : "0%",
                transitionDelay: `${idx * 80}ms`,
              }}
            />
            <span className="text-xs font-medium text-slate-600">{source.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}