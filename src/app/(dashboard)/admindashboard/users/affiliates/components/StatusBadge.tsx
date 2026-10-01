import type { AffiliateStatus } from "../types";

const styles: Record<AffiliateStatus, { wrap: string; dot: string }> = {
  Active: { wrap: "bg-emerald-100 text-emerald-700", dot: "bg-emerald-500" },
  Pending: { wrap: "bg-amber-100 text-amber-700", dot: "bg-amber-500" },
  Suspended: { wrap: "bg-slate-100 text-slate-600", dot: "bg-slate-500" },
};

export default function StatusBadge({ status }: { status: AffiliateStatus }) {
  const s = styles[status];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${s.wrap}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {status}
    </span>
  );
}