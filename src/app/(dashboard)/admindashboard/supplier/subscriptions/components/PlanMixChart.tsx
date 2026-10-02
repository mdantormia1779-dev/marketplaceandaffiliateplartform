import { planMix } from "../data";

export default function PlanMixChart() {
  const total = planMix.reduce((s, p) => s + p.value, 0);
  const r = 80;
  const c = 2 * Math.PI * r;
  const gap = 3;
  let offset = 0;

  return (
    <section className="rounded-xl border border-slate-200/70 bg-white shadow-sm">
      <header className="border-b border-slate-100 px-5 py-4">
        <h2 className="text-[15px] font-semibold text-slate-900">Plan Mix</h2>
        <p className="text-[13px] text-slate-500">Subscribers by plan</p>
      </header>
      <div className="p-5">
        <div className="relative mx-auto h-[200px] w-[200px]">
          <svg viewBox="0 0 200 200" className="-rotate-90">
            {planMix.map((p) => {
              const len = (p.value / total) * c;
              const el = (
                <circle
                  key={p.name}
                  cx="100"
                  cy="100"
                  r={r}
                  fill="none"
                  stroke={p.color}
                  strokeWidth="26"
                  strokeDasharray={`${Math.max(len - gap, 0)} ${c}`}
                  strokeDashoffset={-offset}
                />
              );
              offset += len;
              return el;
            })}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-slate-900">{total}</span>
            <span className="text-xs text-slate-500">subscribers</span>
          </div>
        </div>
        <ul className="mt-6 space-y-3">
          {planMix.map((p) => (
            <li key={p.name} className="flex items-center justify-between text-sm text-slate-700">
              <span className="flex items-center gap-2.5">
                <span className="h-2 w-2 rounded-full" style={{ background: p.color }} />
                {p.name}
              </span>
              <span>{p.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}