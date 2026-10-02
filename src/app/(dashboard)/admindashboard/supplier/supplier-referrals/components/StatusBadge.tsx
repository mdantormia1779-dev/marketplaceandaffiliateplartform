import { ReferralStatus } from "../types";

const styles: Record<ReferralStatus, { wrap: string; dot: string }> = {
  Pending:   { wrap: "bg-amber-100 text-amber-800",     dot: "bg-amber-600" },
  Approved:  { wrap: "bg-emerald-100 text-emerald-700", dot: "bg-emerald-600" },
  Paid:      { wrap: "bg-emerald-100 text-emerald-700", dot: "bg-emerald-600" },
  Rejected:  { wrap: "bg-gray-200 text-gray-700",       dot: "bg-gray-500" },
  Suspended: { wrap: "bg-red-100 text-red-700",         dot: "bg-red-600" },
};

export default function StatusBadge({ status }: { status: ReferralStatus }) {
  const s = styles[status];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${s.wrap}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {status}
    </span>
  );
}