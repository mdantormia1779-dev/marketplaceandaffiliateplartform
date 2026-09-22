import { formatBDT } from "../ordersUtils";

export function OrderSummaryCards({
  totalOrders,
  pendingCount,
  deliveredCount,
  totalRevenue,
}: {
  totalOrders: number;
  pendingCount: number;
  deliveredCount: number;
  totalRevenue: number;
}) {
  const cards = [
    { label: "Total orders", value: totalOrders.toString() },
    { label: "Pending action", value: pendingCount.toString() },
    { label: "Delivered", value: deliveredCount.toString() },
    { label: "Revenue", value: formatBDT(totalRevenue) },
  ];

  return (
    <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
      {cards.map((card) => (
        <div key={card.label} className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">{card.label}</p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">{card.value}</p>
        </div>
      ))}
    </div>
  );
}