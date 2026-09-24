import { CalendarDays, RefreshCw } from "lucide-react";
import { Subscription } from "./types";
import { formatDate } from "./utils";

interface Props { subscription: Subscription; onToggle: () => void }

export default function RenewalBox({ subscription: s, onToggle }: Props) {
  return (
    <div className="flex flex-col justify-center rounded-xl border border-slate-200 bg-white px-5">
      <div className="flex items-center justify-between py-5">
        <span className="flex items-center gap-2 text-sm text-slate-500"><CalendarDays size={15} /> Next billing date</span>
        <span className="text-sm font-semibold text-slate-900">{formatDate(s.nextBillingDate, "long")}</span>
      </div>
      <div className="flex items-center justify-between border-t border-slate-100 py-5">
        <span className="flex items-center gap-2 text-sm text-slate-500"><RefreshCw size={15} /> Auto-renewal</span>
        <button
          onClick={onToggle}
          title="Click to toggle auto-renewal"
          className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold transition ${
            s.autoRenewal ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"
          }`}
        >
          <span className={`h-2 w-2 rounded-full ${s.autoRenewal ? "bg-emerald-600" : "bg-slate-400"}`} />
          {s.autoRenewal ? "ON" : "OFF"}
        </button>
      </div>
    </div>
  );
}