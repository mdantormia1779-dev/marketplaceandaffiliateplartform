import type { Order, OrderStatus } from "../types";
import { OrderCard } from "./OrderCard";

export function OrderList({
  orders,
  onStatusChange,
}: {
  orders: Order[];
  onStatusChange: (orderId: string, status: OrderStatus) => void;
}) {
  if (!orders.length) {
    return (
      <div className="rounded-xl border border-dashed border-slate-200 bg-white p-10 text-center">
        <p className="text-sm text-slate-500">No orders match this filter yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} onStatusChange={onStatusChange} />
      ))}
    </div>
  );
}