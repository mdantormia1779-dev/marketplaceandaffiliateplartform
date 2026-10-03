import { Banknote, CreditCard, DollarSign, TrendingUp } from "lucide-react";
import { money } from "../financecomponents/format";
import RevenueStatCard from "./RevenueStatCard";
import { PeriodData } from "./types";

interface Props {
  stats: { gross: number; payouts: number; net: number; aov: number };
  data: PeriodData;
}

export default function RevenueStats({ stats, data }: Props) {
  const label = data.compareLabel;
  const cards = [
    { title: "Gross Revenue", value: money(stats.gross), icon: DollarSign, iconClass: "bg-emerald-50 text-emerald-600", trend: data.trends.gross },
    { title: "Total Payouts", value: money(stats.payouts), icon: Banknote, iconClass: "bg-amber-50 text-amber-600", trend: data.trends.payouts },
    { title: "Net Revenue", value: money(stats.net), icon: TrendingUp, iconClass: "bg-teal-50 text-teal-700", trend: data.trends.net },
    { title: "Avg. Order Value", value: money(stats.aov, 2), icon: CreditCard, iconClass: "bg-gray-100 text-gray-600", trend: data.trends.aov },
  ];
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((c) => (
        <RevenueStatCard key={c.title} {...c} label={label} />
      ))}
    </div>
  );
}
