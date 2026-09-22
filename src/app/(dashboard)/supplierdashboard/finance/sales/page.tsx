"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";
import SalesCards, { type StatItem } from "../../components/SalesCards";
import SalesCharts, {
  type CategoryPieItem,
} from "../../components/SalesCharts";
import RevenueBreakdown, {
  type ProductRevenueItem,
} from "../../components/RevenueBreakdown";
import PayoutReconciliation, {
  type PayoutBatchItem,
} from "../../components/PayoutReconciliation";
import {
  Download,
  DollarSign,
  TrendingUp,
  ShoppingBag,
  Tag,
} from "lucide-react";

type TimeRange = "7 days" | "30 days" | "90 days" | "12 months";

type ChartPoint = {
  month: string;
  gross: number;
  net: number;
};

const DUMMY_PRODUCTS: ProductRevenueItem[] = [
  {
    id: "1",
    name: "Aurora Noise-Cancelling Headphones",
    sku: "AUR-HP-001",
    category: "Electronics",
    units: 62,
    orders: 58,
    gross: "$18,538",
    deductions: "-$3,379",
    netRevenue: "$15,159",
    revShare: "30.7%",
    revSharePercent: 30.7,
    trend: "6.2%",
    isTrendUp: true,
    image: "",
  },
  {
    id: "2",
    name: "Pulse Wireless Earbuds Pro",
    sku: "PLS-EB-003",
    category: "Electronics",
    units: 52,
    orders: 49,
    gross: "$8,268",
    deductions: "-$1,393",
    netRevenue: "$6,875",
    revShare: "13.7%",
    revSharePercent: 13.7,
    trend: "7.8%",
    isTrendUp: true,
    image: "",
  },
  {
    id: "3",
    name: "Vega Smart Fitness Watch",
    sku: "VEG-SW-014",
    category: "Electronics",
    units: 40,
    orders: 37,
    gross: "$7,580",
    deductions: "-$1,175",
    netRevenue: "$6,405",
    revShare: "12.6%",
    revSharePercent: 12.6,
    trend: "9.4%",
    isTrendUp: true,
    image: "",
  },
  {
    id: "4",
    name: "Nomad Leather Weekender Bag",
    sku: "NOM-BG-007",
    category: "Fashion",
    units: 20,
    orders: 19,
    gross: "$4,980",
    deductions: "-$1,145",
    netRevenue: "$3,835",
    revShare: "8.3%",
    revSharePercent: 8.3,
    trend: "4.1%",
    isTrendUp: true,
    image: "",
  },
  {
    id: "5",
    name: "Bloom Botanical Face Serum",
    sku: "BLO-FS-002",
    category: "Beauty",
    units: 100,
    orders: 92,
    gross: "$4,500",
    deductions: "-$1,125",
    netRevenue: "$3,375",
    revShare: "7.5%",
    revSharePercent: 7.5,
    trend: "15.6%",
    isTrendUp: true,
    image: "",
  },
  {
    id: "6",
    name: "Lumen Minimal Desk Lamp",
    sku: "LUM-DL-021",
    category: "Home & Living",
    units: 35,
    orders: 33,
    gross: "$3,815",
    deductions: "-$528",
    netRevenue: "$3,287",
    revShare: "6.3%",
    revSharePercent: 6.3,
    trend: "2.3%",
    isTrendUp: true,
    image: "",
  },
];

const DUMMY_BATCHES: PayoutBatchItem[] = [
  {
    id: "1",
    batchId: "PB-2026-09-30",
    txn: "TXN-99401",
    period: "Sep 16 – Sep 30, 2026",
    paidDate: "Oct 1, 2026",
    orders: 318,
    grossSales: "$29,160",
    deductions: "-$6,256",
    netPayout: "$22,904",
    status: "Pending",
  },
  {
    id: "2",
    batchId: "PB-2026-09-15",
    txn: "TXN-99330",
    period: "Sep 1 – Sep 15, 2026",
    paidDate: "Sep 16, 2026",
    orders: 412,
    grossSales: "$29,480",
    deductions: "-$6,284",
    netPayout: "$23,196",
    status: "Reconciled",
  },
  {
    id: "3",
    batchId: "PB-2026-08-31",
    txn: "TXN-99188",
    period: "Aug 16 – Aug 31, 2026",
    paidDate: "Sep 1, 2026",
    orders: 386,
    grossSales: "$26,840",
    deductions: "-$5,485",
    netPayout: "$21,355",
    status: "Reconciled",
  },
  {
    id: "4",
    batchId: "PB-2026-08-15",
    txn: "TXN-98990",
    period: "Aug 1 – Aug 15, 2026",
    paidDate: "Aug 16, 2026",
    orders: 352,
    grossSales: "$24,620",
    deductions: "-$4,729",
    netPayout: "$19,891",
    status: "Reconciled",
  },
  {
    id: "5",
    batchId: "PB-2026-07-31",
    txn: "TXN-98733",
    period: "Jul 16 – Jul 31, 2026",
    paidDate: "Aug 1, 2026",
    orders: 341,
    grossSales: "$23,780",
    deductions: "-$4,808",
    netPayout: "$18,972",
    status: "Discrepancy",
  },
];

const STATS_DATA: StatItem[] = [
  {
    title: "Gross Revenue",
    value: "$58.6K",
    change: "+8.6%",
    isPositive: true,
    subtext: "Last 30 days",
    icon: DollarSign,
    iconBg: "bg-indigo-50 text-indigo-600",
  },
  {
    title: "Net Revenue",
    value: "$49.5K",
    change: "+7.9%",
    isPositive: true,
    subtext: "After fees, refunds & commission",
    icon: TrendingUp,
    iconBg: "bg-emerald-50 text-emerald-600",
  },
  {
    title: "Units Sold",
    value: "1,124",
    change: "+9.2%",
    isPositive: true,
    subtext: "Across 892 orders",
    icon: ShoppingBag,
    iconBg: "bg-slate-100 text-slate-700",
  },
  {
    title: "Avg Order Value",
    value: "$65.74",
    change: "+1.1%",
    isPositive: true,
    subtext: "Revenue per order",
    icon: Tag,
    iconBg: "bg-emerald-50 text-emerald-600",
  },
];

const CATEGORY_DATA: CategoryPieItem[] = [
  { name: "Electronics", value: 42, amount: "$24.6K", color: "#4f46e5" },
  { name: "Fashion", value: 26, amount: "$15.2K", color: "#10b981" },
  { name: "Home & Living", value: 18, amount: "$10.6K", color: "#64748b" },
  { name: "Beauty", value: 9, amount: "$5.3K", color: "#818cf8" },
  { name: "Others", value: 5, amount: "$2.9K", color: "#e2e8f0" },
];

const CHART_DATA: ChartPoint[] = [
  { month: "Aug 21", gross: 35, net: 28 },
  { month: "Aug 26", gross: 38, net: 30 },
  { month: "Aug 31", gross: 36, net: 29 },
  { month: "Sep 5", gross: 42, net: 34 },
  { month: "Sep 10", gross: 45, net: 37 },
  { month: "Sep 15", gross: 48, net: 40 },
  { month: "Sep 19", gross: 58.6, net: 49.5 },
];

export default function SalesPage() {
  const [selectedRange, setSelectedRange] = useState<TimeRange>("30 days");
  const ranges: TimeRange[] = ["7 days", "30 days", "90 days", "12 months"];

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Navbar />

      <main className="p-6 space-y-6">
        {/* Header & Filter Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Sales Performance</h2>
            <p className="text-xs text-slate-500">
              Revenue, product breakdown and payout reconciliation for{" "}
              <span className="font-semibold text-slate-700">{selectedRange}</span>.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center rounded-xl border border-slate-200 bg-white p-1 text-xs font-semibold text-slate-600 shadow-sm">
              {ranges.map((range) => (
                <button
                  key={range}
                  onClick={() => setSelectedRange(range)}
                  className={`rounded-lg px-3 py-1.5 transition-all ${
                    selectedRange === range
                      ? "bg-indigo-600 text-white shadow-xs"
                      : "hover:bg-slate-50 text-slate-600"
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>

            <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 shadow-sm hover:bg-slate-50 transition active:scale-95">
              <Download className="h-4 w-4" />
              Export
            </button>
          </div>
        </div>

        {/* 1. Stat Cards */}
        <SalesCards stats={STATS_DATA} />

        {/* 2. Charts */}
        <SalesCharts
          chartData={CHART_DATA}
          categoryData={CATEGORY_DATA}
          timeRange={selectedRange}
          grossTotal="$58.6K"
        />

        {/* 3. Revenue Breakdown by Product */}
        <RevenueBreakdown products={DUMMY_PRODUCTS} />

        {/* 4. Payout Reconciliation & Batches */}
        <PayoutReconciliation batches={DUMMY_BATCHES} />
      </main>
    </div>
  );
}