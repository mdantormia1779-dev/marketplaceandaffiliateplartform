"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { INITIAL_SETTINGS, MAX_WAIVERS } from "./data";
import { saveSettings } from "./saveSettings";
import { Settings, ToastState, Waiver } from "./types";
import { validate } from "./validate";

export function useJoiningFeeSettings() {
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

  const updateFee = (id: string, amount: number) =>
    setDraft((d) => ({ ...d, fees: d.fees.map((f) => (f.id === id ? { ...f, amount } : f)) }));

  // waivers
  const addWaiver = () =>
    setDraft((d) =>
      d.waivers.length >= MAX_WAIVERS ? d : { ...d, waivers: [...d.waivers, { id: crypto.randomUUID(), code: "", percent: 50 }] }
    );

  const updateWaiver = (id: string, patch: Partial<Waiver>) =>
    setDraft((d) => ({ ...d, waivers: d.waivers.map((w) => (w.id === id ? { ...w, ...patch } : w)) }));

  const removeWaiver = (id: string) => setDraft((d) => ({ ...d, waivers: d.waivers.filter((w) => w.id !== id) }));

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
    // code gulo bro hater, space chhara save kora
    const clean: Settings = {
      ...draft,
      waivers: draft.waivers.map((w) => ({ ...w, code: w.code.trim().toUpperCase() })),
    };
    setSaving(true);
    try {
      await saveSettings(clean);
      setSaved(clean);
      setDraft(clean);
      setShowErrors(false);
      notify("success", "Joining fee settings saved.");
    } catch {
      notify("error", "Couldn't save your changes. Try again.");
    } finally {
      setSaving(false);
    }
  };

  return { draft, errors, dirty, saving, toast, dismissToast, update, updateFee, addWaiver, updateWaiver, removeWaiver, discard, save };
}