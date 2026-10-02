"use client";

import { useState } from "react";
import PageHeader from "./components/PageHeader";
import StatsGrid from "./components/StatsGrid";
import RevenuePanel from "./components/RevenuePanel";
import PlanMixChart from "./components/PlanMixChart";
import SubscriptionsTable from "./components/SubscriptionsTable";
import SubscriptionFormModal from "./components/SubscriptionFormModal";
import ConfirmModal from "./components/ConfirmModal";
import DetailsDrawer from "./components/DetailsDrawer";
import { ToastProvider, useToast } from "./components/Toast";
import { initialSubscriptions } from "./data";
import { Subscription, SubscriptionInput } from "./types";

type FormState = { open: boolean; item: Subscription | null };
type ConfirmState = { type: "suspend" | "delete"; item: Subscription } | null;

function SubscriptionsView() {
  const { toast } = useToast();
  const [rows, setRows] = useState<Subscription[]>(initialSubscriptions);
  const [form, setForm] = useState<FormState>({ open: false, item: null });
  const [confirm, setConfirm] = useState<ConfirmState>(null);
  const [details, setDetails] = useState<Subscription | null>(null);

  const closeForm = () => setForm({ open: false, item: null });

  const handleSubmit = (values: SubscriptionInput) => {
    if (form.item) {
      const prev = form.item;
      setRows((rs) => rs.map((r) => (r.id === prev.id ? { ...r, ...values } : r)));
      toast(values.plan !== prev.plan ? `${values.store} plan updated` : `${values.store} subscription updated`);
    } else {
      setRows((rs) => [{ id: crypto.randomUUID(), status: values.plan === "Trial" ? "Trial" : "Active", ...values }, ...rs]);
      toast(`${values.store} subscription added`);
    }
    closeForm();
  };

  const setStatus = (id: string, status: Subscription["status"]) =>
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, status } : r)));

  const handleConfirm = () => {
    if (!confirm) return;
    const { type, item } = confirm;
    if (type === "suspend") {
      setStatus(item.id, "Suspended");
      toast(`${item.store} suspended`);
    } else {
      setRows((rs) => rs.filter((r) => r.id !== item.id));
      toast(`${item.store} deleted`);
    }
    setConfirm(null);
  };

  return (
    <main className="min-h-screen bg-[#f4f6f8] p-6">
      <div className="mx-auto max-w-[1280px] space-y-5">
        <PageHeader onAdd={() => setForm({ open: true, item: null })} />
        <StatsGrid />
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_390px]">
          <RevenuePanel />
          <PlanMixChart />
        </div>
        <SubscriptionsTable
          rows={rows}
          onView={setDetails}
          onEdit={(item) => setForm({ open: true, item })}
          onSuspend={(item) => setConfirm({ type: "suspend", item })}
          onDelete={(item) => setConfirm({ type: "delete", item })}
          onCancel={(item) => {
            setStatus(item.id, "Cancelled");
            toast(`${item.store} subscription cancelled`);
          }}
        />
      </div>

      <SubscriptionFormModal open={form.open} initial={form.item} onClose={closeForm} onSubmit={handleSubmit} />

      <ConfirmModal
        open={confirm?.type === "suspend"}
        title="Suspend record"
        message="The selected record will be suspended and hidden from the public marketplace."
        confirmLabel="Suspend"
        onConfirm={handleConfirm}
        onClose={() => setConfirm(null)}
      />
      <ConfirmModal
        open={confirm?.type === "delete"}
        title="Delete record"
        message="This action permanently removes the selected record. This cannot be undone."
        confirmLabel="Delete"
        onConfirm={handleConfirm}
        onClose={() => setConfirm(null)}
      />

      <DetailsDrawer item={details} onClose={() => setDetails(null)} />
    </main>
  );
}

export default function SubscriptionsPage() {
  return (
    <ToastProvider>
      <SubscriptionsView />
    </ToastProvider>
  );
}