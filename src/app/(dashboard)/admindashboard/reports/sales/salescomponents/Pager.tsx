import { ChevronLeft, ChevronRight } from "lucide-react";
import { PAGE_SIZES } from "./data";

interface Props {
  from: number;
  to: number;
  total: number;
  page: number;
  pageCount: number;
  pageSize: number;
  onPage: (page: number) => void;
  onPageSize: (size: number) => void;
}

const button = "flex h-8 min-w-8 items-center justify-center rounded-lg border px-2 text-sm disabled:opacity-40";

export default function Pager({ from, to, total, page, pageCount, pageSize, onPage, onPageSize }: Props) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 p-4 text-sm text-gray-600">
      <div className="flex items-center gap-3">
        <span>Showing <span className="font-medium text-gray-900">{from}-{to}</span> of <span className="font-medium text-gray-900">{total}</span></span>
        <select value={pageSize} onChange={(event) => onPageSize(Number(event.target.value))} className="rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-sm outline-none">
          {PAGE_SIZES.map((size) => <option key={size} value={size}>{size} / page</option>)}
        </select>
      </div>
      {pageCount > 1 && (
        <div className="flex items-center gap-1.5">
          <button className={`${button} border-gray-200 hover:bg-gray-50`} disabled={page === 1} onClick={() => onPage(page - 1)} aria-label="Previous page"><ChevronLeft size={16} /></button>
          {Array.from({ length: pageCount }, (_, index) => index + 1).map((number) => (
            <button key={number} onClick={() => onPage(number)} aria-current={number === page ? "page" : undefined} className={`${button} ${number === page ? "border-emerald-600 bg-emerald-50 font-medium text-emerald-700" : "border-gray-200 hover:bg-gray-50"}`}>
              {number}
            </button>
          ))}
          <button className={`${button} border-gray-200 hover:bg-gray-50`} disabled={page === pageCount} onClick={() => onPage(page + 1)} aria-label="Next page"><ChevronRight size={16} /></button>
        </div>
      )}
    </div>
  );
}
