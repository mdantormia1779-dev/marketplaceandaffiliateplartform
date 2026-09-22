"use client";

import { Building2, CheckCircle2, AlertCircle, Trash2, Star, Plus, Info } from "lucide-react";

export interface PayoutMethod {
  id: string;
  name: string;
  detail: string;
  type: string;
  isDefault?: boolean;
  status: "Verified" | "Unverified";
}

interface PayoutSidebarProps {
  availableBalance: number;
  totalWithdrawn: number;
  payoutMethods: PayoutMethod[];
  onDeleteMethod: (id: string) => void;
  onSetDefault: (id: string) => void;
  onOpenAddModal: () => void;
}

export default function PayoutSidebar({
  availableBalance,
  totalWithdrawn,
  payoutMethods,
  onDeleteMethod,
  onSetDefault,
  onOpenAddModal,
}: PayoutSidebarProps) {
  return (
    <div className="space-y-6">
      {/* Available Balance Overview Box */}
      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-4">
        <div>
          <p className="text-xs font-semibold text-slate-400 mb-1">Available Balance</p>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            ${availableBalance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </h2>
          <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-md text-[11px] font-bold mt-2">
            ↑ 6.2% vs last cycle
          </span>
        </div>

        <div className="border-t border-slate-100 pt-4 space-y-2.5 text-xs">
          <div className="flex justify-between text-slate-500 font-medium">
            <span>Pending clearance</span>
            <span className="font-bold text-slate-900">$12,840.50</span>
          </div>
          <div className="flex justify-between text-slate-500 font-medium">
            <span>Minimum withdrawal</span>
            <span className="font-bold text-slate-900">$50</span>
          </div>
          <div className="flex justify-between text-slate-500 font-medium">
            <span>Total withdrawn</span>
            <span className="font-bold text-slate-900">${totalWithdrawn.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-slate-500 font-medium">
            <span>Next payout</span>
            <span className="font-bold text-slate-900">Oct 1, 2026</span>
          </div>
        </div>

        {/* Review Time Callout Box */}
        <div className="bg-slate-50 border border-slate-100 rounded-xl p-3.5 flex items-start gap-2.5 text-xs text-slate-500 leading-relaxed">
          <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
          <span>Withdrawals are reviewed by our team. Payouts typically land within 1–3 business days.</span>
        </div>
      </div>

      {/* Payout Methods Card */}
      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">Payout Methods</h3>
            <p className="text-xs text-slate-400">Where your withdrawals are sent</p>
          </div>
          <button
            onClick={onOpenAddModal}
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
                <div className={`p-2.5 rounded-xl shrink-0 ${method.isDefault ? "bg-indigo-600 text-white shadow-xs" : "bg-slate-100 text-slate-600"}`}>
                  {method.type === "bank" ? <Building2 className="w-4 h-4" /> : <span className="font-black text-xs italic">P</span>}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="text-xs font-bold text-slate-900">{method.name}</h4>
                    {method.isDefault && (
                      <span className="inline-flex items-center gap-1 bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-md text-[10px] font-bold">
                        <CheckCircle2 className="w-3 h-3" /> Default
                      </span>
                    )}
                    <span className={`inline-flex items-center gap-1 text-[10px] font-bold ${method.status === "Verified" ? "text-emerald-600" : "text-amber-600"}`}>
                      {method.status === "Verified" ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                      {method.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-medium">
                    {method.detail}
                  </p>
                  {!method.isDefault && (
                    <button
                      onClick={() => onSetDefault(method.id)}
                      className="flex items-center gap-1 text-indigo-600 text-[11px] font-bold hover:underline pt-1 cursor-pointer"
                    >
                      <Star className="w-3 h-3" /> Set as default
                    </button>
                  )}
                </div>
              </div>
              <button
                onClick={() => onDeleteMethod(method.id)}
                className="text-slate-300 hover:text-rose-500 transition-colors p-1 cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}