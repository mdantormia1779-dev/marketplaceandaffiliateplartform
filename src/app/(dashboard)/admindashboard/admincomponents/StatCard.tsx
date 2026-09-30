import { ArrowUpRight, ArrowDownRight, type LucideIcon } from "lucide-react";

type Tone = "green" | "orange" | "blue" | "gray";

const iconTone: Record<Tone, string> = {
  green: "bg-emerald-50 text-emerald-600",
  orange: "bg-amber-50 text-amber-500",
  blue: "bg-sky-50 text-sky-700",
  gray: "bg-slate-100 text-slate-700",
};

export type StatCardProps = {
  label: string;
  value: string;
  icon: LucideIcon;
  tone: Tone;
  change: string;
  trend?: "up" | "down";
  note?: string;
};

export default function StatCard({
  label, value, icon: Icon, tone, change, trend = "up", note = "vs last month",
}: StatCardProps) {
  const up = trend === "up";
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[13px] text-slate-600">{label}</p>
          <p className="mt-2 text-[28px] font-semibold leading-none tracking-tight text-slate-900">
            {value}
          </p>
        </div>
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${iconTone[tone]}`}>
          <Icon className="h-5 w-5" strokeWidth={1.75} />
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
        <span
          className={`inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 font-medium ${
            up ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
          }`}
        >
          {up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
          {change}
        </span>
        {note}
      </div>
    </div>
  );
}