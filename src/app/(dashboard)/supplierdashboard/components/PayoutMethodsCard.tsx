// src/app/(dashboard)/supplierdashboard/components/PayoutMethodsCard.tsx
"use client";

import { useState } from "react";
import {
  Plus,
  Building2,
  CheckCircle2,
  AlertCircle,
  Trash2,
  Star,
  X,
} from "lucide-react";

export interface PayoutMethod {
  id: string;
  name: string;
  detail: string;
  type: string;
  isDefault?: boolean;
  status: "Verified" | "Unverified";
}

const INITIAL_PAYOUT_METHODS: PayoutMethod[] = [
  {
    id: "1",
    name: "Chase Bank",
    detail: "Bank Transfer · •••• •••• •••• 4821",
    type: "bank",
    isDefault: true,
    status: "Verified",
  },
  {
    id: "2",
    name: "PayPal",
    detail: "PayPal · ayesha@aurorastore.com",
    type: "paypal",
    isDefault: false,
    status: "Verified",
  },
  {
    id: "3",
    name: "Wise",
    detail: "Wise · Wise — Ayesha Rahman",
    type: "bank",
    isDefault: false,
    status: "Unverified",
  },
];

export default function PayoutMethodsCard() {
  const [payoutMethods, setPayoutMethods] = useState<PayoutMethod[]>(INITIAL_PAYOUT_METHODS);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newMethodName, setNewMethodName] = useState("");
  const [newMethodDetail, setNewMethodDetail] = useState("");
  const [newMethodType, setNewMethodType] = useState("bank");

  const handleDeleteMethod = (id: string) => {
    setPayoutMethods((prev) => prev.filter((m) => m.id !== id));
  };

  const handleSetDefault = (id: string) => {
    setPayoutMethods((prev) =>
      prev.map((m) => ({
        ...m,
        isDefault: m.id === id,
      }))
    );
  };

  const handleAddMethodSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMethodName || !newMethodDetail) return;

    const newMethod: PayoutMethod = {
      id: Date.now().toString(),
      name: newMethodName,
      detail: newMethodDetail,
      type: newMethodType,
      isDefault: payoutMethods.length === 0,
      status: "Unverified",
    };

    setPayoutMethods((prev) => [...prev, newMethod]);
    setNewMethodName("");
    setNewMethodDetail("");
    setIsAddModalOpen(false);
  };

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900">Payout Methods</h3>
          <p className="text-xs text-slate-400">Where your withdrawals are sent</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-1 px-3 py-1.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-xs transition cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" /> Add
        </button>
      </div>

      <div className="space-y-3.5">
        {payoutMethods.map((method) => (
          <div
            key={method.id}
            className={`border rounded-2xl p-4 flex items-start justify-between gap-3 relative transition-all ${
              method.isDefault
                ? "border-indigo-200 bg-indigo-50/20"
                : "border-slate-100 bg-white hover:border-slate-200"
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`p-2.5 rounded-xl shrink-0 ${
                  method.isDefault ? "bg-indigo-600 text-white shadow-xs" : "bg-slate-100 text-slate-600"
                }`}
              >
                {method.type === "bank" ? (
                  <Building2 className="w-4 h-4" />
                ) : (
                  <span className="font-black text-xs italic">P</span>
                )}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="text-xs font-bold text-slate-900">{method.name}</h4>
                  {method.isDefault && (
                    <span className="inline-flex items-center gap-1 bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-md text-[10px] font-bold">
                      <CheckCircle2 className="w-3 h-3" /> Default
                    </span>
                  )}
                  <span
                    className={`inline-flex items-center gap-1 text-[10px] font-bold ${
                      method.status === "Verified" ? "text-emerald-600" : "text-amber-600"
                    }`}
                  >
                    {method.status === "Verified" ? (
                      <CheckCircle2 className="w-3 h-3" />
                    ) : (
                      <AlertCircle className="w-3 h-3" />
                    )}
                    {method.status}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-medium">{method.detail}</p>
                {!method.isDefault && (
                  <button
                    onClick={() => handleSetDefault(method.id)}
                    className="flex items-center gap-1 text-indigo-600 text-[11px] font-bold hover:underline pt-1 cursor-pointer"
                  >
                    <Star className="w-3 h-3" /> Set as default
                  </button>
                )}
              </div>
            </div>
            <button
              onClick={() => handleDeleteMethod(method.id)}
              className="text-slate-300 hover:text-rose-500 transition-colors p-1 cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Add Payout Method Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">Add Payout Method</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddMethodSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Method Type</label>
                <select
                  value={newMethodType}
                  onChange={(e) => setNewMethodType(e.target.value)}
                  className="w-full p-2.5 text-xs border border-slate-200 rounded-xl bg-white font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="bank">Bank Transfer</option>
                  <option value="paypal">PayPal</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Provider / Bank Name</label>
                <input
                  type="text"
                  placeholder="e.g. Bank of America, Payoneer"
                  value={newMethodName}
                  onChange={(e) => setNewMethodName(e.target.value)}
                  required
                  className="w-full p-2.5 text-xs border border-slate-200 rounded-xl bg-slate-50 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Account Details / Email</label>
                <input
                  type="text"
                  placeholder="e.g. •••• 9921 or user@email.com"
                  value={newMethodDetail}
                  onChange={(e) => setNewMethodDetail(e.target.value)}
                  required
                  className="w-full p-2.5 text-xs border border-slate-200 rounded-xl bg-slate-50 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-xs font-semibold text-slate-600 rounded-xl hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl hover:bg-indigo-700 shadow-xs cursor-pointer"
                >
                  Save Method
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}