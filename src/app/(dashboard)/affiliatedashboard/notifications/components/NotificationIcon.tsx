import {
  ShoppingCart,
  Wallet,
  Gift,
  Users2,
  Banknote,
  Megaphone,
} from "lucide-react";
import { NotificationCategory } from "../types";

const ICON_MAP: Record<NotificationCategory, React.ElementType> = {
  sales: ShoppingCart,
  commission: Wallet,
  bonus: Gift,
  referral: Users2,
  withdrawal: Banknote,
  system: Megaphone,
};

const COLOR_MAP: Record<NotificationCategory, string> = {
  sales: "bg-indigo-100 text-indigo-600",
  commission: "bg-emerald-100 text-emerald-600",
  bonus: "bg-amber-100 text-amber-600",
  referral: "bg-purple-100 text-purple-600",
  withdrawal: "bg-blue-100 text-blue-600",
  system: "bg-slate-100 text-slate-600",
};

export function NotificationIcon({ category }: { category: NotificationCategory }) {
  const Icon = ICON_MAP[category];

  return (
    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${COLOR_MAP[category]}`}>
      <Icon size={18} />
    </div>
  );
}