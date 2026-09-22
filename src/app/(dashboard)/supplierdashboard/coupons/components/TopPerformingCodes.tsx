import type { Coupon } from "./data";
import { discountLabel } from "./lib";

export default function TopPerformingCodes({ codes }: { codes: Coupon[] }) {
  const top = [...codes].sort((a, b) => b.redemptions - a.redemptions).slice(0, 5);
  const max = top[0]?.redemptions ?? 1;

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
      <h3 className="text-sm font-semibold">Top Performing Codes</h3>
      <p className="mt-1 text-sm text-slate-500">Ranked by total redemptions across all time</p>

      <ol className="mt-4 divide-y divide-slate-100">
        {top.map((c, i) => (
          <li key={c.id} className="flex items-center gap-3 py-3">
            <span
              className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-xs font-semibold ${
                i === 0 ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"
              }`}
            >
              {i + 1}
            </span>

            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-3">
                <p className="truncate">
                  <span className="font-mono text-xs font-semibold tracking-tight">{c.code}</span>{" "}
                  <span className="text-xs text-slate-400">{discountLabel(c)}</span>
                </p>
                <span className="shrink-0 text-xs font-medium tabular-nums text-slate-600">
                  {c.redemptions.toLocaleString()}
                </span>
              </div>
              <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className={`h-full rounded-full ${i === 0 ? "bg-emerald-500" : "bg-blue-500"}`}
                  style={{ width: `${Math.round((c.redemptions / max) * 100)}%` }}
                />
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}