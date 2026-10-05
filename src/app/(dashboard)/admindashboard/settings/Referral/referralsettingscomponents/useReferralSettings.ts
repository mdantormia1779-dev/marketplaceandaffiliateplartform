"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { INITIAL_SETTINGS } from "./data";
import { saveSettings } from "./saveSettings";
import { Settings, ToastState } from "./types";
import { validate } from "./validate";

export function useReferralSettings() {
  const [saved, setSaved] = useState<Settings>(INITIAL_SETTINGS);
  const [draft, setDraft] = useState<Settings>(INITIAL_SETTINGS);
  const [showErrors, setShowErrors] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<ToastState>(null);

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

  const update = (patch: Partial<Settings>) => setDraft((d) => ({ ...d, ...patch }));

  const updateReward = (id: string, amount: number) =>
    setDraft((d) => ({ ...d, rewards: d.rewards.map((r) => (r.id === id ? { ...r, amount } : r)) }));

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
      notify("success", "Referral settings saved.");
    } catch {
      notify("error", "Couldn't save your changes. Try again.");
    } finally {
      setSaving(false);
    }
  };

  return { draft, errors, dirty, saving, toast, dismissToast, update, updateReward, discard, save };
}