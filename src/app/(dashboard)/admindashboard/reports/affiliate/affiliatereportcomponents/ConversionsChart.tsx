"use client";

import { useState } from "react";
import ChartCard from "./ChartCard";
import { clamp01, easeOut, niceStep, topRounded } from "./chartUtils";
import { CONVERSIONS_COLOR } from "./data";
import { count } from "./format";
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

export default function ConversionsChart({ months, trigger }: Props) {
  const [hover, setHover] = useState<number | null>(null);
  const t = useReveal(trigger, 1200);

  const pw = W - L - R;
  const ph = H - T - B;
  const n = months.length;
  const slot = pw / n;
  const barW = Math.min(20, slot * 0.4);
  const { step, max, ticks } = niceStep(Math.max(...months.map((m) => m.conversions)), 4, 50);

  const y = (v: number) => T + ph * (1 - v / max);
  const baseY = T + ph;
  const cx = (i: number) => L + slot * (i + 0.5);

  return (
    <ChartCard title="Conversions Trend" subtitle="Attributed sales each month">
      <div className="relative">
        <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" onMouseLeave={() => setHover(null)}>
          {Array.from({ length: ticks + 1 }, (_, i) => i * step).map((v) => (
            <g key={v}>
              <line x1={L} x2={W - R} y1={y(v)} y2={y(v)} stroke="#e5e7eb" strokeDasharray="3 4" />
              <text x={L - 8} y={y(v) + 4} textAnchor="end" fontSize="11" fill="#6b7280">
                {count(v)}
              </text>
            </g>
          ))}

          {months.map((m, i) => {
            const local = easeOut(clamp01((t - (i / n) * 0.45) / 0.55));
            const h = (m.conversions / max) * ph * local;
            return (
              <g key={m.month}>
                <path
                  d={topRounded(cx(i) - barW / 2, baseY - h, barW, h, 3)}
                  fill={CONVERSIONS_COLOR}
                  opacity={hover === null || hover === i ? 1 : 0.5}
                  style={{ transition: "opacity 150ms" }}
                />
                <text x={cx(i)} y={H - 8} textAnchor="middle" fontSize="11" fill="#6b7280">
                  {m.month}
                </text>
                <rect x={cx(i) - slot / 2} y={T} width={slot} height={ph} fill="transparent" onMouseEnter={() => setHover(i)} />
              </g>
            );
          })}
        </svg>

        {hover !== null && (
          <div
            className="pointer-events-none absolute top-2 -translate-x-1/2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs shadow-md"
            style={{ left: `${Math.min(86, Math.max(14, (cx(hover) / W) * 100))}%` }}
          >
            <p className="font-medium text-gray-900">{months[hover].month}</p>
            <p className="text-gray-600">Conversions {count(months[hover].conversions)}</p>
          </div>
        )}
      </div>
    </ChartCard>
  );
}
