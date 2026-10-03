import { ArrowLeftRight, CheckCircle2, DollarSign, XCircle } from "lucide-react";
import { TRENDS } from "./data";
import { money } from "./format";
import TransactionStatCard from "./TransactionStatCard";

interface Props {
  stats: { today: number; gross: number; completed: number; failed: number };
}

export default function TransactionStats({ stats }: Props) {
  const cards = [
    { title: "Transactions Today", value: stats.today.toLocaleString(), icon: ArrowLeftRight, iconClass: "bg-emerald-50 text-emerald-600", trend: TRENDS.today },
    { title: "Gross Volume", value: money(stats.gross), icon: DollarSign, iconClass: "bg-amber-50 text-amber-600", trend: TRENDS.gross },
    { title: "Completed", value: stats.completed.toLocaleString(), icon: CheckCircle2, iconClass: "bg-teal-50 text-teal-700", trend: TRENDS.completed },
    { title: "Failed", value: stats.failed.toLocaleString(), icon: XCircle, iconClass: "bg-gray-100 text-gray-600", trend: TRENDS.failed },
  ];
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((c) => (
        <TransactionStatCard key={c.title} {...c} />
      ))}
    </div>
  );
}
