import type { ReactNode } from "react";

interface StatCardProps {
  label: string;
  value: string;
  caption: string;
  icon: ReactNode;
  tint: string;
}

export default function StatCard({ label, value, caption, icon, tint }: StatCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
      <div className="flex items-start justify-between">
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <span className={`grid h-8 w-8 place-items-center rounded-lg ${tint}`}>{icon}</span>
      </div>
      <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">{value}</p>
      <p className="mt-1 text-xs text-slate-400">{caption}</p>
    </div>
  );
}