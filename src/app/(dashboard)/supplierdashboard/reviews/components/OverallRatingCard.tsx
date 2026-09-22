import { Stars } from "./Stars";

export function OverallRatingCard({
  average,
  total,
}: {
  average: string;
  total: number;
}) {
  return (
    <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
      <p className="text-sm text-slate-500">Overall rating</p>
      <div className="mt-2 flex items-end gap-2">
        <span className="text-3xl font-semibold text-slate-900">{average}</span>
        <span className="mb-1 text-sm text-slate-400">/ 5</span>
      </div>
      <div className="mt-2">
        <Stars value={Math.round(Number(average))} size={16} />
      </div>
      <p className="mt-2 text-xs text-slate-400">{total} total reviews</p>
    </div>
  );
}