import { Subscription } from "./types";

export default function UsageBar({ subscription: s }: { subscription: Subscription }) {
  const pct = s.productsLimit ? Math.min(100, Math.round((s.productsUsed / s.productsLimit) * 100)) : 0;
  const remaining = Math.max(0, s.productsLimit - s.productsUsed);
  const color = pct >= 100 ? "bg-red-500" : pct >= 80 ? "bg-amber-500" : "bg-blue-600";

  return (
    <div className="rounded-xl border border-slate-200 p-5">
      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-700">Products</span>
        <span className="text-slate-500"><b className="text-slate-900">{s.productsUsed}</b> / {s.productsLimit} used</span>
      </div>
      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-200">
        <div className={`h-full rounded-full transition-all ${color}`} style={{ width: `${pct}%` }} />
      </div>
      <p className="mt-3 text-xs text-slate-500">
        {pct}% of your product limit used · {remaining} slots remaining
      </p>
    </div>
  );
}