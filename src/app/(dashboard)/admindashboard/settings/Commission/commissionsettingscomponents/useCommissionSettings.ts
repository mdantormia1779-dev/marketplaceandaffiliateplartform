"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { INITIAL_SETTINGS } from "./data";
import { saveSettings } from "./saveSettings";
import { CategoryOverride, Rules, Settings, Tier, ToastState } from "./types";
import { validate } from "./validate";

const finite = (n: number, fallback: number) => (Number.isFinite(n) ? n : fallback);

export function useCommissionSettings() {
  const [saved, setSaved] = useState<Settings>(INITIAL_SETTINGS);
  const [draft, setDraft] = useState<Settings>(INITIAL_SETTINGS);
  const [showErrors, setShowErrors] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<ToastState>(null);

  const dirty = useMemo(() => JSON.stringify(saved) !== JSON.stringify(draft), [saved, draft]);
  const allErrors = useMemo(() => validate(draft), [draft]);
  const errors = showErrors ? allErrors : {};

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

  const updateTier = (id: string, patch: Partial<Tier>) =>
    setDraft((d) => ({ ...d, tiers: d.tiers.map((t) => (t.id === id ? { ...t, ...patch } : t)) }));

  const addTier = () =>
    setDraft((d) => {
      const last = d.tiers[d.tiers.length - 1];
      const tier: Tier = {
        id: crypto.randomUUID(),
        name: `Tier ${d.tiers.length + 1}`,
        minSales: last ? finite(last.minSales, 0) + 20000 : 0,
        rate: last ? Math.min(100, finite(last.rate, 0) + 2) : 5,
        bonus: last ? finite(last.bonus, 0) + 100 : 0,
      };
      return { ...d, tiers: [...d.tiers, tier] };
    });

  const removeTier = (id: string) =>
    setDraft((d) => (d.tiers.length > 1 ? { ...d, tiers: d.tiers.filter((t) => t.id !== id) } : d));

  const updateRules = (patch: Partial<Rules>) => setDraft((d) => ({ ...d, rules: { ...d.rules, ...patch } }));

  const addOverride = () =>
    setDraft((d) => {
      const o: CategoryOverride = { id: crypto.randomUUID(), category: "", rate: finite(d.rules.defaultRate, 0) };
      return { ...d, overrides: [...d.overrides, o] };
    });

  const updateOverride = (id: string, patch: Partial<CategoryOverride>) =>
    setDraft((d) => ({ ...d, overrides: d.overrides.map((o) => (o.id === id ? { ...o, ...patch } : o)) }));

  const removeOverride = (id: string) =>
    setDraft((d) => ({ ...d, overrides: d.overrides.filter((o) => o.id !== id) }));

  const discard = () => {
    setDraft(saved);
    setShowErrors(false);
  };

  const save = async () => {
    setShowErrors(true);
    if (Object.keys(allErrors).length > 0) {
      notify("error", "Fix the highlighted fields and try again.");
      return;
    }
    setSaving(true);
    try {
      await saveSettings(draft);
      setSaved(draft);
      setShowErrors(false);
      notify("success", "Commission settings saved.");
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
    dismissToast,
    updateTier,
    addTier,
    removeTier,
    updateRules,
    addOverride,
    updateOverride,
    removeOverride,
    discard,
    save,
  };
}
