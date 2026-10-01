"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import type { Staff, StaffForm, StaffStatus } from "../types";

type Props = {
  mode: "add" | "edit";
  initial?: Staff;
  onClose: () => void;
  onSubmit: (form: StaffForm) => Promise<void>;
};

type FieldKey = "name" | "email" | "role" | "department";
type Errors = Partial<Record<FieldKey, string>>;

const baseInput =
  "w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition";
const okCls = "border-slate-200 focus:border-[#1fa85a]";
const errCls = "border-red-400 focus:border-red-500";

const validate = (f: StaffForm): Errors => {
  const e: Errors = {};
  if (!f.name.trim()) e.name = "Full name is required";
  if (!f.email.trim()) e.email = "Work email is required";
  else if (!/^\S+@\S+\.\S+$/.test(f.email.trim())) e.email = "Enter a valid email address";
  if (!f.role.trim()) e.role = "Role is required";
  if (!f.department.trim()) e.department = "Department is required";
  return e;
};

type FieldProps = {
  name: FieldKey;
  label: string;
  placeholder: string;
  value: string;
  type?: string;
  error?: string;
  onChange: (v: string) => void;
};

function Field({ name, label, placeholder, value, type = "text", error, onChange }: FieldProps) {
  return (
    <div>
      <label className="mb-1.5 block text-xs text-slate-600">{label}</label>
      <input
        name={name}
        type={type}
        className={`${baseInput} ${error ? errCls : okCls}`}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

export default function StaffFormModal({ mode, initial, onClose, onSubmit }: Props) {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [form, setForm] = useState<StaffForm>({
    name: initial?.name ?? "",
    email: initial?.email ?? "",
    role: initial?.role ?? "",
    department: initial?.department ?? "",
    status: initial?.status ?? "Active",
  });

  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const set = (k: keyof StaffForm, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => (k in e ? { ...e, [k]: undefined } : e));
  };

  const submit = async () => {
    const found = validate(form);
    setErrors(found);

    const order: FieldKey[] = ["name", "email", "role", "department"];
    const firstBad = order.find((k) => found[k]);
    if (firstBad) {
      panelRef.current
        ?.querySelector<HTMLInputElement>(`input[name="${firstBad}"]`)
        ?.focus();
      return;
    }

    setLoading(true);
    try {
      await onSubmit(form);
      onClose();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const isAdd = mode === "add";

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-all"
      />

      <div
        ref={panelRef}
        className="relative w-full max-w-[512px] overflow-hidden rounded-xl bg-white shadow-2xl"
      >
        <div className="flex items-start justify-between px-5 py-4">
          <div className="leading-tight">
            <h2 className="text-base font-semibold text-slate-900">
              {isAdd ? "Add Staff" : "Edit Staff"}
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              {isAdd ? "Fill in the details below" : "Update the details below"}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1.5 text-slate-500 transition hover:bg-slate-100"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 border-y border-slate-100 px-5 py-4 sm:grid-cols-2">
          <Field
            name="name"
            label="Full name"
            placeholder="Full name"
            value={form.name}
            error={errors.name}
            onChange={(v) => set("name", v)}
          />
          <Field
            name="email"
            label="Work email"
            placeholder="Work email"
            type="email"
            value={form.email}
            error={errors.email}
            onChange={(v) => set("email", v)}
          />
          <Field
            name="role"
            label="Role"
            placeholder="Role"
            value={form.role}
            error={errors.role}
            onChange={(v) => set("role", v)}
          />
          <Field
            name="department"
            label="Department"
            placeholder="Department"
            value={form.department}
            error={errors.department}
            onChange={(v) => set("department", v)}
          />
          <div>
            <label className="mb-1.5 block text-xs text-slate-600">Status</label>
            <select
              className={`${baseInput} ${okCls}`}
              value={form.status}
              onChange={(e) => set("status", e.target.value as StaffStatus)}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Suspended">Suspended</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 px-5 py-3.5">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={submit}
            disabled={loading}
            className="rounded-lg bg-[#1fa85a] px-5 py-2 text-sm font-medium text-white transition hover:bg-[#189a50] disabled:opacity-60"
          >
            {loading
              ? isAdd ? "Creating..." : "Saving..."
              : isAdd ? "Create" : "Save changes"}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}