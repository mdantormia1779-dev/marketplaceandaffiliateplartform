import { ReactNode } from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

interface ApprovalStatCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  iconBg: string;                 // e.g. "bg-amber-100"
  trend: string;                  // e.g. "6.1%"
  trendLabel: string;             // e.g. "vs last month"
  direction: "up" | "down";       // arrow er dik
  tone: "green" | "amber";        // trend pill er color
}

export default function ApprovalStatCard({
  title, value, icon, iconBg, trend, trendLabel, direction, tone,
}: ApprovalStatCardProps) {
  const pill = tone === "green" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700";
  const Arrow = direction === "up" ? ArrowUpRight : ArrowDownRight;

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
        <span className={`inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 font-medium ${pill}`}>
          <Arrow size={12} />
          {trend}
        </span>
        {trendLabel}
      </div>
    </div>
  );
}