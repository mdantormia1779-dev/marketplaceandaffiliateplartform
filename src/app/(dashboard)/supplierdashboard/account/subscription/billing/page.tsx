// src/app/(dashboard)/supplierdashboard/subscription/billing/page.tsx
"use client";

import Navbar from "../../../components/Navbar";
import {
  CurrentSubscription,
  InvoiceHistory,
  PaymentMethodCard,
  StatsRow,
  useBilling,
} from "./billingcomponents";

export default function BillingPage() {
  const { data, toggleAutoRenewal, savePaymentMethod, removePaymentMethod } = useBilling();

  return (
    <div className="flex min-h-screen flex-col bg-[#f8fafc]">
      <div className="sticky top-0 z-50 border-b border-slate-100 bg-white">
        <Navbar />
      </div>

      <main className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col gap-6 p-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Billing</h1>
          <p className="mt-1 text-slate-500">Invoices, payment methods and billing history.</p>
        </div>

        <section className="grid gap-6 lg:grid-cols-3">
          <CurrentSubscription subscription={data.subscription} onToggleAutoRenewal={toggleAutoRenewal} />
          <PaymentMethodCard method={data.paymentMethod} onSave={savePaymentMethod} onRemove={removePaymentMethod} />
        </section>

        <StatsRow subscription={data.subscription} />
        <InvoiceHistory invoices={data.invoices} />
      </main>
    </div>
  );
}