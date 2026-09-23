// src/app/(dashboard)/supplierdashboard/components/ReportsTable.tsx

"use client";

import { useMemo, useState } from "react";
import {
  Search,
  Download,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export interface TableRowItem {
  id: string;
  period: string;
  orders: number;
  units: number;
  grossSales: string;
  refunds: string;
  netSales: string;
  aov: string;
  growth: string;
  isPositive: boolean;
}

interface ReportsTableProps {
  activeTab: string;
  selectedRange: string;
  data: TableRowItem[];
}

export default function ReportsTable({
  activeTab,
  selectedRange,
  data,
}: ReportsTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("Most recent");
  const [currentPage, setCurrentPage] = useState(1);

  /*
   * Search + Sort
   */
  const filteredData = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    const filtered = data.filter((item) =>
      item.period.toLowerCase().includes(search)
    );

    const sorted = [...filtered];

    if (sortBy === "Highest sales") {
      sorted.sort((a, b) => {
        const salesA = Number(
          a.netSales.replace(/[^0-9.-]+/g, "")
        );

        const salesB = Number(
          b.netSales.replace(/[^0-9.-]+/g, "")
        );

        return salesB - salesA;
      });
    }

    if (sortBy === "Oldest first") {
      sorted.reverse();
    }

    return sorted;
  }, [data, searchTerm, sortBy]);

  /*
   * Reset pagination when search/sort changes
   */
  const handleSearchChange = (
    value: string
  ) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleSortChange = (
    value: string
  ) => {
    setSortBy(value);
    setCurrentPage(1);
  };

  /*
   * Export current table data as CSV
   */
  const exportTable = () => {
    if (filteredData.length === 0) {
      alert("There is no report data to export.");
      return;
    }

    const headers = [
      "Period",
      "Orders",
      "Units",
      "Gross Sales",
      "Refunds",
      "Net Sales",
      "AOV",
      "Growth",
    ];

    const rows = filteredData.map((item) => [
      item.period,
      item.orders,
      item.units,
      item.grossSales,
      item.refunds,
      item.netSales,
      item.aov,
      `${item.isPositive ? "+" : "-"}${item.growth}`,
    ]);

    /*
     * Escape CSV values safely
     */
    const escapeCsvValue = (
      value: string | number
    ) => {
      const stringValue = String(value);

      return `"${stringValue.replace(
        /"/g,
        '""'
      )}"`;
    };

    const csvContent = [
      headers.map(escapeCsvValue).join(","),
      ...rows.map((row) =>
        row.map(escapeCsvValue).join(",")
      ),
    ].join("\n");

    /*
     * BOM helps Excel correctly detect UTF-8
     */
    const blob = new Blob(
      ["\uFEFF" + csvContent],
      {
        type: "text/csv;charset=utf-8;",
      }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    const safeTabName = activeTab
      .replace(/[^a-z0-9]+/gi, "-")
      .replace(/^-+|-+$/g, "")
      .toLowerCase();

    const safeRangeName = selectedRange
      .replace(/[^a-z0-9]+/gi, "-")
      .replace(/^-+|-+$/g, "")
      .toLowerCase();

    link.download = `${safeTabName || "report"}-${safeRangeName || "data"}.csv`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  /*
   * Report title
   */
  const reportTitle =
    activeTab === "Sales Report"
      ? "Sales Summary Report"
      : activeTab === "Orders Report"
      ? "Orders Detailed Report"
      : "Affiliate Earnings Report";

  return (
    <div className="space-y-5 rounded-2xl border border-slate-100 bg-white p-6 shadow-xs">
      {/* =========================
          HEADER
      ========================== */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-base font-bold text-slate-900">
            {reportTitle}
          </h3>

          <p className="mt-1 text-xs text-slate-400">
            Weekly settlements across last{" "}
            {selectedRange}
          </p>
        </div>

        {/* Export */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={exportTable}
            disabled={filteredData.length === 0}
            className="flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-bold text-slate-700 shadow-xs transition-all hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Download className="h-4 w-4 text-slate-500" />

            Export table
          </button>
        </div>
      </div>

      {/* =========================
          SEARCH & SORT
      ========================== */}
      <div className="flex flex-col items-center gap-3 sm:flex-row">
        {/* Search */}
        <div className="relative w-full flex-1">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

          <input
            type="text"
            placeholder="Search by period..."
            value={searchTerm}
            onChange={(e) =>
              handleSearchChange(e.target.value)
            }
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2 pl-9 pr-4 text-xs text-slate-800 placeholder-slate-400 transition-all focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Sort */}
        <div className="w-full sm:w-auto">
          <select
            value={sortBy}
            onChange={(e) =>
              handleSortChange(e.target.value)
            }
            className="w-full cursor-pointer rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:w-auto"
          >
            <option>Most recent</option>
            <option>Oldest first</option>
            <option>Highest sales</option>
          </select>
        </div>
      </div>

      {/* =========================
          DATA TABLE
      ========================== */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              <th className="px-3 py-3">
                Period
              </th>

              <th className="px-3 py-3">
                Orders
              </th>

              <th className="px-3 py-3">
                Units
              </th>

              <th className="px-3 py-3">
                Gross Sales
              </th>

              <th className="px-3 py-3">
                Refunds
              </th>

              <th className="px-3 py-3">
                Net Sales
              </th>

              <th className="px-3 py-3">
                AOV
              </th>

              <th className="px-3 py-3 text-right">
                Growth
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-50 text-xs">
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <tr
                  key={item.id}
                  className="transition-colors hover:bg-slate-50/80"
                >
                  <td className="px-3 py-4 font-bold text-slate-900">
                    {item.period}
                  </td>

                  <td className="px-3 py-4 font-medium text-slate-700">
                    {item.orders}
                  </td>

                  <td className="px-3 py-4 font-medium text-slate-700">
                    {item.units}
                  </td>

                  <td className="px-3 py-4 font-extrabold text-slate-900">
                    {item.grossSales}
                  </td>

                  <td className="px-3 py-4 font-medium text-rose-600">
                    {item.refunds}
                  </td>

                  <td className="px-3 py-4 font-extrabold text-emerald-600">
                    {item.netSales}
                  </td>

                  <td className="px-3 py-4 font-medium text-slate-700">
                    {item.aov}
                  </td>

                  <td className="px-3 py-4 text-right">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-bold ${
                        item.isPositive
                          ? "border-emerald-100 bg-emerald-50 text-emerald-700"
                          : "border-rose-100 bg-rose-50 text-rose-700"
                      }`}
                    >
                      {item.isPositive
                        ? "↑"
                        : "↓"}{" "}
                      {item.growth}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={8}
                  className="py-8 text-center text-slate-400"
                >
                  No report data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* =========================
          PAGINATION
      ========================== */}
      <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-100 pt-3 text-xs text-slate-500 sm:flex-row">
        <p>
          Showing{" "}
          <span className="font-bold text-slate-800">
            {filteredData.length > 0
              ? `1–${filteredData.length}`
              : "0"}
          </span>{" "}
          of{" "}
          <span className="font-bold text-slate-800">
            {data.length}
          </span>
        </p>

        <div className="flex items-center gap-2">
          {/* Previous */}
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() =>
              setCurrentPage((p) =>
                Math.max(p - 1, 1)
              )
            }
            className="flex cursor-pointer items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft className="h-3.5 w-3.5" />

            Prev
          </button>

          {/* Page 1 */}
          <button
            type="button"
            onClick={() => setCurrentPage(1)}
            className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold ${
              currentPage === 1
                ? "bg-indigo-600 text-white shadow-xs"
                : "border border-slate-200 text-slate-700 hover:bg-slate-50"
            }`}
          >
            1
          </button>

          {/* Page 2 */}
          <button
            type="button"
            onClick={() => setCurrentPage(2)}
            className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold ${
              currentPage === 2
                ? "bg-indigo-600 text-white shadow-xs"
                : "border border-slate-200 text-slate-700 hover:bg-slate-50"
            }`}
          >
            2
          </button>

          {/* Next */}
          <button
            type="button"
            onClick={() =>
              setCurrentPage((p) =>
                Math.min(p + 1, 2)
              )
            }
            disabled={currentPage === 2}
            className="flex cursor-pointer items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 font-semibold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next

            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}