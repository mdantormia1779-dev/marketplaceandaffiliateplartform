import { ArrowDown, ArrowUp } from "lucide-react";
import { easeOut } from "./chartUtils";
import { CATEGORY_COLORS } from "./data";
import { money, percent } from "./format";
import { Category, Sort, SortKey } from "./types";

const COLS: { key: SortKey; label: string }[] = [
  { key: "name", label: "Category" },
  { key: "revenue", label: "Revenue" },
  { key: "share", label: "Share" },
];

interface Props {
  rows: Category[];
  sort: Sort;
  onSort: (key: SortKey) => void;
  progress: number;
}

export default function CategoryTable({ rows, sort, onSort, progress }: Props) {
  const p = easeOut(progress);

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] text-left">
        <thead>
          <tr className="border-t border-gray-100 text-xs font-medium uppercase tracking-wide text-gray-500">
            {COLS.map((c) => {
              const active = sort.key === c.key;
              return (
                <th
                  key={c.key}
                  className="px-5 py-3 font-medium"
                  aria-sort={active ? (sort.dir === "asc" ? "ascending" : "descending") : "none"}
                >
                  <button onClick={() => onSort(c.key)} className="inline-flex items-center gap-1 uppercase hover:text-gray-900">
                    {c.label}
                    {active && (sort.dir === "asc" ? <ArrowUp size={12} /> : <ArrowDown size={12} />)}
                  </button>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={COLS.length} className="px-5 py-12 text-center text-sm text-gray-500">
                No categories match your search.
              </td>
            </tr>
          ) : (
            rows.map((c) => (
              <tr key={c.name} className="border-t border-gray-100 text-sm text-gray-700">
                <td className="px-5 py-3.5 font-medium text-gray-900">{c.name}</td>
                <td className="px-5 py-3.5 font-semibold text-gray-900">{money(c.revenue)}</td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="h-1.5 w-24 overflow-hidden rounded-full bg-gray-200">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${c.share * p}%`, background: CATEGORY_COLORS[c.index % CATEGORY_COLORS.length] }}
                      />
                    </div>
                    <span className="text-xs text-gray-600">{percent(c.share)}</span>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
