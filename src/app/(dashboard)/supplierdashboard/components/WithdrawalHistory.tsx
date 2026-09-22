// src/app/(dashboard)/supplierdashboard/components/WithdrawalHistory.tsx
"use client";

import { useState } from "react";
import { Search, Eye, ChevronLeft, ChevronRight } from "lucide-react";

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
}

export default function WithdrawalHistory({ withdrawals, onViewDetails }: WithdrawalHistoryProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All status");

  // Filter logic
  const filteredWithdrawals = withdrawals.filter((item) => {
    const matchesSearch =
      item.withdrawalId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.txnId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.methodName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.methodDetail.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      selectedStatus === "All status" || item.status.toLowerCase() === selectedStatus.toLowerCase();

    return matchesSearch && matchesStatus;
  });

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
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50/50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
          />
        </div>

        <div className="w-full sm:w-auto">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
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
            {filteredWithdrawals.length > 0 ? (
              filteredWithdrawals.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-3 font-bold text-indigo-600 hover:underline cursor-pointer">
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
                      <span className={`w-1.5 h-1.5 rounded-full ${item.status === "Paid" ? "bg-emerald-500" : item.status === "Processing" ? "bg-indigo-500" : item.status === "Rejected" ? "bg-rose-500" : "bg-slate-400"}`}></span>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-4 px-3 font-mono text-slate-600 text-[11px]">
                    {item.txnId}
                  </td>
                  <td className="py-4 px-3 text-right">
                    <button
                      onClick={() => onViewDetails && onViewDetails(item)}
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
          Showing <span className="font-bold text-slate-800">1–{filteredWithdrawals.length}</span> of{" "}
          <span className="font-bold text-slate-800">{withdrawals.length}</span>
        </p>
        <div className="flex items-center gap-2">
          <button
            disabled
            className="flex items-center gap-1 px-3 py-1.5 border border-slate-200 rounded-lg text-slate-300 font-medium cursor-not-allowed"
          >
            <ChevronLeft className="w-3.5 h-3.5" /> Prev
          </button>
          <button className="w-8 h-8 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
            1
          </button>
          <button className="w-8 h-8 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center justify-center">
            2
          </button>
          <button className="flex items-center gap-1 px-3 py-1.5 border border-slate-200 hover:bg-slate-50 rounded-lg text-slate-700 font-semibold cursor-pointer">
            Next <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}