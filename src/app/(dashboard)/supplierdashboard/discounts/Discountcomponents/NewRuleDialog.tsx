"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import type { Rule } from "./data";
import { computeStatus } from "./lib";
import { emptyRuleFormState, validateRuleForm, buildValueLabel, type RuleFormState } from "./ruleForm";
import RuleFormFields from "./RuleFormFields";

interface NewRuleDialogProps {
  open: boolean;
  onClose: () => void;
  onCreate: (rule: Rule) => void;
  existingCount: number;
}

export default function NewRuleDialog({ open, onClose, onCreate, existingCount }: NewRuleDialogProps) {
  const [form, setForm] = useState<RuleFormState>(emptyRuleFormState);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setForm(emptyRuleFormState);
      setError(null);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  function updateField<K extends keyof RuleFormState>(key: K, value: RuleFormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function toggleChannel(ch: string) {
    setForm((f) => ({
      ...f,
      channels: f.channels.includes(ch) ? f.channels.filter((c) => c !== ch) : [...f.channels, ch],
    }));
  }

  function handleSubmit() {
    const validationError = validateRuleForm(form);
    if (validationError) return setError(validationError);

    const ref = `DSC-${String(300 + existingCount).padStart(3, "0")}`;

    const rule: Rule = {
      id: `r-${Date.now()}`,
      name: form.name.trim(),
      ref,
      kind: form.kind,
      valueLabel: buildValueLabel(form),
      condition: form.condition.trim() || "Applies to all products",
      shortCondition: (form.condition.trim() || "Applies to all products").slice(0, 40),
      channels: form.channels,
      startsAt: form.startsAt,
      endsAt: form.endsAt,
      usage: 0,
      maxUses: form.maxUses.trim() ? Number(form.maxUses) : null,
      revenue: null,
      status: computeStatus(form.startsAt, form.endsAt),
      priority: existingCount + 1,
    };

    onCreate(rule);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/40" onClick={onClose} />

      <div className="relative w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-base font-semibold text-slate-900">New discount rule</h3>
            <p className="mt-1 text-sm text-slate-500">
              This rule will apply automatically at checkout once it&apos;s live.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <RuleFormFields form={form} onFieldChange={updateField} onToggleChannel={toggleChannel} />

        {error && (
          <p className="mt-4 rounded-lg bg-rose-50 px-3 py-2 text-xs font-medium text-rose-600">
            {error}
          </p>
        )}

        <div className="mt-6 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="rounded-lg bg-blue-600 px-3.5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700"
          >
            Create rule
          </button>
        </div>
      </div>
    </div>
  );
}