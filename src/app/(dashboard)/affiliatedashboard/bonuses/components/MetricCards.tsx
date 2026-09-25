import React from 'react';
import { Gift, TrendingUp, Users, Megaphone } from 'lucide-react';

export default function MetricCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* Total Bonuses */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-slate-600">Total Bonuses</span>
          <div className="rounded-xl bg-blue-50 p-2 text-blue-600"><Gift className="h-5 w-5" /></div>
        </div>
        <div className="mt-3 text-2xl font-bold text-slate-900">৳18,750</div>
        <div className="mt-2 flex items-center gap-2 text-xs">
          <span className="flex items-center font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md">
            <TrendingUp className="h-3.5 w-3.5 mr-0.5" /> +12.4%
          </span>
          <span className="text-slate-400">vs last quarter</span>
        </div>
      </div>

      {/* Performance Bonus */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-slate-600">Performance Bonus</span>
          <div className="rounded-xl bg-emerald-50 p-2 text-emerald-600"><TrendingUp className="h-5 w-5" /></div>
        </div>
        <div className="mt-3 text-2xl font-bold text-slate-900">৳8,500</div>
        <div className="mt-2 flex items-center justify-between text-xs">
          <span className="flex items-center font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md">
            <TrendingUp className="h-3.5 w-3.5 mr-0.5" /> +9.2%
          </span>
          <span className="text-slate-400">sales milestones</span>
        </div>
      </div>

      {/* Referral Bonus */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-slate-600">Referral Bonus</span>
          <div className="rounded-xl bg-amber-50 p-2 text-amber-600"><Users className="h-5 w-5" /></div>
        </div>
        <div className="mt-3 text-2xl font-bold text-slate-900">৳6,250</div>
        <div className="mt-2 flex items-center justify-between text-xs">
          <span className="flex items-center font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md">
            <TrendingUp className="h-3.5 w-3.5 mr-0.5" /> +14.1%
          </span>
          <span className="text-slate-400">from referrals</span>
        </div>
      </div>

      {/* Campaign Bonus */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-slate-600">Campaign Bonus</span>
          <div className="rounded-xl bg-indigo-50 p-2 text-indigo-600"><Megaphone className="h-5 w-5" /></div>
        </div>
        <div className="mt-3 text-2xl font-bold text-slate-900">৳4,000</div>
        <div className="mt-2 flex items-center justify-between text-xs">
          <span className="flex items-center font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md">
            <TrendingUp className="h-3.5 w-3.5 mr-0.5" /> +6.8%
          </span>
          <span className="text-slate-400">campaign rewards</span>
        </div>
      </div>
    </div>
  );
}