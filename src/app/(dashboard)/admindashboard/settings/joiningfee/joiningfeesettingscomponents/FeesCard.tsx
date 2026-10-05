import { MAX_REFUND_DAYS } from "./data";
import NumberField from "./NumberField";
import SettingRow from "./SettingRow";
import SettingsCard from "./SettingsCard";
import Toggle from "./Toggle";
import { Errors, Settings } from "./types";
import { feeKey, refundKey } from "./validate";

interface Props {
  settings: Settings;
  errors: Errors;
  onChange: (patch: Partial<Settings>) => void;
  onFeeChange: (id: string, amount: number) => void;
}

export default function FeesCard({ settings: s, errors, onChange, onFeeChange }: Props) {
  const off = !s.enabled; // joining fee bondho thakle baki setting gulo disabled
  const refundErr = errors[refundKey];

  return (
    <SettingsCard title="Joining Fee Settings" subtitle="One-time onboarding fees charged to new suppliers.">
      <SettingRow
        label="Enable joining fee"
        description={off ? "New suppliers join for free while this is off." : undefined}
      >
        <Toggle label="Enable joining fee" checked={s.enabled} onChange={(v) => onChange({ enabled: v })} />
      </SettingRow>

      {s.fees.map((f) => {
        const err = errors[feeKey(f.id)];
        return (
          <SettingRow key={f.id} label={`${f.plan} plan fee`} error={err}>
            <NumberField
              label={`${f.plan} plan joining fee in dollars`}
              suffix="$"
              disabled={off}
              value={f.amount}
              invalid={Boolean(err)}
              onChange={(n) => onFeeChange(f.id, n)}
            />
          </SettingRow>
        );
      })}

      <SettingRow label="Refund window" error={refundErr}>
        <NumberField
          label={`Refund window in days, 0 to ${MAX_REFUND_DAYS}`}
          suffix="days"
          integer
          disabled={off}
          value={s.refundDays}
          invalid={Boolean(refundErr)}
          onChange={(n) => onChange({ refundDays: n })}
        />
      </SettingRow>

      <SettingRow label="Allow promotional waivers" description={s.allowWaivers && !off ? "Manage waiver codes below" : undefined}>
        <Toggle
          label="Allow promotional waivers"
          disabled={off}
          checked={s.allowWaivers}
          onChange={(v) => onChange({ allowWaivers: v })}
        />
      </SettingRow>
    </SettingsCard>
  );
}