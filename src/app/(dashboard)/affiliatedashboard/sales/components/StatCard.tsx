import { SalesStat } from "./types";

interface StatCardProps extends SalesStat {
  delay?: number;
}

export default function StatCard({
  label,
  value,
  change,
  icon: Icon,
  iconBg,
  iconColor,
  topBarColor,
  delay = 0,
}: StatCardProps) {
  return (
    <div
      className="relative bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden animate-fade-up transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md"
      style={{ animationDelay: delay + "ms" }}
    >
      <div className={"absolute top-0 left-0 right-0 h-[3px] " + topBarColor}></div>

      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-500">{label}</span>
        <div className={"p-2 rounded-xl " + iconBg + " " + iconColor}>
          <Icon className="w-4 h-4" />
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
        <div className="inline-flex items-center gap-1 mt-2 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-xs font-semibold">
          <span>↗ {change}</span>
        </div>
      </div>
    </div>
  );
}