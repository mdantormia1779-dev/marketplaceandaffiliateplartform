"use client";
import { symbolOf } from "./data";
import GatewaysCard from "./GatewaysCard";
import PaymentSettingsCard from "./PaymentSettingsCard";
import SettingsHeader from "./SettingsHeader";
import Toast from "./Toast";
import { usePaymentSettings } from "./usePaymentSettings";

export default function PaymentSettingsPage() {
  const s = usePaymentSettings();
  const symbol = symbolOf(s.draft.currency);

  return (
    <div className="space-y-6 p-6">
      <SettingsHeader dirty={s.dirty} saving={s.saving} onSave={s.save} onDiscard={s.discard} />
      <GatewaysCard gateways={s.draft.gateways} symbol={symbol} errors={s.errors} onChange={s.updateGateway} />
      <PaymentSettingsCard settings={s.draft} symbol={symbol} errors={s.errors} onChange={s.update} />
      <Toast toast={s.toast} onClose={s.dismissToast} />
    </div>
  );
}