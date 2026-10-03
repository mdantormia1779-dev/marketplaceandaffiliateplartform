interface Props {
  page: number;
  totalPages: number;
  onPage: (n: number) => void;
}

export default function Pager({ page, totalPages, onPage }: Props) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-between gap-3 border-t border-gray-100 px-5 py-4 text-sm text-gray-600">
      <span>Page {page} of {totalPages}</span>
      <div className="flex items-center gap-2">
        <button onClick={() => onPage(page - 1)} disabled={page <= 1} className="rounded-lg border border-gray-200 px-3 py-1.5 disabled:cursor-not-allowed disabled:opacity-40">Prev</button>
        {pages.map((n) => (
          <button
            key={n}
            onClick={() => onPage(n)}
            className={`h-8 w-8 rounded-lg text-sm ${n === page ? "bg-gray-900 text-white" : "border border-gray-200 text-gray-600 hover:bg-gray-50"}`}
          >
            {n}
          </button>
        ))}
        <button onClick={() => onPage(page + 1)} disabled={page >= totalPages} className="rounded-lg border border-gray-200 px-3 py-1.5 disabled:cursor-not-allowed disabled:opacity-40">Next</button>
      </div>
    </div>
  );
}
