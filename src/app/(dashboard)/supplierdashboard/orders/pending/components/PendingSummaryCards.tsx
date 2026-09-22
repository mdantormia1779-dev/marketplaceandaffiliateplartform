import { AlarmClock, Banknote, ClipboardList, Wallet } from "lucide-react";
import { formatBDT } from "../../ordersUtils";

export function PendingSummaryCards({
  pendingCount,
  pendingValue,
  urgentCount,
  codAmount,
}: {
  pendingCount: number;
  pendingValue: number;
  urgentCount: number;
  codAmount: number;
}) {
  const cards = [
    {
      label: "Awaiting action",
      value: pendingCount.toString(),
      hint: "Orders to review",
      icon: ClipboardList,
      tone: "bg-indigo-50 text-indigo-600",
    },
    {
      label: "Pending value",
      value: formatBDT(pendingValue),
      hint: "Total order amount",
      icon: Wallet,
      tone: "bg-emerald-50 text-emerald-600",
    },
    {
      label: "Waiting 24h+",
      value: urgentCount.toString(),
      hint: urgentCount > 0 ? "Needs attention now" : "All within limit",
      icon: AlarmClock,
      tone: urgentCount > 0 ? "bg-rose-50 text-rose-600" : "bg-slate-100 text-slate-500",
    },
    {
      label: "COD to collect",
      value: formatBDT(codAmount),
      hint: "Cash on delivery",
      icon: Banknote,
      tone: "bg-amber-50 text-amber-600",
    },
  ];

  return (
    <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:p-5"
        >
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">{card.label}</p>
            <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${card.tone}`}>
              <card.icon size={18} />
            </span>
          </div>
          <p className="mt-3 text-2xl font-semibold text-slate-900">{card.value}</p>
          <p className="mt-1 text-xs text-slate-400">{card.hint}</p>
        </div>
      ))}
    </div>
  );
}