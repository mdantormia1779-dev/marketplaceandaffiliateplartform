import { CalendarDays, RefreshCw } from "lucide-react";
import StatusPill from "./StatusBadge";
import { WINDOW_START, WINDOW_END, TODAY, type Rule } from "./data";
import { DAY, toTime, formatDate, formatStamp } from "./lib";

export default function CampaignSchedule({ rules }: { rules: Rule[] }) {
  const start = toTime(WINDOW_START);
  const end = toTime(WINDOW_END);
  const span = end - start;

  const pct = (t: number) => ((t - start) / span) * 100;
  const clamp = (n: number) => Math.min(100, Math.max(0, n));

  const lanes = rules
    .filter(
      (r) =>
        ["active", "scheduled"].includes(r.status) &&
        toTime(r.endsAt) <= end &&
        toTime(r.endsAt) >= start
    )
    .sort((a, b) => a.startsAt.localeCompare(b.startsAt));

  const alwaysOn = rules.filter(
    (r) => ["active", "scheduled"].includes(r.status) && toTime(r.endsAt) > end
  ).length;

  const ticks = Array.from({ length: 6 }, (_, i) => start + i * 7 * DAY);
  const todayPct = clamp(pct(TODAY.getTime()));

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-slate-100 text-slate-500">
            <CalendarDays className="h-4 w-4" />
          </span>
          <div>
            <h3 className="text-sm font-semibold">Campaign Schedule</h3>
            <p className="mt-0.5 text-xs text-slate-500">
              Timing of automatic rules across the next six weeks
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Active
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
            Scheduled
          </span>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto">
        <div className="min-w-[760px]">
          {/* Axis */}
          <div className="flex items-end">
            <div className="w-32 shrink-0" />
            <div className="relative h-5 flex-1">
              {ticks.map((t) => (
                <span
                  key={t}
                  className="absolute top-0 -translate-x-1/2 text-[11px] text-slate-400"
                  style={{ left: `${clamp(pct(t))}%` }}
                >
                  {formatStamp(t)}
                </span>
              ))}
            </div>
            <div className="w-24 shrink-0" />
          </div>

          {/* Lanes */}
          <div className="relative mt-2">
            {lanes.map((r, i) => {
              const left = clamp(pct(toTime(r.startsAt)));
              const right = clamp(pct(toTime(r.endsAt)));
              const width = Math.max(right - left, 2);
              const isActive = r.status === "active";

              return (
                <div key={r.id} className="flex items-center">
                  <div className="w-32 shrink-0 pr-3">
                    <p className="truncate text-xs font-medium text-slate-700">{r.name}</p>
                    <p className="mt-0.5 text-[11px] text-slate-400">
                      {formatDate(r.startsAt, false)} – {formatDate(r.endsAt, false)}
                    </p>
                  </div>

                  <div
                    className={`relative h-[34px] flex-1 border-b border-slate-100 ${
                      i === 0 ? "border-t" : ""
                    }`}
                  >
                    {/* week gridlines */}
                    {ticks.map((t) => (
                      <span
                        key={t}
                        className="absolute inset-y-0 w-px bg-slate-100"
                        style={{ left: `${clamp(pct(t))}%` }}
                      />
                    ))}

                    <div
                      className={`absolute top-1/2 flex h-6 -translate-y-1/2 items-center overflow-hidden rounded-md px-2 text-[11px] font-medium shadow-sm transition ${
                        isActive ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-700"
                      }`}
                      style={{ left: `${left}%`, width: `${width}%` }}
                      title={`${r.name} · ${formatDate(r.startsAt)} – ${formatDate(r.endsAt)}`}
                    >
                      <span className="truncate">{r.shortCondition}</span>
                    </div>
                  </div>

                  <div className="w-24 shrink-0 pl-3 text-right">
                    <StatusPill status={r.status} />
                  </div>
                </div>
              );
            })}

            {/* Today marker spans every lane */}
            <div
              className="pointer-events-none absolute inset-y-0"
              style={{ left: `calc(8rem + (100% - 14rem) * ${todayPct / 100})` }}
            >
              <span className="absolute -top-2 -translate-x-1/2 rounded-md bg-emerald-600 px-1.5 py-0.5 text-[10px] font-medium text-white">
                Today
              </span>
              <span className="absolute inset-y-0 w-px bg-emerald-500/70" />
            </div>
          </div>
        </div>
      </div>

      {alwaysOn > 0 && (
        <p className="mt-4 flex items-center gap-2 text-xs text-slate-500">
          <RefreshCw className="h-3.5 w-3.5 text-slate-400" />
          Plus {alwaysOn} always-on rules running beyond this period.
        </p>
      )}
    </section>
  );
}