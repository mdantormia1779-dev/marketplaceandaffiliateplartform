import { AlertTriangle, CircleDollarSign, Layers, XCircle } from "lucide-react";
import StatCard from "./ui/StatCard";
import { money } from "./helpers";

export default function StatsGrid({
  totalSkus,
  totalUnits,
  totalValue,
  lowCount,
  outCount,
  incomingUnits,
}: {
  totalSkus: number;
  totalUnits: number;
  totalValue: number;
  lowCount: number;
  outCount: number;
  incomingUnits: number;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        label="Total SKUs"
        value={String(totalSkus)}
        caption={`${totalUnits.toLocaleString()} units on hand`}
        icon={<Layers className="h-4 w-4 text-blue-600" />}
        tint="bg-blue-50"
      />
      <StatCard
        label="Inventory Value"
        value={money(totalValue)}
        caption="Valued at cost price"
        icon={<CircleDollarSign className="h-4 w-4 text-emerald-600" />}
        tint="bg-emerald-50"
      />
      <StatCard
        label="Low Stock"
        value={String(lowCount)}
        caption="At or below alert level"
        icon={<AlertTriangle className="h-4 w-4 text-amber-600" />}
        tint="bg-amber-50"
      />
      <StatCard
        label="Out of Stock"
        value={String(outCount)}
        caption={`${incomingUnits} units incoming`}
        icon={<XCircle className="h-4 w-4 text-rose-600" />}
        tint="bg-rose-50"
      />
    </div>
  );
}