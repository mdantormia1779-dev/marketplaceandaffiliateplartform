import { revenueByPlan, stats } from "../data";
import { money, moneyShort } from "../utils";

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-slate-100 px-4 py-3.5">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-bold text-slate-900">{value}</p>
    </div>
  );
}

export default function RevenuePanel() {
  const max = Math.max(...revenueByPlan.map((r) => r.value));
  return (
    <section className="rounded-xl border border-slate-200/70 bg-white shadow-sm">
      <header className="border-b border-slate-100 px-5 py-4">
        <h2 className="text-[15px] font-semibold text-slate-900">Recurring Revenue</h2>
        <p className="text-[13px] text-slate-500">Monthly subscription revenue by plan</p>
      </header>
      <div className="p-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Metric label="Monthly Recurring" value={moneyShort(stats.monthly)} />
          <Metric label="Annual Run Rate" value={moneyShort(stats.annualRunRate)} />
          <Metric label="Avg. Plan Value" value={money(stats.avgPlanValue)} />
        </div>
        <ul className="mt-6 space-y-3">
          {revenueByPlan.map((r) => (
            <li key={r.name} className="flex items-center gap-3 text-sm">
              <span className="w-16 text-slate-600">{r.name}</span>
              <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full rounded-full" style={{ width: `${(r.value / max) * 100}%`, background: r.color }} />
              </div>
              <span className="w-20 text-right font-semibold text-slate-900">{moneyShort(r.value)}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}