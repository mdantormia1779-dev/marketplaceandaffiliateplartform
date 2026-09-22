"use client";

import { LucideIcon, ArrowUpRight, ArrowDownRight } from "lucide-react";

export type StatItem = {
  title: string;
  value: string;
  change: string;
  isPositive?: boolean;
  subtext: string;
  icon: LucideIcon;
  iconBg: string;
};

interface SalesCardsProps {
  stats: StatItem[];
}

export default function SalesCards({ stats }: SalesCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        const positive = stat.isPositive ?? true;

        return (
          <div
            key={stat.title}
            className="flex flex-col justify-between rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">
                {stat.title}
              </span>
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-xl ${stat.iconBg}`}
              >
                <Icon className="h-4 w-4" />
              </div>
            </div>

            <div className="mt-4">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-extrabold text-slate-900">
                  {stat.value}
                </span>
                <span
                  className={`inline-flex items-center rounded-md px-1.5 py-0.5 text-[11px] font-bold ${
                    positive
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-rose-50 text-rose-700"
                  }`}
                >
                  {positive ? (
                    <ArrowUpRight className="mr-0.5 h-3 w-3" />
                  ) : (
                    <ArrowDownRight className="mr-0.5 h-3 w-3" />
                  )}
                  {stat.change}
                </span>
              </div>
              <p className="mt-1 text-[11px] font-medium text-slate-400">
                {stat.subtext}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}