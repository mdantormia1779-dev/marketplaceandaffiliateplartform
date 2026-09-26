'use client';
import { Users, UserCheck, Clock, Wallet, ArrowUpRight } from 'lucide-react';

export default function ReferralStats() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* Card 1 */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Total Referrals</span>
          <span className="rounded-xl bg-blue-50 p-2 text-blue-600"><Users className="h-5 w-5" /></span>
        </div>
        <h3 className="mt-3 text-2xl font-bold text-slate-900">48</h3>
        <div className="mt-2 flex items-center justify-between text-xs">
          <span className="flex items-center font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
            <ArrowUpRight className="h-3 w-3 mr-0.5" /> +6 this month
          </span>
          <span className="text-slate-400">all time</span>
        </div>
      </div>

      {/* Card 2 */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Active Referrals</span>
          <span className="rounded-xl bg-emerald-50 p-2 text-emerald-600"><UserCheck className="h-5 w-5" /></span>
        </div>
        <h3 className="mt-3 text-2xl font-bold text-slate-900">32</h3>
        <div className="mt-2 flex items-center justify-between text-xs">
          <span className="flex items-center font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
            <ArrowUpRight className="h-3 w-3 mr-0.5" /> +4 this month
          </span>
          <span className="text-slate-400">earning now</span>
        </div>
      </div>

      {/* Card 3 */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Pending Referrals</span>
          <span className="rounded-xl bg-amber-50 p-2 text-amber-600"><Clock className="h-5 w-5" /></span>
        </div>
        <h3 className="mt-3 text-2xl font-bold text-slate-900">10</h3>
        <div className="mt-2 flex items-center justify-between text-xs">
          <span className="flex items-center font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
            <ArrowUpRight className="h-3 w-3 mr-0.5" /> awaiting first sale
          </span>
          <span className="text-slate-400">not active yet</span>
        </div>
      </div>

      {/* Card 4 */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Referral Earnings</span>
          <span className="rounded-xl bg-blue-50 p-2 text-blue-600"><Wallet className="h-5 w-5" /></span>
        </div>
        <h3 className="mt-3 text-2xl font-bold text-slate-900">৳12,850</h3>
        <div className="mt-2 flex items-center justify-between text-xs">
          <span className="flex items-center font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
            <ArrowUpRight className="h-3 w-3 mr-0.5" /> +10.3%
          </span>
          <span className="text-slate-400">this month</span>
        </div>
      </div>
    </div>
  );
}