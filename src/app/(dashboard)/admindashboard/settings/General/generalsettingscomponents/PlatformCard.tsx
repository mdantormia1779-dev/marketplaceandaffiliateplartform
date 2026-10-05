import { LANGUAGES, MAX_NAME, TIMEZONES } from "./data";
import SettingRow from "./SettingRow";
import SettingsCard from "./SettingsCard";
import TextField from "./TextField";
import { Errors, Settings } from "./types";
import { useClock } from "./useClock";

interface Props {
  settings: Settings;
  errors: Errors;
  onChange: (patch: Partial<Settings>) => void;
}

const select =
  "w-72 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none focus:border-emerald-500";

export default function PlatformCard({ settings: s, errors, onChange }: Props) {
  const now = useClock(s.timezone);

  return (
    <SettingsCard title="Platform Information" subtitle="Core details shown across the marketplace.">
      <SettingRow label="Platform name" error={errors.platformName}>
        <TextField
          label="Platform name"
          autoComplete="organization"
          maxLength={MAX_NAME + 10}
          value={s.platformName}
          invalid={Boolean(errors.platformName)}
          onChange={(v) => onChange({ platformName: v })}
        />
      </SettingRow>

      <SettingRow label="Support email" error={errors.supportEmail}>
        <TextField
          label="Support email"
          type="email"
          autoComplete="email"
          placeholder="support@example.com"
          value={s.supportEmail}
          invalid={Boolean(errors.supportEmail)}
          onChange={(v) => onChange({ supportEmail: v })}
        />
      </SettingRow>

      <SettingRow label="Support phone" error={errors.supportPhone}>
        <TextField
          label="Support phone"
          type="tel"
          autoComplete="tel"
          placeholder="+1 415 555 0142"
          value={s.supportPhone}
          invalid={Boolean(errors.supportPhone)}
          onChange={(v) => onChange({ supportPhone: v })}
        />
      </SettingRow>

      <SettingRow label="Timezone" description={now ? `Right now: ${now}` : undefined}>
        <select
          aria-label="Timezone"
          value={s.timezone}
          onChange={(e) => onChange({ timezone: e.target.value })}
          className={select}
        >
          {TIMEZONES.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </SettingRow>

      <SettingRow label="Default language">
        <select
          aria-label="Default language"
          value={s.language}
          onChange={(e) => onChange({ language: e.target.value })}
          className={select}
        >
          {LANGUAGES.map((l) => (
            <option key={l.value} value={l.value}>
              {l.label}
            </option>
          ))}
        </select>
      </SettingRow>
    </SettingsCard>
  );
}