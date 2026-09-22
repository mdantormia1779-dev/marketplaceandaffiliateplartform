"use client";

import { useState } from "react";
import { Building2, Check, Send } from "lucide-react";

interface PayoutMethod {
  id: string;
  name: string;
  detail: string;
  type: string;
}

interface WithdrawFormProps {
  availableBalance: number;
  payoutMethods: PayoutMethod[];
  onWithdrawSuccess: (amount: number) => void;
  onOpenAddModal: () => void;
}

export default function WithdrawForm({
  availableBalance,
  payoutMethods,
  onWithdrawSuccess,
  onOpenAddModal,
}: WithdrawFormProps) {
  const [amount, setAmount] = useState("");
  const [selectedMethod, setSelectedMethod] = useState(payoutMethods[0]?.id || "");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleQuickAmount = (val: number) => {
    if (val > availableBalance) {
      setError("Amount exceeds available balance");
      return;
    }
    setError("");
    setAmount(val.toString());
  };

  const handleUseMax = () => {
    setError("");
    setAmount(availableBalance.toString());
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setError("");
    if (parseFloat(val) > availableBalance) {
      setError("Amount exceeds available balance");
    }
    setAmount(val);
  };

  const parsedAmount = parseFloat(amount) || 0;
  const remainingBalance = availableBalance - parsedAmount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (parsedAmount <= 0) {
      setError("Please enter a valid withdrawal amount");
      return;
    }
    if (parsedAmount < 50) {
      setError("Minimum withdrawal amount is $50");
      return;
    }
    if (parsedAmount > availableBalance) {
      setError("Insufficient available balance");
      return;
    }

    // Trigger success
    onWithdrawSuccess(parsedAmount);
    setSuccessMsg(`Successfully requested withdrawal of $${parsedAmount.toLocaleString()}!`);
    setAmount("");
    setNote("");
    setTimeout(() => setSuccessMsg(""), 4000);
  };

  return (
    <form onSubmit={handleSubmit} className="lg:col-span-2 bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-6">
      <div>
        <h2 className="text-base font-bold text-slate-900">Request a Withdrawal</h2>
        <p className="text-xs text-slate-400">Transfer from your available balance to a payout method</p>
      </div>

      {successMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold rounded-xl">
          {successMsg}
        </div>
      )}

      {/* Withdrawal Amount Section */}
      <div className="space-y-3">
        <label className="text-xs font-semibold text-slate-700">Withdrawal amount</label>
        <div className="relative flex items-center">
          <span className="absolute left-4 text-slate-400 font-medium text-sm">$</span>
          <input
            type="number"
            step="0.01"
            placeholder="0.00"
            value={amount}
            onChange={handleAmountChange}
            className="w-full pl-8 pr-24 py-3 text-sm border border-slate-200 rounded-xl bg-slate-50/50 text-slate-900 font-semibold placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
          />
          <button
            type="button"
            onClick={handleUseMax}
            className="absolute right-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 font-bold text-xs px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            Use max
          </button>
        </div>

        {error && <p className="text-[11px] font-semibold text-rose-500">{error}</p>}

        {/* Quick Amount Pills & Available Balance Info */}
        <div className="flex items-center justify-between pt-1 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            {[500, 1000, 2500].map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => handleQuickAmount(val)}
                className="px-3 py-1 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                ${val.toLocaleString()}
              </button>
            ))}
          </div>
          <span className="text-xs text-slate-400">
            Available: <span className="font-bold text-slate-700">${availableBalance.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
          </span>
        </div>
      </div>

      {/* Payout Method Selector */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-700">Payout method</label>
          <button
            type="button"
            onClick={onOpenAddModal}
            className="text-xs font-bold text-indigo-600 hover:underline cursor-pointer"
          >
            + Add method
          </button>
        </div>

        <div className="space-y-3">
          {payoutMethods.map((method) => {
            const isSelected = selectedMethod === method.id;
            return (
              <div
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? "border-indigo-600 bg-indigo-50/30"
                    : "border-slate-200 hover:border-slate-300 bg-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl shrink-0 ${isSelected ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-600"}`}>
                    {method.type === "bank" ? <Building2 className="w-4 h-4" /> : <span className="font-black text-xs italic">P</span>}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{method.name}</h4>
                    <p className="text-[11px] text-slate-400">{method.detail}</p>
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-full flex items-center justify-center ${isSelected ? "bg-indigo-600 text-white" : "border border-slate-300"}`}>
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Note Optional Section */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-700">Note (optional)</label>
          <span className="text-[10px] text-slate-400">{note.length}/200</span>
        </div>
        <textarea
          rows={3}
          maxLength={200}
          placeholder="Add a reference or note for this withdrawal..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full p-3 text-xs border border-slate-200 rounded-xl bg-slate-50/50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all resize-none"
        />
      </div>

      {/* Calculations Breakdown */}
      <div className="border-t border-slate-100 pt-4 space-y-2 text-xs">
        <div className="flex justify-between text-slate-500 font-medium">
          <span>Withdrawal amount</span>
          <span className="font-bold text-slate-900">${parsedAmount.toLocaleString("en-US", { minimumFractionDigits: 0 })}</span>
        </div>
        <div className="flex justify-between text-slate-500 font-medium">
          <span>Processing fee</span>
          <span className="font-bold text-emerald-600">Free</span>
        </div>
        <div className="flex justify-between text-sm font-extrabold text-slate-900 pt-2 border-t border-slate-50">
          <span>You receive</span>
          <span className="text-indigo-600">${parsedAmount.toLocaleString("en-US", { minimumFractionDigits: 0 })}</span>
        </div>
        <div className="flex justify-between text-[11px] text-slate-400 font-medium">
          <span>Remaining balance</span>
          <span className={remainingBalance < 0 ? "text-rose-500 font-bold" : ""}>
            ${remainingBalance >= 0 ? remainingBalance.toLocaleString("en-US", { minimumFractionDigits: 2 }) : "$0.00"}
          </span>
        </div>
      </div>

      {/* Submit Button */}
      <div className="space-y-3 pt-2">
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-3.5 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 active:scale-[0.99] cursor-pointer"
        >
          <Send className="w-4 h-4" /> Request withdrawal
        </button>
        <p className="text-[11px] text-slate-400 text-center font-medium">
          Payouts are reviewed and typically processed within 1–3 business days.
        </p>
      </div>
    </form>
  );
}