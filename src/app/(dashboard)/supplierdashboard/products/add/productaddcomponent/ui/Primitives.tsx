"use client";

import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";

export const inputCls = (error?: boolean) =>
  `h-10 w-full rounded-md border bg-white px-3 text-[13px] text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-2 disabled:bg-slate-50 disabled:text-slate-400 ${
    error
      ? "border-red-400 focus:border-red-500 focus:ring-red-100"
      : "border-slate-200 focus:border-blue-500 focus:ring-blue-100"
  }`;

export function Card({
  title,
  description,
  right,
  children,
}: {
  title: string;
  description?: string;
  right?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 lg:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-[14px] font-semibold text-slate-900">{title}</h3>
          {description && <p className="mt-1 text-[12px] text-slate-500">{description}</p>}
        </div>
        {right}
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}

export function Field({
  label,
  required,
  hint,
  error,
  htmlFor,
  aside,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  htmlFor?: string;
  aside?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <label htmlFor={htmlFor} className="text-[12px] font-medium text-slate-800">
          {label}
          {required && <span className="ml-0.5 text-red-500">*</span>}
        </label>
        {aside}
      </div>
      {children}
      {error ? (
        <p className="mt-1.5 text-[11px] text-red-600">{error}</p>
      ) : (
        hint && <p className="mt-1.5 text-[11px] text-slate-400">{hint}</p>
      )}
    </div>
  );
}

export function SelectBox({
  id,
  value,
  onChange,
  options,
  placeholder,
  error,
}: {
  id?: string;
  value: string;
  onChange: (v: string) => void;
  options: readonly string[];
  placeholder?: string;
  error?: boolean;
}) {
  return (
    <div className="relative">
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${inputCls(error)} appearance-none pr-9 ${value === "" ? "text-slate-500" : ""}`}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
    </div>
  );
}

export function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-5 w-9 shrink-0 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 ${
        checked ? "bg-blue-600" : "bg-slate-200"
      }`}
    >
      <span
        className={`absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${
          checked ? "translate-x-4" : ""
        }`}
      />
    </button>
  );
}