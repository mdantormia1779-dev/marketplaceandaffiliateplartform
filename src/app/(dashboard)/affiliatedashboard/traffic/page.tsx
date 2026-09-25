"use client";

import { useState } from "react";
import {
  MousePointerClick,
  Users,
  Repeat,
  Clock,
  Activity,
  Target,
} from "lucide-react";

import TrafficHeader from "./components/TrafficHeader";
import StatCard from "./components/StatCard";
import ClicksOverTimeChart from "./components/ClicksOverTimeChart";
import TopTrafficSources from "./components/TopTrafficSources";
import TopDevices from "./components/TopDevices";
import TopCountries from "./components/TopCountries";
import { StatCardData, TimeRange } from "./components/types";

const STATS: StatCardData[] = [
  { label: "Total Clicks", value: "24,850", change: "+12.5%", trend: "up", icon: MousePointerClick, iconBg: "bg-indigo-50", iconColor: "text-indigo-600" },
  { label: "Unique Visitors", value: "15,420", change: "+9.1%", trend: "up", icon: Users, iconBg: "bg-amber-50", iconColor: "text-amber-600" },
  { label: "Returning Visitors", value: "6,180", change: "+4.6%", trend: "up", icon: Repeat, iconBg: "bg-emerald-50", iconColor: "text-emerald-600" },
  { label: "Avg. Session", value: "3m 24s", change: "+6.2%", trend: "up", icon: Clock, iconBg: "bg-blue-50", iconColor: "text-blue-600" },
  { label: "Bounce Rate", value: "38.4%", change: "-2.1%", trend: "down", icon: Activity, iconBg: "bg-slate-100", iconColor: "text-slate-600" },
  { label: "Click-through Rate", value: "4.12%", change: "+0.7%", trend: "up", icon: Target, iconBg: "bg-emerald-50", iconColor: "text-emerald-600" },
];

export default function TrafficPage(){
  const [selectedTimeRange, setSelectedTimeRange] = useState<TimeRange>("30 Days");

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 md:p-8 space-y-8">
      <TrafficHeader selectedTimeRange={selectedTimeRange} onChange={setSelectedTimeRange} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        {STATS.map((stat: StatCardData, idx: number) => (
          <StatCard key={stat.label} {...stat} delay={idx * 80} />
        ))}
      </div>

      <ClicksOverTimeChart />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <TopTrafficSources />
        <TopDevices />
      </div>

      <TopCountries />
    </div>
  );
}