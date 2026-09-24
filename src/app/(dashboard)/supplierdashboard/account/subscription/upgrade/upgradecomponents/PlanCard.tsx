import { Check } from "lucide-react";
import { CurrentSub, Cycle, Plan } from "./types";
import { billedText, formatBDT, getAction, priceFor } from "./utils";

interface Props {
  plan: Plan;
  cycle: Cycle;
  current: CurrentSub;
  currentRank: number;
  onSelect: (plan: Plan) => void;
}

export default function PlanCard({ plan, cycle, current, currentRank, onSelect }: Props) {
  const isCurrentPlan = plan.id === current.planId;
  const action = getAction(plan, cycle, current, currentRank);

  return (
    <div
      className={`rounded-xl border p-6 ${
        isCurrentPlan ? "border-blue-300 bg-linear-to-b from-blue-50/60 to-white" : "border-slate-200 bg-white"
      }`}
    >
      <div className="flex items-start justify-between">
        <h3 className="text-base font-semibold text-slate-900">{plan.name}</h3>
        {isCurrentPlan && (
          <span className="flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-bold tracking-wide text-emerald-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" /> CURRENT PLAN
          </span>
        )}
      </div>
      <p className="mt-1 text-sm text-slate-500">{plan.tagline}</p>

      <p className="mt-8 text-3xl font-bold text-slate-900">
        {formatBDT(priceFor(plan, cycle))}{" "}
        <span className="text-sm font-normal text-slate-500">/ {cycle === "monthly" ? "month" : "year"}</span>
      </p>
      <p className="mt-1 text-xs text-slate-400">{billedText(cycle)}</p>

      <button
        onClick={() => onSelect(plan)}
        disabled={action.isCurrent}
        className={`mt-6 w-full rounded-lg py-2.5 text-sm font-semibold transition ${
          action.isCurrent
            ? "cursor-default border border-emerald-200 bg-emerald-50 text-emerald-700"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        {action.label}
      </button>

      <ul className="mt-6 space-y-3 border-t border-slate-100 pt-5">
        {plan.features.map((f) => (
          <li key={f} className="flex items-center gap-3 text-sm text-slate-700">
            <span className="flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <Check size={11} />
            </span>
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}