// src/app/(dashboard)/supplierdashboard/components/WithdrawalHistory.tsx
"use client";

import { useMemo, useState } from "react";
import { Search, Eye, ChevronLeft, ChevronRight, X } from "lucide-react";

export interface WithdrawalItem {
  id: string;
  withdrawalId: string;
  requestedDate: string;
  amount: string;
  fee: string;
  methodName: string;
  methodDetail: string;
  status: "Paid" | "Processing" | "Rejected" | "Approved";
  txnId: string;
}

interface WithdrawalHistoryProps {
  withdrawals: WithdrawalItem[];
  onViewDetails?: (item: WithdrawalItem) => void;
  pageSize?: number;
}

export default function WithdrawalHistory({
  withdrawals,
  onViewDetails,
  pageSize = 5,
}: WithdrawalHistoryProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All status");
  const [page, setPage] = useState(1);
  const [detailsItem, setDetailsItem] = useState<WithdrawalItem | null>(null);

  // Filter logic
  const filteredWithdrawals = useMemo(() => {
    return withdrawals.filter((item) => {
      const matchesSearch =
        item.withdrawalId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.txnId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.methodName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.methodDetail.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        selectedStatus === "All status" || item.status.toLowerCase() === selectedStatus.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [withdrawals, searchTerm, selectedStatus]);

  const handleSearchChange = (value: string) => {
    setPage(1);
    setSearchTerm(value);
  };

  const handleStatusChange = (value: string) => {
    setPage(1);
    setSelectedStatus(value);
  };

  const pageCount = Math.max(1, Math.ceil(filteredWithdrawals.length / pageSize));
  const currentPage = Math.min(page, pageCount);

  const paginatedWithdrawals = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredWithdrawals.slice(start, start + pageSize);
  }, [filteredWithdrawals, currentPage, pageSize]);

  const rangeStart = filteredWithdrawals.length === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const rangeEnd = Math.min(currentPage * pageSize, filteredWithdrawals.length);

  const handleView = (item: WithdrawalItem) => {
    if (onViewDetails) {
      onViewDetails(item);
    } else {
      setDetailsItem(item);
    }
  };

  // Build a small window of page numbers around the current page
  const pageNumbers = useMemo(() => {
    const maxButtons = 5;
    let start = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    const end = Math.min(pageCount, start + maxButtons - 1);
    start = Math.max(1, end - maxButtons + 1);

    const pages: number[] = [];
    for (let p = start; p <= end; p++) pages.push(p);
    return pages;
  }, [currentPage, pageCount]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-emerald-50 text-emerald-700 border border-emerald-100";
      case "Processing":
        return "bg-indigo-50 text-indigo-700 border border-indigo-100";
      case "Approved":
        return "bg-slate-100 text-slate-700 border border-slate-200";
      case "Rejected":
        return "bg-rose-50 text-rose-700 border border-rose-100";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-5">
      <div>
        <h3 className="text-base font-bold text-slate-900">Withdrawal History</h3>
        <p className="text-xs text-slate-400">Track the status of every payout request</p>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by ID, transaction or account..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50/50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
          />
        </div>

        <div className="w-full sm:w-auto">
          <select
            value={selectedStatus}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer w-full sm:w-auto"
          >
            <option>All status</option>
            <option>Paid</option>
            <option>Processing</option>
            <option>Approved</option>
            <option>Rejected</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 text-[11px] uppercase tracking-wider font-bold text-slate-400">
              <th className="py-3 px-3">Withdrawal</th>
              <th className="py-3 px-3">Requested</th>
              <th className="py-3 px-3">Amount</th>
              <th className="py-3 px-3">Method</th>
              <th className="py-3 px-3">Status</th>
              <th className="py-3 px-3">TXN ID</th>
              <th className="py-3 px-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 text-xs">
            {paginatedWithdrawals.length > 0 ? (
              paginatedWithdrawals.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td
                    className="py-4 px-3 font-bold text-indigo-600 hover:underline cursor-pointer"
                    onClick={() => handleView(item)}
                  >
                    {item.withdrawalId}
                  </td>
                  <td className="py-4 px-3 text-slate-700 font-medium">
                    {item.requestedDate}
                  </td>
                  <td className="py-4 px-3">
                    <span className="font-extrabold text-slate-900">{item.amount}</span>
                    <span className="text-[10px] text-slate-400 ml-1.5">{item.fee}</span>
                  </td>
                  <td className="py-4 px-3">
                    <p className="font-bold text-slate-900">{item.methodName}</p>
                    <p className="text-[11px] text-slate-400">{item.methodDetail}</p>
                  </td>
                  <td className="py-4 px-3">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${getStatusBadge(item.status)}`}>
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          item.status === "Paid"
                            ? "bg-emerald-500"
                            : item.status === "Processing"
                            ? "bg-indigo-500"
                            : item.status === "Rejected"
                            ? "bg-rose-500"
                            : "bg-slate-400"
                        }`}
                      ></span>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-4 px-3 font-mono text-slate-600 text-[11px]">
                    {item.txnId}
                  </td>
                  <td className="py-4 px-3 text-right">
                    <button
                      onClick={() => handleView(item)}
                      className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors inline-flex items-center justify-center cursor-pointer"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-8 text-center text-slate-400">
                  No withdrawal history found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-slate-100 text-xs text-slate-500">
        <p>
          Showing <span className="font-bold text-slate-800">{rangeStart}–{rangeEnd}</span> of{" "}
          <span className="font-bold text-slate-800">{filteredWithdrawals.length}</span>
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className={`flex items-center gap-1 px-3 py-1.5 border border-slate-200 rounded-lg font-medium transition-colors ${
              currentPage === 1
                ? "text-slate-300 cursor-not-allowed"
                : "text-slate-700 hover:bg-slate-50 cursor-pointer"
            }`}
          >
            <ChevronLeft className="w-3.5 h-3.5" /> Prev
          </button>

          {pageNumbers.map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`w-8 h-8 rounded-lg font-bold text-xs flex items-center justify-center transition-colors cursor-pointer ${
                p === currentPage
                  ? "bg-indigo-600 text-white"
                  : "border border-slate-200 hover:bg-slate-50 text-slate-700"
              }`}
            >
              {p}
            </button>
          ))}

          <button
            onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
            disabled={currentPage === pageCount}
            className={`flex items-center gap-1 px-3 py-1.5 border border-slate-200 rounded-lg font-semibold transition-colors ${
              currentPage === pageCount
                ? "text-slate-300 cursor-not-allowed"
                : "text-slate-700 hover:bg-slate-50 cursor-pointer"
            }`}
          >
            Next <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Details Modal (only used when no onViewDetails is passed in) */}
      {detailsItem && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">{detailsItem.withdrawalId}</h3>
              <button
                onClick={() => setDetailsItem(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Requested</span>
                <span className="font-bold text-slate-900">{detailsItem.requestedDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Amount</span>
                <span className="font-bold text-slate-900">
                  {detailsItem.amount} <span className="text-slate-400 font-normal">{detailsItem.fee}</span>
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Method</span>
                <span className="font-bold text-slate-900 text-right">
                  {detailsItem.methodName}
                  <br />
                  <span className="text-[11px] text-slate-400 font-normal">{detailsItem.methodDetail}</span>
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-medium">Status</span>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${getStatusBadge(detailsItem.status)}`}>
                  {detailsItem.status}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Transaction ID</span>
                <span className="font-mono text-slate-600">{detailsItem.txnId}</span>
              </div>
            </div>

            <button
              onClick={() => setDetailsItem(null)}
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