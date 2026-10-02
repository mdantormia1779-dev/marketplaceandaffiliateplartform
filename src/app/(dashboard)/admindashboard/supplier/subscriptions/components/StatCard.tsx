import { ReactNode } from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  icon: ReactNode;
  iconClass: string; // bg + text colour of the icon tile
  delta: string;
  deltaNote: string;
  deltaTone: "up" | "warn";
}

export default function StatCard({ label, value, icon, iconClass, delta, deltaNote, deltaTone }: StatCardProps) {
  const up = deltaTone === "up";
  return (
    <div className="rounded-xl border border-slate-200/70 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500">{label}</p>
          <p className="mt-1 text-[28px] font-bold leading-tight text-slate-900">{value}</p>
        </div>
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${iconClass}`}>{icon}</div>
      </div>
      <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
        <span
          className={`inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 font-semibold ${
            up ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
          }`}
        >
          {up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
          {delta}
        </span>
        {deltaNote}
      </div>
    </div>
  );
}