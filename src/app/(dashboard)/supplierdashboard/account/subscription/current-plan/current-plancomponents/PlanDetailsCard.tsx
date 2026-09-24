import Card from "./Card";
import { PlanData } from "./types";
import { formatBDT, formatDate } from "./utils";

function Row({ label, value, valueClass = "text-slate-900" }: { label: string; value: string; valueClass?: string }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-100 py-3.5 last:border-0">
      <span className="text-sm text-slate-500">{label}</span>
      <span className={`text-sm font-semibold ${valueClass}`}>{value}</span>
    </div>
  );
}

export default function PlanDetailsCard({ plan }: { plan: PlanData }) {
  const per = plan.billingCycle === "Monthly" ? "month" : "year";
  const statusColor =
    plan.status === "Active" ? "text-emerald-600" : plan.status === "Cancelled" ? "text-amber-600" : "text-red-600";

  return (
    <Card className="h-fit p-6">
      <h2 className="text-lg font-semibold text-slate-900">Plan Details</h2>
      <p className="mb-3 mt-1 text-xs text-slate-500">Key information about your subscription.</p>
      <Row label="Plan" value={plan.planName} />
      <Row label="Billing Cycle" value={plan.billingCycle} />
      <Row label="Price" value={`${formatBDT(plan.price)} / ${per}`} />
      <Row label={plan.status === "Active" ? "Next Billing Date" : "Access Until"} value={formatDate(plan.nextBillingDate)} />
      <Row label="Subscription Status" value={plan.status} valueClass={statusColor} />
      <Row label="Auto Renewal" value={plan.autoRenewal ? "Enabled" : "Disabled"} />
    </Card>
  );
}