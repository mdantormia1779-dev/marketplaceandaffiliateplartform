import { Plus } from "lucide-react";
import { MAX_PLANS } from "../data";
import PlanCard from "./PlanCard";
import { Errors, Plan } from "./types";

interface Props {
  plans: Plan[];
  errors: Errors;
  enabled: boolean;
  justAdded: string | null;
  onChange: (id: string, patch: Partial<Plan>) => void;
  onAddPlan: () => void;
  onRemove: (id: string) => void;
  onPopular: (id: string, value: boolean) => void;
  onAddFeature: (planId: string) => void;
  onFeatureChange: (planId: string, featureId: string, text: string) => void;
  onFeatureRemove: (planId: string, featureId: string) => void;
}

export default function PlansGrid({
  plans,
  errors,
  enabled,
  justAdded,
  onChange,
  onAddPlan,
  onRemove,
  onPopular,
  onAddFeature,
  onFeatureChange,
  onFeatureRemove,
}: Props) {
  return (
    <div>
      {!enabled && (
        <p className="mb-3 rounded-lg bg-amber-50 px-4 py-2.5 text-sm text-amber-800">
          Subscriptions are turned off, so suppliers can&apos;t buy a plan. Turn them on below.
        </p>
      )}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {plans.map((p) => (
          <PlanCard
            key={p.id}
            plan={p}
            errors={errors}
            disabled={!enabled}
            startEditing={justAdded === p.id}
            onChange={(patch) => onChange(p.id, patch)}
            onPopular={(v) => onPopular(p.id, v)}
            onAddFeature={() => onAddFeature(p.id)}
            onFeatureChange={(fid, text) => onFeatureChange(p.id, fid, text)}
            onFeatureRemove={(fid) => onFeatureRemove(p.id, fid)}
            onRemove={() => onRemove(p.id)}
          />
        ))}
        {plans.length < MAX_PLANS && (
          <button
            onClick={onAddPlan}
            className="flex min-h-40 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 bg-white text-sm text-gray-600 hover:border-emerald-400 hover:text-emerald-700"
          >
            <Plus size={20} />
            Add plan
          </button>
        )}
      </div>
      {errors.plans && <p className="mt-2 text-xs text-red-600">{errors.plans}</p>}
    </div>
  );
}