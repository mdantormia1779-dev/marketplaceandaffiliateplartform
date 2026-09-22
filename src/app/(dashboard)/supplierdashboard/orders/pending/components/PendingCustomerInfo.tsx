import { MapPin, Phone } from "lucide-react";
import type { Order } from "../../types";
import { getInitials } from "../pendingUtils";

export function PendingCustomerInfo({ order }: { order: Order }) {
  return (
    <div className="mt-3 flex items-start gap-3">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-100 to-violet-100 text-xs font-semibold text-indigo-700">
        {getInitials(order.customerName)}
      </span>
      <div>
        <p className="text-sm font-medium text-slate-800">{order.customerName}</p>
        <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-500">
          <Phone size={11} className="text-slate-400" />
          {order.customerPhone}
        </p>
        <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-400">
          <MapPin size={11} />
          {order.shippingAddress}
        </p>
      </div>
    </div>
  );
}