import { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  iconBg: string;      // e.g. "bg-emerald-100"
  trend: string;       // e.g. "3.4%"
  trendLabel: string;  // e.g. "vs last month"
}

export default function StatCard({ title, value, icon, iconBg, trend, trendLabel }: StatCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="mt-1 text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${iconBg}`}>
          {icon}
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
        <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-100 px-2 py-0.5 font-medium text-emerald-700">
          <ArrowUpRight size={12} />
          {trend}
        </span>
        {trendLabel}
      </div>
    </div>
  );
}