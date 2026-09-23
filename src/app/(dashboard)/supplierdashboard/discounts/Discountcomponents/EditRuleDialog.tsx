"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import type { Rule } from "./data";
import { computeStatus } from "./lib";
import { stateFromRule, validateRuleForm, buildValueLabel, type RuleFormState } from "./ruleForm";
import RuleFormFields from "./RuleFormFields";

interface EditRuleDialogProps {
  rule: Rule | null;
  onClose: () => void;
  onUpdate: (rule: Rule) => void;
}

export default function EditRuleDialog({ rule, onClose, onUpdate }: EditRuleDialogProps) {
  const [form, setForm] = useState<RuleFormState | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (rule) {
      setForm(stateFromRule(rule));
      setError(null);
    } else {
      setForm(null);
    }
  }, [rule]);

  useEffect(() => {
    if (!rule) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [rule, onClose]);

  if (!rule || !form) return null;

  function updateField<K extends keyof RuleFormState>(key: K, value: RuleFormState[K]) {
    setForm((f) => (f ? { ...f, [key]: value } : f));
  }

  function toggleChannel(ch: string) {
    setForm((f) =>
      f
        ? {
            ...f,
            channels: f.channels.includes(ch)
              ? f.channels.filter((c) => c !== ch)
              : [...f.channels, ch],
          }
        : f
    );
  }

  function handleSubmit() {
    if (!form || !rule) return;
    const validationError = validateRuleForm(form);
    if (validationError) return setError(validationError);

    const updated: Rule = {
      ...rule,
      name: form.name.trim(),
      kind: form.kind,
      valueLabel: buildValueLabel(form),
      condition: form.condition.trim() || "Applies to all products",
      shortCondition: (form.condition.trim() || "Applies to all products").slice(0, 40),
      channels: form.channels,
      startsAt: form.startsAt,
      endsAt: form.endsAt,
      maxUses: form.maxUses.trim() ? Number(form.maxUses) : null,
      // A manually-paused rule stays paused; otherwise recompute from the new dates.
      status: rule.status === "paused" ? "paused" : computeStatus(form.startsAt, form.endsAt),
    };

    onUpdate(updated);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/40" onClick={onClose} />

      <div className="relative w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-base font-semibold text-slate-900">Edit discount rule</h3>
            <p className="mt-1 text-sm text-slate-500">
              Changes apply the next time this rule is evaluated at checkout.
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
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
}