"use client";

import { useState } from "react";
import ChartCard from "./ChartCard";
import { clamp01, easeOut } from "./chartUtils";
import { CATEGORY_COLORS } from "./data";
import { percent } from "./format";
import { Category } from "./types";
import { useReveal } from "./useAnimations";

const RADIUS = 70;
const STROKE = 28;
const CIRC = 2 * Math.PI * RADIUS;
const GAP = 2;

interface Props {
  categories: Category[];
  trigger: string;
}

const colorOf = (c: Category) => CATEGORY_COLORS[c.index % CATEGORY_COLORS.length];

export default function CategoryDonut({ categories, trigger }: Props) {
  const [hovered, setHovered] = useState<number | null>(null);
  const t = useReveal(trigger, 1200);
  const p = easeOut(t);

  const total = categories.reduce((s, c) => s + c.revenue, 0) || 1;
  const active = hovered !== null ? categories[hovered] : null;
  let offset = 0;

  return (
    <ChartCard title="Category Split" subtitle="Share of marketplace revenue">
      <div className="relative mx-auto h-[190px] w-[190px]">
        <svg viewBox="0 0 200 200" className="h-full w-full -rotate-90">
          <circle cx="100" cy="100" r={RADIUS} fill="none" stroke="#f3f4f6" strokeWidth={STROKE} />
          {categories.map((c, i) => {
            const len = (c.revenue / total) * CIRC;
            const shown = clamp01((p * CIRC - offset) / len) * len;
            const dash = Math.max(shown - (shown >= len ? GAP : 0), 0);
            const circle = (
              <circle
                key={c.name}
                cx="100"
                cy="100"
                r={RADIUS}
                fill="none"
                stroke={colorOf(c)}
                strokeWidth={STROKE}
                strokeDasharray={`${dash} ${CIRC}`}
                strokeDashoffset={-offset}
                opacity={hovered === null || hovered === i ? 1 : 0.35}
                style={{ transition: "opacity 150ms" }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              />
            );
            offset += len;
            return circle;
          })}
        </svg>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-2xl font-semibold text-gray-900">{active ? percent(active.share) : categories.length}</span>
          <span className="max-w-[90px] text-xs text-gray-500">{active ? active.name : "categories"}</span>
        </div>
      </div>

      <ul className="mt-6 space-y-1">
        {categories.map((c, i) => (
          <li
            key={c.name}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            className={`flex items-center justify-between rounded-md px-2 py-1.5 text-sm text-gray-700 ${hovered === i ? "bg-gray-50" : ""}`}
          >
            <span className="inline-flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: colorOf(c) }} />
              {c.name}
            </span>
            <span>{percent(c.share)}</span>
          </li>
        ))}
      </ul>
    </ChartCard>
  );
}
