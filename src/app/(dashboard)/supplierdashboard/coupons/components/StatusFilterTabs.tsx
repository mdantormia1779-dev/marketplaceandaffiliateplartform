import { STATUS_META } from "./StatusBadge";
import type { CouponStatus } from "./data";

export type TabKey = "all" | CouponStatus;

const TABS: Array<{ key: TabKey; label: string }> = [
  { key: "all", label: "All codes" },
  { key: "active", label: "Active" },
  { key: "scheduled", label: "Scheduled" },
  { key: "expired", label: "Expired" },
  { key: "disabled", label: "Disabled" },
];

interface StatusFilterTabsProps {
  counts: Record<TabKey, number>;
  active: TabKey;
  onChange: (key: TabKey) => void;
}

export default function StatusFilterTabs({ counts, active, onChange }: StatusFilterTabsProps) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-600">Filter by status</p>
        <p className="text-xs text-slate-400">
          {counts.active} active · {counts.scheduled} scheduled
        </p>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {TABS.map(({ key, label }) => {
          const isActive = active === key;
          const dot = key === "all" ? null : STATUS_META[key].dot;
          return (
            <button
              key={key}
              type="button"
              onClick={() => onChange(key)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 ${
                isActive
                  ? "bg-slate-900 text-white shadow-sm"
                  : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              {dot && <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />}
              {label}
              <span className={`text-xs ${isActive ? "text-white/60" : "text-slate-400"}`}>
                {counts[key]}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}