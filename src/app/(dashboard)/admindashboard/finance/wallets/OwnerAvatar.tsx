import { initials } from "./format";
import { WalletType } from "./types";

const COLORS: Record<WalletType, string> = {
  Affiliate: "bg-amber-100 text-amber-700",
  Supplier: "bg-emerald-100 text-emerald-700",
  Customer: "bg-sky-100 text-sky-700",
};

export default function OwnerAvatar({ name, type }: { name: string; type: WalletType }) {
  return <span className={`flex h-9 w-9 items-center justify-center rounded-full text-[11px] font-semibold ${COLORS[type]}`}>{initials(name)}</span>;
}
