import { CURRENCIES, MAX_AMOUNT, PAYOUT_METHODS } from "./data";
import NumberField from "./NumberField";
import SettingRow from "./SettingRow";
import SettingsCard from "./SettingsCard";
import Toggle from "./Toggle";
import { CurrencyCode, Errors, PayoutMethod, Settings } from "./types";

interface Props {
  settings: Settings;
  symbol: string;
  errors: Errors;
  onChange: (patch: Partial<Settings>) => void;
}

const select =
  "w-44 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none focus:border-emerald-500";

export default function PaymentSettingsCard({ settings: s, symbol, errors, onChange }: Props) {
  return (
    <SettingsCard title="Payment Settings" subtitle="Currency, payouts and checkout behavior.">
      <SettingRow
        label="Default currency"
        description="Changes the symbol shown across the platform. It doesn't convert existing amounts."
      >
        <select
          aria-label="Default currency"
          value={s.currency}
          onChange={(e) => onChange({ currency: e.target.value as CurrencyCode })}
          className={select}
        >
          {CURRENCIES.map((c) => (
            <option key={c.code} value={c.code}>
              {c.label}
            </option>
          ))}
        </select>
      </SettingRow>

      <SettingRow label="Default payout method">
        <select
          aria-label="Default payout method"
          value={s.payoutMethod}
          onChange={(e) => onChange({ payoutMethod: e.target.value as PayoutMethod })}
          className={select}
        >
          {PAYOUT_METHODS.map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>
      </SettingRow>

      <SettingRow label="Minimum withdrawal" error={errors.minWithdrawal}>
        <NumberField
          label={`Minimum withdrawal, 0 to ${MAX_AMOUNT}`}
          suffix={symbol}
          value={s.minWithdrawal}
          invalid={Boolean(errors.minWithdrawal)}
          onChange={(n) => onChange({ minWithdrawal: n })}
        />
      </SettingRow>

      <SettingRow label="Withdrawal processing fee" error={errors.processingFee}>
        <NumberField
          label="Withdrawal processing fee in percent"
          suffix="%"
          value={s.processingFee}
          invalid={Boolean(errors.processingFee)}
          onChange={(n) => onChange({ processingFee: n })}
        />
      </SettingRow>

      <SettingRow
        label="Auto-approve payouts under"
        description="Payouts below this amount skip manual review. Set 0 to review every payout."
        error={errors.autoApproveUnder}
      >
        <NumberField
          label="Auto-approve payouts under this amount"
          suffix={symbol}
          value={s.autoApproveUnder}
          invalid={Boolean(errors.autoApproveUnder)}
          onChange={(n) => onChange({ autoApproveUnder: n })}
        />
      </SettingRow>

      <SettingRow label="Require KYC before payout" description="Payees must verify their identity before they can withdraw.">
        <Toggle label="Require KYC before payout" checked={s.requireKyc} onChange={(v) => onChange({ requireKyc: v })} />
      </SettingRow>
    </SettingsCard>
  );
}