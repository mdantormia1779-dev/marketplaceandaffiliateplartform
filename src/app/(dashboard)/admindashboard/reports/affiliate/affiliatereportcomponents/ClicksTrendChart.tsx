"use client";

import { MouseEvent, useId, useState } from "react";
import ChartCard from "./ChartCard";
import { areaPath, easeOut, niceStep, smoothPath } from "./chartUtils";
import { CLICKS_COLOR } from "./data";
import { axisClicks, count } from "./format";
import { MonthPoint } from "./types";
import { useReveal } from "./useAnimations";

const W = 640;
const H = 300;
const L = 56;
const R = 16;
const T = 14;
const B = 30;

interface Props {
  months: MonthPoint[];
  trigger: string;
}

export default function ClicksTrendChart({ months, trigger }: Props) {
  const uid = useId().replace(/:/g, "");
  const [hover, setHover] = useState<number | null>(null);
  const t = useReveal(trigger, 1200);
  const p = easeOut(t);

  const pw = W - L - R;
  const ph = H - T - B;
  const n = months.length;
  const { step, max, ticks } = niceStep(Math.max(...months.map((m) => m.clicks)), 4, 1000);

  const x = (i: number) => L + (n === 1 ? pw / 2 : (i * pw) / (n - 1));
  const y = (v: number) => T + ph * (1 - v / max);
  const pts = months.map((m, i) => ({ x: x(i), y: y(m.clicks) }));
  const baseY = T + ph;

  const onMove = (e: MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const vx = ((e.clientX - rect.left) / rect.width) * W;
    const idx = n === 1 ? 0 : Math.round(((vx - L) / pw) * (n - 1));
    setHover(Math.min(n - 1, Math.max(0, idx)));
  };

  return (
    <ChartCard title="Clicks Trend" subtitle="Referral traffic over time">
      <div className="relative">
        <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" onMouseMove={onMove} onMouseLeave={() => setHover(null)}>
          <defs>
            <linearGradient id={`${uid}-fill`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={CLICKS_COLOR} stopOpacity="0.22" />
              <stop offset="100%" stopColor={CLICKS_COLOR} stopOpacity="0" />
            </linearGradient>
            <clipPath id={`${uid}-clip`}>
              <rect x="0" y="0" width={L + pw * p + 1} height={H} />
            </clipPath>
          </defs>

          {Array.from({ length: ticks + 1 }, (_, i) => i * step).map((v) => (
            <g key={v}>
              <line x1={L} x2={W - R} y1={y(v)} y2={y(v)} stroke="#e5e7eb" strokeDasharray="3 4" />
              <text x={L - 8} y={y(v) + 4} textAnchor="end" fontSize="11" fill="#6b7280">
                {axisClicks(v)}
              </text>
            </g>
          ))}

          {months.map((m, i) => (
            <text key={m.month} x={x(i)} y={H - 8} textAnchor="middle" fontSize="11" fill="#6b7280">
              {m.month}
            </text>
          ))}

          <path d={areaPath(pts, baseY)} fill={`url(#${uid}-fill)`} clipPath={`url(#${uid}-clip)`} />
          <path
            d={smoothPath(pts)}
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={1 - p}
            fill="none"
            stroke={CLICKS_COLOR}
            strokeWidth="2"
          />

          {hover !== null && (
            <g>
              <line x1={x(hover)} x2={x(hover)} y1={T} y2={baseY} stroke="#9ca3af" strokeDasharray="3 3" />
              <circle cx={pts[hover].x} cy={pts[hover].y} r="4.5" fill="#fff" stroke={CLICKS_COLOR} strokeWidth="2" />
            </g>
          )}
        </svg>

        {hover !== null && (
          <div
            className="pointer-events-none absolute top-2 -translate-x-1/2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs shadow-md"
            style={{ left: `${Math.min(86, Math.max(14, (x(hover) / W) * 100))}%` }}
          >
            <p className="font-medium text-gray-900">{months[hover].month}</p>
            <p className="text-gray-600">Clicks {count(months[hover].clicks)}</p>
          </div>
        )}
      </div>
    </ChartCard>
  );
}
