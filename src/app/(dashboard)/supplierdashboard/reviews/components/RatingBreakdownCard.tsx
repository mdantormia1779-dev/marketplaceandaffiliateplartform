import { Star } from "lucide-react";
import { StarFilter } from "../types";

type Breakdown = { star: StarFilter; count: number; pct: number };

export function RatingBreakdownCard({
  breakdown,
  onSelectStar,
}: {
  breakdown: Breakdown[];
  onSelectStar: (star: StarFilter) => void;
}) {
  return (
    <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm lg:col-span-1">
      <p className="mb-3 text-sm text-slate-500">Rating breakdown</p>
      <div className="space-y-2">
        {breakdown.map(({ star, count, pct }) => (
          <button
            key={star}
            onClick={() => onSelectStar(star)}
            className="flex w-full items-center gap-2 text-left"
          >
            <span className="w-3 text-xs text-slate-500">{star}</span>
            <Star size={12} className="fill-amber-400 text-amber-400" />
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full rounded-full bg-indigo-600" style={{ width: `${pct}%` }} />
            </div>
            <span className="w-6 text-right text-xs text-slate-400">{count}</span>
          </button>
        ))}
      </div>
    </div>
  );
}