"use client";

import { ArrowUpRight, LucideIcon } from "lucide-react";
import { useCountUp } from "./useAnimations";

interface Props {
  title: string;
  value: number;
  format: (n: number) => string;
  icon: LucideIcon;
  iconClass: string;
  trend: number;
  label: string;
}

export default function AffiliateStatCard({ title, value, format, icon: Icon, iconClass, trend, label }: Props) {
  const shown = useCountUp(value);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-gray-600">{title}</p>
          <p className="mt-2 text-3xl font-semibold tabular-nums text-gray-900">{format(shown)}</p>
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
