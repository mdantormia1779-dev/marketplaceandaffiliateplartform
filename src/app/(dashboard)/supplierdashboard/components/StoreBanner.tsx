"use client";

import React from 'react';
import { CheckCircle2, Star, Package, Users, ExternalLink, Plus } from 'lucide-react';

const StoreBanner = () => {
  return (
    <div className="bg-[#f0f4ff]/80 border border-indigo-100 rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-extrabold text-2xl shadow-md">
          A
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900">Aurora Store</h2>
            <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-100" />
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700">
              Professional
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
            <span className="flex items-center gap-1 font-medium">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <strong className="text-slate-800">4.9</strong> (1,284 reviews)
            </span>
            <span className="flex items-center gap-1">
              <Package className="w-4 h-4 text-slate-400" />
              248 products
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4 text-slate-400" />
              18.4K followers
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button 
          onClick={() => window.open('https://example.com', '_blank')}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition shadow-sm active:scale-95"
        >
          <ExternalLink className="w-4 h-4" />
          View Store
        </button>
        <button 
          onClick={() => alert("Open Add Product Modal")}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition shadow-sm active:scale-95"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>
    </div>
  );
};

export default StoreBanner;