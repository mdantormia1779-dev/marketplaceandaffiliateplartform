// src/app/(dashboard)/supplierdashboard/subscription/upgrade/page.tsx
"use client";


import ComingSoonBox from "../../../components/ComingSoonBox";
import Navbar from "../../../components/Navbar";


export default function UpgradePage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col">
      {/* Top Fixed Navbar */}
      <div className="sticky top-0 z-50 bg-white border-b border-slate-100">
        <Navbar/>
      </div>

      {/* Main Container */}
      <main className="flex-1 flex flex-col p-6 max-w-[1600px] w-full mx-auto">
        <div className="mb-2">
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Upgrade Plan</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Explore advanced plans and unlock more powerful supplier features.
          </p>
        </div>

        <ComingSoonBox
         title="Upgrade plans are on the way"
          subtitle="We are preparing high-tier subscription plans with advanced analytics and features. Stay tuned!"
        />
      </main>
    </div>
  );
}