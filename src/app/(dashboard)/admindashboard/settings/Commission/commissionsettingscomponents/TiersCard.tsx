import { Plus } from "lucide-react";
import SettingsCard from "./SettingsCard";
import TierRow from "./TierRow";
import { Errors, Tier } from "./types";

const HEAD = ["Tier", "Min. Sales", "Commission Rate", "Tier Bonus", ""];

interface Props {
  tiers: Tier[];
  errors: Errors;
  onChange: (id: string, patch: Partial<Tier>) => void;
  onAdd: () => void;
  onRemove: (id: string) => void;
}

export default function TiersCard({ tiers, errors, onChange, onAdd, onRemove }: Props) {
  return (
    <SettingsCard
      title="Commission Tiers"
      subtitle="Rate and bonus unlocked as affiliates grow"
      action={
        <button
          onClick={onAdd}
          className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
        >
          <Plus size={14} /> Add tier
        </button>
      }
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left">
          <thead>
            <tr className="border-t border-gray-100 text-xs font-medium uppercase tracking-wide text-gray-500">
              {HEAD.map((h, i) => (
                <th key={i} className="px-5 py-3 font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tiers.map((t) => (
              <TierRow
                key={t.id}
                tier={t}
                errors={errors}
                canRemove={tiers.length > 1}
                onChange={(patch) => onChange(t.id, patch)}
                onRemove={() => onRemove(t.id)}
              />
            ))}
          </tbody>
        </table>
      </div>
      {errors.tiers && <p className="px-5 pb-4 text-xs text-red-600">{errors.tiers}</p>}
    </SettingsCard>
  );
}
