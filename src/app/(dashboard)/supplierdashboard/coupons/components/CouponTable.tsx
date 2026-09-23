import type { ReactNode } from "react";
import { Check, Copy, DollarSign, Pencil, Percent, Truck } from "lucide-react";
import StatusBadge from "./StatusBadge";
import LimitChip from "./LimitChip";
import RowActionsMenu from "./RowActionsMenu";
import type { Coupon, DiscountType } from "./data";
import { discountLabel, formatDate, money, nearLimit, validityNote } from "./lib";

const TYPE_ICON: Record<DiscountType, ReactNode> = {
  shipping: <Truck className="h-4 w-4" />,
  percent: <Percent className="h-4 w-4" />,
  fixed: <DollarSign className="h-4 w-4" />,
};

const TYPE_TINT: Record<DiscountType, string> = {
  shipping: "bg-sky-50 text-sky-600",
  percent: "bg-violet-50 text-violet-600",
  fixed: "bg-emerald-50 text-emerald-600",
};

interface CouponTableProps {
  coupons: Coupon[];
  copiedId: string | null;
  onCopy: (c: Coupon) => void;
  onEdit: (c: Coupon) => void;
  onDeleteRequest: (c: Coupon) => void;
}

export default function CouponTable({
  coupons,
  copiedId,
  onCopy,
  onEdit,
  onDeleteRequest,
}: CouponTableProps) {
  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1120px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-left text-[11px] font-medium tracking-wide text-slate-400">
              <th className="px-5 py-3 font-medium">COUPON CODE</th>
              <th className="px-3 py-3 font-medium">DISCOUNT</th>
              <th className="px-3 py-3 font-medium">PER-CODE LIMITS</th>
              <th className="px-3 py-3 font-medium">VALID</th>
              <th className="px-3 py-3 font-medium">REDEMPTIONS</th>
              <th className="px-3 py-3 font-medium">REVENUE</th>
              <th className="px-3 py-3 font-medium">STATUS</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {coupons.map((c) => {
              const pct = c.maxUses
                ? Math.min(100, Math.round((c.redemptions / c.maxUses) * 100))
                : null;
              return (
                <tr key={c.id} className="align-top transition hover:bg-slate-50/60">
                  <td className="px-5 py-4">
                    <div className="flex items-start gap-3">
                      <span
                        className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${TYPE_TINT[c.type]}`}
                      >
                        {TYPE_ICON[c.type]}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="rounded-md bg-slate-100 px-2 py-1 font-mono text-xs font-semibold tracking-tight text-slate-800">
                            {c.code}
                          </span>
                          <button
                            type="button"
                            onClick={() => onCopy(c)}
                            className="rounded-md p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                            aria-label={`Copy ${c.code}`}
                          >
                            {copiedId === c.id ? (
                              <Check className="h-3.5 w-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="h-3.5 w-3.5" />
                            )}
                          </button>
                        </div>
                        <p className="mt-1 text-xs text-slate-500">{c.name}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-3 py-4">
                    <p className="font-medium text-slate-900">{discountLabel(c)}</p>
                    <p className="mt-0.5 text-xs text-slate-400">{c.appliesTo}</p>
                  </td>

                  <td className="px-3 py-4">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <LimitChip>
                        {c.maxUses ? `${c.maxUses.toLocaleString()} max uses` : "Unlimited uses"}
                      </LimitChip>
                      <LimitChip>{c.perCustomer}/customer</LimitChip>
                      {nearLimit(c) && (
                        <span className="rounded-md bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-700 ring-1 ring-inset ring-amber-600/20">
                          Near limit
                        </span>
                      )}
                    </div>
                    <p className="mt-1.5 text-xs text-slate-400">
                      {c.stackable ? "Stackable with other discounts" : "Not stackable"}
                    </p>
                  </td>

                  <td className="px-3 py-4">
                    <p className="text-slate-700">
                      {formatDate(c.startsAt)} – {formatDate(c.endsAt)}
                    </p>
                    <p
                      className={`mt-0.5 text-xs ${
                        c.status === "expired" ? "text-slate-400" : "text-slate-500"
                      }`}
                    >
                      {validityNote(c)}
                    </p>
                  </td>

                  <td className="px-3 py-4">
                    <div className="flex w-32 items-baseline justify-between gap-2">
                      <span className="font-semibold tabular-nums text-slate-900">
                        {c.redemptions.toLocaleString()}
                      </span>
                      <span className="text-xs text-slate-400">
                        {c.maxUses ? `of ${c.maxUses.toLocaleString()}` : "unlimited"}
                      </span>
                    </div>
                    {pct !== null && (
                      <div className="mt-1.5 h-1 w-32 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className={`h-full rounded-full ${
                            pct >= 85 ? "bg-amber-500" : "bg-emerald-500"
                          }`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    )}
                    <p className="mt-1.5 text-xs text-slate-400">
                      {c.customers.toLocaleString()} customers
                    </p>
                  </td>

                  <td className="px-3 py-4">
                    <p className="font-semibold text-slate-900">
                      {c.revenue === null ? (
                        <span className="text-slate-300">—</span>
                      ) : (
                        money(c.revenue)
                      )}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-400">
                      {c.lastUsedAt ? `Last used ${formatDate(c.lastUsedAt)}` : "Not used yet"}
                    </p>
                  </td>

                  <td className="px-3 py-4">
                    <StatusBadge status={c.status} />
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => onEdit(c)}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                        Edit
                      </button>
                      <RowActionsMenu
                        label={c.code}
                        onEdit={() => onEdit(c)}
                        onDelete={() => onDeleteRequest(c)}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}

            {coupons.length === 0 && (
              <tr>
                <td colSpan={8} className="px-5 py-16 text-center">
                  <p className="text-sm font-medium text-slate-700">No codes match these filters</p>
                  <p className="mt-1 text-xs text-slate-500">
                    Clear the search or pick a different status to see your coupons again.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}