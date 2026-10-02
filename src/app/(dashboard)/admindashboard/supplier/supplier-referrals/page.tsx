"use client";

import { useState } from "react";
import { initialReferrals, rewardByPlan } from "./data";
import { Referral } from "./types";
import ReferralStats from "./components/ReferralStats";
import ReferralTable from "./components/ReferralTable";
import ReferralDrawer from "./components/ReferralDrawer";
import ReferralFormModal, { ReferralFormData } from "./components/ReferralFormModal";
import ConfirmModal from "../suppliers/components/ConfirmModal"; // suppliers theke reuse
import Toast from "../suppliers/components/Toast";               // suppliers theke reuse

type ConfirmState = { type: "suspend" | "delete"; referral: Referral } | null;

export default function SupplierReferralsPage() {
  const [referrals, setReferrals] = useState<Referral[]>(initialReferrals);

  const [editTarget, setEditTarget] = useState<Referral | null>(null); // null = modal bondho
  const [viewId, setViewId] = useState<number | null>(null);
  const [confirm, setConfirm] = useState<ConfirmState>(null);
  const [toast, setToast] = useState<string | null>(null);

  // drawer e shobsomoy latest data dekhanor jonno id diye khuje ber kori
  const viewReferral = referrals.find((r) => r.id === viewId) ?? null;

  // upor er "Pending" card er live count
  const pendingCount = referrals.filter((r) => r.status === "Pending").length;

  // ---- helper: ekta row update kora ----
  const updateReferral = (id: number, patch: Partial<Referral>) =>
    setReferrals((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));

  // ---- Edit ----
  const handleSave = (data: ReferralFormData) => {
    if (!editTarget) return;
    updateReferral(editTarget.id, data);
    setToast(`${data.referrer} referral updated`);
    setEditTarget(null);
  };

  // ---- Approve / Mark reward paid / Reject (sorasori toast) ----
  const handleApprove = (r: Referral) => {
    // Age reject hoye reward 0 hoye thakle, plan er reward fire ashbe
    const reward = r.reward > 0 ? r.reward : rewardByPlan[r.plan] ?? 0;
    updateReferral(r.id, { status: "Approved", reward });
    setToast(`${r.referred} referral approved`);
  };

  const handleMarkPaid = (r: Referral) => {
    const reward = r.reward > 0 ? r.reward : rewardByPlan[r.plan] ?? 0;
    updateReferral(r.id, { status: "Paid", reward });
    setToast(`${r.referrer} reward marked paid`);
  };

  const handleReject = (r: Referral) => {
    updateReferral(r.id, { status: "Rejected", reward: 0 }); // reject hole reward $0.00
    setToast(`${r.referred} referral rejected`);
  };

  // ---- Suspend / Delete (age confirm modal) ----
  const handleConfirm = () => {
    if (!confirm) return;
    const { type, referral } = confirm;

    if (type === "suspend") {
      updateReferral(referral.id, { status: "Suspended" });
      setToast(`${referral.referred} referral suspended`);
    } else {
      setReferrals((prev) => prev.filter((r) => r.id !== referral.id));
      setToast(`${referral.referred} referral deleted`);
    }
    setConfirm(null);
  };

  return (
    <div className="space-y-5 bg-gray-100/60 p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Supplier Referrals</h1>
        <p className="text-sm text-gray-600">Suppliers referring other stores into the marketplace.</p>
      </div>

      <ReferralStats pending={pendingCount} />

      <ReferralTable
        referrals={referrals}
        onView={(r) => setViewId(r.id)}
        onEdit={setEditTarget}
        onApprove={handleApprove}
        onMarkPaid={handleMarkPaid}
        onReject={handleReject}
        onSuspend={(r) => setConfirm({ type: "suspend", referral: r })}
        onDelete={(r) => setConfirm({ type: "delete", referral: r })}
      />

      {/* Edit modal */}
      <ReferralFormModal
        referral={editTarget}
        onClose={() => setEditTarget(null)}
        onSubmit={handleSave}
      />

      {/* View details drawer */}
      <ReferralDrawer referral={viewReferral} onClose={() => setViewId(null)} />

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