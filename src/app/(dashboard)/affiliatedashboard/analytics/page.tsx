"use client";



import { useState } from "react";

import {

  DollarSign,

  Wallet,

  MousePointerClick,

  ShoppingCart,

  TrendingUp,

  Receipt,

  Coins,

  Smartphone,

  Monitor,

  Tablet,

} from "lucide-react";



import AnalyticsHeader from "./components/AnalyticsHeader";

import StatCard from "./components/StatCard";

import DualLineChart from "./components/DualLineChart";

import TrafficSourcesDonut from "./components/TrafficSourcesDonut";

import DeviceAnalytics from "./components/DeviceAnalytics";

import TopProductsTable from "./components/TopProductsTable";

import GeographicAnalytics from "./components/GeographicAnalytics";



import {

  AnalyticsStat,

  AnalyticsTimeRange,

  CountryPerformance,

  DeviceItem,

  DualLineDataPoint,

  ProductPerformance,

  TrafficSourceItem,

} from "./components/types";



const STATS: AnalyticsStat[] = [

  { label: "Total Revenue Generated", value: "৳6,84,200", change: "+14.8%", icon: DollarSign, iconBg: "bg-indigo-50", iconColor: "text-indigo-600", topBarColor: "bg-emerald-500" },

  { label: "Total Commission", value: "৳58,420", change: "+15.2%", icon: Wallet, iconBg: "bg-emerald-50", iconColor: "text-emerald-600", topBarColor: "bg-emerald-500" },

  { label: "Clicks", value: "24,850", change: "+12.5%", icon: MousePointerClick, iconBg: "bg-amber-50", iconColor: "text-amber-600", topBarColor: "bg-amber-500" },

  { label: "Orders", value: "428", change: "+8.4%", icon: ShoppingCart, iconBg: "bg-blue-50", iconColor: "text-blue-600", topBarColor: "bg-blue-500" },

  { label: "Conversion Rate", value: "3.42%", change: "+0.8%", icon: TrendingUp, iconBg: "bg-emerald-50", iconColor: "text-emerald-600", topBarColor: "bg-emerald-500" },

  { label: "Average Order Value", value: "৳1,598", change: "+3.1%", icon: Receipt, iconBg: "bg-amber-50", iconColor: "text-amber-600", topBarColor: "bg-amber-500" },

  { label: "Earnings Per Click", value: "৳2.35", change: "+2.4%", icon: Coins, iconBg: "bg-blue-50", iconColor: "text-blue-600", topBarColor: "bg-blue-500" },

];



const CLICKS_VS_SALES: DualLineDataPoint[] = [

  { label: "Sep 1", valueA: 720, valueB: 12 },

  { label: "Sep 4", valueA: 900, valueB: 15 },

  { label: "Sep 7", valueA: 780, valueB: 13 },

  { label: "Sep 10", valueA: 1050, valueB: 18 },

  { label: "Sep 13", valueA: 980, valueB: 20 },

  { label: "Sep 16", valueA: 1150, valueB: 17 },

  { label: "Sep 19", valueA: 1080, valueB: 22 },

  { label: "Sep 22", valueA: 1400, valueB: 24 },

  { label: "Sep 25", valueA: 1250, valueB: 21 },

  { label: "Sep 28", valueA: 1650, valueB: 26 },

];



const REVENUE_VS_COMMISSION: DualLineDataPoint[] = [

  { label: "Sep 1", valueA: 15000, valueB: 900 },

  { label: "Sep 4", valueA: 22000, valueB: 1200 },

  { label: "Sep 7", valueA: 19000, valueB: 1100 },

  { label: "Sep 10", valueA: 28000, valueB: 1500 },

  { label: "Sep 13", valueA: 25000, valueB: 1600 },

  { label: "Sep 16", valueA: 32000, valueB: 1700 },

  { label: "Sep 19", valueA: 30000, valueB: 1900 },

  { label: "Sep 22", valueA: 40000, valueB: 2100 },

  { label: "Sep 25", valueA: 36000, valueB: 2000 },

  { label: "Sep 28", valueA: 45000, valueB: 2300 },

];



const TRAFFIC_SOURCES: TrafficSourceItem[] = [

  { label: "Facebook", value: 8420, color: "#4f46e5", dotColor: "#4f46e5" },

  { label: "Instagram", value: 5260, color: "#10b981", dotColor: "#10b981" },

  { label: "WhatsApp", value: 4180, color: "#f59e0b", dotColor: "#f59e0b" },

  { label: "YouTube", value: 3120, color: "#6366f1", dotColor: "#6366f1" },

  { label: "TikTok", value: 2360, color: "#94a3b8", dotColor: "#94a3b8" },

  { label: "Direct", value: 1510, color: "#facc15", dotColor: "#facc15" },

];



const DEVICES: DeviceItem[] = [

  { label: "Mobile", value: 16240, percentage: "65.4%", icon: Smartphone, barColor: "bg-indigo-600" },

  { label: "Desktop", value: 6840, percentage: "27.5%", icon: Monitor, barColor: "bg-indigo-400" },

  { label: "Tablet", value: 1770, percentage: "7.1%", icon: Tablet, barColor: "bg-indigo-300" },

];



const TOP_PRODUCTS: ProductPerformance[] = [

  { name: "Wireless Headphones", emoji: "🎧", clicks: "8,240", orders: "142", conversion: "4.8%", revenue: "1,84,200", commission: "18,420" },

  { name: "Smart Watch", emoji: "⌚", clicks: "6,120", orders: "98", conversion: "3.9%", revenue: "1,42,600", commission: "11,260" },

  { name: "Premium Backpack", emoji: "🎒", clicks: "4,380", orders: "76", conversion: "3.4%", revenue: "98,600", commission: "6,840" },

  { name: "Mechanical Keyboard", emoji: "⌨️", clicks: "3,960", orders: "64", conversion: "3.6%", revenue: "84,200", commission: "5,260" },

  { name: "Pour-Over Coffee Maker", emoji: "☕", clicks: "3,240", orders: "58", conversion: "4.2%", revenue: "72,800", commission: "4,480" },

  { name: "Bluetooth Speaker", emoji: "🔊", clicks: "2,760", orders: "46", conversion: "3.1%", revenue: "51,200", commission: "4,120" },

];



const COUNTRIES: CountryPerformance[] = [

  { code: "BD", name: "Bangladesh", visitors: "9,420", clicks: "11,240", orders: "214", conversion: "4.3%" },

  { code: "IN", name: "India", visitors: "5,180", clicks: "6,120", orders: "96", conversion: "3.1%" },

  { code: "US", name: "United States", visitors: "3,460", clicks: "3,980", orders: "62", conversion: "2.8%" },

  { code: "PK", name: "Pakistan", visitors: "2,210", clicks: "2,540", orders: "34", conversion: "2.4%" },

  { code: "GB", name: "United Kingdom", visitors: "1,680", clicks: "1,920", orders: "22", conversion: "2.6%" },

  { code: "ID", name: "Indonesia", visitors: "1,240", clicks: "1,460", orders: "18", conversion: "2.2%" },

];



export default function AnalyticsPage() {

  const [selectedRange, setSelectedRange] = useState<AnalyticsTimeRange>("30 Days");



  return (

    <div className="min-h-screen bg-slate-50/50 p-6 md:p-8 space-y-6">

      <AnalyticsHeader selectedRange={selectedRange} onRangeChange={setSelectedRange} />



      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        {STATS.map((stat, idx) => (

          <StatCard key={stat.label} {...stat} delay={idx * 60} />

        ))}

      </div>



      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <DualLineChart

          title="Clicks vs Sales"

          description="How traffic converts into orders over time."

          data={CLICKS_VS_SALES}

          seriesAName="Clicks"

          seriesBName="Orders"

          colorA="#4f46e5"

          colorB="#10b981"

          yMax={2000}

          yLabels={[0, 400, 800, 1000, 2000]}

          formatYLabel={(v) => (v >= 1000 ? v / 1000 + "k" : v.toString())}

          delay={500}

        />



        <DualLineChart

          title="Revenue & Commission"

          description="Revenue generated and commission earned."

          data={REVENUE_VS_COMMISSION}

          seriesAName="Revenue"

          seriesBName="Commission"

          colorA="#4f46e5"

          colorB="#10b981"

          yMax={60000}

          yLabels={[0, 15000, 30000, 45000, 60000]}

          formatYLabel={(v) => (v >= 1000 ? v / 1000 + "k" : v.toString())}

          delay={560}

        />

      </div>



      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <TrafficSourcesDonut

          items={TRAFFIC_SOURCES}

          totalLabel="Total Visits"

          totalValue="24,850"

          delay={620}

        />

        <DeviceAnalytics items={DEVICES} delay={680} />

      </div>



      <TopProductsTable products={TOP_PRODUCTS} delay={740} />



      <GeographicAnalytics countries={COUNTRIES} delay={800} />

    </div>

  );

} 

