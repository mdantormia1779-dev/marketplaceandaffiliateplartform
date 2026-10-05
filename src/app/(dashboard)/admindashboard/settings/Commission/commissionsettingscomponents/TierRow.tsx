import { Sparkles, Trash2 } from "lucide-react";
import NumberField from "./NumberField";
import { Errors, Tier } from "./types";
import { tierKey } from "./validate";

interface Props {
  tier: Tier;
  errors: Errors;
  canRemove: boolean;
  onChange: (patch: Partial<Tier>) => void;
  onRemove: () => void;
}

const Err = ({ msg }: { msg?: string }) => (msg ? <p className="mt-1 px-2 text-[11px] text-red-600">{msg}</p> : null);

export default function TierRow({ tier: t, errors, canRemove, onChange, onRemove }: Props) {
  const nameErr = errors[tierKey(t.id, "name")];
  const minErr = errors[tierKey(t.id, "minSales")];
  const rateErr = errors[tierKey(t.id, "rate")];
  const bonusErr = errors[tierKey(t.id, "bonus")];

  return (
    <tr className="border-t border-gray-100 align-top text-sm text-gray-700">
      <td className="px-5 py-2.5">
        <div className="flex items-center gap-2">
          <Sparkles size={14} className="shrink-0 text-amber-500" />
          <input
            value={t.name}
            onChange={(e) => onChange({ name: e.target.value })}
            aria-label="Tier name"
            aria-invalid={Boolean(nameErr)}
            className={`w-32 rounded-md border bg-transparent px-2 py-1 text-sm font-medium text-gray-900 outline-none focus:border-emerald-500 ${
              nameErr ? "border-red-400" : "border-transparent hover:border-gray-200"
            }`}
          />
        </div>
        <Err msg={nameErr} />
      </td>
      <td className="px-5 py-2.5">
        <NumberField variant="ghost" prefix="$" label={`${t.name} minimum sales`} value={t.minSales} invalid={Boolean(minErr)} onChange={(n) => onChange({ minSales: n })} />
        <Err msg={minErr} />
      </td>
      <td className="px-5 py-2.5">
        <NumberField variant="ghost" suffix="%" label={`${t.name} commission rate`} value={t.rate} valueClass="font-semibold text-emerald-700" invalid={Boolean(rateErr)} onChange={(n) => onChange({ rate: n })} />
        <Err msg={rateErr} />
      </td>
      <td className="px-5 py-2.5">
        <NumberField variant="ghost" prefix="$" label={`${t.name} tier bonus`} value={t.bonus} invalid={Boolean(bonusErr)} onChange={(n) => onChange({ bonus: n })} />
        <Err msg={bonusErr} />
      </td>
      <td className="px-5 py-2.5 text-right">
        <button
          onClick={onRemove}
          disabled={!canRemove}
          aria-label={`Remove ${t.name} tier`}
          className="rounded p-1.5 text-gray-400 hover:bg-gray-100 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-30"
        >
          <Trash2 size={16} />
        </button>
      </td>
    </tr>
  );
}
