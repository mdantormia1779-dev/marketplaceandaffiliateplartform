import { ArrowDown, ArrowUp } from "lucide-react";
import CustomerAvatar from "./CustomerAvatar";
import CustomerStatusBadge from "./CustomerStatusBadge";
import { count, money0, money2 } from "./format";
import SegmentBadge from "./SegmentBadge";
import { Customer, Sort, SortKey } from "./types";

const COLS: { key: SortKey | null; label: string }[] = [
  { key: "name", label: "Customer" },
  { key: "orders", label: "Orders" },
  { key: "spent", label: "Total Spent" },
  { key: "aov", label: "AOV" },
  { key: null, label: "Segment" },
  { key: null, label: "Status" },
];

interface Props {
  rows: Customer[];
  sort: Sort;
  onSort: (key: SortKey) => void;
}

export default function CustomerTable({ rows, sort, onSort }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[820px] text-left">
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
                No customers match your filters.
              </td>
            </tr>
          ) : (
            rows.map((c) => (
              <tr key={c.id} className="border-t border-gray-100 text-sm text-gray-700">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <CustomerAvatar name={c.name} />
                    <span className="font-medium text-gray-900">{c.name}</span>
                  </div>
                </td>
                <td className="px-5 py-3 text-gray-900">{count(c.orders)}</td>
                <td className="px-5 py-3 font-semibold text-gray-900">{money2(c.spent)}</td>
                <td className="px-5 py-3 text-gray-500">{money0(c.aov)}</td>
                <td className="px-5 py-3"><SegmentBadge segment={c.segment} /></td>
                <td className="px-5 py-3"><CustomerStatusBadge status={c.status} /></td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
