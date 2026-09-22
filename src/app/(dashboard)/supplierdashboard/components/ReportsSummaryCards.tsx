// src/app/(dashboard)/supplierdashboard/components/ReportsSummaryCards.tsx
"use client";

import { ArrowUpRight, ArrowDownRight, type LucideIcon } from "lucide-react";

export interface SummaryCard {
  title: string;
  value: string;
  growth: string;
  isPositive: boolean;
  subtitle: string;
  icon: LucideIcon;
  iconBg: string;
}

interface ReportsSummaryCardsProps {
  cards: SummaryCard[];
}

export default function ReportsSummaryCards({ cards }: ReportsSummaryCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, idx) => {
        const IconComp = card.icon;
        return (
          <div key={idx} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-4 hover:border-slate-200 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">{card.title}</span>
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${card.iconBg}`}>
                <IconComp className="w-4 h-4" />
              </div>
            </div>

            <div className="flex items-baseline gap-3">
              <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">{card.value}</h3>
              <span className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[11px] font-extrabold ${
                card.isPositive ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"
              }`}>
                {card.isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {card.growth}
              </span>
            </div>

            <p className="text-[11px] text-slate-400 font-medium">{card.subtitle}</p>
          </div>
        );
      })}
    </div>
  );
}