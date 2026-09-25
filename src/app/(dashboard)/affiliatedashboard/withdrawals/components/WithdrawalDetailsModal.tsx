import { Check } from "lucide-react";
import ModalOverlay from "./ModalOverlay";
import { WithdrawalRequest } from "./types";
import StatusBadge from "./StatusBadge";

interface WithdrawalDetailsModalProps {
  request: WithdrawalRequest;
  onClose: () => void;
}

export default function WithdrawalDetailsModal({ request, onClose }: WithdrawalDetailsModalProps) {
  return (
    <ModalOverlay
      title="Withdrawal Details"
      subtitle={request.id}
      onClose={onClose}
      footer={
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Close
          </button>
        </div>
      }
    >
      <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
        <span className="text-sm font-semibold text-slate-600">Amount Requested</span>
        <span className="text-lg font-bold text-slate-900">৳{request.amount}</span>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-500">Payment Method</span>
          <span className="font-semibold text-slate-800">{request.method}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-500">Requested Date</span>
          <span className="font-semibold text-slate-800">{request.date}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-500">Processed Date</span>
          <span className="font-semibold text-slate-800">{request.processedDate || "—"}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-500">Status</span>
          <StatusBadge status={request.status} />
        </div>
      </div>

      <div>
        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3">Timeline</p>
        <div className="space-y-4">
          {request.timeline.map((event, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <div
                className={
                  "w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 " +
                  (event.completed ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-400")
                }
              >
                <Check className="w-3.5 h-3.5" />
              </div>
              <div>
                <p
                  className={
                    "text-sm font-medium " + (event.completed ? "text-slate-800" : "text-slate-400")
                  }
                >
                  {event.label}
                </p>
                <p className="text-xs text-slate-400">{event.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ModalOverlay>
  );
}