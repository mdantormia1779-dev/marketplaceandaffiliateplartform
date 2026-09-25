'use client';
import React, { useState } from 'react';
import { ActiveCampaign } from './types';
import MetricCards from './components/MetricCards';
import CampaignCard from './components/CampaignCard';
import BonusDetailModal from './components/BonusDetailModal';
import BonusHistoryTable from './components/BonusHistoryTable';

export default function BonusesPage() {
  const [selectedCampaign, setSelectedCampaign] = useState<ActiveCampaign | null>(null);
  const [activeTab, setActiveTab] = useState('All Types');

  const campaigns: ActiveCampaign[] = [
    {
      id: '1',
      title: 'Monthly Sales Challenge',
      description: 'Hit the monthly sales target through your affiliate links to unlock this cash reward.',
      reward: '৳5,000',
      progress: 77,
      current: '৳76,500',
      target: '৳100,000',
      footerText: '৳23,500 more to unlock',
      status: 'Active',
      icon: 'sales',
    },
    {
      id: '2',
      title: '50 Sales Milestone',
      description: 'Complete 50 qualifying sales during the campaign window and claim the bonus.',
      reward: '৳2,500',
      progress: 76,
      current: '38',
      target: '50',
      footerText: '12 more to unlock',
      status: 'Active',
      icon: 'milestone',
    },
    {
      id: '3',
      title: 'Refer 10 Active Affiliates',
      description: 'Grow the affiliate network — earn a bonus when you bring in 10 active affiliates.',
      reward: '৳3,000',
      progress: 70,
      current: '7',
      target: '10',
      footerText: '3 more to unlock',
      status: 'Active',
      icon: 'referral',
    },
    {
      id: '4',
      title: 'Summer Campaign Bonus',
      description: 'Drive clicks through your summer promo links to complete this campaign reward.',
      reward: '৳2,500',
      progress: 100,
      current: '5,000',
      target: '5,000',
      footerText: 'Reward unlocked — pending',
      status: 'Unlocked',
      icon: 'campaign',
    },
  ];

  return (
    <div className="space-y-8 p-6 md:p-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Bonuses</h2>
        <p className="text-sm text-slate-500 mt-1">Track your performance bonuses, campaign rewards and referral bonuses.</p>
      </div>

      {/* Metric Cards */}
      <MetricCards />

      {/* Active Campaigns Section */}
      <div className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Active Bonus Campaigns</h3>
            <p className="text-xs text-slate-500">Hit the targets below to unlock extra rewards.</p>
          </div>
          {/* Tabs Filter */}
          <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-full p-1 text-xs font-medium text-slate-600 shadow-sm">
            {['All Types', 'Performance', 'Referral', 'Campaign', 'Milestone'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-full transition-colors ${activeTab === tab ? 'bg-slate-900 text-white' : 'hover:bg-slate-100'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Campaign Cards Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {campaigns.map((camp) => (
            <CampaignCard key={camp.id} campaign={camp} onViewDetails={(c) => setSelectedCampaign(c)} />
          ))}
        </div>
      </div>

      {/* History Table Section */}
      <BonusHistoryTable />

      {/* Details Modal */}
      <BonusDetailModal
        isOpen={!!selectedCampaign}
        onClose={() => setSelectedCampaign(null)}
        campaign={selectedCampaign}
      />
    </div>
  );
}