import { Repeat, TrendingUp, UserPlus, Users } from "lucide-react";
import CustomerStatCard from "./CustomerStatCard";
import { count, percent1 } from "./format";
import { Trends } from "./types";

interface Props {
  stats: { total: number; newCustomers: number; returning: number; repeat: number };
  trends: Trends;
  latestLabel: string;
}

export default function CustomerStats({ stats, trends, latestLabel }: Props) {
  const cards = [
    { title: "Total Customers", value: stats.total, format: count, icon: Users, iconClass: "bg-emerald-50 text-emerald-600", trend: trends.total, label: "vs last period" },
    { title: "New Customers", value: stats.newCustomers, format: count, icon: UserPlus, iconClass: "bg-amber-50 text-amber-600", trend: trends.newCustomers, label: latestLabel },
    { title: "Returning", value: stats.returning, format: count, icon: Repeat, iconClass: "bg-teal-50 text-teal-700", trend: trends.returning, label: latestLabel },
    { title: "Repeat Rate", value: stats.repeat, format: percent1, icon: TrendingUp, iconClass: "bg-gray-100 text-gray-600", trend: trends.repeat, label: "vs last period" },
  ];
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((c) => (
        <CustomerStatCard key={c.title} {...c} />
      ))}
    </div>
  );
}
