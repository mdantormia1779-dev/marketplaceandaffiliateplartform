import { CheckCircle2, Clock, CreditCard, RotateCcw } from "lucide-react";
import { TRENDS } from "./data";
import { money } from "./format";
import RefundStatCard from "./RefundStatCard";

interface Props {
  stats: { open: number; refundedAmount: number; approved: number; rate: number };
}

export default function RefundStats({ stats }: Props) {
  const cards = [
    { title: "Open Requests", value: stats.open.toLocaleString(), icon: Clock, iconClass: "bg-amber-50 text-amber-600", trend: TRENDS.open },
    { title: "Refunded This Month", value: money(stats.refundedAmount), icon: RotateCcw, iconClass: "bg-emerald-50 text-emerald-600", trend: TRENDS.refunded },
    { title: "Approved", value: stats.approved.toLocaleString(), icon: CheckCircle2, iconClass: "bg-teal-50 text-teal-700", trend: TRENDS.approved },
    { title: "Refund Rate", value: `${stats.rate.toFixed(1)}%`, icon: CreditCard, iconClass: "bg-gray-100 text-gray-600", trend: TRENDS.rate },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((c) => (
        <RefundStatCard key={c.title} {...c} />
      ))}
    </div>
  );
}
