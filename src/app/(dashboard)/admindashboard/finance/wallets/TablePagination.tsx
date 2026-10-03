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

const btn = "rounded-lg border border-gray-200 px-3 py-1.5 text-sm disabled:opacity-40 hover:bg-gray-50";

export default function TablePagination({ from, to, total, page, pageCount, pageSize, onPage, onPageSize }: Props) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 p-4 text-sm text-gray-600">
      <div className="flex items-center gap-3">
        <span>
          Showing <span className="font-medium text-gray-900">{from}-{to}</span> of {" "}
          <span className="font-medium text-gray-900">{total}</span>
        </span>
        <select
          value={pageSize}
          onChange={(e) => onPageSize(Number(e.target.value))}
          className="rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-sm outline-none"
        >
          {PAGE_SIZES.map((n) => (
            <option key={n} value={n}>
              {n} / page
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center gap-2">
        <button className={btn} disabled={page === 1} onClick={() => onPage(page - 1)}>
          Previous
        </button>
        <span>
          Page {page} of {pageCount}
        </span>
        <button className={btn} disabled={page === pageCount} onClick={() => onPage(page + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}
