"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";
import TransactionAndPayout from "../../components/TransactionAndPayout";
import {
  Wallet,
  Clock,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  DollarSign,
  ArrowUpFromLine,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

type TimeRange = "6 months" | "12 months";

const EARNINGS_DATA = {
  "6 months": [
    { month: "Apr", net: 32, affiliate: 8 },
    { month: "May", net: 38, affiliate: 9 },
    { month: "Jun", net: 34, affiliate: 8.5 },
    { month: "Jul", net: 42, affiliate: 10 },
    { month: "Aug", net: 48, affiliate: 11 },
    { month: "Sep", net: 44, affiliate: 10.5 },
  ],
  "12 months": [
    { month: "Oct", net: 26, affiliate: 5 },
    { month: "Nov", net: 29, affiliate: 6.5 },
    { month: "Dec", net: 28, affiliate: 6 },
    { month: "Jan", net: 32, affiliate: 7.5 },
    { month: "Feb", net: 36, affiliate: 8 },
    { month: "Mar", net: 33, affiliate: 7.8 },
    { month: "Apr", net: 39, affiliate: 9 },
    { month: "May", net: 42, affiliate: 9.5 },
    { month: "Jun", net: 40, affiliate: 9.2 },
    { month: "Jul", net: 46, affiliate: 10.5 },
    { month: "Aug", net: 49, affiliate: 11.2 },
    { month: "Sep", net: 45, affiliate: 10.8 },
  ],
};

export default function WalletPage() {
  const [selectedTimeRange, setSelectedTimeRange] = useState<TimeRange>("12 months");
  const chartData = EARNINGS_DATA[selectedTimeRange];

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Navbar Fixed on Top */}
      <div className="sticky top-0 z-50 bg-white border-b border-slate-100">
        <Navbar />
      </div>

      <main className="p-6 space-y-6 max-w-[1600px] mx-auto">
        {/* Wallet Header */}
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Wallet</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Your balances, earnings and transaction history.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Available Balance */}
          <div className="bg-indigo-600 rounded-2xl p-6 text-white shadow-sm flex flex-col justify-between relative overflow-hidden">
            <div className="absolute right-4 top-4 bg-white/10 p-2.5 rounded-xl">
              <Wallet className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs font-medium text-indigo-100 mb-1">Available Balance</p>
              <h2 className="text-3xl font-extrabold tracking-tight">$42,250.75</h2>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <span className="inline-flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded-md text-[11px] font-semibold text-white">
                <ArrowUpRight className="w-3.5 h-3.5" /> 6.2%
              </span>
              <span className="text-[11px] text-indigo-100 font-medium">Ready to withdraw</span>
            </div>
            <button className="mt-4 bg-white text-indigo-600 hover:bg-indigo-50 font-bold text-xs py-2.5 px-4 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2">
              <DollarSign className="w-4 h-4" /> Withdraw funds
            </button>
          </div>

          {/* Pending Balance */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between relative">
            <div className="absolute right-4 top-4 bg-amber-50 p-2.5 rounded-xl">
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-400 mb-1">Pending Balance</p>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">$12,840.50</h2>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <span className="inline-flex items-center gap-1 bg-rose-50 text-rose-600 px-2 py-0.5 rounded-md text-[11px] font-semibold">
                <ArrowDownRight className="w-3.5 h-3.5" /> 2.3%
              </span>
              <span className="text-[11px] text-slate-400 font-medium">Clears within 7 days</span>
            </div>
          </div>

          {/* Total Earnings */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between relative">
            <div className="absolute right-4 top-4 bg-emerald-50 p-2.5 rounded-xl">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-400 mb-1">Total Earnings</p>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">$486,920</h2>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-md text-[11px] font-semibold">
                <ArrowUpRight className="w-3.5 h-3.5" /> 12.4%
              </span>
              <span className="text-[11px] text-slate-400 font-medium">Lifetime net earnings</span>
            </div>
          </div>

          {/* Withdrawn */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between relative">
            <div className="absolute right-4 top-4 bg-slate-100 p-2.5 rounded-xl">
              <ArrowUpFromLine className="w-5 h-5 text-slate-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-400 mb-1">Withdrawn</p>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">$412,300</h2>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-md text-[11px] font-semibold">
                <ArrowUpRight className="w-3.5 h-3.5" /> 4.8%
              </span>
              <span className="text-[11px] text-slate-400 font-medium">Across all payouts</span>
            </div>
          </div>
        </div>

        {/* Charts & Breakdown Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Earnings Overview Area Chart */}
          <div className="lg:col-span-2 bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">Earnings Overview</h3>
                <p className="text-xs text-slate-400">$446.8K earned in the last 12 months</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-4 text-xs font-semibold text-slate-600 hidden sm:flex">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span> Net earnings
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Affiliate commission paid
                  </div>
                </div>

                <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 p-1 text-xs font-semibold text-slate-600">
                  {(["6 months", "12 months"] as TimeRange[]).map((range) => (
                    <button
                      key={range}
                      onClick={() => setSelectedTimeRange(range)}
                      className={`rounded-lg px-3 py-1 transition-all ${
                        selectedTimeRange === range
                          ? "bg-white text-slate-900 shadow-xs"
                          : "text-slate-500 hover:text-slate-900"
                      }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="h-72 w-full mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={chartData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="netGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.01} />
                    </linearGradient>
                  </defs>

                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />

                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 11 }} />

                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#94a3b8", fontSize: 11 }}
                    tickFormatter={(val) => `$${val}k`}
                    domain={[0, 60]}
                  />

                  <Tooltip
                    formatter={(val: unknown, name: unknown) => [
                      `$${val}k`,
                      name === "net" ? "Net earnings" : "Affiliate commission paid",
                    ]}
                    contentStyle={{
                      backgroundColor: "#ffffff",
                      borderRadius: "12px",
                      border: "1px solid #e2e8f0",
                      fontSize: "12px",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                  />

                  <Area
                    type="natural"
                    dataKey="net"
                    stroke="#4f46e5"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#netGradient)"
                    isAnimationActive={true}
                    animationDuration={1500}
                  />

                  <Area
                    type="natural"
                    dataKey="affiliate"
                    stroke="#10b981"
                    strokeWidth={2}
                    strokeDasharray="4 4"
                    fill="none"
                    isAnimationActive={true}
                    animationDuration={1500}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Balance Breakdown & Next Payout */}
          <div className="space-y-6 flex flex-col justify-between">
            <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-5">
              <div>
                <h3 className="text-base font-bold text-slate-900">Balance Breakdown</h3>
                <p className="text-xs text-slate-400">Where your money currently sits</p>
              </div>

              {/* Item 1 */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-600">Available now</span>
                  <span className="text-slate-900 font-bold">$42,250.75</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-indigo-600 h-full rounded-full" style={{ width: "74%" }}></div>
                </div>
                <p className="text-[10px] text-slate-400">74% of total balance</p>
              </div>

              {/* Item 2 */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-600">Pending clearance</span>
                  <span className="text-slate-900 font-bold">$12,840.50</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: "23%" }}></div>
                </div>
                <p className="text-[10px] text-slate-400">23% of total balance</p>
              </div>

              {/* Item 3 */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-600">Held in reserve</span>
                  <span className="text-slate-900 font-bold">$1,860.25</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-slate-400 h-full rounded-full" style={{ width: "3%" }}></div>
                </div>
                <p className="text-[10px] text-slate-400">3% of total balance</p>
              </div>
            </div>

            {/* Next Payout Card */}
            <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm flex items-start gap-3.5">
              <div className="bg-indigo-50 p-3 rounded-xl text-indigo-600 shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  Next payout <span className="text-indigo-600">• Oct 1, 2026</span>
                </h4>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Automatic payouts run Every 1st & 15th to your default payout method.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* New Component: Transaction History & Payout Methods */}
        <TransactionAndPayout />
      </main>
    </div>
  );
}