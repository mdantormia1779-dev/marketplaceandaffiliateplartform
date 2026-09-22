"use client";

import React, { useState } from "react";
import { CheckCircle2, AlertTriangle, Search, ChevronDown, Eye } from "lucide-react";

export type PayoutBatchItem = {
  id: string;
  batchId: string;
  txn: string;
  period: string;
  paidDate: string;
  orders: number;
  grossSales: string;
  deductions: string;
  netPayout: string;
  status: "Pending" | "Reconciled" | "Discrepancy";
};

export default function PayoutReconciliation({
  batches,
}: {
  batches: PayoutBatchItem[];
}) {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-6">
      {/* Payout Reconciliation Card */}
      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h3 className="text-base font-bold text-slate-900">
            Payout Reconciliation
          </h3>
          <p className="text-xs text-slate-400">
            How Sep 1 – Sep 30, 2026 sales convert into your payout
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Deductions Breakdown */}
          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between font-bold text-slate-800 pb-1">
              <span>Gross sales <span className="font-normal text-slate-400">(892 orders)</span></span>
              <span>$58,640</span>
            </div>
            <div className="flex items-center justify-between text-rose-600 font-medium">
              <span>Refunds & chargebacks</span>
              <span>-$1,980</span>
            </div>
            <div className="flex items-center justify-between text-rose-600 font-medium">
              <span>Platform fees</span>
              <span>-$1,760</span>
            </div>
            <div className="flex items-center justify-between text-rose-600 font-medium">
              <span>Affiliate commission</span>
              <span>-$7,180</span>
            </div>
            <div className="flex items-center justify-between text-slate-700 font-medium">
              <span>Adjustments & bonuses</span>
              <span className="font-bold text-slate-900">$240</span>
            </div>
            <div className="flex items-center justify-between text-rose-600 font-medium pb-2 border-b border-slate-100">
              <span>Reserve holdback</span>
              <span>-$1,860</span>
            </div>

            {/* Net Payable Highlight Card */}
            <div className="mt-4 flex items-center justify-between rounded-xl bg-indigo-50/60 p-4 border border-indigo-100/50">
              <div>
                <p className="font-bold text-indigo-950 text-sm">Net payable</p>
                <p className="text-[11px] text-slate-500 font-medium">After all deductions</p>
              </div>
              <span className="text-2xl font-black text-indigo-700">$46,100</span>
            </div>
          </div>

          {/* Settlement Distribution */}
          <div className="space-y-5 text-xs">
            <p className="font-bold uppercase tracking-wider text-[11px] text-slate-400">
              Settlement Distribution
            </p>

            {/* Paid Out Progress */}
            <div>
              <div className="flex items-center justify-between font-bold text-slate-900 mb-1.5">
                <span>Paid out</span>
                <span>$38,240</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full rounded-full bg-emerald-500" style={{ width: "83%" }}></div>
              </div>
              <p className="mt-1 text-[11px] font-medium text-slate-400">83% of net payable</p>
            </div>

            {/* Pending Payout Progress */}
            <div>
              <div className="flex items-center justify-between font-bold text-slate-900 mb-1.5">
                <span>Pending payout</span>
                <span>$6,000</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full rounded-full bg-amber-400" style={{ width: "13%" }}></div>
              </div>
              <p className="mt-1 text-[11px] font-medium text-slate-400">13% of net payable</p>
            </div>

            {/* In Reserve Progress */}
            <div>
              <div className="flex items-center justify-between font-bold text-slate-900 mb-1.5">
                <span>In reserve</span>
                <span>$1,860</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full rounded-full bg-slate-400" style={{ width: "4%" }}></div>
              </div>
              <p className="mt-1 text-[11px] font-medium text-slate-400">4% of net payable</p>
            </div>

            {/* Match Badges */}
            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
                <CheckCircle2 className="h-4 w-4" />
                98.4% orders matched
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-xl bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-800">
                <AlertTriangle className="h-4 w-4" />
                4 unmatched orders
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Payout Batches Table Card */}
      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <div className="mb-5">
          <h3 className="text-base font-bold text-slate-900">Payout Batches</h3>
          <p className="text-xs text-slate-400">Every settlement cycle reconciled against your sales</p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by batch ID, period or transaction..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-slate-200/80 bg-slate-50/30 py-2.5 pl-10 pr-4 text-xs font-medium text-slate-700 outline-none transition focus:border-indigo-500 focus:bg-white"
            />
          </div>

          <div className="relative w-full sm:w-auto">
            <select className="w-full appearance-none rounded-xl border border-slate-200/80 bg-white py-2.5 pl-4 pr-10 text-xs font-semibold text-slate-700 outline-none cursor-pointer hover:bg-slate-50">
              <option>All status</option>
              <option>Reconciled</option>
              <option>Pending</option>
              <option>Discrepancy</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* Batches Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <th className="pb-3 font-semibold">Batch</th>
                <th className="pb-3 font-semibold">Period</th>
                <th className="pb-3 font-semibold">Orders</th>
                <th className="pb-3 font-semibold">Gross Sales</th>
                <th className="pb-3 font-semibold">Deductions</th>
                <th className="pb-3 font-semibold">Net Payout</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {batches.map((b) => (
                <tr key={b.id} className="hover:bg-slate-50/60 transition">
                  <td className="py-4">
                    <p className="font-bold text-indigo-600 cursor-pointer hover:underline">
                      {b.batchId}
                    </p>
                    <p className="text-[11px] text-slate-400">{b.txn}</p>
                  </td>
                  <td className="py-4">
                    <p className="font-semibold text-slate-800">{b.period}</p>
                    <p className="text-[11px] text-slate-400">Paid {b.paidDate}</p>
                  </td>
                  <td className="py-4 font-semibold text-slate-700">{b.orders}</td>
                  <td className="py-4 font-bold text-slate-900">{b.grossSales}</td>
                  <td className="py-4 font-semibold text-rose-600">{b.deductions}</td>
                  <td className="py-4 font-bold text-emerald-600">{b.netPayout}</td>
                  <td className="py-4">
                    {b.status === "Pending" && (
                      <span className="inline-flex items-center rounded-full bg-amber-50 px-2.5 py-0.5 text-[11px] font-bold text-amber-700">
                        • Pending
                      </span>
                    )}
                    {b.status === "Reconciled" && (
                      <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700">
                        • Reconciled
                      </span>
                    )}
                    {b.status === "Discrepancy" && (
                      <span className="inline-flex items-center rounded-full bg-rose-50 px-2.5 py-0.5 text-[11px] font-bold text-rose-700">
                        • Discrepancy
                      </span>
                    )}
                  </td>
                  <td className="py-4 text-right">
                    <button className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition">
                      <Eye className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-semibold text-slate-500">
          <span>Showing <strong className="text-slate-800">1-5</strong> of 6</span>
          <div className="flex items-center gap-1.5">
            <button disabled className="rounded-lg border border-slate-200 px-3 py-1.5 opacity-50 cursor-not-allowed">&lt; Prev</button>
            <button className="rounded-lg bg-indigo-600 px-3 py-1.5 text-white shadow-xs">1</button>
            <button className="rounded-lg border border-slate-200 px-3 py-1.5 hover:bg-slate-50">2</button>
            <button className="rounded-lg border border-slate-200 px-3 py-1.5 hover:bg-slate-50">Next &gt;</button>
          </div>
        </div>
      </div>
    </div>
  );
}