"use client";

import { Plus, Wallet } from "lucide-react";
import { PayoutMethod } from "./types";
import PayoutMethodCard from "./PayoutMethodCard";

interface PayoutMethodsSectionProps {
  methods: PayoutMethod[];
  onAddMethod: () => void;
  onEditMethod: (method: PayoutMethod) => void;
  onUseMethod: (method: PayoutMethod) => void;
  delay?: number;
}

export default function PayoutMethodsSection({
  methods,
  onAddMethod,
  onEditMethod,
  onUseMethod,
  delay = 0,
}: PayoutMethodsSectionProps) {
  return (
    <div
      className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 space-y-5 animate-fade-up"
      style={{ animationDelay: delay + "ms" }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-base font-bold text-slate-900">Withdrawal Methods</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Select your preferred payout method and manage saved accounts.
          </p>
        </div>

        <button
          type="button"
          onClick={onAddMethod}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Add Method
        </button>
      </div>

      {methods.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-slate-200 py-10 text-center">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
            <Wallet className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-700">No payout methods added yet</p>
            <p className="text-xs text-slate-400 mt-1">
              Add bKash, Nagad or a Bank account to start withdrawing.
            </p>
          </div>
          <button
            type="button"
            onClick={onAddMethod}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Your First Method
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {methods.map((method) => (
            <PayoutMethodCard
              key={method.id}
              method={method}
              onEdit={onEditMethod}
              onUse={onUseMethod}
            />
          ))}
        </div>
      )}
    </div>
  );
}