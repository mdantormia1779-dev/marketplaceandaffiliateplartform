import { CheckCircle2, Clock, Star, XCircle } from "lucide-react";
import { TRENDS } from "./data";
import ReviewStatCard from "./ReviewStatCard";

interface Props {
  stats: { total: number; pending: number; approved: number; hidden: number };
}

export default function ReviewStats({ stats }: Props) {
  const cards = [
    { title: "Total Reviews", value: stats.total, icon: Star, iconClass: "bg-emerald-50 text-emerald-600", trend: TRENDS.total },
    { title: "Pending", value: stats.pending, icon: Clock, iconClass: "bg-amber-50 text-amber-600", trend: TRENDS.pending },
    { title: "Approved", value: stats.approved, icon: CheckCircle2, iconClass: "bg-teal-50 text-teal-700", trend: TRENDS.approved },
    { title: "Hidden", value: stats.hidden, icon: XCircle, iconClass: "bg-gray-100 text-gray-600", trend: TRENDS.hidden },
  ];
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((c) => (
        <ReviewStatCard key={c.title} {...c} />
      ))}
    </div>
  );
}