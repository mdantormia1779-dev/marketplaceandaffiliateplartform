import { ArrowDown, ArrowUp } from "lucide-react";
import { count, money } from "./format";
import { MonthRow, Sort, SortKey } from "./types";

const COLUMNS: { key: SortKey; label: string }[] = [
  { key: "month", label: "Month" },
  { key: "revenue", label: "Revenue" },
  { key: "orders", label: "Orders" },
  { key: "aov", label: "Avg. Order Value" },
];

interface Props {
  rows: MonthRow[];
  sort: Sort;
  onSort: (key: SortKey) => void;
}

export default function SalesTable({ rows, sort, onSort }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] text-left">
        <thead>
          <tr className="border-t border-gray-100 text-xs font-medium uppercase tracking-wide text-gray-500">
            {COLUMNS.map((column) => {
              const active = sort.key === column.key;
              return (
                <th key={column.key} className="px-5 py-3 font-medium" aria-sort={active ? (sort.dir === "asc" ? "ascending" : "descending") : "none"}>
                  <button onClick={() => onSort(column.key)} className="inline-flex items-center gap-1 uppercase hover:text-gray-900">
                    {column.label}
                    {active && (sort.dir === "asc" ? <ArrowUp size={12} /> : <ArrowDown size={12} />)}
                  </button>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr><td colSpan={COLUMNS.length} className="px-5 py-12 text-center text-sm text-gray-500">No months match your search.</td></tr>
          ) : (
            rows.map((row) => (
              <tr key={row.month} className="border-t border-gray-100 text-sm text-gray-700">
                <td className="px-5 py-3.5 font-medium text-gray-900">{row.month}</td>
                <td className="px-5 py-3.5 font-semibold text-gray-900">{money(row.revenue)}</td>
                <td className="px-5 py-3.5">{count(row.orders)}</td>
                <td className="px-5 py-3.5">{money(row.aov)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
