import type { AffiliateStatus } from "./data";

export const STATUS_META: Record<AffiliateStatus, { label: string; pill: string; dot: string }> = {
  active: {
    label: "Active",
    pill: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
    dot: "bg-emerald-500",
  },
  pending: {
    label: "Pending",
    pill: "bg-blue-50 text-blue-700 ring-blue-600/20",
    dot: "bg-blue-500",
  },
  paused: {
    label: "Paused",
    pill: "bg-amber-50 text-amber-700 ring-amber-600/20",
    dot: "bg-amber-500",
  },
};

export default function StatusBadge({ status }: { status: AffiliateStatus }) {
  const meta = STATUS_META[status] ?? STATUS_META.paused;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${meta.pill}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />
      {meta.label}
    </span>
  );
}