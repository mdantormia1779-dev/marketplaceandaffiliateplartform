import { Eye } from "lucide-react";
import { WithdrawalRequest } from "./types";
import StatusBadge from "./StatusBadge";

interface WithdrawalRequestsTableProps {
  requests: WithdrawalRequest[];
  onViewDetails: (request: WithdrawalRequest) => void;
}

export default function WithdrawalRequestsTable({
  requests,
  onViewDetails,
}: WithdrawalRequestsTableProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50">
              <th className="text-left font-semibold text-[11px] uppercase tracking-wider text-slate-400 px-6 py-3.5">Request ID</th>
              <th className="text-left font-semibold text-[11px] uppercase tracking-wider text-slate-400 px-6 py-3.5">Date</th>
              <th className="text-right font-semibold text-[11px] uppercase tracking-wider text-slate-400 px-6 py-3.5">Amount</th>
              <th className="text-left font-semibold text-[11px] uppercase tracking-wider text-slate-400 px-6 py-3.5">Payment Method</th>
              <th className="text-left font-semibold text-[11px] uppercase tracking-wider text-slate-400 px-6 py-3.5">Status</th>
              <th className="text-left font-semibold text-[11px] uppercase tracking-wider text-slate-400 px-6 py-3.5">Processed Date</th>
              <th className="text-center font-semibold text-[11px] uppercase tracking-wider text-slate-400 px-6 py-3.5">Action</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((request) => (
              <tr key={request.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/60 transition-colors">
                <td className="px-6 py-4 font-bold text-slate-900">{request.id}</td>
                <td className="px-6 py-4 text-slate-500">{request.date}</td>
                <td className="px-6 py-4 text-right font-semibold text-slate-800">৳{request.amount}</td>
                <td className="px-6 py-4 text-slate-600">{request.method}</td>
                <td className="px-6 py-4">
                  <StatusBadge status={request.status} />
                </td>
                <td className="px-6 py-4 text-slate-500">{request.processedDate || "—"}</td>
                <td className="px-6 py-4 text-center">
                  <button
                    type="button"
                    onClick={() => onViewDetails(request)}
                    className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors"
                    aria-label={"View details for " + request.id}
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}

            {requests.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-10 text-center text-slate-400 text-sm">
                  No withdrawal requests found.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}