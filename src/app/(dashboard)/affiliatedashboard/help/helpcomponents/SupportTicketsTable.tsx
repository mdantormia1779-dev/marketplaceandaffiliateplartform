"use client";

import { Ticket as TicketIcon } from "lucide-react";
import type { SupportTicket, TicketPriority, TicketStatus } from "./types";

interface SupportTicketsTableProps {
  tickets: SupportTicket[];
}

function priorityBadge(priority: TicketPriority) {
  switch (priority) {
    case "Urgent":
      return "bg-blue-50 text-blue-700";
    case "High":
      return "bg-amber-100 text-amber-800";
    case "Medium":
      return "bg-amber-50 text-amber-700";
    default:
      return "bg-slate-100 text-slate-600";
  }
}

function statusBadge(status: TicketStatus) {
  switch (status) {
    case "Open":
      return { bg: "bg-amber-50 text-amber-700", dot: "bg-amber-500" };
    case "In Progress":
      return { bg: "bg-blue-50 text-blue-700", dot: "bg-blue-500" };
    case "Resolved":
      return { bg: "bg-emerald-50 text-emerald-700", dot: "bg-emerald-500" };
    default:
      return { bg: "bg-slate-100 text-slate-600", dot: "bg-slate-400" };
  }
}

export default function SupportTicketsTable({ tickets }: SupportTicketsTableProps) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
          <TicketIcon size={16} />
        </span>
        <div>
          <h3 className="text-base font-bold text-slate-900">Support Tickets</h3>
          <p className="text-xs text-slate-400">Track the status of your recent requests.</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              <th className="pb-3 pr-3">Ticket ID</th>
              <th className="pb-3 pr-3">Subject</th>
              <th className="pb-3 pr-3">Created Date</th>
              <th className="pb-3 pr-3">Priority</th>
              <th className="pb-3 pr-3">Status</th>
              <th className="pb-3">Last Updated</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 font-medium">
            {tickets.length > 0 ? (
              tickets.map((t) => {
                const status = statusBadge(t.status);
                return (
                  <tr key={t.id} className="hover:bg-slate-50/60 transition">
                    <td className="py-3.5 pr-3 font-bold text-blue-600">{t.ticketId}</td>
                    <td className="py-3.5 pr-3">
                      <p className="font-semibold text-slate-800">{t.subject}</p>
                      <p className="text-[11px] text-slate-400">{t.category}</p>
                    </td>
                    <td className="py-3.5 pr-3 text-slate-600">{t.createdDate}</td>
                    <td className="py-3.5 pr-3">
                      <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${priorityBadge(t.priority)}`}>
                        {t.priority}
                      </span>
                    </td>
                    <td className="py-3.5 pr-3">
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold ${status.bg}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
                        {t.status}
                      </span>
                    </td>
                    <td className="py-3.5 text-slate-600">{t.lastUpdated}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={6} className="py-8 text-center text-slate-400">
                  No support tickets yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}