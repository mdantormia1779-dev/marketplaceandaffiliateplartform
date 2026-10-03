import { DollarSign, Percent, Repeat, ShoppingCart } from "lucide-react";
import RevenueStatCard from "./RevenueStatCard";
import { Trends } from "./types";

interface Props {
  stats: { gross: number; marketplace: number; subscriptions: number; joining: number };
  trends: Trends;
}

export default function RevenueStats({ stats, trends }: Props) {
  const cards = [
    { title: "Gross Revenue", value: stats.gross, icon: DollarSign, iconClass: "bg-emerald-50 text-emerald-600", trend: trends.gross, label: "vs last period" },
    { title: "Marketplace", value: stats.marketplace, icon: ShoppingCart, iconClass: "bg-amber-50 text-amber-600", trend: trends.marketplace, label: "commission + sales" },
    { title: "Subscriptions", value: stats.subscriptions, icon: Repeat, iconClass: "bg-teal-50 text-teal-700", trend: trends.subscriptions, label: "recurring" },
    { title: "Joining Fees", value: stats.joining, icon: Percent, iconClass: "bg-gray-100 text-gray-600", trend: trends.joining, label: "one-time" },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((c) => (
        <RevenueStatCard key={c.title} {...c} />
      ))}
    </div>
  );
}
