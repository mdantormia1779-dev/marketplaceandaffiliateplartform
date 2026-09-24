// src/app/(dashboard)/supplierdashboard/account/subscription/upgrade/page.tsx
"use client";

import Navbar from "../../../components/Navbar";
import {
  BillingToggle,
  CompareTable,
  ConfirmModal,
  FaqSection,
  PlansGrid,
  WhyUpgrade,
  usePlans,
} from "./upgradecomponents/index";

export default function UpgradePage() {
  const { cycle, setCycle, current, pending, notice, requestChange, confirmChange, cancelChange } = usePlans();

  return (
    <div className="flex min-h-screen flex-col bg-[#f8fafc]">
      <div className="sticky top-0 z-50 border-b border-slate-100 bg-white">
        <Navbar />
      </div>

      <main className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col gap-10 p-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Upgrade Plan</h1>
          <p className="mt-1 text-sm text-slate-500">
            Choose a plan that fits your business and unlock more products, analytics and features.
          </p>
        </div>

        {notice && (
          <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{notice}</p>
        )}

        <BillingToggle cycle={cycle} onChange={setCycle} />
        <PlansGrid cycle={cycle} current={current} onSelect={requestChange} />
        <CompareTable current={current} />
        <WhyUpgrade />
        <FaqSection />
      </main>

      {pending && (
        <ConfirmModal plan={pending} cycle={cycle} current={current} onConfirm={confirmChange} onClose={cancelChange} />
      )}
    </div>
  );
}