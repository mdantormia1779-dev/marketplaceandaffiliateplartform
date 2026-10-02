"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Download, Search, SlidersHorizontal, Truck } from "lucide-react";
import { Application } from "../types";
import { categories } from "../data";
import StatusBadge from "./StatusBadge";
import RowActionsMenu from "../../suppliers/components/RowActionsMenu"; // suppliers theke reuse

interface ApprovalTableProps {
  applications: Application[];
  onView: (a: Application) => void;
  onEdit: (a: Application) => void;
  onApprove: (a: Application) => void;
  onReject: (a: Application) => void;
  onSuspend: (a: Application) => void;
  onDelete: (a: Application) => void;
}

export default function ApprovalTable({
  applications, onView, onEdit, onApprove, onReject, onSuspend, onDelete,
}: ApprovalTableProps) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [printAll, setPrintAll] = useState(false); // print er somoy shob row dekhabe

  // search + status + category filter
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return applications.filter(
      (a) =>
        (status === "All" || a.status === status) &&
        (category === "All" || a.category === category) &&
        (a.store.toLowerCase().includes(q) ||
          a.country.toLowerCase().includes(q) ||
          a.owner.toLowerCase().includes(q) ||
          a.email.toLowerCase().includes(q))
    );
  }, [applications, search, status, category]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const start = (page - 1) * pageSize;
  const rows = printAll ? filtered : filtered.slice(start, start + pageSize);

  // filter/search change hole page 1 e fire jabe
  useEffect(() => setPage(1), [search, status, category, pageSize]);

  // delete er por page jodi shesh hoye jay, ager page e niye jabe
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  // Export -> shob row dekhiye print dialog open
  const handleExport = () => {
    setPrintAll(true);
    setTimeout(() => {
      window.print();
      setPrintAll(false);
    }, 150);
  };

  const th = "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500";
  const select = "rounded-lg border border-gray-200 px-3 py-2 text-sm";

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* Toolbar (print e hide) */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 print:hidden">
        <div className="flex w-full max-w-sm items-center gap-2 rounded-lg bg-gray-100 px-3 py-2.5">
          <Search size={16} className="text-gray-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search applications by store or country..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-gray-500"
          />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button className="flex items-center gap-1.5 text-sm text-gray-600">
            <SlidersHorizontal size={14} /> Filters
          </button>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className={select}>
            <option value="All">Status: All</option>
            <option>Pending</option>
            <option>Approved</option>
            <option>Rejected</option>
            <option>Suspended</option>
          </select>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className={select}>
            <option value="All">Category: All</option>
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium hover:bg-gray-50"
          >
            <Download size={14} /> Export
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px] border-t border-gray-100 text-sm">
          <thead>
            <tr>
              <th className={th}>Store</th>
              <th className={th}>Contact</th>
              <th className={th}>Main Category</th>
              <th className={th}>Country</th>
              <th className={th}>Submitted</th>
              <th className={th}>Status</th>
              <th className="w-10 print:hidden" />
            </tr>
          </thead>
          <tbody>
            {rows.map((a) => (
              <tr key={a.id} className="border-t border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100">
                      <Truck size={16} className="text-emerald-700" />
                    </span>
                    <div>
                      <p className="font-medium text-gray-900">{a.store}</p>
                      <p className="text-xs text-gray-500">{a.owner}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-600">{a.email}</td>
                <td className="px-4 py-3 text-gray-800">{a.category}</td>
                <td className="px-4 py-3 text-gray-800">{a.country}</td>
                <td className="px-4 py-3 text-gray-600">{a.submitted}</td>
                <td className="px-4 py-3"><StatusBadge status={a.status} /></td>
                <td className="px-2 print:hidden">
                  <RowActionsMenu
                    onView={() => onView(a)}
                    onEdit={() => onEdit(a)}
                    onApprove={() => onApprove(a)}
                    onReject={() => onReject(a)}
                    onSuspend={() => onSuspend(a)}
                    onDelete={() => onDelete(a)}
                  />
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-gray-500">
                  No applications match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer / pagination (print e hide) */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 px-4 py-3 text-sm text-gray-600 print:hidden">
        <div className="flex items-center gap-3">
          <span>
            Showing <b>{filtered.length === 0 ? 0 : start + 1}-{Math.min(start + pageSize, filtered.length)}</b> of <b>{filtered.length}</b>
          </span>
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="rounded-lg border border-gray-200 px-2 py-1.5"
          >
            <option value={10}>10 / page</option>
            <option value={20}>20 / page</option>
            <option value={50}>50 / page</option>
          </select>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 disabled:opacity-40"
          >
            <ChevronLeft size={14} />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => setPage(n)}
              className={`h-8 w-8 rounded-lg border text-sm ${
                n === page ? "border-[#1fae6b] bg-[#1fae6b] text-white" : "border-gray-200 hover:bg-gray-50"
              }`}
            >
              {n}
            </button>
          ))}
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 disabled:opacity-40"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}