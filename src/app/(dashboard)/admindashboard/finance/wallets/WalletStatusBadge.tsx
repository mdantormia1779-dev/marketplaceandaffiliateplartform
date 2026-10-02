import { WalletStatus } from "./types";

const STYLES: Record<WalletStatus, string> = {
  Active: "bg-emerald-50 text-emerald-700",
  Frozen: "bg-gray-100 text-gray-600",
};

export default function WalletStatusBadge({ status }: { status: WalletStatus }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${STYLES[status]}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      {status}
    </span>
  );
}
