'use client';
import React from 'react';
import { ActiveCampaign } from '../types';
import { X } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  campaign: ActiveCampaign | null;
}

export default function BonusDetailModal({ isOpen, onClose, campaign }: Props) {
  if (!isOpen || !campaign) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl relative">
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-xl font-bold text-slate-900">{campaign.title}</h3>
            <p className="text-xs text-slate-500 mt-0.5">Bonus campaign details</p>
          </div>
          <button onClick={onClose} className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-5 space-y-5 text-sm">
          <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4 border border-slate-100">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">🎯</div>
            <p className="text-xs font-medium text-slate-700 leading-relaxed">{campaign.description}</p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold text-slate-700">
              <span>Progress</span>
              <span className="text-slate-900">{campaign.progress}%</span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
              <div className="h-full rounded-full bg-amber-500" style={{ width: `${campaign.progress}%` }}></div>
            </div>
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>Current: {campaign.current}</span>
              <span>Target: {campaign.target}</span>
            </div>
          </div>

          <div className="divide-y divide-slate-100 border-t border-b border-slate-100 py-1 text-xs">
            <div className="flex items-center justify-between py-3">
              <span className="text-slate-500">Reward</span>
              <span className="font-bold text-blue-600">{campaign.reward}</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-slate-500">Remaining Target</span>
              <span className="font-bold text-slate-800">{campaign.footerText}</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-slate-500">Status</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 font-medium text-emerald-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600"></span> {campaign.status}
              </span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-slate-500">Timeline</span>
              <span className="font-medium text-slate-800">Ends Oct 31, 2026</span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button onClick={onClose} className="rounded-xl border border-slate-200 px-6 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}