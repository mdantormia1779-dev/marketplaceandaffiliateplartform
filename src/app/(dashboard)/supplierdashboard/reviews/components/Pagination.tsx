import { ChevronLeft, ChevronRight } from "lucide-react";

export function Pagination({
  page,
  totalPages,
  onPageChange,
}: {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-4 flex items-center justify-center gap-1">
      <button
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="rounded-lg border border-slate-200 p-1.5 text-slate-500 hover:border-indigo-200 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronLeft size={14} />
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`h-7 w-7 rounded-lg text-xs font-medium transition ${
            p === page ? "bg-indigo-600 text-white" : "text-slate-500 hover:bg-slate-100"
          }`}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className="rounded-lg border border-slate-200 p-1.5 text-slate-500 hover:border-indigo-200 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronRight size={14} />
      </button>
    </div>
  );
}