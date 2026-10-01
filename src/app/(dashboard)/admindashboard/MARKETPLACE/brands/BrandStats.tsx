import { CheckCircle2, Clock, Package, ShieldCheck } from "lucide-react";
import BrandStatCard from "./BrandStatCard";
import { TRENDS } from "./data";

interface Props {
  stats: { total: number; active: number; pending: number; products: number };
}

export default function BrandStats({ stats }: Props) {
  const cards = [
    { title: "Total Brands", value: stats.total, icon: ShieldCheck, iconClass: "bg-emerald-50 text-emerald-600", trend: TRENDS.total },
    { title: "Active", value: stats.active, icon: CheckCircle2, iconClass: "bg-teal-50 text-teal-700", trend: TRENDS.active },
    { title: "Pending", value: stats.pending, icon: Clock, iconClass: "bg-amber-50 text-amber-600", trend: TRENDS.pending },
    { title: "Products", value: stats.products, icon: Package, iconClass: "bg-gray-100 text-gray-600", trend: TRENDS.products },
  ];
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((c) => (
        <BrandStatCard key={c.title} {...c} />
      ))}
    </div>
  );
}