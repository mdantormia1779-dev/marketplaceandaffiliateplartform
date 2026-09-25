'use client';
import React, { useState } from 'react';
import { CommissionItem } from '../types';
import { Search, Eye, ChevronDown } from 'lucide-react';
import CommissionDetailModal from './CommissionDetailModal';

export default function CommissionTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [timeFilter, setTimeFilter] = useState('All Time');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [selectedItem, setSelectedItem] = useState<CommissionItem | null>(null);

  // Dropdown states
  const [timeDropdownOpen, setTimeDropdownOpen] = useState(false);
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);

  const data: CommissionItem[] = [
    { id: '1', orderId: 'ORD-58291', product: 'Wireless Headphones', saleAmount: '৳4,500', rate: '10%', commission: '৳450', date: '2026-09-23', status: 'Approved' },
    { id: '2', orderId: 'ORD-58279', product: 'Smart Watch', saleAmount: '৳3,899', rate: '12%', commission: '৳468', date: '2026-09-22', status: 'Approved' },
    { id: '3', orderId: 'ORD-58271', product: 'Premium Backpack', saleAmount: '৳1,899', rate: '15%', commission: '৳285', date: '2026-09-21', status: 'Paid' },
    { id: '4', orderId: 'ORD-58264', product: 'Pour-Over Coffee Maker', saleAmount: '৳3,199', rate: '14%', commission: '৳448', date: '2026-09-20', status: 'Pending' },
  ];

  const filteredData = data.filter((item) => {
    const matchesSearch = item.orderId.toLowerCase().includes(searchTerm.toLowerCase()) || item.product.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All Statuses' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-4">
      {/* Search and Filters Bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-2xl bg-white p-4 border border-slate-200 shadow-sm relative">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by order ID or product..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-2 text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-3">
          {/* Time Filter Custom Dropdown */}
          <div className="relative">
            <button
              onClick={() => { setTimeDropdownOpen(!timeDropdownOpen); setStatusDropdownOpen(false); }}
              className={`flex items-center justify-between gap-8 rounded-xl border px-4 py-2 text-xs font-medium transition-all ${timeDropdownOpen ? 'border-blue-500 ring-2 ring-blue-100 bg-white' : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'}`}
            >
              <span>{timeFilter}</span>
              <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
            </button>

            {timeDropdownOpen && (
              <div className="absolute right-0 mt-2 w-44 rounded-2xl border border-slate-200 bg-white py-1 shadow-lg z-20">
                {['All Time', 'Last 7 Days', 'Last 30 Days', 'Last 90 Days'].map((t) => (
                  <button
                    key={t}
                    onClick={() => { setTimeFilter(t); setTimeDropdownOpen(false); }}
                    className={`w-full px-4 py-2 text-left text-xs ${timeFilter === t ? 'bg-blue-600 text-white font-medium' : 'text-slate-700 hover:bg-slate-50'}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Status Filter Custom Dropdown */}
          <div className="relative">
            <button
              onClick={() => { setStatusDropdownOpen(!statusDropdownOpen); setTimeDropdownOpen(false); }}
              className={`flex items-center justify-between gap-8 rounded-xl border px-4 py-2 text-xs font-medium transition-all ${statusDropdownOpen ? 'border-blue-500 ring-2 ring-blue-100 bg-white' : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'}`}
            >
              <span>{statusFilter}</span>
              <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
            </button>

            {statusDropdownOpen && (
              <div className="absolute right-0 mt-2 w-44 rounded-2xl border border-slate-200 bg-white py-1 shadow-lg z-20">
                {['All Statuses', 'Pending', 'Approved', 'Paid', 'Cancelled'].map((s) => (
                  <button
                    key={s}
                    onClick={() => { setStatusFilter(s); setStatusDropdownOpen(false); }}
                    className={`w-full px-4 py-2 text-left text-xs ${statusFilter === s ? 'bg-blue-600 text-white font-medium' : 'text-slate-700 hover:bg-slate-50'}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Record Counter Info */}
      <div className="text-xs text-slate-500 px-1">
        Showing <span className="font-bold text-slate-800">{filteredData.length}</span> records · total commission <span className="font-bold text-blue-600">৳4,328</span>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-[11px] uppercase font-semibold text-slate-400 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3.5">Date</th>
                <th className="px-6 py-3.5">Order ID</th>
                <th className="px-6 py-3.5">Product</th>
                <th className="px-6 py-3.5">Sale Amount</th>
                <th className="px-6 py-3.5">Rate</th>
                <th className="px-6 py-3.5">Commission</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredData.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 text-slate-500">{item.date}</td>
                  <td className="px-6 py-4 font-bold text-slate-900">{item.orderId}</td>
                  <td className="px-6 py-4 text-slate-700">{item.product}</td>
                  <td className="px-6 py-4 text-slate-600">{item.saleAmount}</td>
                  <td className="px-6 py-4 text-slate-600">{item.rate}</td>
                  <td className="px-6 py-4 font-bold text-blue-600">{item.commission}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-medium ${
                      item.status === 'Approved' ? 'bg-blue-50 text-blue-700' :
                      item.status === 'Paid' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                    }`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${
                        item.status === 'Approved' ? 'bg-blue-600' :
                        item.status === 'Paid' ? 'bg-emerald-600' : 'bg-amber-600'
                      }`}></span>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => setSelectedItem(item)}
                      className="inline-flex items-center justify-center rounded-xl border border-slate-200 p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors"
                      title="View Details"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Integration */}
      <CommissionDetailModal
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        item={selectedItem}
      />
    </div>
  );
}