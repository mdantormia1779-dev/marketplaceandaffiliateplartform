import { DollarSign, PackageCheck, Percent, Truck } from "lucide-react";
import SupplierStatCard from "./SupplierStatCard";
import { count, money, percent } from "./format";
import { Trends } from "./types";

interface Props {
  stats: { suppliers: number; orders: number; fillRate: number; payouts: number };
  trends: Trends;
}

export default function SupplierStats({ stats, trends }: Props) {
  const label = "vs last period";
  const cards = [
    { title: "Active Suppliers", value: stats.suppliers, format: count, icon: Truck, iconClass: "bg-amber-50 text-amber-600", trend: trends.suppliers, label },
    { title: "Orders", value: stats.orders, format: count, icon: PackageCheck, iconClass: "bg-emerald-50 text-emerald-600", trend: trends.orders, label },
    { title: "Fill Rate", value: stats.fillRate, format: percent, icon: Percent, iconClass: "bg-teal-50 text-teal-700", trend: trends.fillRate, label },
    { title: "Payouts", value: stats.payouts, format: money, icon: DollarSign, iconClass: "bg-gray-100 text-gray-600", trend: trends.payouts, label },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((c) => (
        <SupplierStatCard key={c.title} {...c} />
      ))}
    </div>
  );
}
