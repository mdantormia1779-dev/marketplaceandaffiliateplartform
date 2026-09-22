import { cx, THUMB_TINTS, initials } from "../helpers";
import type { Product } from "../types";

export default function Thumb({ product, size = 36 }: { product: Product; size?: number }) {
  return (
    <div
      className={cx(
        "grid shrink-0 place-items-center rounded-md bg-gradient-to-br text-[10px] font-semibold ring-1 ring-black/5",
        THUMB_TINTS[product.category] ?? "from-slate-200 to-slate-300 text-slate-600"
      )}
      style={{ width: size, height: size }}
      aria-hidden
    >
      {initials(product.name)}
    </div>
  );
}