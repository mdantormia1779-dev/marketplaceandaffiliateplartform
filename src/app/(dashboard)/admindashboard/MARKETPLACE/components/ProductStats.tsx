import { CheckCircle2, Clock, Package, XCircle } from "lucide-react";
import { TRENDS } from "./data";
import ProductStatCard from "./ProductStatCard";

interface Props {
  stats: { total: number; pending: number; approved: number; rejected: number };
}

export default function ProductStats({ stats }: Props) {
  const cards = [
    { title: "Total Products", value: stats.total, icon: Package, iconClass: "bg-emerald-50 text-emerald-600", trend: TRENDS.total },
    { title: "Pending Review", value: stats.pending, icon: Clock, iconClass: "bg-amber-50 text-amber-600", trend: TRENDS.pending },
    { title: "Approved", value: stats.approved, icon: CheckCircle2, iconClass: "bg-teal-50 text-teal-700", trend: TRENDS.approved },
    { title: "Rejected", value: stats.rejected, icon: XCircle, iconClass: "bg-gray-100 text-gray-600", trend: TRENDS.rejected },
  ];
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((c) => (
        <ProductStatCard key={c.title} {...c} />
      ))}
    </div>
  );
}