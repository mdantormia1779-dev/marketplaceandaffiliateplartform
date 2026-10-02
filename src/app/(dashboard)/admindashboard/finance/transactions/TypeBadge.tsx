import { TxType } from "./types";

const STYLES: Record<TxType, string> = {
  "Order Payment": "bg-emerald-50 text-emerald-700",
  "Commission Payout": "bg-amber-50 text-amber-700",
  "Supplier Payout": "bg-amber-50 text-amber-700",
  Refund: "bg-gray-100 text-gray-600",
  Subscription: "bg-teal-50 text-teal-700",
  "Joining Fee": "bg-sky-50 text-sky-700",
};

export default function TypeBadge({ type }: { type: TxType }) {
  return <span className={`inline-block whitespace-nowrap rounded-md px-2 py-1 text-xs font-medium ${STYLES[type]}`}>{type}</span>;
}
