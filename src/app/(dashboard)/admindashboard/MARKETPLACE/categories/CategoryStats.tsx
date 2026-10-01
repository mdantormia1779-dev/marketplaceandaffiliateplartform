import { CheckCircle2, LayoutGrid, Tag, XCircle } from "lucide-react";
import { TRENDS } from "./data";
import CategoryStatCard from "./CategoryStatCard";

interface Props {
  stats: { total: number; active: number; inactive: number; products: number };
}

export default function CategoryStats({ stats }: Props) {
  const cards = [
    { title: "Total Categories", value: stats.total, icon: LayoutGrid, iconClass: "bg-emerald-50 text-emerald-600", trend: TRENDS.total },
    { title: "Active", value: stats.active, icon: CheckCircle2, iconClass: "bg-teal-50 text-teal-700", trend: TRENDS.active },
    { title: "Inactive", value: stats.inactive, icon: XCircle, iconClass: "bg-gray-100 text-gray-600", trend: TRENDS.inactive },
    { title: "Products Tagged", value: stats.products, icon: Tag, iconClass: "bg-amber-50 text-amber-600", trend: TRENDS.products },
  ];
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((c) => (
        <CategoryStatCard key={c.title} {...c} />
      ))}
    </div>
  );
}