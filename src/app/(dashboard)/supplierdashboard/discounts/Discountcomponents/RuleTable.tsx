import { MoreVertical, Pencil, Zap } from "lucide-react";
import StatusPill from "./StatusBadge";
import ChannelChips from "./ChannelChips";
import { KIND_META } from "./discountKind";
import type { Rule } from "./data";
import { formatDate, money, scheduleNote } from "./lib";

export default function RuleTable({ rules }: { rules: Rule[] }) {
  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1140px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-left text-[11px] font-medium tracking-wide text-slate-400">
              <th className="px-5 py-3 font-medium">RULE</th>
              <th className="px-3 py-3 font-medium">DISCOUNT</th>
              <th className="px-3 py-3 font-medium">CONDITION</th>
              <th className="px-3 py-3 font-medium">SCHEDULE</th>
              <th className="px-3 py-3 font-medium">USAGE</th>
              <th className="px-3 py-3 font-medium">REVENUE</th>
              <th className="px-3 py-3 font-medium">STATUS</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {rules.map((r) => {
              const kind = KIND_META[r.kind];
              const pct = r.maxUses
                ? Math.min(100, Math.round((r.usage / r.maxUses) * 100))
                : null;
              return (
                <tr key={r.id} className="align-top transition hover:bg-slate-50/60">
                  <td className="px-5 py-4">
                    <div className="flex items-start gap-3">
                      <span
                        className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${kind.tint}`}
                      >
                        {kind.icon}
                      </span>
                      <div>
                        <p className="font-medium text-slate-900">{r.name}</p>
                        <p className="mt-0.5 flex items-center gap-1.5 text-xs text-slate-400">
                          {r.ref}
                          <span className="text-slate-300">|</span>
                          <span className="inline-flex items-center gap-1 text-slate-500">
                            <Zap className="h-3 w-3 text-blue-500" />
                            Auto-apply
                          </span>
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-3 py-4">
                    <p className="font-medium text-slate-900">{kind.label}</p>
                    <p className="mt-0.5 text-xs text-slate-400">{r.valueLabel}</p>
                  </td>

                  <td className="px-3 py-4">
                    <p className="max-w-[200px] text-slate-700">{r.condition}</p>
                    <ChannelChips channels={r.channels} />
                  </td>

                  <td className="px-3 py-4">
                    <p className="text-slate-700">
                      {formatDate(r.startsAt)} – {formatDate(r.endsAt)}
                    </p>
                    <p
                      className={`mt-0.5 text-xs ${
                        r.status === "expired" || r.status === "paused"
                          ? "text-slate-400"
                          : "text-slate-500"
                      }`}
                    >
                      {scheduleNote(r)}
                    </p>
                  </td>

                  <td className="px-3 py-4">
                    <div className="flex w-32 items-baseline justify-between gap-2">
                      <span className="font-semibold tabular-nums text-slate-900">
                        {r.usage.toLocaleString()}
                      </span>
                      <span className="text-xs text-slate-400">
                        {r.maxUses ? `of ${r.maxUses.toLocaleString()}` : "unlimited"}
                      </span>
                    </div>
                    {pct !== null && (
                      <div className="mt-1.5 h-1 w-32 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-blue-600"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    )}
                  </td>

                  <td className="px-3 py-4">
                    <p className="font-semibold text-slate-900">
                      {r.revenue === null ? (
                        <span className="text-slate-300">—</span>
                      ) : (
                        money(r.revenue)
                      )}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-400">Influenced sales</p>
                  </td>

                  <td className="px-3 py-4">
                    <StatusPill status={r.status} />
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                        Edit
                      </button>
                      <button
                        type="button"
                        className="rounded-md p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                        aria-label={`More actions for ${r.name}`}
                      >
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}

            {rules.length === 0 && (
              <tr>
                <td colSpan={8} className="px-5 py-16 text-center">
                  <p className="text-sm font-medium text-slate-700">No rules match these filters</p>
                  <p className="mt-1 text-xs text-slate-500">
                    Clear the search or pick a different status to see your rules again.
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