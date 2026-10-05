import { Plus, Trash2 } from "lucide-react";
import { MAX_CODE, MAX_WAIVERS } from "./data";
import NumberField from "./NumberField";
import SettingsCard from "./SettingsCard";
import { Errors, Waiver } from "./types";
import { waiverKey } from "./validate";

interface Props {
  waivers: Waiver[];
  errors: Errors;
  onAdd: () => void;
  onChange: (id: string, patch: Partial<Waiver>) => void;
  onRemove: (id: string) => void;
}

// code e shudhu A-Z, 0-9, - ar _ thakbe, nijei bro hater hoye jay
const cleanCode = (s: string) => s.toUpperCase().replace(/[^A-Z0-9_-]/g, "");

export default function WaiversCard({ waivers, errors, onAdd, onChange, onRemove }: Props) {
  return (
    <SettingsCard
      title="Promotional Waivers"
      subtitle="Codes that discount or waive the joining fee for new suppliers."
      action={
        <button
          onClick={onAdd}
          disabled={waivers.length >= MAX_WAIVERS}
          className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Plus size={14} /> Add waiver
        </button>
      }
    >
      {waivers.length === 0 ? (
        <p className="border-t border-gray-100 px-5 py-8 text-center text-sm text-gray-500">
          No waiver codes yet. Add one to let new suppliers join at a discount.
        </p>
      ) : (
        waivers.map((w) => {
          const codeErr = errors[waiverKey(w.id, "code")];
          const pctErr = errors[waiverKey(w.id, "percent")];
          return (
            <div key={w.id} className="flex items-start justify-between gap-4 border-t border-gray-100 px-5 py-3">
              <div className="flex-1">
                <input
                  value={w.code}
                  maxLength={MAX_CODE + 5}
                  onChange={(e) => onChange(w.id, { code: cleanCode(e.target.value) })}
                  placeholder="e.g. WELCOME50"
                  aria-label="Waiver code"
                  aria-invalid={Boolean(codeErr)}
                  className={`w-full max-w-xs rounded-lg border bg-white px-3 py-2 font-mono text-sm outline-none focus:border-emerald-500 ${
                    codeErr ? "border-red-400" : "border-gray-200"
                  }`}
                />
                {codeErr && <p className="mt-1 text-xs text-red-600">{codeErr}</p>}
              </div>
              <div className="flex items-start gap-2">
                <div className="flex flex-col items-end">
                  <NumberField
                    label={`${w.code || "Waiver"} discount percent`}
                    suffix="% off"
                    value={w.percent}
                    invalid={Boolean(pctErr)}
                    onChange={(n) => onChange(w.id, { percent: n })}
                  />
                  {pctErr && <p className="mt-1 text-xs text-red-600">{pctErr}</p>}
                </div>
                <button
                  onClick={() => onRemove(w.id)}
                  aria-label={`Remove ${w.code || "waiver"}`}
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