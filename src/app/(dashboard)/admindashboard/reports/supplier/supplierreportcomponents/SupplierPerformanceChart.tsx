"use client";

import { MouseEvent, useId, useState } from "react";
import ChartCard from "./ChartCard";
import { areaPath, easeOut, niceStep, smoothPath } from "./chartUtils";
import { ORDERS_COLOR, PAYOUTS_COLOR } from "./data";
import { count, money } from "./format";
import { MonthPoint } from "./types";
import { useReveal } from "./useAnimations";

const W = 640;
const H = 300;
const L = 56;
const R = 16;
const T = 14;
const B = 30;

type Key = "orders" | "payouts";
const SERIES: { key: Key; label: string }[] = [
  { key: "orders", label: "Orders" },
  { key: "payouts", label: "Payouts" },
];

interface Props {
  months: MonthPoint[];
  trigger: string;
}

export default function SupplierPerformanceChart({ months, trigger }: Props) {
  const uid = useId().replace(/:/g, "");
  const [hover, setHover] = useState<number | null>(null);
  const t = useReveal(trigger, 1200);
  const p = easeOut(t);

  const pw = W - L - R;
  const ph = H - T - B;
  const n = months.length;
  const maxValue = Math.max(...months.map((m) => Math.max(m.orders, m.payouts)));
  const { step, max, ticks } = niceStep(maxValue, 4, 5000);

  const x = (i: number) => L + (n === 1 ? pw / 2 : (i * pw) / (n - 1));
  const y = (v: number) => T + ph * (1 - v / max);
  const baseY = T + ph;
  const pts = (k: Key) => months.map((m, i) => ({ x: x(i), y: y(m[k]) }));

  const onMove = (e: MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const vx = ((e.clientX - rect.left) / rect.width) * W;
    const idx = n === 1 ? 0 : Math.round(((vx - L) / pw) * (n - 1));
    setHover(Math.min(n - 1, Math.max(0, idx)));
  };

  return (
    <ChartCard title="Supplier Performance" subtitle="Monthly orders and payout trend">
      <div className="relative">
        <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" onMouseMove={onMove} onMouseLeave={() => setHover(null)}>
          <defs>
            {SERIES.map((s) => (
              <linearGradient key={s.key} id={`${uid}-${s.key}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={s.key === "orders" ? ORDERS_COLOR : PAYOUTS_COLOR} stopOpacity="0.2" />
                <stop offset="100%" stopColor={s.key === "orders" ? ORDERS_COLOR : PAYOUTS_COLOR} stopOpacity="0" />
              </linearGradient>
            ))}
            <clipPath id={`${uid}-clip`}>
              <rect x="0" y="0" width={L + pw * p + 1} height={H} />
            </clipPath>
          </defs>

          {Array.from({ length: ticks + 1 }, (_, i) => i * step).map((v) => (
            <g key={v}>
              <line x1={L} x2={W - R} y1={y(v)} y2={y(v)} stroke="#e5e7eb" strokeDasharray="3 4" />
              <text x={L - 8} y={y(v) + 4} textAnchor="end" fontSize="11" fill="#6b7280">
                {v >= 1000 ? `${Math.round(v / 1000)}k` : count(v)}
              </text>
            </g>
          ))}

          {months.map((m, i) => (
            <text key={m.month} x={x(i)} y={H - 8} textAnchor="middle" fontSize="11" fill="#6b7280">
              {m.month}
            </text>
          ))}

          {SERIES.map((s) => (
            <path key={`a-${s.key}`} d={areaPath(pts(s.key), baseY)} fill={`url(#${uid}-${s.key})`} clipPath={`url(#${uid}-clip)`} />
          ))}

          {SERIES.map((s) => (
            <path
              key={`l-${s.key}`}
              d={smoothPath(pts(s.key))}
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={1 - p}
              fill="none"
              stroke={s.key === "orders" ? ORDERS_COLOR : PAYOUTS_COLOR}
              strokeWidth="2"
            />
          ))}

          {hover !== null && (
            <g>
              <line x1={x(hover)} x2={x(hover)} y1={T} y2={baseY} stroke="#9ca3af" strokeDasharray="3 3" />
              {SERIES.map((s) => (
                <circle
                  key={s.key}
                  cx={x(hover)}
                  cy={y(months[hover][s.key])}
                  r="4.5"
                  fill="#fff"
                  stroke={s.key === "orders" ? ORDERS_COLOR : PAYOUTS_COLOR}
                  strokeWidth="2"
                />
              ))}
            </g>
          )}
        </svg>

        {hover !== null && (
          <div
            className="pointer-events-none absolute top-2 -translate-x-1/2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs shadow-md"
            style={{ left: `${Math.min(86, Math.max(14, (x(hover) / W) * 100))}%` }}
          >
            <p className="mb-1 font-medium text-gray-900">{months[hover].month}</p>
            {SERIES.map((s) => (
              <p key={s.key} className="text-gray-600">
                <span className="mr-1.5 inline-block h-2 w-2 rounded-full" style={{ background: s.key === "orders" ? ORDERS_COLOR : PAYOUTS_COLOR }} />
                {s.label} {s.key === "orders" ? count(months[hover][s.key]) : money(months[hover][s.key])}
              </p>
            ))}
          </div>
        )}
      </div>
    </ChartCard>
  );
}
