import type { Affiliate } from "./data";

function money(n: number) {
  if (n >= 1000) return `৳${(n / 1000).toFixed(1)}K`;
  return `৳${n.toLocaleString()}`;
}

export default function TopAffiliates({ affiliates }: { affiliates: Affiliate[] }) {
  const top = [...affiliates].sort((a, b) => b.commissionEarned - a.commissionEarned).slice(0, 5);
  const max = top[0]?.commissionEarned ?? 1;

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
      <h3 className="text-sm font-semibold text-slate-900">Top Performing Affiliates</h3>
      <p className="mt-1 text-sm text-slate-500">Ranked by commission earned this period</p>

      <ol className="mt-4 divide-y divide-slate-100">
        {top.map((a, i) => (
          <li key={a.id} className="flex items-center gap-3 py-3">
            <span
              className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-xs font-semibold ${
                i === 0 ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"
              }`}
            >
              {i + 1}
            </span>

            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-3">
                <p className="truncate text-sm font-medium text-slate-800">{a.name}</p>
                <span className="shrink-0 text-xs font-semibold tabular-nums text-slate-600">
                  {money(a.commissionEarned)}
                </span>
              </div>
              <p className="mt-0.5 text-xs text-slate-400">
                {a.orders} orders · {a.clicks.toLocaleString()} clicks
              </p>
              <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className={`h-full rounded-full ${i === 0 ? "bg-emerald-500" : "bg-blue-500"}`}
                  style={{ width: `${Math.round((a.commissionEarned / max) * 100)}%` }}
                />
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}