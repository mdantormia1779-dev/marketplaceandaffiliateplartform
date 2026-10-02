import { CheckCircle2, Clock, DollarSign, XCircle } from "lucide-react";
import { TRENDS } from "./data";
import { money } from "./format";
import WithdrawalStatCard from "./WithdrawalStatCard";

interface Props {
  stats: { pending: number; pendingAmount: number; processed: number; rejected: number };
}

export default function WithdrawalStats({ stats }: Props) {
  const cards = [
    { title: "Pending Withdrawals", value: stats.pending.toLocaleString(), icon: Clock, iconClass: "bg-amber-50 text-amber-600", trend: TRENDS.pending },
    { title: "Pending Amount", value: money(stats.pendingAmount), icon: DollarSign, iconClass: "bg-emerald-50 text-emerald-600", trend: TRENDS.pendingAmount },
    { title: "Processed This Month", value: money(stats.processed), icon: CheckCircle2, iconClass: "bg-teal-50 text-teal-700", trend: TRENDS.processed },
    { title: "Rejected", value: stats.rejected.toLocaleString(), icon: XCircle, iconClass: "bg-gray-100 text-gray-600", trend: TRENDS.rejected },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <WithdrawalStatCard key={card.title} {...card} />
      ))}
    </div>
  );
}
