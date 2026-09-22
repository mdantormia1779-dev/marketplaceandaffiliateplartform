import type { ReactNode } from "react";
import { CircleDollarSign, Gift, Package, Percent } from "lucide-react";
import type { DiscountKind } from "./data";

export const KIND_META: Record<DiscountKind, { label: string; icon: ReactNode; tint: string }> = {
  percentage: {
    label: "Percentage",
    icon: <Percent className="h-4 w-4" />,
    tint: "bg-violet-50 text-violet-600",
  },
  fixed: {
    label: "Fixed Amount",
    icon: <CircleDollarSign className="h-4 w-4" />,
    tint: "bg-emerald-50 text-emerald-600",
  },
  bundle: {
    label: "Bundle",
    icon: <Package className="h-4 w-4" />,
    tint: "bg-sky-50 text-sky-600",
  },
  bxgy: {
    label: "Buy X Get Y",
    icon: <Gift className="h-4 w-4" />,
    tint: "bg-teal-50 text-teal-600",
  },
};