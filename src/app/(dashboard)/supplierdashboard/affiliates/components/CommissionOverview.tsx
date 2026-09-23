import { Info, Megaphone, Pause, Play, Trash2 } from "lucide-react";
import ActionsMenu from "./ActionsMenu";
import type { Campaign } from "./data";

interface CommissionOverviewProps {
  campaigns: Campaign[];
  onToggleStatus: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function CommissionOverview({
  campaigns,
  onToggleStatus,
  onDelete,
}: CommissionOverviewProps) {
  return (
    <section className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
      <div>
        <h3 className="text-sm font-semibold text-slate-900">Commission Settings</h3>
        <p className="mt-1 text-sm text-slate-500">How commission is applied on your products</p>
      </div>

      <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50/60 p-4">
        <p className="text-xs font-medium text-slate-500">Applied in this order</p>
        <ol className="mt-2 space-y-1.5 text-sm text-slate-700">
          <li className="flex items-center gap-2">
            <span className="grid h-5 w-5 place-items-center rounded-full bg-slate-900 text-[10px] font-semibold text-white">
              1
            </span>
            Campaign commission
          </li>
          <li className="flex items-center gap-2">
            <span className="grid h-5 w-5 place-items-center rounded-full bg-slate-300 text-[10px] font-semibold text-white">
              2
            </span>
            Product commission
          </li>
          <li className="flex items-center gap-2">
            <span className="grid h-5 w-5 place-items-center rounded-full bg-slate-300 text-[10px] font-semibold text-white">
              3
            </span>
            Global default — 10%
          </li>
        </ol>
      </div>

      <p className="mt-4 text-xs font-medium text-slate-500">Active campaigns</p>
      <ul className="mt-2 space-y-2">
        {campaigns.map((c) => (
          <li
            key={c.id}
            className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 px-3 py-2.5"
          >
            <div className="flex min-w-0 items-center gap-2.5">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-teal-50 text-teal-600">
                <Megaphone className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="truncate text-sm font-medium text-slate-800">{c.name}</p>
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ring-1 ring-inset ${
                      c.status === "active"
                        ? "bg-emerald-50 text-emerald-700 ring-emerald-600/20"
                        : "bg-amber-50 text-amber-700 ring-amber-600/20"
                    }`}
                  >
                    <span
                      className={`h-1 w-1 rounded-full ${
                        c.status === "active" ? "bg-emerald-500" : "bg-amber-500"
                      }`}
                    />
                    {c.status === "active" ? "Active" : "Paused"}
                  </span>
                </div>
                <p className="text-xs text-slate-400">{c.window}</p>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-1.5">
              <span className="rounded-full bg-teal-50 px-2.5 py-1 text-xs font-semibold text-teal-700">
                {c.commissionRate}%
              </span>
              <button
                type="button"
                onClick={() => onToggleStatus(c.id)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
              >
                {c.status === "paused" ? (
                  <Play className="h-3.5 w-3.5" />
                ) : (
                  <Pause className="h-3.5 w-3.5" />
                )}
                {c.status === "paused" ? "Resume" : "Pause"}
              </button>
              <ActionsMenu
                ariaLabel={`More actions for ${c.name}`}
                items={[
                  {
                    label: "Delete",
                    icon: <Trash2 className="h-3.5 w-3.5" />,
                    danger: true,
                    onClick: () => onDelete(c.id),
                  },
                ]}
              />
            </div>
          </li>
        ))}

        {campaigns.length === 0 && (
          <li className="rounded-lg border border-dashed border-slate-200 px-3 py-4 text-center text-xs text-slate-400">
            No campaigns running right now.
          </li>
        )}
      </ul>

      <p className="mt-auto flex items-start gap-2 pt-4 text-xs text-slate-500">
        <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue-500" />
        Campaign rates override product and global commission while they&apos;re running.
      </p>
    </section>
  );
}