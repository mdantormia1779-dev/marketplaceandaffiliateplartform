// src/app/(dashboard)/supplierdashboard/reports/page.tsx
"use client";

import { useState } from "react";

import Navbar from "../../components/Navbar";
import ReportsSummaryCards, { SummaryCard } from "../../components/ReportsSummaryCards";
import ReportsTable, { TableRowItem } from "../../components/ReportsTable";
import { Calendar, DollarSign, TrendingUp, ShoppingBag, Tag } from "lucide-react";

type TimeRange = "7 days" | "30 days" | "90 days" | "12 months";
type ReportTab = "Sales Report" | "Orders Report" | "Affiliate Report";

export default function ReportsPage() {
  const [selectedRange, setSelectedRange] = useState<TimeRange>("30 days");
  const [activeTab, setActiveTab] = useState<ReportTab>("Sales Report");

  // Dynamic Summary Data based on selected time range
  const summaryDataMap: Record<TimeRange, SummaryCard[]> = {
    "7 days": [
      { title: "Gross Sales", value: "$14,280", growth: "+4.8%", isPositive: true, subtitle: "Before refunds & fees", icon: DollarSign, iconBg: "bg-indigo-50 text-indigo-600" },
      { title: "Net Sales", value: "$12,040", growth: "+5.1%", isPositive: true, subtitle: "After fees, refunds & commission", icon: TrendingUp, iconBg: "bg-emerald-50 text-emerald-600" },
      { title: "Paid Orders", value: "214", growth: "+6.2%", isPositive: true, subtitle: "Completed checkouts", icon: ShoppingBag, iconBg: "bg-slate-100 text-slate-700" },
      { title: "Avg Order Value", value: "$66.73", growth: "+0.8%", isPositive: true, subtitle: "Revenue per order", icon: Tag, iconBg: "bg-emerald-50 text-emerald-600" },
    ],
    "30 days": [
      { title: "Gross Sales", value: "$58.6K", growth: "+8.6%", isPositive: true, subtitle: "Before refunds & fees", icon: DollarSign, iconBg: "bg-indigo-50 text-indigo-600" },
      { title: "Net Sales", value: "$49.5K", growth: "+7.9%", isPositive: true, subtitle: "After fees, refunds & commission", icon: TrendingUp, iconBg: "bg-emerald-50 text-emerald-600" },
      { title: "Paid Orders", value: "892", growth: "+9.2%", isPositive: true, subtitle: "Completed checkouts", icon: ShoppingBag, iconBg: "bg-slate-100 text-slate-700" },
      { title: "Avg Order Value", value: "$65.74", growth: "+1.1%", isPositive: true, subtitle: "Revenue per order", icon: Tag, iconBg: "bg-emerald-50 text-emerald-600" },
    ],
    "90 days": [
      { title: "Gross Sales", value: "$164.2K", growth: "+12.4%", isPositive: true, subtitle: "Before refunds & fees", icon: DollarSign, iconBg: "bg-indigo-50 text-indigo-600" },
      { title: "Net Sales", value: "$138.9K", growth: "+11.5%", isPositive: true, subtitle: "After fees, refunds & commission", icon: TrendingUp, iconBg: "bg-emerald-50 text-emerald-600" },
      { title: "Paid Orders", value: "2,540", growth: "+10.1%", isPositive: true, subtitle: "Completed checkouts", icon: ShoppingBag, iconBg: "bg-slate-100 text-slate-700" },
      { title: "Avg Order Value", value: "$64.64", growth: "-0.4%", isPositive: false, subtitle: "Revenue per order", icon: Tag, iconBg: "bg-rose-50 text-rose-600" },
    ],
    "12 months": [
      { title: "Gross Sales", value: "$682.4K", growth: "+24.8%", isPositive: true, subtitle: "Before refunds & fees", icon: DollarSign, iconBg: "bg-indigo-50 text-indigo-600" },
      { title: "Net Sales", value: "$579.1K", growth: "+22.3%", isPositive: true, subtitle: "After fees, refunds & commission", icon: TrendingUp, iconBg: "bg-emerald-50 text-emerald-600" },
      { title: "Paid Orders", value: "10,480", growth: "+19.8%", isPositive: true, subtitle: "Completed checkouts", icon: ShoppingBag, iconBg: "bg-slate-100 text-slate-700" },
      { title: "Avg Order Value", value: "$65.11", growth: "+1.8%", isPositive: true, subtitle: "Revenue per order", icon: Tag, iconBg: "bg-emerald-50 text-emerald-600" },
    ],
  };

  // Dynamic Table Data
  const tableData: TableRowItem[] = [
    { id: "1", period: "Sep 13 – Sep 19, 2026", orders: 214, units: 268, grossSales: "$14,280", refunds: "-$420", netSales: "$12,040", aov: "$66.73", growth: "+4.8%", isPositive: true },
    { id: "2", period: "Sep 6 – Sep 12, 2026", orders: 206, units: 252, grossSales: "$13,620", refunds: "-$380", netSales: "$11,510", aov: "$66.12", growth: "+3.1%", isPositive: true },
    { id: "3", period: "Aug 30 – Sep 5, 2026", orders: 198, units: 240, grossSales: "$13,080", refunds: "-$340", netSales: "$11,090", aov: "$66.06", growth: "+2.4%", isPositive: true },
    { id: "4", period: "Aug 23 – Aug 29, 2026", orders: 210, units: 258, grossSales: "$13,760", refunds: "-$410", netSales: "$11,630", aov: "$65.52", growth: "+5.2%", isPositive: true },
    { id: "5", period: "Aug 16 – Aug 22, 2026", orders: 192, units: 236, grossSales: "$12,540", refunds: "-$300", netSales: "$10,620", aov: "$65.31", growth: "+1.8%", isPositive: true },
    { id: "6", period: "Aug 9 – Aug 15, 2026", orders: 186, units: 228, grossSales: "$12,180", refunds: "-$280", netSales: "$10,320", aov: "$65.48", growth: "-1.4%", isPositive: false },
    { id: "7", period: "Aug 2 – Aug 8, 2026", orders: 190, units: 232, grossSales: "$12,420", refunds: "-$320", netSales: "$10,510", aov: "$65.37", growth: "+2.9%", isPositive: true },
    { id: "8", period: "Jul 26 – Aug 1, 2026", orders: 178, units: 218, grossSales: "$11,680", refunds: "-$260", netSales: "$9,890", aov: "$65.62", growth: "+3.6%", isPositive: true },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col">
      {/* Top Fixed Navbar */}
      <div className="sticky top-0 z-50 bg-white border-b border-slate-100">
        <Navbar/>
      </div>

      <main className="flex-1 p-6 max-w-[1600px] w-full mx-auto space-y-6">
        
        {/* Page Top Title */}
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Reports</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Export insights across sales, orders and affiliates.
          </p>
        </div>

        {/* Reports Header & Global Filters Bar */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs space-y-5">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">Reports & Exports</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Generate, review and export performance reports across last <span className="font-semibold text-slate-700">{selectedRange}</span>.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1">
                {(["7 days", "30 days", "90 days", "12 months"] as TimeRange[]).map((range) => (
                  <button
                    key={range}
                    onClick={() => setSelectedRange(range)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      selectedRange === range
                        ? "bg-indigo-600 text-white shadow-xs"
                        : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>

              <button className="flex items-center gap-2 px-3.5 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold transition-all cursor-pointer">
                <Calendar className="w-4 h-4 text-slate-500" /> Schedule
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-slate-100">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
              {(["Sales Report", "Orders Report", "Affiliate Report"] as ReportTab[]).map((tab) => {
                const badgeCounts = { "Sales Report": 12, "Orders Report": 14, "Affiliate Report": 10 };
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                      activeTab === tab
                        ? "bg-indigo-600 text-white shadow-xs"
                        : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/60"
                    }`}
                  >
                    {tab}
                    <span className={`px-1.5 py-0.5 rounded-md text-[10px] ${
                      activeTab === tab ? "bg-indigo-500 text-white" : "bg-slate-200 text-slate-600"
                    }`}>
                      {badgeCounts[tab]}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200/60 w-fit">
              <Calendar className="w-3.5 h-3.5 text-indigo-600" />
              Reporting period: <span className="text-slate-900 font-bold">Last {selectedRange}</span>
            </div>
          </div>
        </div>

        {/* Component 1: Summary Cards */}
        <ReportsSummaryCards cards={summaryDataMap[selectedRange]} />

        {/* Component 2: Reports Table */}
        <ReportsTable activeTab={activeTab} selectedRange={selectedRange} data={tableData} />

      </main>
    </div>
  );
}