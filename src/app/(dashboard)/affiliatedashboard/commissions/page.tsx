'use client';
import React from 'react';
import CommissionStats from './components/CommissionStats';
import CommissionOverviewChart from './components/CommissionOverviewChart';
import CommissionTable from './components/CommissionTable';
import { Download } from 'lucide-react';

export default function CommissionsPage() {
  // Real CSV Export Handler (Print page-e jabe na, borong direct CSV file download korbe)
  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8,Date,Order ID,Product,Sale Amount,Rate,Commission,Status\n"
      + "2026-09-23,ORD-58291,Wireless Headphones,৳4500,10%,৳450,Approved\n"
      + "2026-09-22,ORD-58279,Smart Watch,৳3899,12%,৳468,Approved\n"
      + "2026-09-21,ORD-58271,Premium Backpack,৳1899,15%,৳285,Paid\n"
      + "2026-09-20,ORD-58264,Pour-Over Coffee Maker,৳3199,14%,৳448,Pending";

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "commissions_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 p-6 md:p-8">
      {/* Top Header & Export Button */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Commissions</h2>
          <p className="text-sm text-slate-500 mt-1">Track your affiliate earnings and commission history.</p>
        </div>
        
        {/* Export Button with click handler */}
        <button 
          type="button"
          onClick={handleExportCSV}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition-colors cursor-pointer"
        >
          <Download className="h-4 w-4 text-slate-500" /> Export CSV
        </button>
      </div>

      {/* Statistics Cards */}
      <CommissionStats />

      {/* Overview Chart */}
      <CommissionOverviewChart />

      {/* Data Table with Search, Dropdown filters and Eye Action Modal */}
      <CommissionTable />
    </div>
  );
}