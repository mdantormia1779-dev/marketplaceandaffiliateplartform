"use client";

import { useState } from "react";
import { BarChart2, Download, X } from "lucide-react";
import { AnalyticsTimeRange } from "./types";

type AnalyticsHeaderProps = {
  selectedRange?: AnalyticsTimeRange;
  onRangeChange?: (range: AnalyticsTimeRange) => void;
};

export default function AnalyticsHeader({ selectedRange, onRangeChange }: AnalyticsHeaderProps) {
  const [activeTab, setActiveTab] = useState<AnalyticsTimeRange>(selectedRange || "30 Days");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fromDate, setFromDate] = useState("2026-09-01");
  const [toDate, setToDate] = useState("2026-09-25");

  const handleTabClick = (tab: AnalyticsTimeRange) => {
    setActiveTab(tab);
    if (onRangeChange) {
      onRangeChange(tab);
    }
    if (tab === "Custom Range") {
      setIsModalOpen(true);
    }
  };

  const handleApplyRange = () => {
    const customText = `${fromDate} to ${toDate}` as AnalyticsTimeRange;
    setActiveTab(customText);
    if (onRangeChange) {
      onRangeChange(customText);
    }
    setIsModalOpen(false);
  };

  // Export functionality using browser print/save as PDF
  const handleExport = () => {
    window.print();
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
      {/* Title & Subtitle + Showing text */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Analytics
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Understand your traffic, sales and affiliate performance.
        </p>
        <div className="flex items-center gap-1.5 mt-2 text-xs text-slate-500 font-medium">
          <BarChart2 size={14} className="text-slate-400" />
          <span>Showing: {activeTab}</span>
        </div>
      </div>

      {/* Filter Tabs & Export Button */}
      <div className="flex items-center gap-3 flex-wrap">
        {/* Main Tab Container */}
        <div className="flex items-center bg-slate-100/80 p-1 rounded-2xl border border-slate-200/60 shadow-sm overflow-x-auto">
          {(["Today", "7 Days", "30 Days", "3 Months", "6 Months", "Custom Range"] as AnalyticsTimeRange[]).map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => handleTabClick(tab)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all whitespace-nowrap ${
                  isActive
                    ? "bg-slate-900 text-white shadow-md shadow-slate-900/10"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Export Button */}
        <button
          type="button"
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200/80 hover:bg-slate-50 text-slate-800 text-xs font-bold rounded-2xl shadow-sm transition cursor-pointer"
        >
          <Download size={15} className="text-slate-600" />
          Export
        </button>
      </div>

      {/* Custom Date Range Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 w-full max-w-lg p-6 relative animate-scale-up">
            
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-5 top-5 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-50 transition"
            >
              <X size={20} />
            </button>

            {/* Title */}
            <div className="mb-5">
              <h3 className="text-lg font-bold text-slate-900">Custom Date Range</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Choose a start and end date for your report.
              </p>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">From</label>
                <div className="relative">
                  <input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white py-2.5 px-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">To</label>
                <div className="relative">
                  <input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white py-2.5 px-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2.5 text-xs font-bold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleApplyRange}
                className="px-5 py-2.5 text-xs font-bold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 shadow-md shadow-indigo-600/20 transition"
              >
                Apply Range
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}