// app/(dashboard)/supplierdashboard/orders/shipped/components/ShippedOrderRow.tsx

import { MapPin, Package } from "lucide-react";
import { ShippedOrder } from "../types";
import { formatCurrency, formatDate } from "../shippedUtils";
import { StatusBadge } from "./StatusBadge";
import { TrackingCell } from "./TrackingCell";

export function ShippedOrderRow({ order }: { order: ShippedOrder }) {
  return (
    <div className="grid grid-cols-1 gap-3 rounded-xl border border-slate-100 bg-white p-4 shadow-sm transition hover:border-indigo-100 sm:p-5 lg:grid-cols-[1.6fr_1.2fr_1.2fr_1fr_0.9fr_auto] lg:items-center lg:gap-4">
      {/* Product & Order */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-400">
          <Package size={16} />
        </div>
        <div>
          <p className="text-sm font-medium text-slate-900">{order.productName}</p>
          <p className="text-xs text-slate-400">
            {order.orderNumber} · Qty {order.quantity}
          </p>
        </div>
      </div>

      {/* Customer */}
      <div>
        <p className="text-sm text-slate-700">{order.customerName}</p>
        <p className="flex items-center gap-1 text-xs text-slate-400">
          <MapPin size={11} /> {order.city}
        </p>
      </div>

      {/* Tracking */}
      <TrackingCell courier={order.courier} trackingId={order.trackingId} />

      {/* Dates */}
      <div className="text-xs text-slate-500">
        <p>
          Shipped: <span className="text-slate-700">{formatDate(order.shippedDate)}</span>
        </p>
        <p>
          Expected: <span className="text-slate-700">{formatDate(order.expectedDelivery)}</span>
        </p>
      </div>

      {/* Amount */}
      <div>
        <p className="text-sm font-medium text-slate-900">{formatCurrency(order.orderValue)}</p>
        <p className="text-[11px] text-slate-400">{order.paymentMethod}</p>
      </div>

      {/* Status */}
      <div className="flex lg:justify-end">
        <StatusBadge status={order.status} />
      </div>
    </div>
  );
}