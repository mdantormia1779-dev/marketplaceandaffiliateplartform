import { WithdrawalStatus } from "./types";

interface StatusBadgeProps {
  status: WithdrawalStatus;
}

const STATUS_STYLES: Record<WithdrawalStatus, { bg: string; text: string; dot: string }> = {
  Completed: { bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500" },
  Processing: { bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-500" },
  Rejected: { bg: "bg-slate-100", text: "text-slate-600", dot: "bg-slate-400" },
  Pending: { bg: "bg-blue-50", text: "text-blue-700", dot: "bg-blue-500" },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const style = STATUS_STYLES[status];

  return (
    <span
      className={
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold " +
        style.bg +
        " " +
        style.text
      }
    >
      <span className={"w-1.5 h-1.5 rounded-full " + style.dot}></span>
      {status}
    </span>
  );
}