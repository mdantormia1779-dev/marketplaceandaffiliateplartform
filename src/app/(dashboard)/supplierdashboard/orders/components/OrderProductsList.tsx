import type { OrderItem } from "../types";
import { formatBDT } from "../ordersUtils";

export function OrderProductsList({ items }: { items: OrderItem[] }) {
  return (
    <div className="mt-3 divide-y divide-slate-100 rounded-lg border border-slate-100">
      {items.map((item, index) => (
        <div
          key={`${item.productId}-${index}`}
          className="flex items-center justify-between gap-3 px-3 py-2"
        >
          <div className="flex items-center gap-2">
            {item.productImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.productImage}
                alt={item.productName}
                className="h-8 w-8 shrink-0 rounded-md object-cover"
              />
            ) : (
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-slate-50 text-[10px] font-medium text-slate-400">
                IMG
              </div>
            )}
            <div>
              <p className="text-xs font-medium text-slate-800">{item.productName}</p>
              <p className="text-[11px] text-slate-400">Qty: {item.quantity}</p>
            </div>
          </div>
          <p className="text-xs font-medium text-slate-700">
            {formatBDT(item.price * item.quantity)}
          </p>
        </div>
      ))}
    </div>
  );
}