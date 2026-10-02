"use client";

import { MouseEvent, useId, useState } from "react";
import { areaPath, niceScale, smoothPath } from "../financecomponents/chartUtils";
import ChartCard from "../financecomponents/ChartCard";
import { compact, money } from "../financecomponents/format";
import { PAYOUT_COLOR, REVENUE_COLOR } from "./data";

interface Props {
  months: string[];
  revenue: number[];
  payouts: number[];
}

const W = 800;
const H = 300;
const L = 56;
const R = 16;
const T = 14;
const B = 30;

function Legend() {
  const item = (color: string, label: string) => (
    <span className="inline-flex items-center gap-1.5 text-xs text-gray-600">
      <span className="h-2 w-2 rounded-full" style={{ background: color }} />
      {label}
    </span>
  );
  return (
    <div className="flex items-center gap-4">
      {item(REVENUE_COLOR, "Revenue")}
      {item(PAYOUT_COLOR, "Payouts")}
    </div>
  );
}

export default function RevenueChart({ months, revenue, payouts }: Props) {
  const uid = useId().replace(/:/g, "");
  const [hover, setHover] = useState<number | null>(null);

  const pw = W - L - R;
  const ph = H - T - B;
  const n = months.length;
  const { step, max, ticks } = niceScale(Math.max(...revenue, ...payouts));

  const x = (i: number) => L + (n === 1 ? pw / 2 : (i * pw) / (n - 1));
  const y = (v: number) => T + ph * (1 - v / max);

  const revPts = revenue.map((v, i) => ({ x: x(i), y: y(v) }));
  const payPts = payouts.map((v, i) => ({ x: x(i), y: y(v) }));
  const baseY = T + ph;

  const onMove = (e: MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const vx = ((e.clientX - rect.left) / rect.width) * W;
    const idx = n === 1 ? 0 : Math.round(((vx - L) / pw) * (n - 1));
    setHover(Math.min(n - 1, Math.max(0, idx)));
  };

  return (
    <>
      <ChartCard title="Revenue vs Payouts" subtitle="Monthly gross revenue and outgoing payouts" right={<Legend />} className="lg:col-span-2">
        <div className="relative">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="h-auto w-full"
            onMouseMove={onMove}
            onMouseLeave={() => setHover(null)}
            style={{ animation: "revenueChartIn 700ms ease-out" }}
          >
            <defs>
              <linearGradient id={`${uid}-rev`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={REVENUE_COLOR} stopOpacity="0.22" />
                <stop offset="100%" stopColor={REVENUE_COLOR} stopOpacity="0" />
              </linearGradient>
              <linearGradient id={`${uid}-pay`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={PAYOUT_COLOR} stopOpacity="0.2" />
                <stop offset="100%" stopColor={PAYOUT_COLOR} stopOpacity="0" />
              </linearGradient>
            </defs>

            {Array.from({ length: ticks + 1 }, (_, i) => i * step).map((v) => (
              <g key={v}>
                <line x1={L} x2={W - R} y1={y(v)} y2={y(v)} stroke="#e5e7eb" strokeDasharray="3 4" />
                <text x={L - 8} y={y(v) + 4} textAnchor="end" fontSize="11" fill="#6b7280">
                  {compact(v)}
                </text>
              </g>
            ))}

            {months.map((mo, i) => (
              <text key={mo} x={x(i)} y={H - 8} textAnchor="middle" fontSize="11" fill="#6b7280">
                {mo}
              </text>
            ))}

            <path d={areaPath(revPts, baseY)} fill={`url(#${uid}-rev)`} style={{ animation: "chartFadeIn 700ms ease-out" }} />
            <path d={areaPath(payPts, baseY)} fill={`url(#${uid}-pay)`} style={{ animation: "chartFadeIn 900ms ease-out" }} />
            <path d={smoothPath(revPts)} fill="none" stroke={REVENUE_COLOR} strokeWidth="2" style={{ animation: "chartLineIn 800ms ease-out" }} />
            <path d={smoothPath(payPts)} fill="none" stroke={PAYOUT_COLOR} strokeWidth="2" style={{ animation: "chartLineIn 1000ms ease-out" }} />

            {hover !== null && (
              <g>
                <line x1={x(hover)} x2={x(hover)} y1={T} y2={baseY} stroke="#9ca3af" strokeDasharray="3 3" />
                <circle cx={revPts[hover].x} cy={revPts[hover].y} r="4.5" fill="#fff" stroke={REVENUE_COLOR} strokeWidth="2" />
                <circle cx={payPts[hover].x} cy={payPts[hover].y} r="4.5" fill="#fff" stroke={PAYOUT_COLOR} strokeWidth="2" />
              </g>
            )}
          </svg>

          {hover !== null && (
            <div
              className="pointer-events-none absolute top-2 -translate-x-1/2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs shadow-md"
              style={{ left: `${Math.min(88, Math.max(12, (x(hover) / W) * 100))}%`, animation: "tooltipIn 200ms ease-out" }}
            >
              <p className="mb-1 font-medium text-gray-900">{months[hover]}</p>
              <p className="text-gray-600">
                <span className="mr-1.5 inline-block h-2 w-2 rounded-full" style={{ background: REVENUE_COLOR }} />
                Revenue {money(revenue[hover])}
              </p>
              <p className="text-gray-600">
                <span className="mr-1.5 inline-block h-2 w-2 rounded-full" style={{ background: PAYOUT_COLOR }} />
                Payouts {money(payouts[hover])}
              </p>
            </div>
          )}
        </div>
      </ChartCard>

      <style jsx>{`
        @keyframes revenueChartIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes chartFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes chartLineIn {
          from { opacity: 0; stroke-dasharray: 0 1000; }
          to { opacity: 1; stroke-dasharray: 1000 0; }
        }

        @keyframes tooltipIn {
          from { opacity: 0; transform: translate(-50%, 8px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }
      `}</style>
    </>
  );
}
