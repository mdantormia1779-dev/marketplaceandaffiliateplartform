"use client";

import { useState } from "react";
import ChartCard from "./ChartCard";
import { clamp01, easeOut } from "./chartUtils";
import { SEGMENT_COLORS } from "./data";
import { count } from "./format";
import { Segment, SegmentSlice } from "./types";
import { useReveal } from "./useAnimations";

const RADIUS = 70;
const STROKE = 28;
const CIRC = 2 * Math.PI * RADIUS;

interface Props {
  segments: SegmentSlice[];
  trigger: string;
}

export default function SegmentsDonut({ segments, trigger }: Props) {
  const [hovered, setHovered] = useState<Segment | null>(null);
  const t = useReveal(trigger, 1200);
  const p = easeOut(t);

  const total = segments.reduce((s, x) => s + x.count, 0) || 1;
  const active = segments.find((s) => s.name === hovered) ?? null;
  const drawOrder = [...segments].sort((a, b) => a.order - b.order);
  let offset = 0;

  return (
    <ChartCard title="Segments" subtitle="Customer base by segment">
      <div className="relative mx-auto h-[190px] w-[190px]">
        <svg viewBox="0 0 200 200" className="h-full w-full -rotate-90">
          <circle cx="100" cy="100" r={RADIUS} fill="none" stroke="#f3f4f6" strokeWidth={STROKE} />
          {drawOrder.map((s) => {
            const len = (s.count / total) * CIRC;
            const shown = clamp01((p * CIRC - offset) / len) * len;
            const dash = Math.max(shown - (shown >= len ? 2 : 0), 0);
            const circle = (
              <circle
                key={s.name}
                cx="100"
                cy="100"
                r={RADIUS}
                fill="none"
                stroke={SEGMENT_COLORS[s.name]}
                strokeWidth={STROKE}
                strokeDasharray={`${dash} ${CIRC}`}
                strokeDashoffset={-offset}
                opacity={hovered === null || hovered === s.name ? 1 : 0.35}
                style={{ transition: "opacity 150ms" }}
                onMouseEnter={() => setHovered(s.name)}
                onMouseLeave={() => setHovered(null)}
              />
            );
            offset += len;
            return circle;
          })}
        </svg>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-2xl font-semibold text-gray-900">{count(active ? active.count : total)}</span>
          <span className="max-w-[90px] text-xs text-gray-500">{active ? active.name : "customers"}</span>
        </div>
      </div>

      <ul className="mt-6 space-y-1">
        {segments.map((s) => (
          <li
            key={s.name}
            onMouseEnter={() => setHovered(s.name)}
            onMouseLeave={() => setHovered(null)}
            className={`flex items-center justify-between rounded-md px-2 py-1.5 text-sm text-gray-700 ${hovered === s.name ? "bg-gray-50" : ""}`}
          >
            <span className="inline-flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: SEGMENT_COLORS[s.name] }} />
              {s.name}
            </span>
            <span>{count(s.count)}</span>
          </li>
        ))}
      </ul>
    </ChartCard>
  );
}
