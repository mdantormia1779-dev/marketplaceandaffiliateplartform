import { cx, statusOf, STATUS_META } from "../helpers";
import type { Product } from "../types";

export default function StockBar({ product }: { product: Product }) {
  const pct = Math.min(100, Math.round((product.onHand / product.capacity) * 100));
  const meta = STATUS_META[statusOf(product)];
  return (
    <div className="mt-1.5 h-1 w-28 overflow-hidden rounded-full bg-slate-100">
      <div
        className={cx("h-full rounded-full transition-[width] duration-300", meta.bar)}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}