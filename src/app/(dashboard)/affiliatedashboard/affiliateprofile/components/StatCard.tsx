import { ShoppingCart, MousePointerClick, Wallet, Users2 } from "lucide-react";
import { StatItem, StatTone } from "../types";

const ICON_MAP = {
  sales: ShoppingCart,
  clicks: MousePointerClick,
  commission: Wallet,
  referrals: Users2,
};

const TOP_BORDER: Record<StatTone, string> = {
  indigo: "before:bg-indigo-500",
  amber: "before:bg-amber-500",
  emerald: "before:bg-emerald-500",
  blue: "before:bg-blue-500",
};

const ICON_BG: Record<StatTone, string> = {
  indigo: "bg-indigo-50 text-indigo-600",
  amber: "bg-amber-50 text-amber-600",
  emerald: "bg-emerald-50 text-emerald-600",
  blue: "bg-blue-50 text-blue-600",
};

export function StatCard({ stat }: { stat: StatItem }) {
  const Icon = ICON_MAP[stat.icon];

  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-slate-100 bg-white p-4 shadow-sm before:absolute before:left-0 before:right-0 before:top-0 before:h-[3px] sm:p-5 ${TOP_BORDER[stat.tone]}`}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">{stat.label}</p>
        <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${ICON_BG[stat.tone]}`}>
          <Icon size={16} />
        </div>
      </div>

      <p className="mt-2 text-2xl font-bold text-slate-900">{stat.value}</p>

      <div className="mt-2 flex items-center justify-between">
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
          ↗ {stat.changeLabel}
        </span>
        <span className="text-[11px] text-slate-400">{stat.periodLabel}</span>
      </div>
    </div>
  );
}