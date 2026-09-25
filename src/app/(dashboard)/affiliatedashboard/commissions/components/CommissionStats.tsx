import React from 'react';
import { Wallet, Clock, CheckCircle2, DollarSign } from 'lucide-react';

export default function CommissionStats() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* Total Commission */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-slate-600">Total Commission</span>
          <div className="rounded-xl bg-blue-50 p-2 text-blue-600"><Wallet className="h-5 w-5" /></div>
        </div>
        <div className="mt-3 text-2xl font-bold text-slate-900">৳148,520</div>
        <div className="mt-2 flex items-center gap-2 text-xs">
          <span className="flex items-center font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md">
            ↗ +15.2%
          </span>
          <span className="text-slate-400">all-time earnings</span>
        </div>
      </div>

      {/* Pending Commission */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-slate-600">Pending Commission</span>
          <div className="rounded-xl bg-amber-50 p-2 text-amber-600"><Clock className="h-5 w-5" /></div>
        </div>
        <div className="mt-3 text-2xl font-bold text-slate-900">৳12,450</div>
        <div className="mt-2 flex items-center gap-2 text-xs">
          <span className="flex items-center font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md">
            ↗ +3.4%
          </span>
          <span className="text-slate-400">awaiting approval</span>
        </div>
      </div>

      {/* Approved Commission */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-slate-600">Approved Commission</span>
          <div className="rounded-xl bg-emerald-50 p-2 text-emerald-600"><CheckCircle2 className="h-5 w-5" /></div>
        </div>
        <div className="mt-3 text-2xl font-bold text-slate-900">৳48,720</div>
        <div className="mt-2 flex items-center gap-2 text-xs">
          <span className="flex items-center font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md">
            ↗ +8.9%
          </span>
          <span className="text-slate-400">ready to be paid</span>
        </div>
      </div>

      {/* Paid Commission */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-slate-600">Paid Commission</span>
          <div className="rounded-xl bg-blue-50 p-2 text-blue-600"><DollarSign className="h-5 w-5" /></div>
        </div>
        <div className="mt-3 text-2xl font-bold text-slate-900">৳87,350</div>
        <div className="mt-2 flex items-center gap-2 text-xs">
          <span className="flex items-center font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md">
            ↗ +12.1%
          </span>
          <span className="text-slate-400">settled to wallet</span>
        </div>
      </div>
    </div>
  );
}