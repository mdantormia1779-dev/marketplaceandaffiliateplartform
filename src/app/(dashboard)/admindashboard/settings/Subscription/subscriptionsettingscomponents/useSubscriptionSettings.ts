"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { INITIAL_SETTINGS, MAX_FEATURES, MAX_PLANS } from "../data";
import { saveSettings } from "./saveSettings";
import { Behavior, Plan, Settings, ToastState } from "./types";
import { validate } from "./validate";

const finite = (n: number, fallback: number) => (Number.isFinite(n) ? n : fallback);

export function useSubscriptionSettings() {
  const [saved, setSaved] = useState<Settings>(INITIAL_SETTINGS);
  const [draft, setDraft] = useState<Settings>(INITIAL_SETTINGS);
  const [showErrors, setShowErrors] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<ToastState>(null);
  const [justAdded, setJustAdded] = useState<string | null>(null);

  const dirty = useMemo(() => JSON.stringify(saved) !== JSON.stringify(draft), [saved, draft]);
  const allErrors = useMemo(() => validate(draft), [draft]);
  // save-er chesta korar por error dekhay, tarpor live update hoy
  const errors = showErrors ? allErrors : {};

  // save na kore page chhartey gele browser warn kore
  useEffect(() => {
    if (!dirty) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [dirty]);

  const notify = (type: "success" | "error", message: string) => setToast({ id: Date.now(), type, message });
  const dismissToast = useCallback(() => setToast(null), []);

  // plans
  const updatePlan = (id: string, patch: Partial<Plan>) =>
    setDraft((d) => ({ ...d, plans: d.plans.map((p) => (p.id === id ? { ...p, ...patch } : p)) }));

  const addPlan = () => {
    if (draft.plans.length >= MAX_PLANS) return;
    const id = crypto.randomUUID();
    const last = draft.plans[draft.plans.length - 1];
    const plan: Plan = {
      id,
      name: "New plan",
      price: last ? finite(last.price, 0) + 40 : 29,
      subscribers: 0,
      popular: false,
      features: [{ id: crypto.randomUUID(), text: "" }],
    };
    setJustAdded(id);
    setDraft((d) => ({ ...d, plans: [...d.plans, plan] }));
  };

  // subscriber thakle plan muchha jay na (UI te button disabled)
  const removePlan = (id: string) =>
    setDraft((d) => {
      const plan = d.plans.find((p) => p.id === id);
      if (!plan || plan.subscribers > 0) return d;
      return { ...d, plans: d.plans.filter((p) => p.id !== id) };
    });

  // ekta-i plan "Popular" hote pare
  const setPopular = (id: string, value: boolean) =>
    setDraft((d) => ({
      ...d,
      plans: d.plans.map((p) => (p.id === id ? { ...p, popular: value } : value ? { ...p, popular: false } : p)),
    }));

  // features
  const addFeature = (planId: string) =>
    setDraft((d) => ({
      ...d,
      plans: d.plans.map((p) =>
        p.id === planId && p.features.length < MAX_FEATURES
          ? { ...p, features: [...p.features, { id: crypto.randomUUID(), text: "" }] }
          : p
      ),
    }));

  const updateFeature = (planId: string, featureId: string, text: string) =>
    setDraft((d) => ({
      ...d,
      plans: d.plans.map((p) =>
        p.id === planId ? { ...p, features: p.features.map((x) => (x.id === featureId ? { ...x, text } : x)) } : p
      ),
    }));

  const removeFeature = (planId: string, featureId: string) =>
    setDraft((d) => ({
      ...d,
      plans: d.plans.map((p) =>
        p.id === planId ? { ...p, features: p.features.filter((x) => x.id !== featureId) } : p
      ),
    }));

  // billing behavior
  const updateBehavior = (patch: Partial<Behavior>) =>
    setDraft((d) => ({ ...d, behavior: { ...d.behavior, ...patch } }));

  const discard = () => {
    setDraft(saved);
    setShowErrors(false);
    setJustAdded(null);
  };

  const save = async () => {
    setShowErrors(true);
    if (Object.keys(allErrors).length > 0) {
      notify("error", "Fix the highlighted fields and try again.");
      return;
    }
    // naam ar feature er agey-pechhey space muche save kora
    const clean: Settings = {
      ...draft,
      plans: draft.plans.map((p) => ({
        ...p,
        name: p.name.trim(),
        features: p.features.map((x) => ({ ...x, text: x.text.trim() })),
      })),
    };
    setSaving(true);
    try {
      await saveSettings(clean);
      setSaved(clean);
      setDraft(clean);
      setShowErrors(false);
      setJustAdded(null);
      notify("success", "Subscription settings saved.");
    } catch {
      notify("error", "Couldn't save your changes. Try again.");
    } finally {
      setSaving(false);
    }
  };

  return {
    draft,
    errors,
    dirty,
    saving,
    toast,
    justAdded,
    dismissToast,
    updatePlan,
    addPlan,
    removePlan,
    setPopular,
    addFeature,
    updateFeature,
    removeFeature,
    updateBehavior,
    discard,
    save,
  };
}