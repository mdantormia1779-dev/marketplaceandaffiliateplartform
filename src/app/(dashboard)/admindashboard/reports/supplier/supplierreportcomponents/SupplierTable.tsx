import { ArrowDown, ArrowUp, Star } from "lucide-react";
import SupplierStatusBadge from "./SupplierStatusBadge";
import { count, money, percent } from "./format";
import { Sort, SortKey, Supplier } from "./types";

const COLS: { key: SortKey | null; label: string }[] = [
  { key: "name", label: "Supplier" },
  { key: null, label: "Category" },
  { key: "orders", label: "Orders" },
  { key: "fillRate", label: "Fill Rate" },
  { key: "payouts", label: "Payouts" },
  { key: "rating", label: "Rating" },
  { key: null, label: "Status" },
];

interface Props {
  rows: Supplier[];
  sort: Sort;
  onSort: (key: SortKey) => void;
}

export default function SupplierTable({ rows, sort, onSort }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[900px] text-left">
        <thead>
          <tr className="border-t border-gray-100 text-xs font-medium uppercase tracking-wide text-gray-500">
            {COLS.map((c) => {
              const active = c.key !== null && sort.key === c.key;
              return (
                <th
                  key={c.label}
                  className="px-5 py-3 font-medium"
                  aria-sort={active ? (sort.dir === "asc" ? "ascending" : "descending") : "none"}
                >
                  {c.key ? (
                    <button onClick={() => onSort(c.key as SortKey)} className="inline-flex items-center gap-1 uppercase hover:text-gray-900">
                      {c.label}
                      {active && (sort.dir === "asc" ? <ArrowUp size={12} /> : <ArrowDown size={12} />)}
                    </button>
                  ) : (
                    c.label
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={COLS.length} className="px-5 py-12 text-center text-sm text-gray-500">
                No suppliers match your filters.
              </td>
            </tr>
          ) : (
            rows.map((s) => (
              <tr key={s.id} className="border-t border-gray-100 text-sm text-gray-700">
                <td className="px-5 py-3 font-medium text-gray-900">{s.name}</td>
                <td className="px-5 py-3 text-gray-500">{s.category}</td>
                <td className="px-5 py-3 font-medium text-gray-900">{count(s.orders)}</td>
                <td className="px-5 py-3">{percent(s.fillRate)}</td>
                <td className="px-5 py-3 font-semibold text-gray-900">{money(s.payouts)}</td>
                <td className="px-5 py-3">
                  <span className="inline-flex items-center gap-1 text-amber-500">
                    <Star size={12} className="fill-current" />
                    {s.rating.toFixed(1)}
                  </span>
                </td>
                <td className="px-5 py-3"><SupplierStatusBadge status={s.status} /></td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
