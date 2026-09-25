"use client";

import { useMemo, useRef, useState } from "react";
import type { MouseEvent } from "react";
import { ChartDataPoint } from "./types";

interface Point {
  x: number;
  y: number;
}

const CHART_DATA: ChartDataPoint[] = [
  { day: "Mon", clicks: 720, visitors: 480 },
  { day: "Tue", clicks: 810, visitors: 540 },
  { day: "Wed", clicks: 940, visitors: 600 },
  { day: "Thu", clicks: 790, visitors: 470 },
  { day: "Fri", clicks: 880, visitors: 640 },
  { day: "Sat", clicks: 980, visitors: 720 },
  { day: "Sun", clicks: 860, visitors: 650 },
];

const VIEW_WIDTH = 1000;
const VIEW_HEIGHT = 260;
const PADDING_TOP = 20;
const PADDING_BOTTOM = 20;
const Y_MAX = 1000;
const Y_LABELS: number[] = [0, 350, 700, 1000];

function valueToY(value: number): number {
  const usableHeight = VIEW_HEIGHT - PADDING_TOP - PADDING_BOTTOM;
  return PADDING_TOP + usableHeight - (value / Y_MAX) * usableHeight;
}

function buildSmoothPath(points: Point[]): string {
  if (points.length === 0) {
    return "";
  }

  let path = "M " + points[0].x + "," + points[0].y;

  for (let i = 0; i < points.length - 1; i++) {
    const curr = points[i];
    const next = points[i + 1];
    const midX = (curr.x + next.x) / 2;
    path += " Q " + midX + "," + curr.y + " " + next.x + "," + (curr.y + next.y) / 2;
    path += " T " + next.x + "," + next.y;
  }

  return path;
}

export default function ClicksOverTimeChart() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const stepX = VIEW_WIDTH / (CHART_DATA.length - 1);

  const clicksPoints: Point[] = useMemo(() => {
    return CHART_DATA.map((d, i) => ({ x: i * stepX, y: valueToY(d.clicks) }));
  }, [stepX]);

  const visitorsPoints: Point[] = useMemo(() => {
    return CHART_DATA.map((d, i) => ({ x: i * stepX, y: valueToY(d.visitors) }));
  }, [stepX]);

  const clicksPath = useMemo(() => buildSmoothPath(clicksPoints), [clicksPoints]);
  const visitorsPath = useMemo(() => buildSmoothPath(visitorsPoints), [visitorsPoints]);

  const handleMouseMove = (e: MouseEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    if (!svg) {
      return;
    }

    const rect = svg.getBoundingClientRect();
    const relativeX = ((e.clientX - rect.left) / rect.width) * VIEW_WIDTH;
    const index = Math.round(relativeX / stepX);
    const clamped = Math.min(Math.max(index, 0), CHART_DATA.length - 1);

    setHoverIndex(clamped);
  };

  const handleMouseLeave = () => {
    setHoverIndex(null);
  };

  const activePoint: ChartDataPoint | null = hoverIndex !== null ? CHART_DATA[hoverIndex] : null;
  const activeX: number = hoverIndex !== null ? hoverIndex * stepX : 0;
  const activeClicksY: number = hoverIndex !== null ? clicksPoints[hoverIndex].y : 0;
  const activeVisitorsY: number = hoverIndex !== null ? visitorsPoints[hoverIndex].y : 0;

  const tooltipLeftPercent = (activeX / VIEW_WIDTH) * 100;
  const tooltipTopPercent = (Math.min(activeClicksY, activeVisitorsY) / VIEW_HEIGHT) * 100;

  return (
    <div
      className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6 animate-fade-up"
      style={{ animationDelay: "300ms" }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-900">Clicks Over Time</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Total clicks and unique visitors across your affiliate links.
          </p>
        </div>
        <div className="flex items-center gap-6 text-xs font-semibold">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-indigo-600"></span>
            <span className="text-slate-600">Clicks</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
            <span className="text-slate-600">Visitors</span>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <div
          className="flex flex-col justify-between text-[11px] text-slate-400 py-1"
          style={{ height: VIEW_HEIGHT }}
        >
          {Y_LABELS.slice().reverse().map((label) => (
            <span key={label}>{label >= 1000 ? "1k" : label}</span>
          ))}
        </div>

        <div className="relative flex-1" style={{ height: VIEW_HEIGHT }}>
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
            {Y_LABELS.map((label) => (
              <div key={label} className="border-b border-dashed border-slate-200 w-full"></div>
            ))}
          </div>

          <svg
            ref={svgRef}
            className="absolute inset-0 w-full h-full cursor-crosshair"
            preserveAspectRatio="none"
            viewBox={"0 0 " + VIEW_WIDTH + " " + VIEW_HEIGHT}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <path
              d={visitorsPath + " L " + VIEW_WIDTH + "," + VIEW_HEIGHT + " L 0," + VIEW_HEIGHT + " Z"}
              fill="rgba(16, 185, 129, 0.08)"
            />
            <path d={visitorsPath} fill="none" stroke="#10b981" strokeWidth={3} />

            <path
              d={clicksPath + " L " + VIEW_WIDTH + "," + VIEW_HEIGHT + " L 0," + VIEW_HEIGHT + " Z"}
              fill="rgba(79, 70, 229, 0.06)"
            />
            <path d={clicksPath} fill="none" stroke="#4f46e5" strokeWidth={3} />

            {hoverIndex !== null ? (
              <g>
                <line
                  x1={activeX}
                  y1={0}
                  x2={activeX}
                  y2={VIEW_HEIGHT}
                  stroke="#cbd5e1"
                  strokeWidth={1.5}
                  strokeDasharray="4 4"
                />
                <circle
                  cx={activeX}
                  cy={activeClicksY}
                  r={5}
                  fill="#4f46e5"
                  stroke="white"
                  strokeWidth={2}
                />
                <circle
                  cx={activeX}
                  cy={activeVisitorsY}
                  r={5}
                  fill="#10b981"
                  stroke="white"
                  strokeWidth={2}
                />
              </g>
            ) : null}
          </svg>

          {activePoint ? (
            <div
              className="absolute z-10 -translate-x-1/2 -translate-y-[calc(100%+10px)] bg-white rounded-lg shadow-lg border border-slate-200 px-3 py-2 pointer-events-none min-w-[110px]"
              style={{
                left: tooltipLeftPercent + "%",
                top: tooltipTopPercent + "%",
              }}
            >
              <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400 mb-1">
                {activePoint.day}
              </p>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                {activePoint.clicks}
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                {activePoint.visitors}
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <div className="flex justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100 pl-8">
        {CHART_DATA.map((d) => (
          <span key={d.day}>{d.day}</span>
        ))}
      </div>
    </div>
  );
}