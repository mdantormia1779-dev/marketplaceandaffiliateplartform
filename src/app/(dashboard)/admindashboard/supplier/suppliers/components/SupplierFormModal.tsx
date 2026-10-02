"use client";

import { FormEvent, useEffect, useState } from "react";
import { X } from "lucide-react";
import { Supplier, SupplierStatus } from "../types";

export interface SupplierFormData {
  store: string;
  owner: string;
  email: string;
  status: SupplierStatus;
}

interface SupplierFormModalProps {
  open: boolean;
  supplier?: Supplier | null; // thakle Edit mode, na thakle Add mode
  onClose: () => void;
  onSubmit: (data: SupplierFormData) => void;
}

const empty: SupplierFormData = { store: "", owner: "", email: "", status: "Active" };

const inputClass =
  "w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm outline-none placeholder:text-gray-400 focus:border-emerald-500 focus:bg-white";

export default function SupplierFormModal({ open, supplier, onClose, onSubmit }: SupplierFormModalProps) {
  const isEdit = !!supplier;
  const [form, setForm] = useState<SupplierFormData>(empty);

  // modal khulle form fill hobe (Edit hole purano data, Add hole faka)
  useEffect(() => {
    if (!open) return;
    setForm(
      supplier
        ? { store: supplier.store, owner: supplier.owner, email: supplier.email, status: supplier.status }
        : empty
    );
  }, [open, supplier]);

  // Esc chaple modal bondho hobe
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const update = (key: keyof SupplierFormData, value: string) =>
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
            <h2 className="text-lg font-semibold text-gray-900">
              {isEdit ? "Edit Supplier List" : "Add Supplier List"}
            </h2>
            <p className="text-sm text-gray-500">
              {isEdit ? "Update the details below" : "Fill in the details below"}
            </p>
          </div>
          <button onClick={onClose} aria-label="Close" className="text-gray-500 hover:text-gray-800">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4 border-y border-gray-100 px-6 py-5 sm:grid-cols-2">
            <label className="text-sm font-medium text-gray-700">
              Store name
              <input required className={`${inputClass} mt-1.5`} placeholder="Store name"
                value={form.store} onChange={(e) => update("store", e.target.value)} />
            </label>
            <label className="text-sm font-medium text-gray-700">
              Owner name
              <input required className={`${inputClass} mt-1.5`} placeholder="Owner name"
                value={form.owner} onChange={(e) => update("owner", e.target.value)} />
            </label>
            <label className="text-sm font-medium text-gray-700">
              Contact email
              <input required type="email" className={`${inputClass} mt-1.5`} placeholder="Contact email"
                value={form.email} onChange={(e) => update("email", e.target.value)} />
            </label>
            <label className="text-sm font-medium text-gray-700">
              Status
              <select className={`${inputClass} mt-1.5`}
                value={form.status} onChange={(e) => update("status", e.target.value)}>
                <option>Active</option>
                <option>Pending</option>
                <option>Suspended</option>
                <option>Rejected</option>
              </select>
            </label>
          </div>

          <div className="flex justify-end gap-3 px-6 py-4">
            <button type="button" onClick={onClose}
              className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100">
              Cancel
            </button>
            <button type="submit"
              className="rounded-lg bg-[#1fae6b] px-5 py-2 text-sm font-semibold text-white hover:bg-[#189a5d]">
              {isEdit ? "Save changes" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}