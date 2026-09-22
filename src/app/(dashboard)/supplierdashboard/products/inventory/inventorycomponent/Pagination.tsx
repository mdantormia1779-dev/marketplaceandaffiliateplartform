import { ChevronLeft, ChevronRight } from "lucide-react";
import { cx } from "./helpers";

export default function Pagination({
  current,
  pageCount,
  filteredCount,
  visibleCount,
  pageSize,
  onPageChange,
}: {
  current: number;
  pageCount: number;
  filteredCount: number;
  visibleCount: number;
  pageSize: number;
  onPageChange: (n: number) => void;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 pb-4">
      <p className="text-sm text-slate-500">
        Showing{" "}
        <span className="font-medium text-slate-700">
          {filteredCount === 0 ? 0 : (current - 1) * pageSize + 1}-
          {(current - 1) * pageSize + visibleCount}
        </span>{" "}
        of <span className="font-medium text-slate-700">{filteredCount}</span>
      </p>

      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => onPageChange(Math.max(1, current - 1))}
          disabled={current === 1}
          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft className="h-4 w-4" />
          Prev
        </button>

        {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onPageChange(n)}
            aria-current={n === current ? "page" : undefined}
            className={cx(
              "h-8 w-8 rounded-lg text-sm font-medium transition",
              n === current
                ? "bg-blue-600 text-white shadow-sm"
                : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
            )}
          >
            {n}
          </button>
        ))}

        <button
          type="button"
          onClick={() => onPageChange(Math.min(pageCount, current + 1))}
          disabled={current === pageCount}
          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}