import NumberField from "./NumberField";
import SettingRow from "./SettingRow";
import SettingsCard from "./SettingsCard";
import Toggle from "./Toggle";
import { Errors, Settings } from "./types";

interface Props {
  settings: Settings;
  errors: Errors;
  onChange: (patch: Partial<Settings>) => void;
}

export default function ProgramsCard({ settings: s, errors, onChange }: Props) {
  const off = !s.enabled; // bonus bondho thakle baki shob disabled
  const hint = (programOn: boolean, name: string) =>
    !off && !programOn ? `Turn on ${name} to edit this.` : undefined;

  return (
    <SettingsCard title="Bonus Programs" subtitle="Milestone, performance and welcome bonuses for affiliates.">
      <SettingRow
        label="Enable bonuses"
        description={off ? "Nobody earns bonuses while this is off." : undefined}
      >
        <Toggle label="Enable bonuses" checked={s.enabled} onChange={(v) => onChange({ enabled: v })} />
      </SettingRow>

      <SettingRow label="Tier milestone bonuses">
        <Toggle label="Tier milestone bonuses" disabled={off} checked={s.tierEnabled} onChange={(v) => onChange({ tierEnabled: v })} />
      </SettingRow>
      <SettingRow label="Quarterly performance bonus">
        <Toggle label="Quarterly performance bonus" disabled={off} checked={s.quarterlyEnabled} onChange={(v) => onChange({ quarterlyEnabled: v })} />
      </SettingRow>
      <SettingRow label="Welcome bonus">
        <Toggle label="Welcome bonus" disabled={off} checked={s.welcomeEnabled} onChange={(v) => onChange({ welcomeEnabled: v })} />
      </SettingRow>
      <SettingRow label="Seasonal campaign bonus">
        <Toggle label="Seasonal campaign bonus" disabled={off} checked={s.seasonalEnabled} onChange={(v) => onChange({ seasonalEnabled: v })} />
      </SettingRow>

      <SettingRow label="Welcome bonus amount" description={hint(s.welcomeEnabled, "Welcome bonus")} error={errors.welcomeAmount}>
        <NumberField
          label="Welcome bonus amount in dollars"
          suffix="$"
          disabled={off || !s.welcomeEnabled}
          value={s.welcomeAmount}
          invalid={Boolean(errors.welcomeAmount)}
          onChange={(n) => onChange({ welcomeAmount: n })}
        />
      </SettingRow>
      <SettingRow
        label="Welcome bonus window"
        description={hint(s.welcomeEnabled, "Welcome bonus") ?? "Affiliate er prothom koto ta conversion e bonus pabe."}
        error={errors.welcomeConversions}
      >
        <NumberField
          label="Welcome bonus window in conversions"
          suffix="conversions"
          integer
          disabled={off || !s.welcomeEnabled}
          value={s.welcomeConversions}
          invalid={Boolean(errors.welcomeConversions)}
          onChange={(n) => onChange({ welcomeConversions: n })}
        />
      </SettingRow>
      <SettingRow label="Quarterly leader bonus" description={hint(s.quarterlyEnabled, "Quarterly performance bonus")} error={errors.quarterlyAmount}>
        <NumberField
          label="Quarterly leader bonus in dollars"
          suffix="$"
          disabled={off || !s.quarterlyEnabled}
          value={s.quarterlyAmount}
          invalid={Boolean(errors.quarterlyAmount)}
          onChange={(n) => onChange({ quarterlyAmount: n })}
        />
      </SettingRow>
      <SettingRow label="Seasonal top performer bonus" description={hint(s.seasonalEnabled, "Seasonal campaign bonus")} error={errors.seasonalAmount}>
        <NumberField
          label="Seasonal top performer bonus in dollars"
          suffix="$"
          disabled={off || !s.seasonalEnabled}
          value={s.seasonalAmount}
          invalid={Boolean(errors.seasonalAmount)}
          onChange={(n) => onChange({ seasonalAmount: n })}
        />
      </SettingRow>
    </SettingsCard>
  );
}