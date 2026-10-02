"use client";

import { FormEvent, useEffect, useState } from "react";
import { X } from "lucide-react";
import { Application } from "../types";
import { categories } from "../data";

export interface ApprovalFormData {
  store: string;
  owner: string;
  email: string;
  category: string;
  country: string;
  submitted: string;
}

interface ApprovalFormModalProps {
  application: Application | null; // null hole modal bondho
  onClose: () => void;
  onSubmit: (data: ApprovalFormData) => void;
}

const empty: ApprovalFormData = { store: "", owner: "", email: "", category: categories[0], country: "", submitted: "" };

const inputClass =
  "mt-1.5 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm outline-none placeholder:text-gray-400 focus:border-emerald-500 focus:bg-white";

export default function ApprovalFormModal({ application, onClose, onSubmit }: ApprovalFormModalProps) {
  const [form, setForm] = useState<ApprovalFormData>(empty);

  // modal khulle purano data diye form fill hobe
  useEffect(() => {
    if (!application) return;
    setForm({
      store: application.store,
      owner: application.owner,
      email: application.email,
      category: application.category,
      country: application.country,
      submitted: application.submitted,
    });
  }, [application]);

  // Esc chaple bondho
  useEffect(() => {
    if (!application) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [application, onClose]);

  if (!application) return null;

  const update = (key: keyof ApprovalFormData, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 print:hidden"
      onClick={onClose}
    >
      <div className="w-full max-w-lg rounded-xl bg-white shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between px-6 pt-5 pb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Edit Approval</h2>
            <p className="text-sm text-gray-500">Update the details below</p>
          </div>
          <button onClick={onClose} aria-label="Close" className="text-gray-500 hover:text-gray-800">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4 border-y border-gray-100 px-6 py-5 sm:grid-cols-2">
            <label className="text-sm font-medium text-gray-700">
              Store
              <input required className={inputClass} placeholder="Store"
                value={form.store} onChange={(e) => update("store", e.target.value)} />
            </label>
            <label className="text-sm font-medium text-gray-700">
              Owner
              <input required className={inputClass} placeholder="Owner"
                value={form.owner} onChange={(e) => update("owner", e.target.value)} />
            </label>
            <label className="text-sm font-medium text-gray-700">
              Email
              <input required type="email" className={inputClass} placeholder="Email"
                value={form.email} onChange={(e) => update("email", e.target.value)} />
            </label>
            <label className="text-sm font-medium text-gray-700">
              Category
              <select className={inputClass}
                value={form.category} onChange={(e) => update("category", e.target.value)}>
                {categories.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </label>
            <label className="text-sm font-medium text-gray-700">
              Country
              <input required className={inputClass} placeholder="Country"
                value={form.country} onChange={(e) => update("country", e.target.value)} />
            </label>
            <label className="text-sm font-medium text-gray-700">
              Submitted
              <input required type="date" className={inputClass}
                value={form.submitted} onChange={(e) => update("submitted", e.target.value)} />
            </label>
          </div>

          <div className="flex justify-end gap-3 px-6 py-4">
            <button type="button" onClick={onClose}
              className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100">
              Cancel
            </button>
            <button type="submit"
              className="rounded-lg bg-[#1fae6b] px-5 py-2 text-sm font-semibold text-white hover:bg-[#189a5d]">
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}