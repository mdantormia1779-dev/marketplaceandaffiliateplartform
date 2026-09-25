import { LucideIcon, ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  topBorder: string;
  change: string;
  changeLabel: string;
  action?: ReactNode;
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  iconBg,
  iconColor,
  topBorder,
  change,
  changeLabel,
  action,
}: StatCardProps) {
  return (
    <div
      className={`rounded-2xl border border-gray-100 bg-white p-5 shadow-sm border-t-4 ${topBorder}`}
    >
      <div className="mb-4 flex items-start justify-between">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <div
          className={`flex h-9 w-9 items-center justify-center rounded-xl ${iconBg}`}
        >
          <Icon className={`h-[18px] w-[18px] ${iconColor}`} />
        </div>
      </div>

      <p className="mb-3 text-2xl font-semibold text-gray-900">{value}</p>

      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-600">
          <ArrowUpRight className="h-3 w-3" />
          {change}
        </span>
        <span className="text-xs text-gray-400">{changeLabel}</span>
      </div>

      {action ? <div className="mt-3">{action}</div> : null}
    </div>
  );
}