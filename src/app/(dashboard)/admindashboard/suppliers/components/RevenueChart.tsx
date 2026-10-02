"use client";

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { revenueData } from "../data";
import ChartCard from "./ChartCard";

const GREEN = "#1fae6b";

export default function RevenueChart() {
  return (
    <ChartCard
      title="Supplier Revenue Trend"
      subtitle="Combined monthly revenue across all stores"
      legendLabel="Revenue"
      legendColor={GREEN}
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={revenueData} margin={{ top: 5, right: 16, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="revFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={GREEN} stopOpacity={0.25} />
              <stop offset="100%" stopColor={GREEN} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
          <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#6b7280" }} />
          <YAxis
            tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#6b7280" }}
            ticks={[0, 50000, 100000, 150000, 200000]}
            tickFormatter={(v) => (v === 0 ? "$0" : `$${v / 1000}k`)}
          />
          <Tooltip formatter={(v) => `$${Number(v).toLocaleString()}`} />
          <Area type="monotone" dataKey="revenue" stroke={GREEN} strokeWidth={2} fill="url(#revFill)" />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}