'use client';
import React, { useState } from 'react';
import { BonusHistoryItem } from '../types';
import { Search } from 'lucide-react';

export default function BonusHistoryTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All Types');

  const historyData: BonusHistoryItem[] = [
    { id: '1', name: 'Top Affiliate of the Month', type: 'Performance', requirement: 'Rank #1 on leaderboard', reward: '৳2,500', earnedDate: '2026-08-01', status: 'Claimed' },
    { id: '2', name: 'Monthly Performance Bonus', type: 'Performance', requirement: '৳100,000 sales', reward: '৳5,000', earnedDate: '2026-08-31', status: 'Claimed' },
    { id: '3', name: 'Referral Growth Bonus', type: 'Referral', requirement: '10 active affiliates', reward: '৳3,000', earnedDate: '2026-09-05', status: 'Completed' },
    { id: '4', name: 'Summer Campaign Bonus', type: 'Campaign', requirement: '5,000 campaign clicks', reward: '৳2,500', earnedDate: '2026-09-10', status: 'Completed' },
    { id: '5', name: 'Flash Sale Sprint', type: 'Campaign', requirement: '৳50,000 in 48 hours', reward: '৳1,500', earnedDate: '2026-09-14', status: 'In Progress' },
    { id: '6', name: 'Q3 Loyalty Bonus', type: 'Performance', requirement: '৳300,000 quarterly sales', reward: '৳4,000', earnedDate: '2026-09-20', status: 'In Progress' },
    { id: '7', name: 'Winter Referral Drive', type: 'Referral', requirement: '5 new referrals', reward: '৳1,200', earnedDate: '2026-07-28', status: 'Expired' },
  ];

  const filteredData = historyData.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'All Types' || item.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-4">
      {/* Search and Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-2xl bg-white p-4 border border-slate-200 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search bonus history..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-2 text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option>All Types</option>
          <option>Performance</option>
          <option>Referral</option>
          <option>Campaign</option>
          <option>Milestone</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-[11px] uppercase font-semibold text-slate-400 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3.5">Bonus Name</th>
                <th className="px-6 py-3.5">Type</th>
                <th className="px-6 py-3.5">Requirement</th>
                <th className="px-6 py-3.5">Reward</th>
                <th className="px-6 py-3.5">Earned Date</th>
                <th className="px-6 py-3.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredData.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50">
                  <td className="px-6 py-4 font-bold text-slate-900">{item.name}</td>
                  <td className="px-6 py-4 text-slate-600">{item.type}</td>
                  <td className="px-6 py-4 text-slate-600">{item.requirement}</td>
                  <td className="px-6 py-4 font-bold text-blue-600">{item.reward}</td>
                  <td className="px-6 py-4 text-slate-500">{item.earnedDate}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-medium ${
                      item.status === 'Claimed' || item.status === 'Completed' ? 'bg-emerald-50 text-emerald-700' :
                      item.status === 'In Progress' ? 'bg-amber-50 text-amber-700' : 'bg-slate-100 text-slate-600'
                    }`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${
                        item.status === 'Claimed' || item.status === 'Completed' ? 'bg-emerald-600' :
                        item.status === 'In Progress' ? 'bg-amber-600' : 'bg-slate-400'
                      }`}></span>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}