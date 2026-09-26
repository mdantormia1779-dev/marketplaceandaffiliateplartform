"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, AlertTriangle, Search, ChevronDown, Eye, X, ChevronLeft, ChevronRight } from "lucide-react";

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

const PAGE_SIZE = 5;

export default function PayoutReconciliation({
  batches,
}: {
  batches: PayoutBatchItem[];
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All status");
  const [page, setPage] = useState(1);
  const [detailsBatch, setDetailsBatch] = useState<PayoutBatchItem | null>(null);

  const filteredBatches = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return batches.filter((b) => {
      const matchesSearch =
        !q ||
        b.batchId.toLowerCase().includes(q) ||
        b.txn.toLowerCase().includes(q) ||
        b.period.toLowerCase().includes(q);

      const matchesStatus = selectedStatus === "All status" || b.status === selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }, [batches, searchTerm, selectedStatus]);

  const handleSearchChange = (value: string) => {
    setPage(1);
    setSearchTerm(value);
  };

  const handleStatusChange = (value: string) => {
    setPage(1);
    setSelectedStatus(value);
  };

  const pageCount = Math.max(1, Math.ceil(filteredBatches.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);

  const visibleBatches = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredBatches.slice(start, start + PAGE_SIZE);
  }, [filteredBatches, currentPage]);

  const rangeStart = filteredBatches.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const rangeEnd = Math.min(currentPage * PAGE_SIZE, filteredBatches.length);

  const pageNumbers = useMemo(() => {
    const maxButtons = 5;
    let start = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    const end = Math.min(pageCount, start + maxButtons - 1);
    start = Math.max(1, end - maxButtons + 1);
    const pages: number[] = [];
    for (let p = start; p <= end; p++) pages.push(p);
    return pages;
  }, [currentPage, pageCount]);

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
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full rounded-xl border border-slate-200/80 bg-slate-50/30 py-2.5 pl-10 pr-4 text-xs font-medium text-slate-700 outline-none transition focus:border-indigo-500 focus:bg-white"
            />
          </div>

          <div className="relative w-full sm:w-auto">
            <select
              value={selectedStatus}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="w-full appearance-none rounded-xl border border-slate-200/80 bg-white py-2.5 pl-4 pr-10 text-xs font-semibold text-slate-700 outline-none cursor-pointer hover:bg-slate-50"
            >
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
              {visibleBatches.length > 0 ? (
                visibleBatches.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50/60 transition">
                    <td className="py-4">
                      <p
                        className="font-bold text-indigo-600 cursor-pointer hover:underline"
                        onClick={() => setDetailsBatch(b)}
                      >
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
                      <button
                        onClick={() => setDetailsBatch(b)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
                        title="View details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-400">
                    No payout batches found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-semibold text-slate-500">
          <span>
            Showing <strong className="text-slate-800">{rangeStart}-{rangeEnd}</strong> of {filteredBatches.length}
          </span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className={`flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 transition ${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-slate-50 cursor-pointer"
              }`}
            >
              <ChevronLeft className="h-3.5 w-3.5" /> Prev
            </button>

            {pageNumbers.map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`rounded-lg px-3 py-1.5 transition cursor-pointer ${
                  p === currentPage
                    ? "bg-indigo-600 text-white shadow-xs"
                    : "border border-slate-200 hover:bg-slate-50"
                }`}
              >
                {p}
              </button>
            ))}

            <button
              onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
              disabled={currentPage === pageCount}
              className={`flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 transition ${
                currentPage === pageCount ? "opacity-50 cursor-not-allowed" : "hover:bg-slate-50 cursor-pointer"
              }`}
            >
              Next <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Batch Details Modal */}
      {detailsBatch && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">{detailsBatch.batchId}</h3>
              <button
                onClick={() => setDetailsBatch(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Period</span>
                <span className="font-bold text-slate-900">{detailsBatch.period}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Paid date</span>
                <span className="font-bold text-slate-900">{detailsBatch.paidDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Orders</span>
                <span className="font-bold text-slate-900">{detailsBatch.orders}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Gross sales</span>
                <span className="font-bold text-slate-900">{detailsBatch.grossSales}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Deductions</span>
                <span className="font-bold text-rose-600">{detailsBatch.deductions}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Net payout</span>
                <span className="font-bold text-emerald-600">{detailsBatch.netPayout}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Transaction ID</span>
                <span className="font-mono text-slate-600">{detailsBatch.txn}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-medium">Status</span>
                {detailsBatch.status === "Pending" && (
                  <span className="inline-flex items-center rounded-full bg-amber-50 px-2.5 py-0.5 text-[11px] font-bold text-amber-700">
                    • Pending
                  </span>
                )}
                {detailsBatch.status === "Reconciled" && (
                  <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700">
                    • Reconciled
                  </span>
                )}
                {detailsBatch.status === "Discrepancy" && (
                  <span className="inline-flex items-center rounded-full bg-rose-50 px-2.5 py-0.5 text-[11px] font-bold text-rose-700">
                    • Discrepancy
                  </span>
                )}
              </div>
            </div>

            <button
              onClick={() => setDetailsBatch(null)}
              className="w-full px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl hover:bg-indigo-700 shadow-xs cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}