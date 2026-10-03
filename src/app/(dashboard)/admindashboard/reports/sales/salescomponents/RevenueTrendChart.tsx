"use client";

import { MouseEvent, useId, useState } from "react";
import ChartCard from "./ChartCard";
import { areaPath, easeOut, niceStep, smoothPath } from "./chartUtils";
import { REVENUE_COLOR } from "./data";
import { compact, money } from "./format";
import { useReveal } from "./useAnimations";
import { MonthRow } from "./types";

const W = 640;
const H = 300;
const L = 52;
const R = 16;
const T = 14;
const B = 30;

interface Props {
  rows: MonthRow[];
  trigger: string;
}

export default function RevenueTrendChart({ rows, trigger }: Props) {
  const uid = useId().replace(/:/g, "");
  const [hover, setHover] = useState<number | null>(null);
  const progress = useReveal(trigger, 1200);
  const eased = easeOut(progress);
  const plotWidth = W - L - R;
  const plotHeight = H - T - B;
  const length = rows.length;
  const { step, max, ticks } = niceStep(Math.max(...rows.map((row) => row.revenue)), 4, 5000);
  const x = (index: number) => L + (length === 1 ? plotWidth / 2 : (index * plotWidth) / (length - 1));
  const y = (value: number) => T + plotHeight * (1 - value / max);
  const points = rows.map((row, index) => ({ x: x(index), y: y(row.revenue) }));
  const baseY = T + plotHeight;

  const onMove = (event: MouseEvent<SVGSVGElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const viewX = ((event.clientX - rect.left) / rect.width) * W;
    const index = length === 1 ? 0 : Math.round(((viewX - L) / plotWidth) * (length - 1));
    setHover(Math.min(length - 1, Math.max(0, index)));
  };

  return (
    <ChartCard title="Revenue Trend" subtitle="Monthly gross sales">
      <div className="relative">
        <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" onMouseMove={onMove} onMouseLeave={() => setHover(null)}>
          <defs>
            <linearGradient id={`${uid}-fill`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={REVENUE_COLOR} stopOpacity="0.22" />
              <stop offset="100%" stopColor={REVENUE_COLOR} stopOpacity="0" />
            </linearGradient>
            <clipPath id={`${uid}-clip`}>
              <rect x="0" y="0" width={L + plotWidth * eased + 1} height={H} />
            </clipPath>
          </defs>
          {Array.from({ length: ticks + 1 }, (_, index) => index * step).map((value) => (
            <g key={value}>
              <line x1={L} x2={W - R} y1={y(value)} y2={y(value)} stroke="#e5e7eb" strokeDasharray="3 4" />
              <text x={L - 8} y={y(value) + 4} textAnchor="end" fontSize="11" fill="#6b7280">{compact(value)}</text>
            </g>
          ))}
          {rows.map((row, index) => (
            <text key={row.month} x={x(index)} y={H - 8} textAnchor="middle" fontSize="11" fill="#6b7280">{row.month}</text>
          ))}
          <path d={areaPath(points, baseY)} fill={`url(#${uid}-fill)`} clipPath={`url(#${uid}-clip)`} />
          <path d={smoothPath(points)} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - eased} fill="none" stroke={REVENUE_COLOR} strokeWidth="2" />
          {hover !== null && (
            <g>
              <line x1={x(hover)} x2={x(hover)} y1={T} y2={baseY} stroke="#9ca3af" strokeDasharray="3 3" />
              <circle cx={points[hover].x} cy={points[hover].y} r="4.5" fill="#fff" stroke={REVENUE_COLOR} strokeWidth="2" />
            </g>
          )}
        </svg>
        {hover !== null && (
          <div
            className="pointer-events-none absolute top-2 -translate-x-1/2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs shadow-md"
            style={{ left: `${Math.min(86, Math.max(14, (x(hover) / W) * 100))}%` }}
          >
            <p className="font-medium text-gray-900">{rows[hover].month}</p>
            <p className="text-gray-600">Revenue {money(rows[hover].revenue)}</p>
          </div>
        )}
      </div>
    </ChartCard>
  );
}
