import { Crown } from "lucide-react";
import { Subscription, SubscriptionStatus } from "./types";
import { formatBDT } from "./utils";

const statusStyle: Record<SubscriptionStatus, string> = {
  Active: "border-emerald-200 bg-emerald-50 text-emerald-700",
  Cancelled: "border-amber-200 bg-amber-50 text-amber-700",
  Expired: "border-red-200 bg-red-50 text-red-700",
};

export default function PlanBox({ subscription: s }: { subscription: Subscription }) {
  return (
    <div className="rounded-xl border border-blue-100 bg-blue-50/60 p-5">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-blue-600">
          <Crown size={18} />
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">{s.planName}</p>
          <p className="text-xs text-slate-500">{s.tier}</p>
        </div>
      </div>
      <p className="mt-4 text-2xl font-bold text-slate-900">
        {formatBDT(s.price)} <span className="text-sm font-normal text-slate-500">/ month</span>
      </p>
      <span className={`mt-3 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${statusStyle[s.status]}`}>
        <span className="h-1.5 w-1.5 rounded-full bg-current" /> Status: {s.status}
      </span>
    </div>
  );
}