"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { toast } from "react-toastify";
import type { Customer, CustomerStatus } from "../types";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (customer: Customer) => void;
};

export default function AddCustomerModal({ isOpen, onClose, onAdd }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [status, setStatus] = useState<CustomerStatus>("Active");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation 1: Name validation
    if (!name.trim()) {
      toast.error("Please enter the customer's full name!");
      return;
    }

    // Validation 2: Email regex check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      toast.error("Please enter an email address!");
      return;
    }
    if (!emailRegex.test(email)) {
      toast.error("Please provide a valid email address!");
      return;
    }

    // Validation 3: Phone number check
    if (!phone.trim()) {
      toast.error("Please provide a phone number!");
      return;
    }

    // Validation 4: Country check
    if (!country.trim()) {
      toast.error("Please specify the country!");
      return;
    }

    try {
      const newCustomer: Customer = {
        id: Date.now(),
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        country: country.trim(),
        orders: 0,
        totalSpent: 0,
        status,
        joined: new Date().toISOString().split("T")[0],
      };

      onAdd(newCustomer);
      toast.success("Customer added successfully!");

      // Reset form fields
      setName("");
      setEmail("");
      setPhone("");
      setCountry("");
      setStatus("Active");
      onClose();
    } catch {
      toast.error("Something went wrong while adding customer!");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl transition-all">
        {/* Header */}
        <div className="flex items-start justify-between pb-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Add Customer</h2>
            <p className="mt-0.5 text-xs text-slate-500">Fill in the details below</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-700">
                Full name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-slate-200 px-3.5 py-2 text-sm text-slate-800 outline-none transition focus:border-[#1fa85a] focus:ring-1 focus:ring-[#1fa85a]"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-700">
                Email address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-slate-200 px-3.5 py-2 text-sm text-slate-800 outline-none transition focus:border-[#1fa85a] focus:ring-1 focus:ring-[#1fa85a]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-700">
                Phone number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-lg border border-slate-200 px-3.5 py-2 text-sm text-slate-800 outline-none transition focus:border-[#1fa85a] focus:ring-1 focus:ring-[#1fa85a]"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-700">
                Country <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full rounded-lg border border-slate-200 px-3.5 py-2 text-sm text-slate-800 outline-none transition focus:border-[#1fa85a] focus:ring-1 focus:ring-[#1fa85a]"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-700">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as CustomerStatus)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-800 outline-none transition focus:border-[#1fa85a] focus:ring-1 focus:ring-[#1fa85a]"
            >
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Suspended">Suspended</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4">
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
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}