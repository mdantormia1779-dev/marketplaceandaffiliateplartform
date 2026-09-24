import { ClipboardList, HardDrive, ShoppingBag, Users, LucideIcon } from "lucide-react";
import Card from "./Card";
import { UsageItem, UsageKey } from "./types";
import { percent } from "./utils";

const icons: Record<UsageKey, LucideIcon> = {
  products: ShoppingBag,
  orders: ClipboardList,
  storage: HardDrive,
  team: Users,
};

export default function UsageCard({ item }: { item: UsageItem }) {
  const Icon = icons[item.key];
  const pct = percent(item.used, item.limit);
  const bar = pct >= 100 ? "bg-red-500" : pct >= 80 ? "bg-amber-500" : "bg-blue-600";
  const unit = item.unit ? ` ${item.unit}` : "";

  return (
    <Card className="p-5">
      <div className="flex items-center gap-3 text-sm text-slate-600">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600"><Icon size={16} /></span>
        {item.label}
      </div>
      <div className="mt-5 flex items-end justify-between">
        <p className="text-lg font-bold text-slate-900">
          {item.used}{unit} <span className="text-sm font-normal text-slate-500">/ {item.limit}{unit}</span>
        </p>
        <span className="text-xs font-semibold text-blue-700">{pct}%</span>
      </div>
      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-200">
        <div className={`h-full rounded-full transition-all ${bar}`} style={{ width: `${pct}%` }} />
      </div>
    </Card>
  );
}