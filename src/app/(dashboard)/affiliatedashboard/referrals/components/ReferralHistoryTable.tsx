'use client';
import { useState } from 'react';
import { Search } from 'lucide-react';
import { ReferralItem } from './types';

interface Props {
  referrals: ReferralItem[];
}

export default function ReferralHistoryTable({ referrals }: Props) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Statuses');

  const filtered = referrals.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All Statuses' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      {/* Search and Filters */}
      <div className="flex flex-col gap-3 p-4 md:flex-row md:items-center md:justify-between border-b border-slate-100">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-black" />
          <input
            type="text"
            placeholder="Search referrals by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2 pl-10 pr-4 text-sm focus:border-blue-600 focus:bg-white focus:outline-none"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 focus:border-blue-600 focus:outline-none cursor-pointer"
        >
          <option>All Statuses</option>
          <option>Active</option>
          <option>Pending</option>
          <option>Inactive</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              <th className="py-3 px-6">Affiliate</th>
              <th className="py-3 px-6">Joined Date</th>
              <th className="py-3 px-6">Status</th>
              <th className="py-3 px-6 text-center">Sales Generated</th>
              <th className="py-3 px-6 text-right">Commission</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {filtered.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="py-4 px-6 flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-blue-700 font-bold text-xs">
                    {item.name.charAt(0)}
                  </span>
                  <span className="font-semibold text-slate-900">{item.name}</span>
                </td>
                <td className="py-4 px-6 text-slate-500">{item.joinedDate}</td>
                <td className="py-4 px-6">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                    item.status === 'Active' ? 'bg-emerald-50 text-emerald-700' :
                    item.status === 'Pending' ? 'bg-amber-50 text-amber-700' : 'bg-slate-100 text-slate-600'
                  }`}>
                    • {item.status}
                  </span>
                </td>
                <td className="py-4 px-6 text-center font-medium text-slate-800">{item.salesGenerated}</td>
                <td className="py-4 px-6 text-right font-bold text-blue-600">৳{item.commission.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}