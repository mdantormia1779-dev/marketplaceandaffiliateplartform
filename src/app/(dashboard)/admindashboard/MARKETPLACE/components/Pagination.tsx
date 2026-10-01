import { ChevronLeft, ChevronRight } from "lucide-react";
import { PAGE_SIZE_OPTIONS } from "./usePagination";

interface Props {
  page: number;
  pageCount: number;
  total: number;
  pageSize: number;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
}

export default function Pagination({ page, pageCount, total, pageSize, setPage, setPageSize }: Props) {
  const first = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const last = Math.min(page * pageSize, total);
  const start = Math.max(1, Math.min(page - 2, pageCount - 4));
  const end = Math.min(pageCount, start + 4);
  const pages = Array.from({ length: end - start + 1 }, (_, index) => start + index);
  const btn = "flex h-8 min-w-8 items-center justify-center rounded-md border border-gray-200 px-2 text-sm text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 px-4 py-3 text-sm text-gray-500">
      <div className="flex items-center gap-3">
        <span>Showing {first}–{last} of {total}</span>
        <select
          aria-label="Rows per page"
          className="h-8 rounded-md border border-gray-200 bg-white px-2 text-sm text-gray-700 outline-none"
          value={pageSize}
          onChange={(event) => setPageSize(Number(event.target.value))}
        >
          {PAGE_SIZE_OPTIONS.map((size) => (
            <option key={size} value={size}>{size} / page</option>
          ))}
        </select>
      </div>
      <div className="flex items-center gap-1.5">
        <button aria-label="Previous page" className={btn} disabled={page === 1} onClick={() => setPage(page - 1)}>
          <ChevronLeft size={16} />
        </button>
        {pages.map((pageNumber) => (
          <button
            key={pageNumber}
            aria-label={`Page ${pageNumber}`}
            aria-current={pageNumber === page ? "page" : undefined}
            className={`${btn} ${pageNumber === page ? "border-emerald-600 bg-emerald-600 text-white hover:bg-emerald-700" : ""}`}
            onClick={() => setPage(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
        {end < pageCount && <span className="px-1">…</span>}
        {end < pageCount && (
          <button className={btn} aria-label={`Page ${pageCount}`} onClick={() => setPage(pageCount)}>
            {pageCount}
          </button>
        )}
        <button aria-label="Next page" className={btn} disabled={page === pageCount} onClick={() => setPage(page + 1)}>
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}