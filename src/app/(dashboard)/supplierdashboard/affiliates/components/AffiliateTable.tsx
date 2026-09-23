import { Pause, Play, Trash2 } from "lucide-react";
import ActionsMenu from "./ActionsMenu";
import StatusBadge from "./StatusBadge";
import type { Affiliate } from "./data";

function money(n: number) {
  if (n >= 1000) return `৳${(n / 1000).toFixed(1)}K`;
  return `৳${n.toLocaleString()}`;
}

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function conversionRate(a: Affiliate) {
  if (!a.clicks) return "0%";
  return `${((a.orders / a.clicks) * 100).toFixed(1)}%`;
}

interface AffiliateTableProps {
  affiliates: Affiliate[];
  onTogglePause: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function AffiliateTable({ affiliates, onTogglePause, onDelete }: AffiliateTableProps) {
  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1080px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-left text-[11px] font-medium tracking-wide text-slate-400">
              <th className="px-5 py-3 font-medium">AFFILIATE</th>
              <th className="px-3 py-3 font-medium">PRODUCTS</th>
              <th className="px-3 py-3 font-medium">CLICKS</th>
              <th className="px-3 py-3 font-medium">ORDERS</th>
              <th className="px-3 py-3 font-medium">CONVERSION</th>
              <th className="px-3 py-3 font-medium">COMMISSION</th>
              <th className="px-3 py-3 font-medium">EARNED</th>
              <th className="px-3 py-3 font-medium">STATUS</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {affiliates.map((a) => (
              <tr key={a.id} className="transition hover:bg-slate-50/60">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-blue-100 to-indigo-200 text-xs font-semibold text-blue-700 ring-1 ring-black/5">
                      {initials(a.name)}
                    </span>
                    <div>
                      <p className="font-medium text-slate-900">{a.name}</p>
                      <p className="mt-0.5 text-xs text-slate-400">{a.email}</p>
                    </div>
                  </div>
                </td>

                <td className="px-3 py-3.5">
                  <p className="text-slate-700">{a.products.length} products</p>
                  <p className="mt-0.5 max-w-[160px] truncate text-xs text-slate-400">
                    {a.products.join(", ")}
                  </p>
                </td>

                <td className="px-3 py-3.5 tabular-nums text-slate-700">
                  {a.clicks.toLocaleString()}
                </td>
                <td className="px-3 py-3.5 tabular-nums text-slate-700">
                  {a.orders.toLocaleString()}
                </td>
                <td className="px-3 py-3.5 text-slate-700">{conversionRate(a)}</td>

                <td className="px-3 py-3.5">
                  <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700">
                    {a.commissionRate}%
                  </span>
                </td>

                <td className="px-3 py-3.5 font-semibold text-slate-900">
                  {money(a.commissionEarned)}
                </td>

                <td className="px-3 py-3.5">
                  <StatusBadge status={a.status} />
                </td>

                <td className="px-5 py-3.5">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      type="button"
                      onClick={() => onTogglePause(a.id)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
                    >
                      {a.status === "paused" ? (
                        <Play className="h-3.5 w-3.5" />
                      ) : (
                        <Pause className="h-3.5 w-3.5" />
                      )}
                      {a.status === "paused" ? "Resume" : "Pause"}
                    </button>
                    <ActionsMenu
                      ariaLabel={`More actions for ${a.name}`}
                      items={[
                        {
                          label: "Delete",
                          icon: <Trash2 className="h-3.5 w-3.5" />,
                          danger: true,
                          onClick: () => onDelete(a.id),
                        },
                      ]}
                    />
                  </div>
                </td>
              </tr>
            ))}

            {affiliates.length === 0 && (
              <tr>
                <td colSpan={9} className="px-5 py-16 text-center">
                  <p className="text-sm font-medium text-slate-700">
                    No affiliates match these filters
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Try a different status, product, or search term.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}