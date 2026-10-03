import { CustomerStatus } from "./types";

const STYLES: Record<CustomerStatus, string> = {
  Active: "bg-emerald-50 text-emerald-700",
  Inactive: "bg-gray-100 text-gray-600",
  Blocked: "bg-red-50 text-red-600",
};

export default function CustomerStatusBadge({ status }: { status: CustomerStatus }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${STYLES[status]}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      {status}
    </span>
  );
}
