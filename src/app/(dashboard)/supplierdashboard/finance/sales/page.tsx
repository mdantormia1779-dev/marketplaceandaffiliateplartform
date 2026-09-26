"use client";

import { useMemo, useState } from "react";
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

const BASE_PRODUCTS: ProductRevenueItem[] = [
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

const BASE_BATCHES: PayoutBatchItem[] = [
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

const BASE_CATEGORY_DATA: CategoryPieItem[] = [
  { name: "Electronics", value: 42, amount: "$24.6K", color: "#4f46e5" },
  { name: "Fashion", value: 26, amount: "$15.2K", color: "#10b981" },
  { name: "Home & Living", value: 18, amount: "$10.6K", color: "#64748b" },
  { name: "Beauty", value: 9, amount: "$5.3K", color: "#818cf8" },
  { name: "Others", value: 5, amount: "$2.9K", color: "#e2e8f0" },
];

const BASE_CHART_DATA: ChartPoint[] = [
  { month: "Aug 21", gross: 35, net: 28 },
  { month: "Aug 26", gross: 38, net: 30 },
  { month: "Aug 31", gross: 36, net: 29 },
  { month: "Sep 5", gross: 42, net: 34 },
  { month: "Sep 10", gross: 45, net: 37 },
  { month: "Sep 15", gross: 48, net: 40 },
  { month: "Sep 19", gross: 58.6, net: 49.5 },
];

// Scale factor + chart point count per range, relative to the "30 days" base data
const RANGE_CONFIG: Record<TimeRange, { scale: number; points: number }> = {
  "7 days": { scale: 0.24, points: 4 },
  "30 days": { scale: 1, points: 7 },
  "90 days": { scale: 2.85, points: 9 },
  "12 months": { scale: 10.4, points: 12 },
};

function scaleMoney(value: string, scale: number) {
  const n = parseFloat(value.replace(/[^0-9.-]/g, ""));
  const scaled = n * scale;
  const sign = value.trim().startsWith("-") ? "-" : "";
  return `${sign}$${Math.abs(scaled).toLocaleString("en-US", {
    maximumFractionDigits: scaled < 1000 ? 1 : 0,
  })}`;
}

function scaleCompact(value: string | undefined, scale: number) {
  const n = parseFloat(value?.replace(/[^0-9.KkMm]/g, "") || "0");
  const scaled = n * scale;
  return `$${scaled.toFixed(1)}K`;
}

function buildProducts(scale: number): ProductRevenueItem[] {
  return BASE_PRODUCTS.map((p) => ({
    ...p,
    units: Math.max(1, Math.round(p.units * scale)),
    orders: Math.max(1, Math.round(p.orders * scale)),
    gross: scaleMoney(p.gross, scale),
    deductions: scaleMoney(p.deductions, scale),
    netRevenue: scaleMoney(p.netRevenue, scale),
  }));
}

function buildBatches(scale: number, range: TimeRange): PayoutBatchItem[] {
  const count = range === "7 days" ? 2 : range === "30 days" ? 5 : range === "90 days" ? 6 : 8;
  return BASE_BATCHES.slice(0, Math.min(count, BASE_BATCHES.length)).map((b) => ({
    ...b,
    orders: Math.max(1, Math.round(b.orders * scale)),
    grossSales: scaleMoney(b.grossSales, scale),
    deductions: scaleMoney(b.deductions, scale),
    netPayout: scaleMoney(b.netPayout, scale),
  }));
}

function buildCategoryData(scale: number): CategoryPieItem[] {
  return BASE_CATEGORY_DATA.map((c) => ({
    ...c,
    amount: scaleCompact(c.amount, scale),
  }));
}

function buildChartData(scale: number, points: number): ChartPoint[] {
  const source = BASE_CHART_DATA;
  const step = source.length / points;
  const result: ChartPoint[] = [];
  for (let i = 0; i < points; i++) {
    const idx = Math.min(source.length - 1, Math.round(i * step));
    const base = source[idx];
    result.push({
      month: base.month,
      gross: Math.round(base.gross * scale * 10) / 10,
      net: Math.round(base.net * scale * 10) / 10,
    });
  }
  return result;
}

function buildStats(scale: number): StatItem[] {
  const grossVal = 58.6 * scale;
  const netVal = 49.5 * scale;
  const unitsVal = Math.round(1124 * scale);
  const ordersVal = Math.round(892 * scale);
  const aov = ordersVal > 0 ? grossVal * 1000 / ordersVal : 0;

  return [
    {
      title: "Gross Revenue",
      value: `$${grossVal.toFixed(1)}K`,
      change: "+8.6%",
      isPositive: true,
      subtext: "Selected period",
      icon: DollarSign,
      iconBg: "bg-indigo-50 text-indigo-600",
    },
    {
      title: "Net Revenue",
      value: `$${netVal.toFixed(1)}K`,
      change: "+7.9%",
      isPositive: true,
      subtext: "After fees, refunds & commission",
      icon: TrendingUp,
      iconBg: "bg-emerald-50 text-emerald-600",
    },
    {
      title: "Units Sold",
      value: unitsVal.toLocaleString(),
      change: "+9.2%",
      isPositive: true,
      subtext: `Across ${ordersVal.toLocaleString()} orders`,
      icon: ShoppingBag,
      iconBg: "bg-slate-100 text-slate-700",
    },
    {
      title: "Avg Order Value",
      value: `$${aov.toFixed(2)}`,
      change: "+1.1%",
      isPositive: true,
      subtext: "Revenue per order",
      icon: Tag,
      iconBg: "bg-emerald-50 text-emerald-600",
    },
  ];
}

function downloadCsv(filename: string, csv: string) {
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function toCsvCell(value: string | number) {
  const str = String(value);
  return /[",\n]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str;
}

export default function SalesPage() {
  const [selectedRange, setSelectedRange] = useState<TimeRange>("30 days");
  const ranges: TimeRange[] = ["7 days", "30 days", "90 days", "12 months"];

  const { scale, points } = RANGE_CONFIG[selectedRange];

  const statsData = useMemo(() => buildStats(scale), [scale]);
  const chartData = useMemo(() => buildChartData(scale, points), [scale, points]);
  const categoryData = useMemo(() => buildCategoryData(scale), [scale]);
  const products = useMemo(() => buildProducts(scale), [scale]);
  const batches = useMemo(() => buildBatches(scale, selectedRange), [scale, selectedRange]);
  const grossTotal = statsData[0].value;

  function handleExport() {
    const header = [
      "Product",
      "SKU",
      "Category",
      "Units",
      "Orders",
      "Gross",
      "Deductions",
      "Net Revenue",
      "Rev Share",
      "Trend",
    ];

    const rows = products.map((p) => [
      p.name,
      p.sku,
      p.category,
      p.units,
      p.orders,
      p.gross,
      p.deductions,
      p.netRevenue,
      p.revShare,
      p.trend,
    ]);

    const csv = [header, ...rows]
      .map((row) => row.map(toCsvCell).join(","))
      .join("\n");

    const filename = `sales-report-${selectedRange.replace(" ", "-")}-${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;

    downloadCsv(filename, csv);
  }

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

            <button
              onClick={handleExport}
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 shadow-sm hover:bg-slate-50 transition active:scale-95 cursor-pointer"
            >
              <Download className="h-4 w-4" />
              Export
            </button>
          </div>
        </div>

        {/* 1. Stat Cards */}
        <SalesCards stats={statsData} />

        {/* 2. Charts */}
        <SalesCharts
          chartData={chartData}
          categoryData={categoryData}
          timeRange={selectedRange}
          grossTotal={grossTotal}
        />

        {/* 3. Revenue Breakdown by Product */}
        <RevenueBreakdown products={products} />

        {/* 4. Payout Reconciliation & Batches */}
        <PayoutReconciliation batches={batches} />
      </main>
    </div>
  );
}