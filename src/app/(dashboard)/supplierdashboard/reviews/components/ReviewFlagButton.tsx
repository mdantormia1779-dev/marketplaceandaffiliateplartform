import { Flag } from "lucide-react";

export function ReviewFlagButton({
  flagged,
  onToggle,
}: {
  flagged: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      title={flagged ? "Remove flag" : "Flag as suspicious"}
      className={`inline-flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition ${
        flagged
          ? "border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100"
          : "border-slate-200 text-slate-500 hover:border-rose-200 hover:text-rose-600"
      }`}
    >
      <Flag size={12} className={flagged ? "fill-rose-600" : ""} />
      {flagged ? "Flagged" : "Flag"}
    </button>
  );
}