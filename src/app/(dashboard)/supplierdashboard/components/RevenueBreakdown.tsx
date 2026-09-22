"use client";

import React, { useState } from "react";
import { Search, ChevronDown, Info, ArrowUpRight } from "lucide-react";

export type ProductRevenueItem = {
  id: string;
  name: string;
  sku: string;
  category: string;
  units: number;
  orders: number;
  gross: string;
  deductions: string;
  netRevenue: string;
  revShare: string;
  revSharePercent: number;
  trend: string;
  isTrendUp: boolean;
  image: string;
};

interface RevenueBreakdownProps {
  products: ProductRevenueItem[];
}

export default function RevenueBreakdown({ products }: RevenueBreakdownProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All categories");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat =
      selectedCategory === "All categories" || p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
      {/* Title & Subtitle */}
      <div className="mb-5">
        <h3 className="text-base font-bold text-slate-900">
          Revenue Breakdown by Product
        </h3>
        <p className="text-xs text-slate-400">
          Per-product earnings for the last 30 days, after fees and commission
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by product name or SKU..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-slate-200/80 bg-slate-50/30 py-2.5 pl-10 pr-4 text-xs font-medium text-slate-700 outline-none transition focus:border-indigo-500 focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full appearance-none rounded-xl border border-slate-200/80 bg-white py-2.5 pl-4 pr-10 text-xs font-semibold text-slate-700 outline-none cursor-pointer hover:bg-slate-50"
            >
              <option>All categories</option>
              <option>Electronics</option>
              <option>Fashion</option>
              <option>Beauty</option>
              <option>Home & Living</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
          </div>

          <div className="relative flex-1 sm:flex-none">
            <select className="w-full appearance-none rounded-xl border border-slate-200/80 bg-white py-2.5 pl-4 pr-10 text-xs font-semibold text-slate-700 outline-none cursor-pointer hover:bg-slate-50">
              <option>Top revenue</option>
              <option>Most units sold</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              <th className="pb-3 font-semibold">Product</th>
              <th className="pb-3 font-semibold text-center">Units</th>
              <th className="pb-3 font-semibold">Gross</th>
              <th className="pb-3 font-semibold">Deductions</th>
              <th className="pb-3 font-semibold">Net Revenue</th>
              <th className="pb-3 font-semibold">Rev. Share</th>
              <th className="pb-3 font-semibold text-right">Trend</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {filteredProducts.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50/60 transition">
                <td className="py-3.5 pr-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 shrink-0 overflow-hidden rounded-xl border border-slate-100 bg-slate-50 flex items-center justify-center text-lg">
                      {p.image ? (
                        <img
                          src={p.image}
                          alt={p.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        "📦"
                      )}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{p.name}</p>
                      <p className="text-[11px] text-slate-400">
                        {p.sku} · {p.category}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 text-center">
                  <span className="font-bold text-slate-900">{p.units}</span>
                  <span className="text-[11px] text-slate-400">
                    {" "}
                    / {p.orders} ord
                  </span>
                </td>
                <td className="py-3.5 font-bold text-slate-900">{p.gross}</td>
                <td className="py-3.5 text-rose-600 font-semibold">
                  <div className="flex items-center gap-1">
                    <span>{p.deductions}</span>
                    <Info className="h-3.5 w-3.5 text-slate-400 cursor-pointer" />
                  </div>
                </td>
                <td className="py-3.5 font-bold text-emerald-600">
                  {p.netRevenue}
                </td>
                <td className="py-3.5">
                  <div className="flex items-center gap-2.5 w-28">
                    <div className="h-1.5 flex-1 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-indigo-600"
                        style={{ width: `${p.revSharePercent}%` }}
                      ></div>
                    </div>
                    <span className="font-bold text-slate-700 text-[11px]">
                      {p.revShare}
                    </span>
                  </div>
                </td>
                <td className="py-3.5 text-right">
                  <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-700">
                    <ArrowUpRight className="mr-0.5 h-3 w-3" />
                    {p.trend}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-semibold text-slate-500">
        <span>
          Showing <strong className="text-slate-800">1-6</strong> of 12
        </span>
        <div className="flex items-center gap-1.5">
          <button
            disabled
            className="rounded-lg border border-slate-200 px-3 py-1.5 opacity-50 cursor-not-allowed"
          >
            &lt; Prev
          </button>
          <button className="rounded-lg bg-indigo-600 px-3 py-1.5 text-white shadow-xs">
            1
          </button>
          <button className="rounded-lg border border-slate-200 px-3 py-1.5 hover:bg-slate-50">
            2
          </button>
          <button className="rounded-lg border border-slate-200 px-3 py-1.5 hover:bg-slate-50">
            Next &gt;
          </button>
        </div>
      </div>
    </div>
  );
}