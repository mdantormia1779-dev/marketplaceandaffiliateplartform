"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Order } from "../../types";
import { formatBDT, formatOrderDate, getOrderItemCount, getOrderTotal } from "../../ordersUtils";
import { OrderProductsList } from "../../components/OrderProductsList";
import { TONE_STYLES } from "../pendingConstants";
import { getUrgencyTone, getWaitingHours } from "../pendingUtils";
import { WaitingBadge } from "./WaitingBadge";
import { PendingCustomerInfo } from "./PendingCustomerInfo";
import { PendingPaymentInfo } from "./PendingPaymentInfo";
import { PendingActions } from "./PendingActions";
import { SlaBar } from "./SlaBar";
import { OrderMiniTimeline } from "./OrderMiniTimeline";
import { ContactButtons } from "./ContactButtons";

export function PendingOrderCard({
  order,
  now,
  selected,
  onToggleSelect,
  onAccept,
  onReject,
}: {
  order: Order;
  now: number | null;
  selected: boolean;
  onToggleSelect: (orderId: string) => void;
  onAccept: (orderId: string) => void;
  onReject: (order: Order) => void;
}) {
  const [open, setOpen] = useState(false);

  const accent =
    now === null
      ? "bg-slate-200"
      : TONE_STYLES[getUrgencyTone(getWaitingHours(order.createdAt, now))].accent;

  const extraItems = order.items.length - 1;

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border bg-white shadow-sm transition ${
        selected ? "border-indigo-300 ring-2 ring-indigo-100" : "border-slate-100 hover:shadow-md"
      }`}
    >
      <span className={`absolute inset-y-0 left-0 w-1 ${accent}`} />

      <div className="p-4 pl-5 sm:p-5 sm:pl-6">
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            checked={selected}
            onChange={() => onToggleSelect(order.id)}
            aria-label={`Select ${order.orderNumber}`}
            className="mt-1 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
          />

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-semibold text-slate-900">{order.orderNumber}</span>
                  <WaitingBadge createdAt={order.createdAt} now={now} />
                </div>
                <PendingCustomerInfo order={order} />
              </div>

              <div className="text-right">
                <p className="text-lg font-semibold text-slate-900">
                  {formatBDT(getOrderTotal(order))}
                </p>
                <p className="text-xs text-slate-400">{getOrderItemCount(order)} item(s)</p>
                <p className="mt-1 text-[11px] text-slate-400">{formatOrderDate(order.createdAt)}</p>
              </div>
            </div>

            <SlaBar createdAt={order.createdAt} now={now} />

            <button
              onClick={() => setOpen((v) => !v)}
              className="mt-4 flex w-full items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-left text-xs text-slate-600 transition hover:bg-slate-100"
            >
              <span className="truncate">
                {order.items[0].productName}
                {extraItems > 0 && (
                  <span className="text-slate-400"> +{extraItems} more</span>
                )}
              </span>
              <ChevronDown
                size={14}
                className={`shrink-0 text-slate-400 transition ${open ? "rotate-180" : ""}`}
              />
            </button>

            {open && (
              <div className="mt-1">
                <OrderProductsList items={order.items} />
                <OrderMiniTimeline />
              </div>
            )}

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-3">
              <div className="flex flex-wrap items-center gap-3">
                <PendingPaymentInfo order={order} />
                <ContactButtons phone={order.customerPhone} />
              </div>
              <PendingActions onAccept={() => onAccept(order.id)} onReject={() => onReject(order)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}