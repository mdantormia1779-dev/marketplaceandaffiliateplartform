// src/app/(dashboard)/supplierdashboard/account/subscription/current-plan/page.tsx
"use client";

import Navbar from "../../../components/Navbar";
import {
  FeaturesCard,
  PlanDetailsCard,
  PlanHeader,
  UsageSection,
  usePlan,
} from "./current-plancomponents/index";

export default function CurrentPlanPage() {
  const { plan, toggleAutoRenewal, cancel, resume } = usePlan();

  return (
    <div className="flex min-h-screen flex-col bg-[#f8fafc]">
      <div className="sticky top-0 z-50 border-b border-slate-100 bg-white">
        <Navbar />
      </div>

      <main className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col gap-6 p-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Current Plan</h1>
          <p className="mt-1 text-sm text-slate-500">Everything included in your current subscription.</p>
        </div>

        <PlanHeader plan={plan} onToggleAutoRenewal={toggleAutoRenewal} onCancel={cancel} onResume={resume} />
        <UsageSection usage={plan.usage} />

        <section className="grid gap-6 lg:grid-cols-3">
          <FeaturesCard planName={plan.planName} features={plan.features} />
          <PlanDetailsCard plan={plan} />
        </section>
      </main>
    </div>
  );
}