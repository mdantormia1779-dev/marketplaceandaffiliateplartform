import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  page: number;
  pageSize: number;
  total: number;
  onPage: (p: number) => void;
  onPageSize: (n: number) => void;
}

export default function Pagination({ page, pageSize, total, onPage, onPageSize }: Props) {
  const pages = Math.max(1, Math.ceil(total / pageSize));
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);
  const btn = "flex h-8 min-w-8 items-center justify-center rounded-md border text-sm";

  return (
    <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3 text-[13px] text-slate-500">
      <div className="flex items-center gap-3">
        <span>
          Showing <b className="text-slate-800">{from}-{to}</b> of <b className="text-slate-800">{total}</b>
        </span>
        <select
          value={pageSize}
          onChange={(e) => onPageSize(Number(e.target.value))}
          className="rounded-md border border-slate-200 bg-white px-2 py-1.5 text-slate-700"
        >
          {[5, 10, 20, 50].map((n) => <option key={n} value={n}>{n} / page</option>)}
        </select>
      </div>
      <div className="flex items-center gap-1.5">
        <button disabled={page === 1} onClick={() => onPage(page - 1)} aria-label="Previous page" className={`${btn} border-slate-200 text-slate-600 disabled:opacity-40`}>
          <ChevronLeft size={16} />
        </button>
        {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            onClick={() => onPage(p)}
            className={`${btn} ${p === page ? "border-[#1fb06f] bg-[#1fb06f] font-semibold text-white" : "border-slate-200 text-slate-700 hover:bg-slate-50"}`}
          >
            {p}
          </button>
        ))}
        <button disabled={page === pages} onClick={() => onPage(page + 1)} aria-label="Next page" className={`${btn} border-slate-200 text-slate-700 disabled:opacity-40`}>
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}