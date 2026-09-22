"use client";

import React, { useState } from 'react';
import { 
  Download, 
  Plus, 
  TrendingUp, 
  Wallet, 
  Clock, 
  ShoppingBag, 
  Crown, 
  Package 
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { dynamicStoreData, categoryData, TimeRange } from '../dashboardData';

const AnalyticsOverview = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('30 days');
  const currentData = dynamicStoreData[timeRange];

  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + ["Title,Value,Growth,Subtext"].concat(
          currentData.stats.map(s => `"${s.title}","${s.value}","${s.growth}","${s.subText}"`)
        ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `store_report_${timeRange.replace(' ', '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatIcon = (type: string) => {
    switch (type) {
      case 'sales':
        return <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl"><TrendingUp className="w-4 h-4" /></div>;
      case 'orders':
        return <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl"><ShoppingBag className="w-4 h-4" /></div>;
      case 'products':
        return <div className="p-2 bg-slate-100 text-slate-600 rounded-xl"><Package className="w-4 h-4" /></div>;
      case 'available':
        return <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl"><Wallet className="w-4 h-4" /></div>;
      case 'pending':
        return <div className="p-2 bg-amber-50 text-amber-600 rounded-xl"><Clock className="w-4 h-4" /></div>;
      case 'subscription':
        return <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl"><Crown className="w-4 h-4" /></div>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Filter Tabs & Export */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="inline-flex p-1 bg-slate-200/60 rounded-xl max-w-fit">
          {(['Today', '7 days', '30 days', '12 months'] as TimeRange[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setTimeRange(tab)}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                timeRange === tab 
                  ? 'bg-indigo-600 text-white shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={handleExport}
            className="flex items-center gap-2 px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition shadow-sm active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            Export Report
          </button>
          <button 
            onClick={() => alert("Open Add Product Modal")}
            className="flex items-center gap-2 px-3.5 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold hover:bg-indigo-700 transition shadow-sm active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Product
          </button>
        </div>
      </div>

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {currentData.stats.map((stat, index) => (
          <div key={index} className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex flex-col justify-between hover:border-indigo-100 transition">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">{stat.title}</span>
              {getStatIcon(stat.type)}
            </div>
            <div className="mt-4">
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold text-slate-900">{stat.value}</span>
                {stat.growth && (
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold flex items-center gap-0.5 ${
                    stat.isUp ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                  }`}>
                    {stat.isUp ? '↑' : '↓'} {stat.growth}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-400 mt-1">{stat.subText}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Chart */}
        <div className="lg:col-span-2 bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Sales Overview</h3>
              <p className="text-xs text-slate-400">Sales performance ({timeRange})</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-xs text-slate-600">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
                Sales
              </div>
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">
                +18.6% YoY
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={currentData.chart} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} tickFormatter={(v) => `$${v}k`} />
                <Tooltip formatter={(value: unknown) => [`$${value}k`, 'Sales']} contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0' }} />
                <Area type="monotone" dataKey="sales" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#salesGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Pie Chart */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">Revenue by Category</h3>
            <p className="text-xs text-slate-400">Share of total revenue</p>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col items-center justify-between gap-6 my-4">
            <div className="relative w-44 h-44 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={categoryData} innerRadius={55} outerRadius={80} paddingAngle={3} dataKey="value">
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute text-center">
                <span className="text-lg font-extrabold text-slate-900 block leading-tight">
                  {currentData.stats[0].value.includes('$') ? currentData.stats[0].value : '$486.9K'}
                </span>
                <span className="text-[10px] text-slate-400 font-medium">Total revenue</span>
              </div>
            </div>

            <div className="w-full space-y-2.5">
              {categoryData.map((cat) => (
                <div key={cat.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }}></span>
                    <span className="text-slate-600 font-medium">{cat.name}</span>
                  </div>
                  <span className="font-bold text-slate-800">{cat.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsOverview;