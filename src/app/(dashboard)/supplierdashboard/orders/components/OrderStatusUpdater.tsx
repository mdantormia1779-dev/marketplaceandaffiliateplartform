import { ORDER_STATUSES, STATUS_LABELS } from "../types";
import type { OrderStatus } from "../types";

export function OrderStatusUpdater({
  currentStatus,
  onChange,
}: {
  currentStatus: OrderStatus;
  onChange: (status: OrderStatus) => void;
}) {
  if (currentStatus === "delivered" || currentStatus === "cancelled") {
    return null;
  }

  // Forward-only: current status + every later status (including "cancelled")
  const currentIndex = ORDER_STATUSES.indexOf(currentStatus);
  const allowed = ORDER_STATUSES.filter((_, i) => i >= currentIndex);

  return (
    <select
      value={currentStatus}
      onChange={(e) => onChange(e.target.value as OrderStatus)}
      className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 outline-none focus:border-indigo-400"
    >
      {allowed.map((status) => (
        <option key={status} value={status}>
          {status === currentStatus
            ? `${STATUS_LABELS[status]} (current)`
            : `Mark as ${STATUS_LABELS[status]}`}
        </option>
      ))}
    </select>
  );
}