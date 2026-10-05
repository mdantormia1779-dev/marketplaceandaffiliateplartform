"use client";

import OverridesCard from "./OverridesCard";
import RulesCard from "./RulesCard";
import SettingsHeader from "./SettingsHeader";
import TiersCard from "./TiersCard";
import Toast from "./Toast";
import { useCommissionSettings } from "./useCommissionSettings";

export default function CommissionSettingsPage() {
  const s = useCommissionSettings();

  return (
    <div className="space-y-6 p-6">
      <SettingsHeader dirty={s.dirty} saving={s.saving} onSave={s.save} onDiscard={s.discard} />
      <TiersCard
        tiers={s.draft.tiers}
        errors={s.errors}
        onChange={s.updateTier}
        onAdd={s.addTier}
        onRemove={s.removeTier}
      />
      <RulesCard rules={s.draft.rules} errors={s.errors} onChange={s.updateRules} />
      {s.draft.rules.allowOverrides && (
        <OverridesCard
          overrides={s.draft.overrides}
          errors={s.errors}
          onAdd={s.addOverride}
          onChange={s.updateOverride}
          onRemove={s.removeOverride}
        />
      )}
      <Toast toast={s.toast} onClose={s.dismissToast} />
    </div>
  );
}
