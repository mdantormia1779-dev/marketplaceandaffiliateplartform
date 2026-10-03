import { WalletType } from "./types";

const STYLES: Record<WalletType, string> = {
  Affiliate: "bg-slate-100 text-slate-700",
  Supplier: "bg-slate-100 text-slate-700",
  Customer: "bg-sky-50 text-sky-700",
};

export default function WalletTypeBadge({ type }: { type: WalletType }) {
  return <span className={`inline-block rounded-md px-2 py-1 text-xs font-medium ${STYLES[type]}`}>{type}</span>;
}
