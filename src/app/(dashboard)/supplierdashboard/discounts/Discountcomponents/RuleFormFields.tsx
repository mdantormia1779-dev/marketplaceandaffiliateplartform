import { CHANNELS, KIND_OPTIONS, type DiscountKind } from "./data";
import type { RuleFormState } from "./ruleForm";

interface RuleFormFieldsProps {
  form: RuleFormState;
  onFieldChange: <K extends keyof RuleFormState>(key: K, value: RuleFormState[K]) => void;
  onToggleChannel: (ch: string) => void;
}

export default function RuleFormFields({ form, onFieldChange, onToggleChannel }: RuleFormFieldsProps) {
  const isNumericKind = form.kind === "percentage" || form.kind === "fixed";

  return (
    <div className="mt-5 max-h-[65vh] space-y-4 overflow-y-auto pr-1">
      <div>
        <label className="text-xs font-medium text-slate-600">Rule name</label>
        <input
          value={form.name}
          onChange={(e) => onFieldChange("name", e.target.value)}
          placeholder="e.g. Diwali Weekend — 20% Off"
          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-medium text-slate-600">Discount type</label>
          <select
            value={form.kind}
            onChange={(e) => onFieldChange("kind", e.target.value as DiscountKind)}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          >
            {KIND_OPTIONS.map((k) => (
              <option key={k.value} value={k.value}>
                {k.label}
              </option>
            ))}
          </select>
        </div>

        {isNumericKind ? (
          <div>
            <label className="text-xs font-medium text-slate-600">
              {form.kind === "percentage" ? "Percent off" : "Amount off ($)"}
            </label>
            <input
              type="number"
              min={0}
              value={form.numericValue}
              onChange={(e) => onFieldChange("numericValue", e.target.value)}
              placeholder={form.kind === "percentage" ? "15" : "20"}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        ) : (
          <div>
            <label className="text-xs font-medium text-slate-600">Offer label</label>
            <input
              value={form.customValueLabel}
              onChange={(e) => onFieldChange("customValueLabel", e.target.value)}
              placeholder="Buy 2 get 1 free"
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        )}
      </div>

      <div>
        <label className="text-xs font-medium text-slate-600">Condition</label>
        <input
          value={form.condition}
          onChange={(e) => onFieldChange("condition", e.target.value)}
          placeholder="e.g. Applies to Electronics, or On orders of $100+"
          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
        />
      </div>

      <div>
        <label className="text-xs font-medium text-slate-600">Channels</label>
        <div className="mt-1.5 flex flex-wrap gap-2">
          {CHANNELS.map((ch) => {
            const selected = form.channels.includes(ch);
            return (
              <button
                key={ch}
                type="button"
                onClick={() => onToggleChannel(ch)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                  selected
                    ? "bg-blue-600 text-white"
                    : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                {ch}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-medium text-slate-600">Start date</label>
          <input
            type="date"
            value={form.startsAt}
            onChange={(e) => onFieldChange("startsAt", e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-slate-600">End date</label>
          <input
            type="date"
            value={form.endsAt}
            onChange={(e) => onFieldChange("endsAt", e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
      </div>

      <div>
        <label className="text-xs font-medium text-slate-600">Max uses (optional)</label>
        <input
          type="number"
          min={0}
          value={form.maxUses}
          onChange={(e) => onFieldChange("maxUses", e.target.value)}
          placeholder="Leave blank for unlimited"
          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
        />
      </div>
    </div>
  );
}