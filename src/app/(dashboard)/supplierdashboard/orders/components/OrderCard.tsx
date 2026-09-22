import { PAYMENT_METHOD_LABELS, PAYMENT_STATUS_LABELS } from "../types";
import type { Order, OrderStatus } from "../types";
import { formatBDT, formatOrderDate, getOrderItemCount, getOrderTotal } from "../ordersUtils";
import { OrderStatusBadge } from "./OrderStatusBadge";
import { OrderProductsList } from "./OrderProductsList";
import { OrderStatusUpdater } from "./OrderStatusUpdater";

export function OrderCard({
  order,
  onStatusChange,
}: {
  order: Order;
  onStatusChange: (orderId: string, status: OrderStatus) => void;
}) {
  return (
    <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-slate-900">{order.orderNumber}</span>
            <OrderStatusBadge status={order.status} />
          </div>
          <p className="mt-1 text-xs text-slate-500">
            {order.customerName} · {order.customerPhone}
          </p>
          <p className="text-xs text-slate-400">{order.shippingAddress}</p>
        </div>

        <div className="text-right">
          <p className="text-sm font-semibold text-slate-900">{formatBDT(getOrderTotal(order))}</p>
          <p className="text-xs text-slate-400">{getOrderItemCount(order)} item(s)</p>
          <p className="mt-1 text-[11px] text-slate-400">{formatOrderDate(order.createdAt)}</p>
        </div>
      </div>

      <OrderProductsList items={order.items} />

      <div className="mt-3 flex items-center justify-between gap-3">
        <span className="text-[11px] text-slate-400">
          Payment:{" "}
          <span className="font-medium text-slate-600">
            {PAYMENT_STATUS_LABELS[order.paymentStatus]}
          </span>{" "}
          · {PAYMENT_METHOD_LABELS[order.paymentMethod]}
        </span>
        <OrderStatusUpdater
          currentStatus={order.status}
          onChange={(status) => onStatusChange(order.id, status)}
        />
      </div>
    </div>
  );
}