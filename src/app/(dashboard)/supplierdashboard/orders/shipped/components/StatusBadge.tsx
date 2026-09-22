// app/(dashboard)/supplierdashboard/orders/shipped/components/StatusBadge.tsx

import { Truck, PackageCheck, Clock, AlertTriangle } from "lucide-react";
import { ShippedStatus, STATUS_LABELS } from "../types";

const STATUS_STYLES: Record<ShippedStatus, string> = {
  shipped: "bg-indigo-50 text-indigo-700",
  in_transit: "bg-amber-50 text-amber-700",
  out_for_delivery: "bg-sky-50 text-sky-700",
  delayed: "bg-rose-50 text-rose-700",
};

const STATUS_ICONS: Record<ShippedStatus, React.ElementType> = {
  shipped: PackageCheck,
  in_transit: Truck,
  out_for_delivery: Clock,
  delayed: AlertTriangle,
};

export function StatusBadge({ status }: { status: ShippedStatus }) {
  const Icon = STATUS_ICONS[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium ${STATUS_STYLES[status]}`}
    >
      <Icon size={12} />
      {STATUS_LABELS[status]}
    </span>
  );
}