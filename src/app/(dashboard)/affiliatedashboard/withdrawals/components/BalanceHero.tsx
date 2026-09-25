"use client";

import { CreditCard, Smartphone } from "lucide-react";
import { PayoutMethod } from "./types";
import { METHOD_ICONS } from "./constants";

interface BalanceHeroProps {
  availableBalance: string;
  pendingWithdrawal: string;
  totalWithdrawn: string;
  defaultMethod: PayoutMethod | null;
  onRequestWithdrawal: () => void;
}

export default function BalanceHero({
  availableBalance,
  pendingWithdrawal,
  totalWithdrawn,
  defaultMethod,
  onRequestWithdrawal,
}: BalanceHeroProps) {
  const DefaultIcon = defaultMethod ? METHOD_ICONS[defaultMethod.type] : Smartphone;

  return (
    <div
      className="relative overflow-hidden rounded-2xl bg-indigo-600 p-6 sm:p-8 text-white shadow-lg animate-fade-up"
      style={{ animationDelay: "80ms" }}
    >
      <div className="absolute -right-10 -top-10 w-56 h-56 rounded-full bg-white/10"></div>
      <div className="absolute right-16 bottom-0 w-32 h-32 rounded-full bg-white/5"></div>

      <div className="relative grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
              <CreditCard className="w-4 h-4" />
            </div>
            <span className="text-sm font-medium text-white/80">Available Balance</span>
          </div>

          <h2 className="text-4xl font-bold">৳{availableBalance}</h2>
          <p className="text-xs text-white/70 mt-2">
            Minimum withdrawal ৳500 · Processing time 1-3 business days
          </p>

          <button
            type="button"
            onClick={onRequestWithdrawal}
            className="mt-5 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-indigo-700 text-sm font-semibold shadow-sm hover:bg-indigo-50 transition-colors"
          >
            <CreditCard className="w-4 h-4" />
            Request Withdrawal
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-white/60">
                Pending Withdrawal
              </p>
              <p className="text-lg font-bold mt-1">৳{pendingWithdrawal}</p>
            </div>
            <div className="text-right">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-white/60">
                Total Withdrawn
              </p>
              <p className="text-lg font-bold mt-1">৳{totalWithdrawn}</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 text-slate-800">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Default Payout Method
            </p>

            {defaultMethod ? (
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <DefaultIcon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">{defaultMethod.type}</p>
                  <p className="text-xs text-slate-500">{defaultMethod.accountNumber}</p>
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-400">
                No default method set. Add one below.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}