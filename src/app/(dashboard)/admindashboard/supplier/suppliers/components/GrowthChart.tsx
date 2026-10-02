"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { growthData } from "../data";
import ChartCard from "./ChartCard";

const TEAL = "#6a9490";

export default function GrowthChart() {
  return (
    <ChartCard
      title="Supplier Growth"
      subtitle="Active stores onboarded each month"
      legendLabel="Suppliers"
      legendColor={TEAL}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={growthData} margin={{ top: 5, right: 16, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
          <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#6b7280" }} />
          <YAxis
            tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#6b7280" }}
            ticks={[0, 70, 140, 210, 280]}
          />
          <Tooltip cursor={{ fill: "#f3f4f6" }} />
          <Bar dataKey="suppliers" fill={TEAL} radius={[3, 3, 0, 0]} barSize={16} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}