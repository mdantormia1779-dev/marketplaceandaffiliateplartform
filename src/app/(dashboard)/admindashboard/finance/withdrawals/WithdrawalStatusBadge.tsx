import { WithdrawalStatus } from "./types";

const map: Record<WithdrawalStatus, string> = {
  Pending: "bg-amber-50 text-amber-700",
  Approved: "bg-blue-50 text-blue-700",
  Paid: "bg-emerald-50 text-emerald-700",
  Rejected: "bg-red-50 text-red-700",
};

export default function WithdrawalStatusBadge({ status }: { status: WithdrawalStatus }) {
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${map[status]}`}>{status}</span>;
}
