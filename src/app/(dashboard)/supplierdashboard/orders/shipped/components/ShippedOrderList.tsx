// app/(dashboard)/supplierdashboard/orders/shipped/components/ShippedOrderList.tsx

import { PackageSearch } from "lucide-react";
import { ShippedOrder } from "../types";
import { ShippedOrderRow } from "./ShippedOrderRow";

export function ShippedOrderList({ orders }: { orders: ShippedOrder[] }) {
  if (!orders.length) {
    return (
      <div className="flex flex-col items-center rounded-xl border border-dashed border-slate-200 bg-white p-10 text-center">
        <PackageSearch size={28} className="mb-2 text-slate-300" />
        <p className="text-sm text-slate-500">No shipped orders match this filter yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {orders.map((order) => (
        <ShippedOrderRow key={order.id} order={order} />
      ))}
    </div>
  );
}