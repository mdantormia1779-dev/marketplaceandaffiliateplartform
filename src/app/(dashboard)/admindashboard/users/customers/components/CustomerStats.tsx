import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import type { Stat } from "../types"; // পাথ চেক করুন

function StatCard({ label, value, change, up, icon: Icon, iconBg, iconColor }: Stat) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-slate-500">{label}</p>
          <p className="mt-2 text-[28px] font-semibold leading-none text-slate-900">{value}</p>
        </div>
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${iconBg} ${iconColor}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
        <span
          className={`flex items-center gap-0.5 rounded-full px-2 py-0.5 font-medium ${
            up ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
          }`}
        >
          {up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
          {change}
        </span>
        vs last month
      </div>
    </div>
  );
}

export default function CustomerStats({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((s) => (
        <StatCard key={s.label} {...s} />
      ))}
    </div>
  );
}