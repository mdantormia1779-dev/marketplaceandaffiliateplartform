import { Layers, Minus, MoreVertical, Plus, SlidersHorizontal, Truck, Warehouse } from "lucide-react";
import Thumb from "./ui/Thumb";
import StatusPill from "./ui/StatusPill";
import StockBar from "./ui/StockBar";
import { formatDate, money, statusOf } from "./helpers";
import type { Product } from "./types";

export default function ProductsTable({
  rows,
  totalCount,
  editing,
  onEditToggle,
  onAdjustStock,
}: {
  rows: Product[];
  totalCount: number;
  editing: string | null;
  onEditToggle: (id: string | null) => void;
  onAdjustStock: (id: string, delta: number) => void;
}) {
  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1080px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-left text-[11px] font-medium tracking-wide text-slate-400">
              <th className="px-5 py-3 font-medium">PRODUCT</th>
              <th className="px-3 py-3 font-medium">WAREHOUSE</th>
              <th className="px-3 py-3 font-medium">ON HAND</th>
              <th className="px-3 py-3 font-medium">RESERVED</th>
              <th className="px-3 py-3 font-medium">INCOMING</th>
              <th className="px-3 py-3 font-medium">STATUS</th>
              <th className="px-3 py-3 font-medium">VELOCITY</th>
              <th className="px-3 py-3 font-medium">VALUE</th>
              <th className="px-3 py-3 font-medium">RESTOCKED</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((p) => {
              const status = statusOf(p);
              const available = Math.max(0, p.onHand - p.reserved);
              const isEditing = editing === p.id;
              return (
                <tr key={p.id} className="transition hover:bg-slate-50/60">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <Thumb product={p} />
                      <div>
                        <p className="font-medium text-slate-900">{p.name}</p>
                        <p className="mt-0.5 text-xs text-slate-400">
                          {p.sku} <span className="text-slate-300">|</span> {p.category}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-3 py-3.5">
                    <span className="inline-flex items-center gap-1.5 text-slate-600">
                      <Warehouse className="h-3.5 w-3.5 text-slate-400" />
                      {p.warehouse}
                    </span>
                  </td>

                  <td className="px-3 py-3.5">
                    {isEditing ? (
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => onAdjustStock(p.id, -1)}
                          className="grid h-7 w-7 place-items-center rounded-md border border-slate-200 text-slate-600 transition hover:bg-slate-50"
                          aria-label="Decrease stock"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-10 text-center font-semibold tabular-nums">{p.onHand}</span>
                        <button
                          type="button"
                          onClick={() => onAdjustStock(p.id, 1)}
                          className="grid h-7 w-7 place-items-center rounded-md border border-slate-200 text-slate-600 transition hover:bg-slate-50"
                          aria-label="Increase stock"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onEditToggle(null)}
                          className="ml-1 rounded-md bg-slate-900 px-2 py-1 text-xs font-medium text-white"
                        >
                          Done
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="flex w-28 items-baseline justify-between">
                          <span className="font-semibold tabular-nums text-slate-900">{p.onHand}</span>
                          <span className="text-xs text-slate-400">avail. {available}</span>
                        </div>
                        <StockBar product={p} />
                      </>
                    )}
                  </td>

                  <td className="px-3 py-3.5 tabular-nums text-slate-600">
                    {p.reserved > 0 ? p.reserved : <span className="text-slate-300">—</span>}
                  </td>

                  <td className="px-3 py-3.5">
                    {p.incoming > 0 ? (
                      <span className="inline-flex items-center gap-1.5 rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700">
                        <Truck className="h-3.5 w-3.5 text-slate-500" />+{p.incoming}
                      </span>
                    ) : (
                      <span className="text-slate-300">—</span>
                    )}
                  </td>

                  <td className="px-3 py-3.5">
                    <StatusPill status={status} />
                  </td>

                  <td className="px-3 py-3.5">
                    <span className="font-medium tabular-nums text-slate-700">{p.velocity}</span>{" "}
                    <span className="text-xs text-slate-400">units/wk</span>
                  </td>

                  <td className="px-3 py-3.5">
                    <p className="font-semibold text-slate-900">{money(p.onHand * p.unitCost)}</p>
                    <p className="text-xs text-slate-400">${p.unitCost} cost</p>
                  </td>

                  <td className="px-3 py-3.5 text-slate-600">{formatDate(p.restockedAt)}</td>

                  <td className="px-5 py-3.5">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => onEditToggle(isEditing ? null : p.id)}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
                      >
                        <SlidersHorizontal className="h-3.5 w-3.5" />
                        Adjust
                      </button>
                      <button
                        type="button"
                        className="rounded-md p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                        aria-label={`More actions for ${p.name}`}
                      >
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}

            {rows.length === 0 && (
              <tr>
                <td colSpan={10} className="px-5 py-16 text-center">
                  <p className="text-sm font-medium text-slate-700">No SKUs match these filters</p>
                  <p className="mt-1 text-xs text-slate-500">
                    Clear the search or pick a different stock level to see products again.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 px-5 py-3 text-xs text-slate-400">
        <span>
          {rows.length} of {totalCount} SKUs shown
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Layers className="h-3.5 w-3.5" />
          Stock bar shows on-hand units against maximum capacity
        </span>
      </div>
    </section>
  );
}