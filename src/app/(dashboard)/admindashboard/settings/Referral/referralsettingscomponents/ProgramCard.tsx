import { ArrowRight } from "lucide-react";
import { MAX_THRESHOLD, REWARD_TYPES } from "./data";
import NumberField from "./NumberField";
import SettingRow from "./SettingRow";
import SettingsCard from "./SettingsCard";
import Toggle from "./Toggle";
import { Errors, RewardType, Settings } from "./types";
import { rewardKey, thresholdKey } from "./validate";

interface Props {
  settings: Settings;
  errors: Errors;
  onChange: (patch: Partial<Settings>) => void;
  onRewardChange: (id: string, amount: number) => void;
}

export default function ProgramCard({ settings: s, errors, onChange, onRewardChange }: Props) {
  const off = !s.enabled; // program bondho thakle baki setting gulo disabled
  const cash = s.rewardType === "Cash";
  const thresholdErr = errors[thresholdKey];

  return (
    <SettingsCard title="Referral Program" subtitle="Reward rules for referring affiliates, suppliers and customers.">
      <SettingRow
        label="Enable referral program"
        description={off ? "Nobody earns referral rewards while this is off." : undefined}
      >
        <Toggle label="Enable referral program" checked={s.enabled} onChange={(v) => onChange({ enabled: v })} />
      </SettingRow>

      <SettingRow label="Reward type">
        <select
          aria-label="Reward type"
          disabled={off}
          value={s.rewardType}
          onChange={(e) => onChange({ rewardType: e.target.value as RewardType })}
          className="w-44 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none focus:border-emerald-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {REWARD_TYPES.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </SettingRow>

      {s.rewards.map((r) => {
        const err = errors[rewardKey(r.id)];
        return (
          <SettingRow
            key={r.id}
            error={err}
            label={
              <span className="inline-flex items-center gap-2">
                {r.from}
                <ArrowRight size={14} className="text-gray-400" aria-label="refers" />
                {r.to}
              </span>
            }
          >
            <NumberField
              label={`${r.from} refers ${r.to.toLowerCase()} reward in dollars`}
              suffix="$"
              disabled={off}
              value={r.amount}
              invalid={Boolean(err)}
              onChange={(n) => onRewardChange(r.id, n)}
            />
          </SettingRow>
        );
      })}

      <SettingRow
        label="Referral payout threshold"
        description={!cash ? `Only applies to cash rewards, not ${s.rewardType.toLowerCase()}.` : undefined}
        error={thresholdErr}
      >
        <NumberField
          label={`Referral payout threshold in dollars, 0 to ${MAX_THRESHOLD}`}
          suffix="$"
          disabled={off || !cash}
          value={s.threshold}
          invalid={Boolean(thresholdErr)}
          onChange={(n) => onChange({ threshold: n })}
        />
      </SettingRow>
    </SettingsCard>
  );
}