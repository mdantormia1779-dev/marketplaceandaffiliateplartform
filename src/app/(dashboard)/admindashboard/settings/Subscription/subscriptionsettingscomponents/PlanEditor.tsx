import { Plus, Trash2, X } from "lucide-react";
import { MAX_FEATURES, MAX_NAME } from "../data";
import NumberField from "./NumberField";
import Toggle from "./Toggle";
import { Errors, Plan } from "./types";
import { featureKey, planKey } from "./validate";

interface Props {
  plan: Plan;
  errors: Errors;
  onChange: (patch: Partial<Plan>) => void;
  onPopular: (value: boolean) => void;
  onAddFeature: () => void;
  onFeatureChange: (featureId: string, text: string) => void;
  onFeatureRemove: (featureId: string) => void;
  onRemove: () => void;
}

const input = "w-full rounded-lg border bg-white px-3 py-2 text-sm outline-none focus:border-emerald-500";

export default function PlanEditor({
  plan,
  errors,
  onChange,
  onPopular,
  onAddFeature,
  onFeatureChange,
  onFeatureRemove,
  onRemove,
}: Props) {
  const nameErr = errors[planKey(plan.id, "name")];
  const priceErr = errors[planKey(plan.id, "price")];
  const featuresErr = errors[planKey(plan.id, "features")];
  const locked = plan.subscribers > 0;

  return (
    <div className="mt-4 space-y-4">
      <div>
        <label className="text-xs text-gray-600" htmlFor={`${plan.id}-name`}>Plan name</label>
        <input
          id={`${plan.id}-name`}
          value={plan.name}
          maxLength={MAX_NAME + 10}
          onChange={(e) => onChange({ name: e.target.value })}
          aria-invalid={Boolean(nameErr)}
          className={`${input} mt-1 ${nameErr ? "border-red-400" : "border-gray-200"}`}
        />
        {nameErr && <p className="mt-1 text-xs text-red-600">{nameErr}</p>}
      </div>

      <div>
        <p className="text-xs text-gray-600">Price</p>
        <div className="mt-1">
          <NumberField
            label={`${plan.name || "Plan"} price per month`}
            prefix="$"
            suffix="/ month"
            value={plan.price}
            invalid={Boolean(priceErr)}
            onChange={(n) => onChange({ price: n })}
          />
        </div>
        {priceErr && <p className="mt-1 text-xs text-red-600">{priceErr}</p>}
      </div>

      <div>
        <p className="text-xs text-gray-600">Features</p>
        <ul className="mt-1 space-y-2">
          {plan.features.map((f) => {
            const err = errors[featureKey(plan.id, f.id)];
            return (
              <li key={f.id}>
                <div className="flex items-center gap-2">
                  <input
                    value={f.text}
                    onChange={(e) => onFeatureChange(f.id, e.target.value)}
                    placeholder="e.g. Priority support"
                    aria-label="Feature"
                    aria-invalid={Boolean(err)}
                    className={`${input} ${err ? "border-red-400" : "border-gray-200"}`}
                  />
                  <button
                    onClick={() => onFeatureRemove(f.id)}
                    disabled={plan.features.length === 1}
                    aria-label="Remove feature"
                    className="rounded p-1.5 text-gray-400 hover:bg-gray-100 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <X size={16} />
                  </button>
                </div>
                {err && <p className="mt-1 text-xs text-red-600">{err}</p>}
              </li>
            );
          })}
        </ul>
        {featuresErr && <p className="mt-1 text-xs text-red-600">{featuresErr}</p>}
        <button
          onClick={onAddFeature}
          disabled={plan.features.length >= MAX_FEATURES}
          className="mt-2 inline-flex items-center gap-1.5 text-sm text-emerald-700 hover:text-emerald-800 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Plus size={14} /> Add feature
        </button>
      </div>

      <div className="flex items-center justify-between border-t border-gray-100 pt-4">
        <span className="text-sm text-gray-900">Mark as popular</span>
        <Toggle label={`Mark ${plan.name || "plan"} as popular`} checked={plan.popular} onChange={onPopular} />
      </div>

      <div>
        <button
          onClick={onRemove}
          disabled={locked}
          className="inline-flex items-center gap-1.5 text-sm text-red-600 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Trash2 size={14} /> Remove plan
        </button>
        {locked && (
          <p className="mt-1 text-xs text-gray-500">
            Plans with active subscribers can&apos;t be removed.
          </p>
        )}
      </div>
    </div>
  );
}