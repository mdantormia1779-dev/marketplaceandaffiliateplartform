"use client";
import BehaviorCard from "./BehaviorCard";
import PlansGrid from "./PlansGrid";
import SettingsHeader from "./SettingsHeader";
import Toast from "./Toast";
import { useSubscriptionSettings } from "./useSubscriptionSettings";

export default function SubscriptionSettingsPage() {
  const s = useSubscriptionSettings();

  return (
    <div className="space-y-6 p-6">
      <SettingsHeader dirty={s.dirty} saving={s.saving} onSave={s.save} onDiscard={s.discard} />
      <PlansGrid
        plans={s.draft.plans}
        errors={s.errors}
        enabled={s.draft.behavior.enabled}
        justAdded={s.justAdded}
        onChange={s.updatePlan}
        onAddPlan={s.addPlan}
        onRemove={s.removePlan}
        onPopular={s.setPopular}
        onAddFeature={s.addFeature}
        onFeatureChange={s.updateFeature}
        onFeatureRemove={s.removeFeature}
      />
      <BehaviorCard behavior={s.draft.behavior} errors={s.errors} onChange={s.updateBehavior} />
      <Toast toast={s.toast} onClose={s.dismissToast} />
    </div>
  );
}