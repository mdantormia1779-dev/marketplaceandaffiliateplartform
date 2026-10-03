"use client";

import { useState } from "react";
import ChartCard from "./ChartCard";
import { clamp01, easeOut, niceStep, topRounded } from "./chartUtils";
import { ORDER_COLOR } from "./data";
import { count } from "./format";
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

export default function OrderVolumeChart({ rows, trigger }: Props) {
  const [hover, setHover] = useState<number | null>(null);
  const progress = useReveal(trigger, 1200);
  const plotWidth = W - L - R;
  const plotHeight = H - T - B;
  const length = rows.length;
  const slot = plotWidth / length;
  const barWidth = Math.min(26, slot * 0.5);
  const { step, max, ticks } = niceStep(Math.max(...rows.map((row) => row.orders)), 4, 50);
  const y = (value: number) => T + plotHeight * (1 - value / max);
  const baseY = T + plotHeight;
  const centerX = (index: number) => L + slot * (index + 0.5);

  return (
    <ChartCard title="Order Volume" subtitle="Orders placed each month">
      <div className="relative">
        <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" onMouseLeave={() => setHover(null)}>
          {Array.from({ length: ticks + 1 }, (_, index) => index * step).map((value) => (
            <g key={value}>
              <line x1={L} x2={W - R} y1={y(value)} y2={y(value)} stroke="#e5e7eb" strokeDasharray="3 4" />
              <text x={L - 8} y={y(value) + 4} textAnchor="end" fontSize="11" fill="#6b7280">{count(value)}</text>
            </g>
          ))}
          {rows.map((row, index) => {
            const local = easeOut(clamp01((progress - (index / length) * 0.45) / 0.55));
            const height = (row.orders / max) * plotHeight * local;
            return (
              <g key={row.month}>
                <path
                  d={topRounded(centerX(index) - barWidth / 2, baseY - height, barWidth, height, 3)}
                  fill={ORDER_COLOR}
                  opacity={hover === null || hover === index ? 1 : 0.5}
                  style={{ transition: "opacity 150ms" }}
                />
                <text x={centerX(index)} y={H - 8} textAnchor="middle" fontSize="11" fill="#6b7280">{row.month}</text>
                <rect x={centerX(index) - slot / 2} y={T} width={slot} height={plotHeight} fill="transparent" onMouseEnter={() => setHover(index)} />
              </g>
            );
          })}
        </svg>
        {hover !== null && (
          <div
            className="pointer-events-none absolute top-2 -translate-x-1/2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs shadow-md"
            style={{ left: `${Math.min(86, Math.max(14, (centerX(hover) / W) * 100))}%` }}
          >
            <p className="font-medium text-gray-900">{rows[hover].month}</p>
            <p className="text-gray-600">Orders {count(rows[hover].orders)}</p>
          </div>
        )}
      </div>
    </ChartCard>
  );
}
