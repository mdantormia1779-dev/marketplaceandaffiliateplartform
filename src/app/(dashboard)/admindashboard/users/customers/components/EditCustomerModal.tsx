"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import type { Customer, CustomerStatus } from "../types";

type Props = {
  isOpen: boolean;
  customer: Customer | null;
  onClose: () => void;
  onSave: (updated: Customer) => void;
};

export default function EditCustomerModal({ isOpen, customer, onClose, onSave }: Props) {
  const [formData, setFormData] = useState<Customer | null>(null);

  useEffect(() => {
    if (customer) {
      setFormData({ ...customer });
    }
  }, [customer]);

  if (!isOpen || !formData) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      onSave(formData);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl transition-all">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Edit Customer</h2>
            <p className="mt-0.5 text-xs text-slate-500">Update customer profile & activity</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Edit Form */}
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">Full Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 outline-none focus:border-[#1fa85a]"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">Email Address</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 outline-none focus:border-[#1fa85a]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">Phone</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 outline-none focus:border-[#1fa85a]"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">Country</label>
              <input
                type="text"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 outline-none focus:border-[#1fa85a]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">Orders</label>
              <input
                type="number"
                value={formData.orders}
                onChange={(e) => setFormData({ ...formData, orders: Number(e.target.value) })}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 outline-none focus:border-[#1fa85a]"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">Total Spent ($)</label>
              <input
                type="number"
                value={formData.totalSpent}
                onChange={(e) => setFormData({ ...formData, totalSpent: Number(e.target.value) })}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 outline-none focus:border-[#1fa85a]"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-700">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as CustomerStatus })}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:border-[#1fa85a]"
              >
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Suspended">Suspended</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-[#1fa85a] px-5 py-2 text-sm font-medium text-white transition hover:bg-[#189a50]"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}