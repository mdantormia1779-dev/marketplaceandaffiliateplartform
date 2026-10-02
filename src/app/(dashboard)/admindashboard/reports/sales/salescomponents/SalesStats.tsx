import { DollarSign, Percent, ShoppingCart, TrendingUp } from "lucide-react";
import { count, money, money2, percent } from "./format";
import SalesStatCard from "./SalesStatCard";
import { Trends } from "./types";

interface Props {
  stats: { sales: number; orders: number; aov: number; growth: number };
  trends: Trends;
}

export default function SalesStats({ stats, trends }: Props) {
  const cards = [
    { title: "Total Sales", value: stats.sales, format: money, icon: DollarSign, iconClass: "bg-emerald-50 text-emerald-600", trend: trends.sales, label: "vs last period" },
    { title: "Total Orders", value: stats.orders, format: count, icon: ShoppingCart, iconClass: "bg-amber-50 text-amber-600", trend: trends.orders, label: "vs last period" },
    { title: "Avg. Order Value", value: stats.aov, format: money2, icon: Percent, iconClass: "bg-teal-50 text-teal-700", trend: trends.aov, label: "vs last period" },
    { title: "Sales Growth", value: stats.growth, format: percent, icon: TrendingUp, iconClass: "bg-gray-100 text-gray-600", trend: trends.growth, label: "year over year" },
  ];
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => <SalesStatCard key={card.title} {...card} />)}
    </div>
  );
}
