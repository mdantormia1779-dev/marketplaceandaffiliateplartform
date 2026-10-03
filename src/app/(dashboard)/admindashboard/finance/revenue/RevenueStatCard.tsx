import { ArrowUpRight, LucideIcon } from "lucide-react";

interface Props {
  title: string;
  value: string;
  icon: LucideIcon;
  iconClass: string;
  trend: number;
  label: string;
}

export default function RevenueStatCard({ title, value, icon: Icon, iconClass, trend, label }: Props) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-gray-600">{title}</p>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{value}</p>
        </div>
        <span className={`flex h-10 w-10 items-center justify-center rounded-lg ${iconClass}`}>
          <Icon size={20} />
        </span>
      </div>
      <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
        <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-50 px-2 py-0.5 font-medium text-emerald-700">
          <ArrowUpRight size={12} />
          {trend}%
        </span>
        {label}
      </div>
    </div>
  );
}
