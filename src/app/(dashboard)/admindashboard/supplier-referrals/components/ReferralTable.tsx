"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Download, Search, SlidersHorizontal } from "lucide-react";
import { Referral } from "../types";
import { formatMoney } from "../data";
import Avatar from "./Avatar";
import StatusBadge from "./StatusBadge";
import ReferralActionsMenu from "./ReferralActionsMenu";

interface ReferralTableProps {
  referrals: Referral[];
  onView: (r: Referral) => void;
  onEdit: (r: Referral) => void;
  onApprove: (r: Referral) => void;
  onMarkPaid: (r: Referral) => void;
  onReject: (r: Referral) => void;
  onSuspend: (r: Referral) => void;
  onDelete: (r: Referral) => void;
}

export default function ReferralTable({
  referrals, onView, onEdit, onApprove, onMarkPaid, onReject, onSuspend, onDelete,
}: ReferralTableProps) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [printAll, setPrintAll] = useState(false); // print er somoy shob row dekhabe

  // search (referrer / referred store) + status filter
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return referrals.filter(
      (r) =>
        (status === "All" || r.status === status) &&
        (r.referrer.toLowerCase().includes(q) || r.referred.toLowerCase().includes(q))
    );
  }, [referrals, search, status]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const start = (page - 1) * pageSize;
  const rows = printAll ? filtered : filtered.slice(start, start + pageSize);

  // filter/search change hole page 1 e fire jabe
  useEffect(() => setPage(1), [search, status, pageSize]);

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

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* Toolbar (print e hide) */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 print:hidden">
        <div className="flex w-full max-w-sm items-center gap-2 rounded-lg bg-gray-100 px-3 py-2.5">
          <Search size={16} className="text-gray-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by referrer or store..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-gray-500"
          />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button className="flex items-center gap-1.5 text-sm text-gray-600">
            <SlidersHorizontal size={14} /> Filters
          </button>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="rounded-lg border border-gray-200 px-3 py-2 text-sm"
          >
            <option value="All">Status: All</option>
            <option>Pending</option>
            <option>Approved</option>
            <option>Paid</option>
            <option>Rejected</option>
            <option>Suspended</option>
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
              <th className={th}>Referrer</th>
              <th className={th}>Referred Store</th>
              <th className={th}>Plan</th>
              <th className={th}>Reward</th>
              <th className={th}>Status</th>
              <th className={th}>Date</th>
              <th className="w-10 print:hidden" />
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Avatar name={r.referrer} tone="green" />
                    <span className="font-medium text-gray-900">{r.referrer}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Avatar name={r.referred} tone="teal" />
                    <span className="text-gray-800">{r.referred}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-700">{r.plan}</td>
                <td className="px-4 py-3 font-semibold text-gray-900">{formatMoney(r.reward)}</td>
                <td className="px-4 py-3"><StatusBadge status={r.status} /></td>
                <td className="px-4 py-3 text-gray-600">{r.date}</td>
                <td className="px-2 print:hidden">
                  <ReferralActionsMenu
                    onView={() => onView(r)}
                    onEdit={() => onEdit(r)}
                    onApprove={() => onApprove(r)}
                    onMarkPaid={() => onMarkPaid(r)}
                    onReject={() => onReject(r)}
                    onSuspend={() => onSuspend(r)}
                    onDelete={() => onDelete(r)}
                  />
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-gray-500">
                  No referrals match your search.
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