import { ArrowDown, ArrowUp } from "lucide-react";
import AffiliateAvatar from "./AffiliateAvatar";
import AffiliateStatusBadge from "./AffiliateStatusBadge";
import { count, money } from "./format";
import { Affiliate, Sort, SortKey } from "./types";

const COLS: { key: SortKey | null; label: string }[] = [
  { key: "name", label: "Affiliate" },
  { key: "clicks", label: "Clicks" },
  { key: "conversions", label: "Conversions" },
  { key: "revenue", label: "Revenue" },
  { key: "commission", label: "Commission" },
  { key: null, label: "Status" },
];

interface Props {
  rows: Affiliate[];
  sort: Sort;
  onSort: (key: SortKey) => void;
}

export default function AffiliateTable({ rows, sort, onSort }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[860px] text-left">
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
                No affiliates match your filters.
              </td>
            </tr>
          ) : (
            rows.map((a) => (
              <tr key={a.id} className="border-t border-gray-100 text-sm text-gray-700">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <AffiliateAvatar name={a.name} />
                    <span className="font-medium text-gray-900">{a.name}</span>
                  </div>
                </td>
                <td className="px-5 py-3 text-gray-500">{count(a.clicks)}</td>
                <td className="px-5 py-3 font-medium text-gray-900">{count(a.conversions)}</td>
                <td className="px-5 py-3 font-semibold text-gray-900">{money(a.revenue)}</td>
                <td className="px-5 py-3 font-semibold text-emerald-700">{money(a.commission)}</td>
                <td className="px-5 py-3"><AffiliateStatusBadge status={a.status} /></td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
