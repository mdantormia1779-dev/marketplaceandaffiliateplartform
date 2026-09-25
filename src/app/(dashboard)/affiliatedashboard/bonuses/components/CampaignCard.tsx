'use client';
import React from 'react';
import { ActiveCampaign } from '../types';
import { ArrowUpRight, TrendingUp, Target, Users, Megaphone } from 'lucide-react';

interface Props {
  campaign: ActiveCampaign;
  onViewDetails: (campaign: ActiveCampaign) => void;
}

export default function CampaignCard({ campaign, onViewDetails }: Props) {
  const isUnlocked = campaign.status === 'Unlocked';

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="rounded-xl bg-blue-50 p-2.5 text-blue-600">
            {campaign.icon === 'sales' ? <TrendingUp className="h-5 w-5" /> : campaign.icon === 'referral' ? <Users className="h-5 w-5" /> : <Target className="h-5 w-5" />}
          </div>
          <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${isUnlocked ? 'bg-emerald-50 text-emerald-700' : 'bg-emerald-50 text-emerald-700'}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${isUnlocked ? 'bg-emerald-600' : 'bg-emerald-600'}`}></span> {campaign.status}
          </span>
        </div>
        <h3 className="text-sm font-bold text-slate-900">{campaign.title}</h3>
        <p className="text-xs text-slate-500 mt-1 line-clamp-2">{campaign.description}</p>
      </div>

      <div className="mt-5 space-y-4">
        <div className="flex justify-between items-end border-t border-slate-100 pt-3">
          <div>
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">REWARD</span>
            <div className="text-base font-extrabold text-slate-900">{campaign.reward}</div>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">PROGRESS</span>
            <div className="text-xs font-bold text-slate-900">{campaign.progress}%</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
          <div className={`h-full rounded-full ${isUnlocked ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{ width: `${campaign.progress}%` }}></div>
        </div>

        <div className="flex justify-between text-[11px] text-slate-400">
          <span>Current: {campaign.current}</span>
          <span>Target: {campaign.target}</span>
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="text-[11px] text-emerald-600 font-medium">{campaign.footerText}</span>
        </div>

        <button
          onClick={() => onViewDetails(campaign)}
          className="w-full flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
        >
          View Details <ArrowUpRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}