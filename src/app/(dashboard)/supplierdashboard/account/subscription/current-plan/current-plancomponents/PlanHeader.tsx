"use client";

import { useState } from "react";
import { CalendarDays, Crown, Flag, RefreshCw, Settings } from "lucide-react";
import Card from "./Card";
import StatusBadge from "./StatusBadge";
import InfoItem from "./InfoItem";
import CancelModal from "./CancelModal";
import ManagePlanModal from "./ManagePlanModal";
import { PlanData } from "./types";
import { formatBDT, formatDate } from "./utils";

interface Props {
  plan: PlanData;
  onToggleAutoRenewal: () => void;
  onCancel: () => void;
  onResume: () => void;
  onChangeBillingCycle?: (cycle: "Monthly" | "Yearly") => void;
  onUpdateBillingEmail?: (email: string) => void;
  onChangePlanTier?: (tierName: string) => void;
}

export default function PlanHeader({
  plan,
  onToggleAutoRenewal,
  onCancel,
  onResume,
  onChangeBillingCycle,
  onUpdateBillingEmail,
  onChangePlanTier,
}: Props) {
  const [confirming, setConfirming] = useState(false);
  const [managingPlan, setManagingPlan] = useState(false);
  const isActive = plan.status === "Active";
  const per = plan.billingCycle === "Monthly" ? "month" : "year";

  return (
    <Card className="p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500">Current Subscription</p>
          <div className="mt-2 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600"><Crown size={18} /></span>
            <h2 className="text-2xl font-bold text-slate-900">{plan.planName} Plan</h2>
            <StatusBadge status={plan.status} />
          </div>
          <p className="mt-4 text-3xl font-bold text-slate-900">
            {formatBDT(plan.price)} <span className="text-sm font-normal text-slate-500">/ {per}</span>
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setManagingPlan(true)}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-blue-700"
          >
            <Settings size={14} /> Manage Plan
          </button>
          {isActive ? (
            <button onClick={() => setConfirming(true)}
              className="rounded-lg border border-slate-200 px-4 py-2.5 text-xs font-medium text-slate-700 hover:bg-slate-50">
              Cancel Subscription
            </button>
          ) : (
            <button onClick={onResume}
              className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-xs font-medium text-emerald-700 hover:bg-emerald-100">
              Resume Subscription
            </button>
          )}
        </div>
      </div>

      <div className="mt-6 grid gap-5 border-t border-slate-100 pt-5 sm:grid-cols-3">
        <InfoItem icon={<CalendarDays size={15} />} label={isActive ? "Next billing" : "Access until"}>
          {formatDate(plan.nextBillingDate)}
        </InfoItem>
        <InfoItem icon={<Flag size={15} />} label="Subscription started">{formatDate(plan.startedAt)}</InfoItem>
        <InfoItem icon={<RefreshCw size={15} />} label="Auto-renewal">
          <button onClick={onToggleAutoRenewal} disabled={!isActive}
            title={isActive ? "Click to toggle" : "Resume the subscription to change this"}
            className={`disabled:cursor-not-allowed ${plan.autoRenewal ? "text-emerald-700" : "text-slate-500"}`}>
            {plan.autoRenewal ? "ON" : "OFF"}
          </button>
        </InfoItem>
      </div>

      {confirming && (
        <CancelModal
          planName={plan.planName}
          endDate={formatDate(plan.nextBillingDate)}
          onClose={() => setConfirming(false)}
          onConfirm={() => { onCancel(); setConfirming(false); }}
        />
      )}

      {managingPlan && (
        <ManagePlanModal
          plan={plan}
          onClose={() => setManagingPlan(false)}
          onToggleAutoRenewal={onToggleAutoRenewal}
          onChangeBillingCycle={onChangeBillingCycle}
          onUpdateBillingEmail={onUpdateBillingEmail}
          onChangePlanTier={onChangePlanTier}
        />
      )}
    </Card>
  );
}