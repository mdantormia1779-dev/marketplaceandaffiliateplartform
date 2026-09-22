export function ResponseRateCard({
  responseRate,
  unansweredCount,
}: {
  responseRate: number;
  unansweredCount: number;
}) {
  return (
    <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
      <p className="text-sm text-slate-500">Response rate</p>
      <div className="mt-2 flex items-end gap-2">
        <span className="text-3xl font-semibold text-slate-900">{responseRate}%</span>
      </div>
      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
        <div className="h-full rounded-full bg-emerald-500" style={{ width: `${responseRate}%` }} />
      </div>
      <p className="mt-2 text-xs text-slate-400">
        {unansweredCount} review{unansweredCount === 1 ? "" : "s"} waiting for a reply
      </p>
    </div>
  );
}