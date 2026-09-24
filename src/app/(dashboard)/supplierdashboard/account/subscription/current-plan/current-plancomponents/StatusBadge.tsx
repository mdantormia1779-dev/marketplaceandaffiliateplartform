import { PlanStatus } from "./types";

const styles: Record<PlanStatus, string> = {
  Active: "bg-emerald-50 text-emerald-700",
  Cancelled: "bg-amber-50 text-amber-700",
  Expired: "bg-red-50 text-red-700",
};

export default function StatusBadge({ status }: { status: PlanStatus }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${styles[status]}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" /> {status}
    </span>
  );
}