"use client";

import { useEffect, useMemo, useState } from "react";
import { Truck } from "lucide-react";
import TableToolbar from "./TableToolbar";
import Pagination from "./Pagination";
import PlanBadge from "./PlanBadge";
import StatusBadge from "./StatusBadge";
import RowMenu from "./RowMenu";
import { Subscription } from "../types";
import { money } from "../utils";

interface Props {
  rows: Subscription[];
  onView: (s: Subscription) => void;
  onEdit: (s: Subscription) => void;
  onSuspend: (s: Subscription) => void;
  onCancel: (s: Subscription) => void;
  onDelete: (s: Subscription) => void;
}

function exportCsv(rows: Subscription[]) {
  const head = ["Store", "Plan", "Billing", "Amount", "Started", "Renews", "Status"];
  const lines = rows.map((r) =>
    [r.store, r.plan, r.billing, r.amount, r.started, r.renews, r.status].map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")
  );
  const blob = new Blob([[head.join(","), ...lines].join("\n")], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "subscriptions.csv";
  a.click();
  URL.revokeObjectURL(url);
}

export default function SubscriptionsTable({ rows, onView, onEdit, onSuspend, onCancel, onDelete }: Props) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const [plan, setPlan] = useState("All");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter(
      (r) =>
        (status === "All" || r.status === status) &&
        (plan === "All" || r.plan === plan) &&
        (!q || r.store.toLowerCase().includes(q) || r.plan.toLowerCase().includes(q))
    );
  }, [rows, query, status, plan]);

  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  useEffect(() => {
    if (page > pages) setPage(pages);
  }, [page, pages]);

  const visible = filtered.slice((page - 1) * pageSize, page * pageSize);
  const reset = <T,>(fn: (v: T) => void) => (v: T) => {
    fn(v);
    setPage(1);
  };

  const th = "px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500";

  return (
    <section className="rounded-xl border border-slate-200/70 bg-white shadow-sm">
      <TableToolbar
        query={query}
        status={status}
        plan={plan}
        onQuery={reset(setQuery)}
        onStatus={reset(setStatus)}
        onPlan={reset(setPlan)}
        onExport={() => exportCsv(filtered)}
      />
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-t border-slate-100 text-sm">
          <thead>
            <tr>
              <th className={th}>Store</th>
              <th className={th}>Plan</th>
              <th className={th}>Billing</th>
              <th className={th}>Amount</th>
              <th className={th}>Renews</th>
              <th className={th}>Status</th>
              <th className="w-12" />
            </tr>
          </thead>
          <tbody>
            {visible.map((r) => (
              <tr key={r.id} className="cursor-pointer border-t border-slate-100 hover:bg-slate-50" onClick={() => onView(r)}>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                      <Truck size={16} />
                    </span>
                    <div>
                      <p className="font-medium text-slate-900">{r.store}</p>
                      <p className="text-xs text-slate-500">{r.plan}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3"><PlanBadge plan={r.plan} /></td>
                <td className="px-4 py-3 text-slate-700">{r.billing}</td>
                <td className="px-4 py-3 font-semibold text-slate-900">{money(r.amount)}</td>
                <td className="px-4 py-3 text-slate-700">{r.renews}</td>
                <td className="px-4 py-3"><StatusBadge status={r.status} /></td>
                <td className="px-2 py-3" onClick={(e) => e.stopPropagation()}>
                  <RowMenu
                    items={[
                      { label: "View details", onClick: () => onView(r) },
                      { label: "Edit", onClick: () => onEdit(r) },
                      { label: "Suspend", onClick: () => onSuspend(r), hidden: r.status === "Suspended" || r.status === "Cancelled" },
                      { label: "Cancel subscription", onClick: () => onCancel(r), hidden: r.status === "Cancelled" },
                      { label: "Delete", onClick: () => onDelete(r), danger: true },
                    ]}
                  />
                </td>
              </tr>
            ))}
            {visible.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center text-slate-500">
                  No subscriptions match these filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Pagination page={page} pageSize={pageSize} total={filtered.length} onPage={setPage} onPageSize={reset(setPageSize)} />
    </section>
  );
}