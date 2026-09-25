import { StatCardData } from "./types";

interface StatCardProps extends StatCardData {
  delay?: number;
}

export default function StatCard({
  label,
  value,
  change,
  trend,
  icon: Icon,
  iconBg,
  iconColor,
  delay = 0,
}: StatCardProps) {
  return (
    <div
      className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm relative overflow-hidden flex flex-col justify-between animate-fade-up transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-slate-500">{label}</span>
        <div className={`p-2 rounded-xl ${iconBg} ${iconColor}`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
        <div
          className={`inline-flex items-center gap-1 mt-2 px-2 py-0.5 rounded-md text-xs font-semibold ${
            trend === "up"
              ? "bg-emerald-50 text-emerald-700"
              : "bg-amber-50 text-amber-700"
          }`}
        >
          <span>
            {trend === "up" ? "↗" : "↘"} {change}
          </span>
        </div>
      </div>
    </div>
  );
}