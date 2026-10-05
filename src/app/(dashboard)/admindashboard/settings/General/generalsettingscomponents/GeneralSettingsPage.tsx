"use client";
import OperationsCard from "./OperationsCard";
import PlatformCard from "./PlatformCard";
import SettingsHeader from "./SettingsHeader";
import Toast from "./Toast";
import { useGeneralSettings } from "./useGeneralSettings";

export default function GeneralSettingsPage() {
  const s = useGeneralSettings();

  return (
    <div className="space-y-6 p-6">
      <SettingsHeader dirty={s.dirty} saving={s.saving} onSave={s.save} onDiscard={s.discard} />
      <PlatformCard settings={s.draft} errors={s.errors} onChange={s.update} />
      <OperationsCard settings={s.draft} onChange={s.update} />
      <Toast toast={s.toast} onClose={s.dismissToast} />
    </div>
  );
}