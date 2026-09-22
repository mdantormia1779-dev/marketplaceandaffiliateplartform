import { MousePointerClick, ShoppingBag, Users, Wallet } from "lucide-react";
import StatCard from "./StatCard";

function money(n: number) {
  if (n >= 1000) return `৳${(n / 1000).toFixed(1)}K`;
  return `৳${n.toLocaleString()}`;
}

interface StatCardsProps {
  activeCount: number;
  clicks: number;
  orders: number;
  commission: number;
}

export default function StatCards({ activeCount, clicks, orders, commission }: StatCardsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        label="Active Affiliates"
        value={String(activeCount)}
        caption="Currently promoting your products"
        icon={<Users className="h-4 w-4 text-blue-600" />}
        tint="bg-blue-50"
      />
      <StatCard
        label="Total Clicks"
        value={clicks.toLocaleString()}
        caption="Affiliate link visits this period"
        icon={<MousePointerClick className="h-4 w-4 text-violet-600" />}
        tint="bg-violet-50"
      />
      <StatCard
        label="Affiliate Orders"
        value={orders.toLocaleString()}
        caption="Orders placed via affiliate links"
        icon={<ShoppingBag className="h-4 w-4 text-emerald-600" />}
        tint="bg-emerald-50"
      />
      <StatCard
        label="Commission Payable"
        value={money(commission)}
        caption="Owed to affiliates this period"
        icon={<Wallet className="h-4 w-4 text-amber-600" />}
        tint="bg-amber-50"
      />
    </div>
  );
}