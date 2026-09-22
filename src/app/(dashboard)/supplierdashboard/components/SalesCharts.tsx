"use client";

import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export type SalesChartPoint = {
  month: string;
  gross: number;
  net?: number;
};

export type CategoryPieItem = {
  name: string;
  value: number;
  amount?: string;
  color: string;
};

interface SalesChartsProps {
  chartData: SalesChartPoint[];
  categoryData: CategoryPieItem[];
  timeRange?: string;
  grossTotal: string;
  growthRate?: string;
  isGrowthUp?: boolean;
}

export default function SalesCharts({
  chartData,
  categoryData,
  timeRange = "30 days",
  grossTotal,
  growthRate = "+8.6%",
  isGrowthUp = true,
}: SalesChartsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Revenue Trend Area Chart with Smooth Recharts Animation */}
      <div className="lg:col-span-2 bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-base font-bold text-slate-900">Revenue Trend</h3>
            <p className="text-xs text-slate-400">
              Gross & Net revenue breakdown ({timeRange})
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 text-xs font-semibold text-slate-600">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
                Gross
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                Net
              </div>
            </div>

            <span
              className={`px-2.5 py-1 text-xs font-bold rounded-lg flex items-center gap-0.5 ${
                isGrowthUp
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-rose-50 text-rose-700"
              }`}
            >
              {isGrowthUp ? (
                <ArrowUpRight className="w-3.5 h-3.5" />
              ) : (
                <ArrowDownRight className="w-3.5 h-3.5" />
              )}
              {growthRate} vs prev
            </span>
          </div>
        </div>

        {/* Recharts Area Chart Component */}
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="grossGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="netGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>

              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94a3b8", fontSize: 11 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94a3b8", fontSize: 11 }}
                tickFormatter={(val) => `$${val}k`}
              />

              <Tooltip
                formatter={(val: unknown, name: unknown) => [
                  `$${val}k`,
                  name === "gross" ? "Gross Revenue" : "Net Revenue",
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
                type="monotone"
                dataKey="gross"
                stroke="#4f46e5"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#grossGradient)"
                isAnimationActive={true}
                animationDuration={1200}
              />
              {chartData[0]?.net !== undefined && (
                <Area
                  type="monotone"
                  dataKey="net"
                  stroke="#10b981"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  fillOpacity={1}
                  fill="url(#netGradient)"
                  isAnimationActive={true}
                  animationDuration={1200}
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Revenue by Category Donut Chart with Recharts Animation */}
      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900">
            Revenue by Category
          </h3>
          <p className="text-xs text-slate-400">Share of total revenue</p>
        </div>

        <div className="flex flex-col sm:flex-row lg:flex-col items-center justify-between gap-6 my-4">
          <div className="relative w-44 h-44 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                  isAnimationActive={true}
                  animationDuration={1000}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            <div className="absolute text-center pointer-events-none">
              <span className="text-lg font-extrabold text-slate-900 block leading-tight">
                {grossTotal}
              </span>
              <span className="text-[10px] text-slate-400 font-medium">
                Total revenue
              </span>
            </div>
          </div>

          {/* Category List */}
          <div className="w-full space-y-2.5">
            {categoryData.map((cat) => (
              <div
                key={cat.name}
                className="flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: cat.color }}
                  ></span>
                  <span className="text-slate-600 font-medium">{cat.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  {cat.amount && (
                    <span className="font-bold text-slate-900">
                      {cat.amount}
                    </span>
                  )}
                  <span className="font-semibold text-slate-400 w-8 text-right">
                    {cat.value}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}