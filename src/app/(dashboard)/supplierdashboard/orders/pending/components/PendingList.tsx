import type { Order } from "../../types";
import { PendingOrderCard } from "./PendingOrderCard";
import { PendingEmptyState } from "./PendingEmptyState";

export function PendingList({
  orders,
  now,
  selectedIds,
  allSelected,
  filtered,
  onToggleSelect,
  onToggleAll,
  onAccept,
  onReject,
  onClearFilters,
}: {
  orders: Order[];
  now: number | null;
  selectedIds: string[];
  allSelected: boolean;
  filtered: boolean;
  onToggleSelect: (orderId: string) => void;
  onToggleAll: () => void;
  onAccept: (orderId: string) => void;
  onReject: (order: Order) => void;
  onClearFilters: () => void;
}) {
  if (!orders.length) {
    return <PendingEmptyState filtered={filtered} onClear={onClearFilters} />;
  }

  return (
    <div>
      <div className="mb-3 flex items-center justify-between px-1">
        <label className="flex cursor-pointer items-center gap-2 text-xs text-slate-600">
          <input
            type="checkbox"
            checked={allSelected}
            onChange={onToggleAll}
            className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
          />
          Select all
        </label>
        <span className="text-xs text-slate-400">Showing {orders.length} pending order(s)</span>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <PendingOrderCard
            key={order.id}
            order={order}
            now={now}
            selected={selectedIds.includes(order.id)}
            onToggleSelect={onToggleSelect}
            onAccept={onAccept}
            onReject={onReject}
          />
        ))}
      </div>
    </div>
  );
}