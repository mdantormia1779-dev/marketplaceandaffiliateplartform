// src/app/(dashboard)/supplierdashboard/subscription/billing/page.tsx
"use client";

import ComingSoonBox from "../../../components/ComingSoonBox";
import Navbar from "../../../components/Navbar";



export default function BillingPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col">
      {/* Top Fixed Navbar */}
      <div className="sticky top-0 z-50 bg-white border-b border-slate-100">
        <Navbar/>
      </div>

      {/* Main Container */}
      <main className="flex-1 flex flex-col p-6 max-w-[1600px] w-full mx-auto">
        <div className="mb-2">
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Billing & Invoices</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage your payment methods, billing history and subscription invoices.
          </p>
        </div>

        <ComingSoonBox
        title="Billing section is on the way"
          subtitle="We are building secure payment gateways and invoice management step by step. It will be ready soon."
        />
      </main>
    </div>
  );
}