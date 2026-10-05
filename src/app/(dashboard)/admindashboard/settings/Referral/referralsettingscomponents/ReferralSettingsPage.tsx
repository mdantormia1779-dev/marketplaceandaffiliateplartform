"use client";
import ProgramCard from "./ProgramCard";
import RewardsSummaryCard from "./RewardsSummaryCard";
import SettingsHeader from "./SettingsHeader";
import Toast from "./Toast";
import { useReferralSettings } from "./useReferralSettings";

export default function ReferralSettingsPage() {
  const s = useReferralSettings();

  return (
    <div className="space-y-6 p-6">
      <SettingsHeader dirty={s.dirty} saving={s.saving} onSave={s.save} onDiscard={s.discard} />
      <RewardsSummaryCard settings={s.draft} />
      <ProgramCard settings={s.draft} errors={s.errors} onChange={s.update} onRewardChange={s.updateReward} />
      <Toast toast={s.toast} onClose={s.dismissToast} />
    </div>
  );
}