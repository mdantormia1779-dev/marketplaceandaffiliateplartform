// src/app/(dashboard)/supplierdashboard/subscription/current-plan/page.tsx
"use client";

import ComingSoonBox from "../../../components/ComingSoonBox";
import Navbar from "../../../components/Navbar";





export default function CurrentPlanPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col">
      {/* Top Fixed Navbar */}
      <div className="sticky top-0 z-50 bg-white border-b border-slate-100">
        <Navbar/>
      </div>

      {/* Main Container */}
      <main className="flex-1 flex flex-col p-6 max-w-[1600px] w-full mx-auto">
        <div className="mb-2">
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Current Plan</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Everything included in your current subscription.
          </p>
        </div>

        <ComingSoonBox
         title="This section is on the way"
          subtitle="We are building this part of the supplier workspace step by step. It will be ready in an upcoming phase."
        />
         
      </main>
    </div>
  );
}