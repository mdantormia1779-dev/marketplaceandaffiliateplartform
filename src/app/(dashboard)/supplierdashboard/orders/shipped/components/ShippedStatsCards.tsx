// app/(dashboard)/supplierdashboard/orders/shipped/components/ShippedStatsCards.tsx

import { Package, Truck, Clock, AlertTriangle, Wallet } from "lucide-react";
import { formatCurrency } from "../shippedUtils";

export function ShippedStatsCards({
  total,
  inTransit,
  outForDelivery,
  delayed,
  totalValue,
}: {
  total: number;
  inTransit: number;
  outForDelivery: number;
  delayed: number;
  totalValue: number;
}) {
  const cards = [
    { label: "Total Shipped", value: total, icon: Package, tone: "text-indigo-600 bg-indigo-50" },
    { label: "In Transit", value: inTransit, icon: Truck, tone: "text-amber-600 bg-amber-50" },
    { label: "Out for Delivery", value: outForDelivery, icon: Clock, tone: "text-sky-600 bg-sky-50" },
    { label: "Delayed", value: delayed, icon: AlertTriangle, tone: "text-rose-600 bg-rose-50" },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
      {cards.map(({ label, value, icon: Icon, tone }) => (
        <div key={label} className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
          <div className={`mb-2 inline-flex h-9 w-9 items-center justify-center rounded-lg ${tone}`}>
            <Icon size={16} />
          </div>
          <p className="text-xl font-semibold text-slate-900">{value}</p>
          <p className="text-xs text-slate-500">{label}</p>
        </div>
      ))}

      <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
        <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
          <Wallet size={16} />
        </div>
        <p className="text-xl font-semibold text-slate-900">{formatCurrency(totalValue)}</p>
        <p className="text-xs text-slate-500">Shipment Value</p>
      </div>
    </div>
  );
}