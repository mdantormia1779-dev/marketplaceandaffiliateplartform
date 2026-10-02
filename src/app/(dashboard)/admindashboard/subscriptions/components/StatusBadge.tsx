import { Status } from "../types";

const styles: Record<Status, { pill: string; dot: string }> = {
  Active: { pill: "bg-emerald-100 text-emerald-800", dot: "bg-emerald-500" },
  Trial: { pill: "bg-teal-100 text-teal-800", dot: "bg-teal-500" },
  "Past Due": { pill: "bg-slate-200 text-slate-700", dot: "bg-slate-500" },
  Suspended: { pill: "bg-amber-100 text-amber-800", dot: "bg-amber-500" },
  Cancelled: { pill: "bg-slate-200 text-slate-700", dot: "bg-slate-500" },
};

export default function StatusBadge({ status }: { status: Status }) {
  const s = styles[status];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${s.pill}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {status}
    </span>
  );
}