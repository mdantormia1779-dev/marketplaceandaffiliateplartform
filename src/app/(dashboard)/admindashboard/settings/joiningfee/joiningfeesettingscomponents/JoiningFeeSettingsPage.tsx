"use client";
import FeesCard from "./FeesCard";
import SettingsHeader from "./SettingsHeader";
import Toast from "./Toast";
import { useJoiningFeeSettings } from "./useJoiningFeeSettings";
import WaiversCard from "./WaiversCard";

export default function JoiningFeeSettingsPage() {
  const s = useJoiningFeeSettings();
  const showWaivers = s.draft.enabled && s.draft.allowWaivers;

  return (
    <div className="space-y-6 p-6">
      <SettingsHeader dirty={s.dirty} saving={s.saving} onSave={s.save} onDiscard={s.discard} />
      <FeesCard settings={s.draft} errors={s.errors} onChange={s.update} onFeeChange={s.updateFee} />
      {showWaivers && (
        <WaiversCard
          waivers={s.draft.waivers}
          errors={s.errors}
          onAdd={s.addWaiver}
          onChange={s.updateWaiver}
          onRemove={s.removeWaiver}
        />
      )}
      <Toast toast={s.toast} onClose={s.dismissToast} />
    </div>
  );
}