'use client';
import React from 'react';
import { CommissionItem } from '../types';
import { X, ShoppingBag } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  item: CommissionItem | null;
}

export default function CommissionDetailModal({ isOpen, onClose, item }: Props) {
  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl relative animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-xl font-bold text-slate-900">Commission Details</h3>
            <p className="text-xs text-slate-500 mt-0.5">{item.orderId}</p>
          </div>
          <button onClick={onClose} className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="mt-5 space-y-5 text-sm">
          {/* Product Info Card */}
          <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4 border border-slate-100">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <ShoppingBag className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">{item.product}</h4>
              <p className="text-xs text-slate-500 mt-0.5">{item.orderId} • {item.date}</p>
            </div>
          </div>

          {/* Details list */}
          <div className="divide-y divide-slate-100 border-t border-b border-slate-100 py-1 text-xs">
            <div className="flex items-center justify-between py-3">
              <span className="text-slate-500">Sale Amount</span>
              <span className="font-bold text-slate-900">{item.saleAmount}</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-slate-500">Commission Rate</span>
              <span className="font-bold text-slate-800">{item.rate}</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-slate-500">Status</span>
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
            </div>
          </div>

          {/* Highlight Earned Amount Box */}
          <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4 border border-slate-100">
            <span className="text-xs font-semibold text-blue-900">Commission Earned</span>
            <span className="text-lg font-bold text-blue-700">{item.commission}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end">
          <button onClick={onClose} className="rounded-xl border border-slate-200 px-6 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}