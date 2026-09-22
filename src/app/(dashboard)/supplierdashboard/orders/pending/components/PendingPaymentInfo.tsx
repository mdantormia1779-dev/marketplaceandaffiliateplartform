import { PAYMENT_METHOD_LABELS, PAYMENT_STATUS_LABELS } from "../../types";
import type { Order, PaymentStatus } from "../../types";
import { formatBDT, getOrderTotal } from "../../ordersUtils";

const PAYMENT_STYLES: Record<PaymentStatus, string> = {
  paid: "bg-emerald-50 text-emerald-700",
  pending: "bg-amber-50 text-amber-700",
  refunded: "bg-slate-100 text-slate-600",
};

export function PendingPaymentInfo({ order }: { order: Order }) {
  const isCod = order.paymentMethod === "cod";

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span
        className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${PAYMENT_STYLES[order.paymentStatus]}`}
      >
        {PAYMENT_STATUS_LABELS[order.paymentStatus]}
      </span>
      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600">
        {PAYMENT_METHOD_LABELS[order.paymentMethod]}
      </span>
      {isCod && (
        <span className="text-[11px] font-medium text-amber-600">
          Collect {formatBDT(getOrderTotal(order))} on delivery
        </span>
      )}
    </div>
  );
}