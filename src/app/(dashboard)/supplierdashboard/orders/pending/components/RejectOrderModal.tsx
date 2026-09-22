"use client";

import { useState } from "react";
import type { Order } from "../../types";
import { formatBDT, getOrderTotal } from "../../ordersUtils";
import { REJECT_REASONS } from "../pendingConstants";
import type { RejectReason } from "../pendingConstants";

export function RejectOrderModal({
  order,
  onConfirm,
  onClose,
}: {
  order: Order;
  onConfirm: (reason: RejectReason, note: string) => void;
  onClose: () => void;
}) {
  const [reason, setReason] = useState<RejectReason>(REJECT_REASONS[0]);
  const [note, setNote] = useState("");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <h2 className="text-lg font-semibold text-slate-900">Reject {order.orderNumber}?</h2>
        <p className="mt-1 text-xs text-slate-500">
          {order.customerName} · {formatBDT(getOrderTotal(order))}. The customer will be notified.
        </p>

        {order.paymentStatus === "paid" && (
          <div className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-700">
            This order is already paid. It will be marked as refunded.
          </div>
        )}

        <div className="mt-4 space-y-2">
          {REJECT_REASONS.map((r) => (
            <label
              key={r}
              className={`flex cursor-pointer items-center gap-3 rounded-xl border px-3 py-2.5 text-sm transition ${
                reason === r
                  ? "border-rose-300 bg-rose-50 text-rose-800"
                  : "border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              <input
                type="radio"
                name="reject-reason"
                checked={reason === r}
                onChange={() => setReason(r)}
                className="h-4 w-4 accent-rose-600"
              />
              {r}
            </label>
          ))}
        </div>

        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Add a note for the customer (optional)"
          rows={2}
          className="mt-3 w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-700 outline-none focus:border-indigo-400 focus:bg-white"
        />

        <div className="mt-5 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(reason, note)}
            className="rounded-lg bg-rose-600 px-4 py-2 text-xs font-medium text-white hover:bg-rose-700"
          >
            Reject order
          </button>
        </div>
      </div>
    </div>
  );
}