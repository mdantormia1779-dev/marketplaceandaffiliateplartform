import { Check, X } from "lucide-react";

export function PendingActions({
  onAccept,
  onReject,
}: {
  onAccept: () => void;
  onReject: () => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onReject}
        className="flex items-center gap-1 rounded-lg border border-rose-200 bg-white px-3 py-1.5 text-xs font-medium text-rose-600 transition hover:bg-rose-50"
      >
        <X size={14} />
        Reject
      </button>
      <button
        onClick={onAccept}
        className="flex items-center gap-1 rounded-lg bg-indigo-600 px-3.5 py-1.5 text-xs font-medium text-white shadow-sm transition hover:bg-indigo-700"
      >
        <Check size={14} />
        Accept order
      </button>
    </div>
  );
}