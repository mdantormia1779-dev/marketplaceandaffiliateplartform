"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { initialFees } from "./data";
import { Fee, FeeStatus } from "./types";
import FeeStats from "./components/FeeStats";
import FeeTable from "./components/FeeTable";
import FeeDrawer from "./components/FeeDrawer";
import FeeFormModal, { FeeFormData } from "./components/FeeFormModal";
import ConfirmModal from "../suppliers/components/ConfirmModal"; // suppliers theke reuse
import Toast from "../suppliers/components/Toast";               // suppliers theke reuse

type ConfirmState = { type: "suspend" | "delete"; fee: Fee } | null;

const today = () => new Date().toISOString().slice(0, 10);

export default function JoiningFeesPage() {
  const [fees, setFees] = useState<Fee[]>(initialFees);

  const [formOpen, setFormOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Fee | null>(null); // null = Add mode
  const [viewId, setViewId] = useState<number | null>(null);
  const [confirm, setConfirm] = useState<ConfirmState>(null);
  const [toast, setToast] = useState<string | null>(null);

  // drawer e shobsomoy latest data dekhanor jonno id diye khuje ber kori
  const viewFee = fees.find((f) => f.id === viewId) ?? null;

  // upor er card er count (live)
  const count = (s: FeeStatus) => fees.filter((f) => f.status === s).length;

  // ---- helper: ekta row update kora ----
  const updateFee = (id: number, patch: Partial<Fee>) =>
    setFees((prev) => prev.map((f) => (f.id === id ? { ...f, ...patch } : f)));

  // ---- Add / Edit ----
  const openAdd = () => {
    setEditTarget(null);
    setFormOpen(true);
  };

  const openEdit = (f: Fee) => {
    setEditTarget(f);
    setFormOpen(true);
  };

  const handleSave = (data: FeeFormData) => {
    if (editTarget) {
      // Pending/Paid hole Paid date dekhe status thik kori; Waived/Suspended jemon ache temon thakbe
      const keepsStatus = editTarget.status === "Waived" || editTarget.status === "Suspended";
      const status: FeeStatus = keepsStatus ? editTarget.status : data.paidOn ? "Paid" : "Pending";
      updateFee(editTarget.id, { ...data, status });
      setToast(`${data.store} joining fee updated`);
    } else {
      const newFee: Fee = {
        id: Date.now(),
        ...data,
        status: data.paidOn ? "Paid" : "Pending",
      };
      setFees((prev) => [newFee, ...prev]);
      setToast(`${data.store} joining fee added`);
    }
    setFormOpen(false);
  };

  // ---- Mark as paid / Waive fee (sorasori toast) ----
  const handleMarkPaid = (f: Fee) => {
    updateFee(f.id, { status: "Paid", paidOn: today() });
    setToast(`${f.store} joining fee marked paid`);
  };

  const handleWaive = (f: Fee) => {
    updateFee(f.id, { status: "Waived", paidOn: null });
    setToast(`${f.store} joining fee waived`);
  };

  // ---- Suspend / Delete (age confirm modal) ----
  const handleConfirm = () => {
    if (!confirm) return;
    const { type, fee } = confirm;

    if (type === "suspend") {
      updateFee(fee.id, { status: "Suspended" });
      setToast(`${fee.store} joining fee suspended`);
    } else {
      setFees((prev) => prev.filter((f) => f.id !== fee.id));
      setToast(`${fee.store} joining fee deleted`);
    }
    setConfirm(null);
  };

  return (
    <div className="space-y-5 bg-gray-100/60 p-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Joining Fees</h1>
          <p className="text-sm text-gray-600">One-time onboarding fees collected from new suppliers.</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 rounded-lg bg-[#1fae6b] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#189a5d] print:hidden"
        >
          <Plus size={16} /> Record Fee
        </button>
      </div>

      <FeeStats paid={count("Paid")} pending={count("Pending")} waived={count("Waived")} />

      <FeeTable
        fees={fees}
        onView={(f) => setViewId(f.id)}
        onEdit={openEdit}
        onMarkPaid={handleMarkPaid}
        onWaive={handleWaive}
        onSuspend={(f) => setConfirm({ type: "suspend", fee: f })}
        onDelete={(f) => setConfirm({ type: "delete", fee: f })}
      />

      {/* Add / Edit modal */}
      <FeeFormModal
        open={formOpen}
        fee={editTarget}
        onClose={() => setFormOpen(false)}
        onSubmit={handleSave}
      />

      {/* View details drawer */}
      <FeeDrawer fee={viewFee} onClose={() => setViewId(null)} />

      {/* Suspend / Delete confirm */}
      <ConfirmModal
        open={!!confirm}
        title={confirm?.type === "delete" ? "Delete record" : "Suspend record"}
        message={
          confirm?.type === "delete"
            ? "This action permanently removes the selected record. This cannot be undone."
            : "The selected record will be suspended and hidden from the public marketplace."
        }
        confirmLabel={confirm?.type === "delete" ? "Delete" : "Suspend"}
        onConfirm={handleConfirm}
        onCancel={() => setConfirm(null)}
      />

      {/* Toast */}
      <Toast message={toast} onClose={() => setToast(null)} />
    </div>
  );
}