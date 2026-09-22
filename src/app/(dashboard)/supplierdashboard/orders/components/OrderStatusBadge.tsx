import { STATUS_LABELS } from "../types";
import type { OrderStatus } from "../types";

const STATUS_STYLES: Record<OrderStatus, string> = {
  new: "bg-indigo-50 text-indigo-700",
  processing: "bg-amber-50 text-amber-700",
  shipped: "bg-blue-50 text-blue-700",
  delivered: "bg-emerald-50 text-emerald-700",
  cancelled: "bg-rose-50 text-rose-700",
};

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${STATUS_STYLES[status]}`}>
      {STATUS_LABELS[status]}
    </span>
  );
}