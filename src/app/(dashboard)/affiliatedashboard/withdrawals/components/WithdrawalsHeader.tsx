"use client";

import { CreditCard } from "lucide-react";

interface WithdrawalsHeaderProps {
  onRequestWithdrawal: () => void;
}

export default function WithdrawalsHeader({ onRequestWithdrawal }: WithdrawalsHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-up">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Withdrawals</h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage your affiliate earnings and withdrawal requests.
        </p>
      </div>

      <button
        type="button"
        onClick={onRequestWithdrawal}
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold shadow-sm hover:bg-indigo-700 transition-colors"
      >
        <CreditCard className="w-4 h-4" />
        Request Withdrawal
      </button>
    </div>
  );
}