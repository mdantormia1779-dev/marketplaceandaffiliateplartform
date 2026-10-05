"use client";
import ProgramsCard from "./ProgramsCard";
import RulesSummaryCard from "./RulesSummaryCard";
import SettingsHeader from "./SettingsHeader";
import Toast from "./Toast";
import { useBonusSettings } from "./useBonusSettings";

export default function BonusSettingsPage() {
  const s = useBonusSettings();

  return (
    <div className="space-y-6 p-6">
      <SettingsHeader dirty={s.dirty} saving={s.saving} onSave={s.save} onDiscard={s.discard} />
      <RulesSummaryCard settings={s.draft} />
      <ProgramsCard settings={s.draft} errors={s.errors} onChange={s.update} />
      <Toast toast={s.toast} onClose={s.dismissToast} />
    </div>
  );
}