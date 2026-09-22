"use client";

import React, { useState } from 'react';
import { Search, Bell, MessageSquare, ChevronDown, X } from 'lucide-react';
import StoreBanner from './components/StoreBanner';
import AnalyticsOverview from './components/AnalyticsOverview';


const DashBoard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState(3);
  const [showNotifications, setShowNotifications] = useState(false);
  const [userProfileOpen, setUserProfileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans p-4 sm:p-6 lg:p-8 space-y-6">
      
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 relative z-20">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Dashboard</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Welcome back, Ayesha — here is how your store is performing.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products, orders, customers..." 
              className="w-full pl-9 pr-8 py-2 bg-slate-100/80 border border-slate-200/80 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="relative">
            <button 
              onClick={() => { setShowNotifications(!showNotifications); setUserProfileOpen(false); }}
              className="relative p-2 bg-slate-100/80 border border-slate-200/80 rounded-lg hover:bg-slate-200/60 transition text-slate-600"
            >
              <Bell className="w-4 h-4" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-72 bg-white border border-slate-200 rounded-xl shadow-lg p-3 text-xs space-y-2 z-30">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="font-bold text-slate-800">Notifications</span>
                  <button onClick={() => setNotifications(0)} className="text-indigo-600 hover:underline text-[10px]">
                    Mark all read
                  </button>
                </div>
                {notifications > 0 ? (
                  <div className="space-y-2">
                    <p className="text-slate-600">📦 New order #3129 placed ($140.00)</p>
                    <p className="text-slate-600">⚠️ 18 products are low in stock</p>
                    <p className="text-slate-600">🎉 Monthly revenue goal reached!</p>
                  </div>
                ) : (
                  <p className="text-slate-400 text-center py-2">No new notifications</p>
                )}
              </div>
            )}
          </div>

          <button onClick={() => alert("Opening messages panel...")} className="p-2 bg-slate-100/80 border border-slate-200/80 rounded-lg hover:bg-slate-200/60 transition text-slate-600">
            <MessageSquare className="w-4 h-4" />
          </button>

          <div className="relative">
            <div 
              onClick={() => { setUserProfileOpen(!userProfileOpen); setShowNotifications(false); }}
              className="flex items-center gap-2.5 pl-2 border-l border-slate-200 cursor-pointer select-none"
            >
              <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                AR
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-sm font-semibold text-slate-900 leading-none">Ayesha Rahman</div>
                <div className="text-[11px] text-slate-500 mt-1">Store Owner</div>
              </div>
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${userProfileOpen ? 'rotate-180' : ''}`} />
            </div>

            {userProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-lg p-1.5 text-xs z-30">
                <button className="w-full text-left px-3 py-2 text-slate-700 hover:bg-slate-100 rounded-lg">Store Settings</button>
                <button className="w-full text-left px-3 py-2 text-slate-700 hover:bg-slate-100 rounded-lg">Billing & Plans</button>
                <div className="my-1 border-t border-slate-100" />
                <button className="w-full text-left px-3 py-2 text-rose-600 hover:bg-rose-50 rounded-lg font-medium">Log out</button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Store Banner */}
      <StoreBanner></StoreBanner>

      {/* Analytics overview & cards */}
      <AnalyticsOverview></AnalyticsOverview>

    </div>
  );
};
export default DashBoard;