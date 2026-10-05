import { Plus, Trash2 } from "lucide-react";
import NumberField from "./NumberField";
import SettingsCard from "./SettingsCard";
import { CategoryOverride, Errors } from "./types";
import { overrideKey } from "./validate";

interface Props {
  overrides: CategoryOverride[];
  errors: Errors;
  onAdd: () => void;
  onChange: (id: string, patch: Partial<CategoryOverride>) => void;
  onRemove: (id: string) => void;
}

export default function OverridesCard({ overrides, errors, onAdd, onChange, onRemove }: Props) {
  return (
    <SettingsCard
      title="Category Overrides"
      subtitle="These rates replace the default platform commission for the listed categories."
      action={
        <button
          onClick={onAdd}
          className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
        >
          <Plus size={14} /> Add category
        </button>
      }
    >
      {overrides.length === 0 ? (
        <p className="border-t border-gray-100 px-5 py-8 text-center text-sm text-gray-500">
          No overrides yet. Add a category to give it its own commission rate.
        </p>
      ) : (
        overrides.map((o) => {
          const catErr = errors[overrideKey(o.id, "category")];
          const rateErr = errors[overrideKey(o.id, "rate")];
          return (
            <div key={o.id} className="flex items-start justify-between gap-4 border-t border-gray-100 px-5 py-3">
              <div className="flex-1">
                <input
                  value={o.category}
                  onChange={(e) => onChange(o.id, { category: e.target.value })}
                  placeholder="Category name"
                  aria-label="Category name"
                  aria-invalid={Boolean(catErr)}
                  className={`w-full max-w-sm rounded-lg border bg-white px-3 py-2 text-sm outline-none focus:border-emerald-500 ${
                    catErr ? "border-red-400" : "border-gray-200"
                  }`}
                />
                {catErr && <p className="mt-1 text-xs text-red-600">{catErr}</p>}
              </div>
              <div className="flex items-start gap-2">
                <div className="flex flex-col items-end">
                  <NumberField label={`${o.category || "Category"} commission rate`} suffix="%" value={o.rate} invalid={Boolean(rateErr)} onChange={(n) => onChange(o.id, { rate: n })} />
                  {rateErr && <p className="mt-1 text-xs text-red-600">{rateErr}</p>}
                </div>
                <button
                  onClick={() => onRemove(o.id)}
                  aria-label={`Remove ${o.category || "category"} override`}
                  className="rounded p-2 text-gray-400 hover:bg-gray-100 hover:text-red-600"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          );
        })
      )}
    </SettingsCard>
  );
}
