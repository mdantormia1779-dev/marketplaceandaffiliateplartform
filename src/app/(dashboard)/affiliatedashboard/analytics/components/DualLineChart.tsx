"use client";

import { useMemo, useRef, useState } from "react";
import type { MouseEvent } from "react";
import { DualLineDataPoint } from "./types";

interface Point {
  x: number;
  y: number;
}

interface DualLineChartProps {
  title: string;
  description: string;
  data: DualLineDataPoint[];
  seriesAName: string;
  seriesBName: string;
  colorA: string;
  colorB: string;
  yMax: number;
  yLabels: number[];
  formatYLabel?: (value: number) => string;
  delay?: number;
}

const VIEW_WIDTH = 1000;
const VIEW_HEIGHT = 220;
const PADDING_TOP = 16;
const PADDING_BOTTOM = 16;

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

export default function DualLineChart({
  title,
  description,
  data,
  seriesAName,
  seriesBName,
  colorA,
  colorB,
  yMax,
  yLabels,
  formatYLabel,
  delay = 0,
}: DualLineChartProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const stepX = VIEW_WIDTH / (data.length - 1);

  const valueToY = (value: number): number => {
    const usableHeight = VIEW_HEIGHT - PADDING_TOP - PADDING_BOTTOM;
    return PADDING_TOP + usableHeight - (value / yMax) * usableHeight;
  };

  const pointsA: Point[] = useMemo(() => {
    return data.map((d, i) => ({ x: i * stepX, y: valueToY(d.valueA) }));
  }, [data, stepX, yMax]);

  const pointsB: Point[] = useMemo(() => {
    return data.map((d, i) => ({ x: i * stepX, y: valueToY(d.valueB) }));
  }, [data, stepX, yMax]);

  const pathA = useMemo(() => buildSmoothPath(pointsA), [pointsA]);
  const pathB = useMemo(() => buildSmoothPath(pointsB), [pointsB]);

  const handleMouseMove = (e: MouseEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    if (!svg) {
      return;
    }
    const rect = svg.getBoundingClientRect();
    const relativeX = ((e.clientX - rect.left) / rect.width) * VIEW_WIDTH;
    const index = Math.round(relativeX / stepX);
    const clamped = Math.min(Math.max(index, 0), data.length - 1);
    setHoverIndex(clamped);
  };

  const handleMouseLeave = () => {
    setHoverIndex(null);
  };

  const activePoint = hoverIndex !== null ? data[hoverIndex] : null;
  const activeX = hoverIndex !== null ? hoverIndex * stepX : 0;
  const activeAY = hoverIndex !== null ? pointsA[hoverIndex].y : 0;
  const activeBY = hoverIndex !== null ? pointsB[hoverIndex].y : 0;

  const tooltipLeftPercent = (activeX / VIEW_WIDTH) * 100;
  const tooltipTopPercent = (Math.min(activeAY, activeBY) / VIEW_HEIGHT) * 100;

  const formatLabel = (value: number): string => {
    if (formatYLabel) {
      return formatYLabel(value);
    }
    return value.toString();
  };

  return (
    <div
      className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-5 animate-fade-up"
      style={{ animationDelay: delay + "ms" }}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-bold text-slate-900">{title}</h2>
          <p className="text-xs text-slate-500 mt-0.5">{description}</p>
        </div>
        <div className="flex items-center gap-4 text-xs font-semibold shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: colorA }}></span>
            <span className="text-slate-600">{seriesAName}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: colorB }}></span>
            <span className="text-slate-600">{seriesBName}</span>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <div
          className="flex flex-col justify-between text-[11px] text-slate-400 py-1"
          style={{ height: VIEW_HEIGHT }}
        >
          {yLabels.slice().reverse().map((label) => (
            <span key={label}>{formatLabel(label)}</span>
          ))}
        </div>

        <div className="relative flex-1" style={{ height: VIEW_HEIGHT }}>
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
            {yLabels.map((label) => (
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
              d={pathB + " L " + VIEW_WIDTH + "," + VIEW_HEIGHT + " L 0," + VIEW_HEIGHT + " Z"}
              fill={colorB}
              fillOpacity={0.08}
            />
            <path d={pathB} fill="none" stroke={colorB} strokeWidth={3} />

            <path
              d={pathA + " L " + VIEW_WIDTH + "," + VIEW_HEIGHT + " L 0," + VIEW_HEIGHT + " Z"}
              fill={colorA}
              fillOpacity={0.08}
            />
            <path d={pathA} fill="none" stroke={colorA} strokeWidth={3} />

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
                <circle cx={activeX} cy={activeAY} r={5} fill={colorA} stroke="white" strokeWidth={2} />
                <circle cx={activeX} cy={activeBY} r={5} fill={colorB} stroke="white" strokeWidth={2} />
              </g>
            ) : null}
          </svg>

          {activePoint ? (
            <div
              className="absolute z-10 -translate-x-1/2 -translate-y-[calc(100%+10px)] bg-white rounded-lg shadow-lg border border-slate-200 px-3 py-2 pointer-events-none min-w-[100px]"
              style={{ left: tooltipLeftPercent + "%", top: tooltipTopPercent + "%" }}
            >
              <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400 mb-1">
                {activePoint.label}
              </p>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: colorA }}></span>
                {activePoint.valueA}
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 mt-0.5">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: colorB }}></span>
                {activePoint.valueB}
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <div className="flex justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100 pl-8">
        {data.map((d) => (
          <span key={d.label}>{d.label}</span>
        ))}
      </div>
    </div>
  );
}