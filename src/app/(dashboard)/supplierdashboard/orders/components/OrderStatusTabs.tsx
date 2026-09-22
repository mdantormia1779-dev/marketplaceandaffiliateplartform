import { ORDER_STATUSES, STATUS_LABELS } from "../types";
import type { StatusCounts, StatusFilter } from "../types";

export function OrderStatusTabs({
  activeFilter,
  onFilterChange,
  counts,
}: {
  activeFilter: StatusFilter;
  onFilterChange: (v: StatusFilter) => void;
  counts: StatusCounts;
}) {
  const tab = (isActive: boolean) =>
    `rounded-full px-3 py-1.5 text-xs font-medium transition ${
      isActive ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
    }`;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button onClick={() => onFilterChange("all")} className={tab(activeFilter === "all")}>
        All ({counts.all})
      </button>
      {ORDER_STATUSES.map((status) => (
        <button
          key={status}
          onClick={() => onFilterChange(status)}
          className={tab(activeFilter === status)}
        >
          {STATUS_LABELS[status]} ({counts[status]})
        </button>
      ))}
    </div>
  );
}