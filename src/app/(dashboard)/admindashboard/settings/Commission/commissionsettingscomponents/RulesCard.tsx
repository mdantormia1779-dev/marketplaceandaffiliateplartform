import { SCHEDULES } from "./data";
import NumberField from "./NumberField";
import RuleRow from "./RuleRow";
import SettingsCard from "./SettingsCard";
import Toggle from "./Toggle";
import { Errors, PayoutSchedule, Rules } from "./types";
import { ruleKey } from "./validate";

interface Props {
  rules: Rules;
  errors: Errors;
  onChange: (patch: Partial<Rules>) => void;
}

export default function RulesCard({ rules, errors, onChange }: Props) {
  const err = (k: string) => errors[ruleKey(k)];

  return (
    <SettingsCard title="Commission Rules" subtitle="Define how platform commission is calculated and paid out.">
      <RuleRow label="Default platform commission" error={err("defaultRate")}>
        <NumberField label="Default platform commission" suffix="%" value={rules.defaultRate} invalid={Boolean(err("defaultRate"))} onChange={(n) => onChange({ defaultRate: n })} />
      </RuleRow>
      <RuleRow label="Supplier commission" error={err("supplierRate")}>
        <NumberField label="Supplier commission" suffix="%" value={rules.supplierRate} invalid={Boolean(err("supplierRate"))} onChange={(n) => onChange({ supplierRate: n })} />
      </RuleRow>
      <RuleRow label="Affiliate commission" error={err("affiliateRate")}>
        <NumberField label="Affiliate commission" suffix="%" value={rules.affiliateRate} invalid={Boolean(err("affiliateRate"))} onChange={(n) => onChange({ affiliateRate: n })} />
      </RuleRow>
      <RuleRow label="Minimum payout threshold" error={err("minPayout")}>
        <NumberField label="Minimum payout threshold" suffix="$" value={rules.minPayout} invalid={Boolean(err("minPayout"))} onChange={(n) => onChange({ minPayout: n })} />
      </RuleRow>
      <RuleRow label="Commission hold period" error={err("holdDays")}>
        <NumberField label="Commission hold period in days" suffix="days" integer value={rules.holdDays} invalid={Boolean(err("holdDays"))} onChange={(n) => onChange({ holdDays: n })} />
      </RuleRow>
      <RuleRow label="Payout schedule">
        <select
          aria-label="Payout schedule"
          value={rules.schedule}
          onChange={(e) => onChange({ schedule: e.target.value as PayoutSchedule })}
          className="w-44 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none focus:border-emerald-500"
        >
          {SCHEDULES.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </RuleRow>
      <RuleRow label="Allow category-level overrides" description="Set different rates per product category">
        <div className="pt-1">
          <Toggle label="Allow category-level overrides" checked={rules.allowOverrides} onChange={(v) => onChange({ allowOverrides: v })} />
        </div>
      </RuleRow>
    </SettingsCard>
  );
}
