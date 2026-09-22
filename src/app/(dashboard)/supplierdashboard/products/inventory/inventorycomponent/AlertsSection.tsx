import { Check, PackageCheck, Plus, X } from "lucide-react";
import Thumb from "./ui/Thumb";
import StatusPill from "./ui/StatusPill";
import { cx, coverLabel, statusOf } from "./helpers";
import type { Product } from "./types";

export default function AlertsSection({
  alerts,
  onRestock,
  onRestockAll,
  onDismiss,
}: {
  alerts: Product[];
  onRestock: (id: string) => void;
  onRestockAll: () => void;
  onDismiss: (id: string) => void;
}) {
  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
      <div className="flex flex-wrap items-center gap-3 border-b border-slate-100 bg-amber-50/40 px-5 py-4">
        <span className="grid h-9 w-9 place-items-center rounded-lg bg-amber-100 text-amber-700">
          <PackageCheck className="h-4 w-4" />
        </span>
        <div className="mr-auto">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold">Low-Stock Alerts</h3>
            {alerts.length > 0 && (
              <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
                {alerts.length} need attention
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500">Products at or below their alert threshold</p>
        </div>
        <button
          type="button"
          onClick={onRestockAll}
          disabled={alerts.length === 0}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <PackageCheck className="h-4 w-4" />
          Restock all
        </button>
      </div>

      {alerts.length === 0 ? (
        <div className="flex flex-col items-center gap-2 px-5 py-12 text-center">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-emerald-50 text-emerald-600">
            <Check className="h-5 w-5" />
          </span>
          <p className="text-sm font-medium">Every SKU is above its alert level</p>
          <p className="text-xs text-slate-500">
            New alerts appear here as stock drops toward the threshold.
          </p>
        </div>
      ) : (
        <ul className="divide-y divide-slate-100">
          {alerts.map((p) => {
            const status = statusOf(p);
            return (
              <li
                key={p.id}
                className={cx(
                  "flex flex-wrap items-center gap-4 border-l-2 px-5 py-3.5 transition hover:bg-slate-50/60",
                  status === "out" ? "border-l-rose-500" : "border-l-transparent"
                )}
              >
                <Thumb product={p} />
                <div className="min-w-[200px] flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-medium">{p.name}</p>
                    <StatusPill status={status} />
                  </div>
                  <p className="mt-0.5 text-xs text-slate-500">
                    {p.sku} <span className="text-slate-300">|</span> {p.warehouse}{" "}
                    <span className="text-slate-300">|</span>{" "}
                    <span className={status === "out" ? "text-rose-600" : "text-amber-600"}>
                      {p.onHand} on hand
                    </span>{" "}
                    · alert at {p.alertAt}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-[10px] font-medium tracking-wide text-slate-400">COVER</p>
                  <p
                    className={cx(
                      "text-sm font-semibold",
                      p.coverDays === null ? "text-rose-600" : "text-slate-700"
                    )}
                  >
                    {coverLabel(p.coverDays)}
                  </p>
                </div>

                <div className="w-16 text-right">
                  <p className="text-[10px] font-medium tracking-wide text-slate-400">SUGGESTED</p>
                  <p className="text-sm font-semibold text-slate-700">
                    {p.suggested > 0 ? `+${p.suggested}` : "—"}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onRestock(p.id)}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700"
                >
                  <Plus className="h-4 w-4" />
                  Restock
                </button>
                <button
                  type="button"
                  onClick={() => onDismiss(p.id)}
                  className="rounded-md p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                  aria-label={`Dismiss alert for ${p.name}`}
                >
                  <X className="h-4 w-4" />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}