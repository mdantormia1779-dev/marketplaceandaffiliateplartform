"use client";
import { Check, Pencil, Star } from "lucide-react";
import { useState } from "react";
import PlanEditor from "./PlanEditor";
import { Errors, Plan } from "./types";
import { planHasError } from "./validate";

interface Props {
  plan: Plan;
  errors: Errors;
  disabled: boolean; // subscription bondho thakle
  startEditing: boolean;
  onChange: (patch: Partial<Plan>) => void;
  onPopular: (value: boolean) => void;
  onAddFeature: () => void;
  onFeatureChange: (featureId: string, text: string) => void;
  onFeatureRemove: (featureId: string) => void;
  onRemove: () => void;
}

const price = (n: number) => "$" + (Number.isInteger(n) ? n : n.toFixed(2));

export default function PlanCard({ plan, errors, disabled, startEditing, ...ops }: Props) {
  const [manual, setManual] = useState(startEditing);
  // error thakle card nijei khule jay, jate user dekhte pay
  const editing = manual || planHasError(errors, plan.id);
  const name = plan.name.trim() || "Untitled plan";

  return (
    <article
      className={`flex flex-col rounded-xl border bg-white p-5 transition-opacity ${
        plan.popular ? "border-emerald-400" : "border-gray-200"
      } ${disabled ? "opacity-60" : ""}`}
    >
      <header className="flex items-start justify-between gap-3">
        <h3 className="text-sm font-semibold text-gray-900">{name}</h3>
        <div className="flex items-center gap-2">
          {plan.popular && (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700">
              <Star size={11} className="fill-emerald-600 text-emerald-600" /> Popular
            </span>
          )}
          <button
            onClick={() => setManual(!editing)}
            aria-label={editing ? `Finish editing ${name}` : `Edit ${name}`}
            className="inline-flex items-center gap-1 rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
          >
            {editing ? <Check size={16} /> : <Pencil size={14} />}
          </button>
        </div>
      </header>

      <p className="mt-2 flex items-baseline gap-1.5">
        <span className="text-3xl font-semibold tabular-nums text-gray-900">
          {Number.isFinite(plan.price) ? price(plan.price) : "$-"}
        </span>
        <span className="text-xs text-gray-600">per month</span>
      </p>
      <p className="mt-2 text-xs text-gray-500">
        {plan.subscribers.toLocaleString("en-US")} active subscriber{plan.subscribers === 1 ? "" : "s"}
      </p>

      {editing ? (
        <PlanEditor plan={plan} errors={errors} {...ops} />
      ) : (
        <ul className="mt-5 space-y-2.5">
          {plan.features
            .filter((f) => f.text.trim())
            .map((f) => (
              <li key={f.id} className="flex items-start gap-2.5 text-sm text-gray-700">
                <Check size={14} className="mt-1 shrink-0 text-emerald-600" />
                {f.text}
              </li>
            ))}
        </ul>
      )}
    </article>
  );
}