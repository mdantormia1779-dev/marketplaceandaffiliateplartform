import { CheckCircle2 } from "lucide-react";
import type { ProductBadgeType } from "./types";

export default function ProductBadge({ label }: { label: ProductBadgeType }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500 px-2.5 py-1 text-xs font-medium text-white shadow-sm">
      <CheckCircle2 className="h-3.5 w-3.5" />
      {label}
    </span>
  );
}