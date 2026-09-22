import type { RuleStatus } from "./data";

export const STATUS_META: Record<RuleStatus, { label: string; pill: string; dot: string }> = {
  active: {
    label: "Active",
    pill: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
    dot: "bg-emerald-500",
  },
  scheduled: {
    label: "Scheduled",
    pill: "bg-slate-100 text-slate-600 ring-slate-500/20",
    dot: "bg-slate-400",
  },
  paused: {
    label: "Paused",
    pill: "bg-amber-50 text-amber-700 ring-amber-600/20",
    dot: "bg-amber-500",
  },
  expired: {
    label: "Expired",
    pill: "bg-slate-100 text-slate-500 ring-slate-500/20",
    dot: "bg-slate-300",
  },
};

export default function StatusPill({ status }: { status: RuleStatus }) {
  const meta = STATUS_META[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${meta.pill}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />
      {meta.label}
    </span>
  );
}