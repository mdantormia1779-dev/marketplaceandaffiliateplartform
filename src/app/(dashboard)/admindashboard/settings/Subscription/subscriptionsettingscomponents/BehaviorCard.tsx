import { MAX_GRACE_DAYS, MAX_TRIAL_DAYS } from "../data";
import NumberField from "./NumberField";
import SettingRow from "./SettingRow";
import SettingsCard from "./SettingsCard";
import Toggle from "./Toggle";
import { Behavior, Errors } from "./types";
import { behaviorKey } from "./validate";

interface Props {
  behavior: Behavior;
  errors: Errors;
  onChange: (patch: Partial<Behavior>) => void;
}

export default function BehaviorCard({ behavior: b, errors, onChange }: Props) {
  const off = !b.enabled; // subscription bondho thakle baki setting gulo disabled
  const trialErr = errors[behaviorKey("trialDays")];
  const graceErr = errors[behaviorKey("graceDays")];

  return (
    <SettingsCard title="Subscription Settings" subtitle="Manage supplier subscription plans and billing behavior.">
      <SettingRow label="Enable subscriptions" description="Charge suppliers a recurring fee">
        <Toggle label="Enable subscriptions" checked={b.enabled} onChange={(v) => onChange({ enabled: v })} />
      </SettingRow>
      <SettingRow label="Free trial length" error={trialErr}>
        <NumberField
          label={`Free trial length in days, 0 to ${MAX_TRIAL_DAYS}`}
          suffix="days"
          integer
          disabled={off}
          value={b.trialDays}
          invalid={Boolean(trialErr)}
          onChange={(n) => onChange({ trialDays: n })}
        />
      </SettingRow>
      <SettingRow label="Grace period" error={graceErr}>
        <NumberField
          label={`Grace period in days, 0 to ${MAX_GRACE_DAYS}`}
          suffix="days"
          integer
          disabled={off}
          value={b.graceDays}
          invalid={Boolean(graceErr)}
          onChange={(n) => onChange({ graceDays: n })}
        />
      </SettingRow>
      <SettingRow label="Auto-renew by default">
        <Toggle label="Auto-renew by default" disabled={off} checked={b.autoRenew} onChange={(v) => onChange({ autoRenew: v })} />
      </SettingRow>
      <SettingRow label="Prorate plan changes">
        <Toggle label="Prorate plan changes" disabled={off} checked={b.prorate} onChange={(v) => onChange({ prorate: v })} />
      </SettingRow>
    </SettingsCard>
  );
}