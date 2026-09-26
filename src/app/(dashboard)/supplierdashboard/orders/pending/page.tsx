"use client";

import { useCallback, useMemo, useState } from "react";
import type { Order } from "../types";
import { ORDERS } from "../ordersData";
import type { RejectReason } from "./pendingConstants";
import {
  DEFAULT_FILTERS,
  getCodValue,
  getPendingList,
  getPendingOrders,
  getPendingValue,
  getUrgentCount,
  hasActiveFilters,
} from "./pendingUtils";
import type { PendingFilters } from "./pendingUtils";
import { useNow } from "./useNow";

import Navbar from "../../components/Navbar";
import { PendingHeader } from "./components/PendingHeader";
import { PendingSummaryCards } from "./components/PendingSummaryCards";
import { PendingToolbar } from "./components/PendingToolbar";
import { PendingList } from "./components/PendingList";
import { BulkActionBar } from "./components/BulkActionBar";
import { RejectOrderModal } from "./components/RejectOrderModal";
import { PendingToast } from "./components/PendingToast";
import type { ToastData } from "./components/PendingToast";

export default function PendingOrdersPage() {
  const [orders, setOrders] = useState<Order[]>(ORDERS);
  const [filters, setFilters] = useState<PendingFilters>(DEFAULT_FILTERS);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [rejectTarget, setRejectTarget] = useState<Order | null>(null);
  const [toast, setToast] = useState<ToastData | null>(null);
  const now = useNow();

  const pending = useMemo(() => getPendingOrders(orders), [orders]);
  const visible = useMemo(() => getPendingList(orders, filters, now), [orders, filters, now]);

  const allVisibleSelected =
    visible.length > 0 && visible.every((o) => selectedIds.includes(o.id));

  const closeToast = useCallback(() => setToast(null), []);

  const updateFilters = (patch: Partial<PendingFilters>) =>
    setFilters((prev) => ({ ...prev, ...patch }));

  const toggleSelect = (id: string) =>
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const toggleAll = () =>
    setSelectedIds(allVisibleSelected ? [] : visible.map((o) => o.id));

  const acceptOrders = (ids: string[]) => {
    // TODO: wire to your server action
    const snapshot = orders;
    setOrders((prev) =>
      prev.map((o) => (ids.includes(o.id) ? { ...o, status: "processing" } : o))
    );
    setSelectedIds((prev) => prev.filter((id) => !ids.includes(id)));
    setToast({
      message:
        ids.length === 1
          ? "Order accepted and moved to Processing"
          : `${ids.length} orders accepted and moved to Processing`,
      undo: () => setOrders(snapshot),
    });
  };

  const handleRejectConfirm = (reason: RejectReason, note: string) => {
    if (!rejectTarget) return;
    // TODO: wire to your server action (send `reason` and `note` to the backend)
    console.log("Rejected", rejectTarget.orderNumber, reason, note);

    const snapshot = orders;
    setOrders((prev) =>
      prev.map((o) =>
        o.id === rejectTarget.id
          ? {
              ...o,
              status: "cancelled",
              paymentStatus: o.paymentStatus === "paid" ? "refunded" : o.paymentStatus,
            }
          : o
      )
    );
    setSelectedIds((prev) => prev.filter((id) => id !== rejectTarget.id));
    setToast({
      message: `${rejectTarget.orderNumber} rejected`,
      undo: () => setOrders(snapshot),
    });
    setRejectTarget(null);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 py-6 pb-28 sm:px-8">
        <PendingHeader
          pendingCount={pending.length}
          urgentCount={getUrgentCount(pending, now)}
        />

        <PendingSummaryCards
          pendingCount={pending.length}
          pendingValue={getPendingValue(pending)}
          urgentCount={getUrgentCount(pending, now)}
          codAmount={getCodValue(pending)}
        />

        <PendingToolbar filters={filters} onChange={updateFilters} />

        <PendingList
          orders={visible}
          now={now}
          selectedIds={selectedIds}
          allSelected={allVisibleSelected}
          filtered={hasActiveFilters(filters)}
          onToggleSelect={toggleSelect}
          onToggleAll={toggleAll}
          onAccept={(id) => acceptOrders([id])}
          onReject={setRejectTarget}
          onClearFilters={() => setFilters(DEFAULT_FILTERS)}
        />
      </div>

      <BulkActionBar
        selectedCount={selectedIds.length}
        onAcceptSelected={() => acceptOrders(selectedIds)}
        onClear={() => setSelectedIds([])}
      />

      {rejectTarget && (
        <RejectOrderModal
          order={rejectTarget}
          onConfirm={handleRejectConfirm}
          onClose={() => setRejectTarget(null)}
        />
      )}

      {toast && <PendingToast toast={toast} onClose={closeToast} />}
    </div>
  );
}