import { cx, STATUS_META, TABS } from "./helpers";
import type { StockStatus } from "./types";

export default function FilterTabs({
  tab,
  counts,
  onChange,
}: {
  tab: "all" | StockStatus;
  counts: Record<string, number>;
  onChange: (t: "all" | StockStatus) => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-600">Filter by stock level</p>
        <p className="text-xs text-slate-400">
          {counts.low + counts.out} products need restocking
        </p>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {TABS.map(({ key, label }) => {
          const active = tab === key;
          const dot = key === "all" ? null : STATUS_META[key].dot;
          return (
            <button
              key={key}
              type="button"
              onClick={() => onChange(key)}
              className={cx(
                "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40",
                active
                  ? "bg-slate-900 text-white shadow-sm"
                  : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              )}
            >
              {dot && <span className={cx("h-1.5 w-1.5 rounded-full", dot)} />}
              {label}
              <span className={cx("text-xs", active ? "text-white/60" : "text-slate-400")}>
                {counts[key]}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}