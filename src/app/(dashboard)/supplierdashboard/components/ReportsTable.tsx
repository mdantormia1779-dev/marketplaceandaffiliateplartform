// src/app/(dashboard)/supplierdashboard/components/ReportsTable.tsx
"use client";

import { useState } from "react";
import { Search, Download, ChevronLeft, ChevronRight } from "lucide-react";

export interface TableRowItem {
  id: string;
  period: string;
  orders: number;
  units: number;
  grossSales: string;
  refunds: string;
  netSales: string;
  aov: string;
  growth: string;
  isPositive: boolean;
}

interface ReportsTableProps {
  activeTab: string;
  selectedRange: string;
  data: TableRowItem[];
}

export default function ReportsTable({ activeTab, selectedRange, data }: ReportsTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("Most recent");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = data.filter((item) =>
    item.period.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-xs space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">
            {activeTab === "Sales Report" ? "Sales Summary Report" : activeTab === "Orders Report" ? "Orders Detailed Report" : "Affiliate Earnings Report"}
          </h3>
          <p className="text-xs text-slate-400">Weekly settlements across last {selectedRange}</p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-3.5 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs">
            <Download className="w-4 h-4 text-slate-500" /> Export table
          </button>
        </div>
      </div>

      {/* Search & Sort Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by period..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50/50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
          />
        </div>

        <div className="w-full sm:w-auto">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer w-full sm:w-auto"
          >
            <option>Most recent</option>
            <option>Oldest first</option>
            <option>Highest sales</option>
          </select>
        </div>
      </div>

      {/* Data Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 text-[11px] uppercase tracking-wider font-bold text-slate-400">
              <th className="py-3 px-3">Period</th>
              <th className="py-3 px-3">Orders</th>
              <th className="py-3 px-3">Units</th>
              <th className="py-3 px-3">Gross Sales</th>
              <th className="py-3 px-3">Refunds</th>
              <th className="py-3 px-3">Net Sales</th>
              <th className="py-3 px-3">AOV</th>
              <th className="py-3 px-3 text-right">Growth</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 text-xs">
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-3 font-bold text-slate-900">{item.period}</td>
                  <td className="py-4 px-3 text-slate-700 font-medium">{item.orders}</td>
                  <td className="py-4 px-3 text-slate-700 font-medium">{item.units}</td>
                  <td className="py-4 px-3 font-extrabold text-slate-900">{item.grossSales}</td>
                  <td className="py-4 px-3 font-medium text-rose-600">{item.refunds}</td>
                  <td className="py-4 px-3 font-extrabold text-emerald-600">{item.netSales}</td>
                  <td className="py-4 px-3 text-slate-700 font-medium">{item.aov}</td>
                  <td className="py-4 px-3 text-right">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      item.isPositive ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-rose-50 text-rose-700 border border-rose-100"
                    }`}>
                      {item.isPositive ? "↑" : "↓"} {item.growth}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="py-8 text-center text-slate-400">
                  No report data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-slate-100 text-xs text-slate-500">
        <p>
          Showing <span className="font-bold text-slate-800">1–{filteredData.length}</span> of{" "}
          <span className="font-bold text-slate-800">12</span>
        </p>
        <div className="flex items-center gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            className="flex items-center gap-1 px-3 py-1.5 border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 font-medium cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-3.5 h-3.5" /> Prev
          </button>
          <button className="w-8 h-8 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
            1
          </button>
          <button 
            onClick={() => setCurrentPage(2)}
            className="w-8 h-8 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center justify-center cursor-pointer"
          >
            2
          </button>
          <button 
            onClick={() => setCurrentPage((p) => Math.min(p + 1, 2))}
            className="flex items-center gap-1 px-3 py-1.5 border border-slate-200 hover:bg-slate-50 rounded-lg text-slate-700 font-semibold cursor-pointer"
          >
            Next <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}