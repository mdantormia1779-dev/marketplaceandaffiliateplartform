import { Download } from "lucide-react";
import StatusBadge from "./StatusBadge";
import { Invoice } from "./types";
import { formatBDT, formatDate } from "./utils";

const th = "px-6 py-3 text-xs font-medium uppercase tracking-wide text-slate-500";

export default function InvoiceTable({ invoices }: { invoices: Invoice[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-160 text-left text-sm">
        <thead className="border-y border-slate-100 bg-slate-50/60">
          <tr>
            <th className={th}>Invoice</th><th className={th}>Date</th><th className={th}>Plan</th>
            <th className={th}>Amount</th><th className={th}>Status</th><th className={`${th} text-right`}>Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {invoices.map((inv) => (
            <tr key={inv.id}>
              <td className="px-6 py-4 font-medium text-slate-900">{inv.id}</td>
              <td className="px-6 py-4 text-slate-600">{formatDate(inv.date)}</td>
              <td className="px-6 py-4 text-slate-600">{inv.plan}</td>
              <td className="px-6 py-4 text-slate-900">{formatBDT(inv.amount)}</td>
              <td className="px-6 py-4"><StatusBadge status={inv.status} /></td>
              <td className="px-6 py-4 text-right">
                {inv.pdfUrl ? (
                  <a href={inv.pdfUrl} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-600 hover:underline">
                    <Download size={14} /> PDF
                  </a>
                ) : (
                  <span className="text-xs text-slate-400">—</span>
                )}
              </td>
            </tr>
          ))}
          {invoices.length === 0 && (
            <tr><td colSpan={6} className="px-6 py-10 text-center text-slate-500">No invoices found.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}