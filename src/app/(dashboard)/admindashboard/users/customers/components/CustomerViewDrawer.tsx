"use client";

import { X, Edit3 } from "lucide-react";
import StatusBadge from "./StatusBadge";
import type { Customer } from "../types";

type Props = {
  isOpen: boolean;
  customer: Customer | null;
  onClose: () => void;
  onEdit: (customer: Customer) => void;
};

export default function CustomerViewDrawer({
  isOpen,
  customer,
  onClose,
  onEdit,
}: Props) {
  if (!isOpen || !customer) return null;

  const rows = [
    { label: "Email", value: customer.email },
    { label: "Phone", value: customer.phone },
    { label: "Country", value: customer.country },
    { label: "Orders", value: customer.orders },
    {
      label: "Spent",
      value: customer.totalSpent.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      }),
    },
    {
      label: "Status",
      custom: <StatusBadge status={customer.status} />,
    },
    { label: "Joined", value: customer.joined },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/30 backdrop-blur-sm transition-opacity">
      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          
          {/* Top Header */}
          <div>
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <div>
                <h2 className="text-base font-semibold text-slate-900">{customer.name}</h2>
                <p className="text-xs text-slate-500">Customer Details</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Details List */}
            <div className="px-6 py-2 divide-y divide-slate-100">
              {rows.map((r, i) => (
                <div key={i} className="flex items-center justify-between py-3.5 text-sm">
                  <span className="text-slate-500">{r.label}</span>
                  <span className="font-normal text-slate-900 text-right">
                    {r.custom ? r.custom : r.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="border-t border-slate-100 px-6 py-4 flex items-center justify-end gap-3 bg-white">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 transition"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                onEdit(customer);
              }}
              className="flex items-center gap-2 rounded-lg bg-[#1fa85a] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#189a50] shadow-sm"
            >
              <Edit3 className="h-4 w-4" />
              Edit record
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}