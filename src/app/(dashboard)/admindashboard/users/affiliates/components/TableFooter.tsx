import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  page: number;
  pageSize: number;
  total: number;
  onPage: (p: number) => void;
  onPageSize: (s: number) => void;
};

export default function TableFooter({ page, pageSize, total, onPage, onPageSize }: Props) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);

  const btn =
    "flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-sm text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 px-4 py-3 text-sm text-slate-500">
      <div className="flex items-center gap-3">
        <span>
          Showing <b className="text-slate-900">{from}–{to}</b> of {total}
        </span>
        <select
          value={pageSize}
          onChange={(e) => onPageSize(Number(e.target.value))}
          className="rounded-md border border-slate-200 bg-white px-2 py-1 text-sm text-slate-700 outline-none"
        >
          {[5, 10, 20].map((s) => (
            <option key={s} value={s}>{s} / page</option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-1.5">
        <button className={btn} disabled={page === 1} onClick={() => onPage(page - 1)}>
          <ChevronLeft className="h-4 w-4" />
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            onClick={() => onPage(p)}
            className={`flex h-8 w-8 items-center justify-center rounded-md text-sm font-medium ${
              p === page ? "bg-[#1fa85a] text-white" : "border border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            {p}
          </button>
        ))}
        <button className={btn} disabled={page === totalPages} onClick={() => onPage(page + 1)}>
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}