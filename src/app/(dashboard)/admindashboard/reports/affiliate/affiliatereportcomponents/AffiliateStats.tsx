import { DollarSign, Share2, Target, TrendingUp } from "lucide-react";
import AffiliateStatCard from "./AffiliateStatCard";
import { count, money } from "./format";
import { Trends } from "./types";

interface Props {
  stats: { affiliates: number; clicks: number; conversions: number; commission: number };
  trends: Trends;
}

export default function AffiliateStats({ stats, trends }: Props) {
  const label = "vs last period";
  const cards = [
    { title: "Program Affiliates", value: stats.affiliates, format: count, icon: Share2, iconClass: "bg-amber-50 text-amber-600", trend: trends.affiliates, label },
    { title: "Total Clicks", value: stats.clicks, format: count, icon: Target, iconClass: "bg-emerald-50 text-emerald-600", trend: trends.clicks, label },
    { title: "Conversions", value: stats.conversions, format: count, icon: TrendingUp, iconClass: "bg-teal-50 text-teal-700", trend: trends.conversions, label },
    { title: "Commission Paid", value: stats.commission, format: money, icon: DollarSign, iconClass: "bg-gray-100 text-gray-600", trend: trends.commission, label },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((c) => (
        <AffiliateStatCard key={c.title} {...c} />
      ))}
    </div>
  );
}
