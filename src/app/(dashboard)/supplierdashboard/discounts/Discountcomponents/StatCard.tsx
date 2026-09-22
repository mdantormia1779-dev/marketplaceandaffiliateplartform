import type { ReactNode } from "react";
import { TrendingUp } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  change?: number;
  caption: string;
  icon: ReactNode;
  tint: string;
}

export default function StatCard({ label, value, change, caption, icon, tint }: StatCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
      <div className="flex items-start justify-between">
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <span className={`grid h-8 w-8 place-items-center rounded-lg ${tint}`}>{icon}</span>
      </div>
      <div className="mt-3 flex items-center gap-2">
        <p className="text-3xl font-semibold tracking-tight text-slate-900">{value}</p>
        {change !== undefined && (
          <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
            <TrendingUp className="h-3 w-3" />
            {change}%
          </span>
        )}
      </div>
      <p className="mt-1 text-xs text-slate-400">{caption}</p>
    </div>
  );
}