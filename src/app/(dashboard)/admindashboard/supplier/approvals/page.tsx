"use client";

import { useState } from "react";
import { initialApplications } from "./data";
import { Application, ApprovalStatus } from "./types";
import ApprovalStats from "./components/ApprovalStats";
import ApprovalTable from "./components/ApprovalTable";
import ApprovalDrawer from "./components/ApprovalDrawer";
import ApprovalFormModal, { ApprovalFormData } from "./components/ApprovalFormModal";
import ConfirmModal from "../suppliers/components/ConfirmModal"; // suppliers theke reuse
import Toast from "../suppliers/components/Toast";               // suppliers theke reuse

type ConfirmState = { type: "suspend" | "delete"; application: Application } | null;

export default function ApprovalsPage() {
  const [applications, setApplications] = useState<Application[]>(initialApplications);

  const [editTarget, setEditTarget] = useState<Application | null>(null); // null = modal bondho
  const [viewId, setViewId] = useState<number | null>(null);
  const [confirm, setConfirm] = useState<ConfirmState>(null);
  const [toast, setToast] = useState<string | null>(null);

  // drawer e shobsomoy latest data dekhanor jonno id diye khuje ber kori
  const viewApplication = applications.find((a) => a.id === viewId) ?? null;

  // ---- helper: ekta row er status bodlano ----
  const setStatus = (id: number, status: ApprovalStatus) =>
    setApplications((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));

  // ---- Edit ----
  const handleSave = (data: ApprovalFormData) => {
    if (!editTarget) return;
    setApplications((prev) => prev.map((a) => (a.id === editTarget.id ? { ...a, ...data } : a)));
    setToast(`${data.store} updated`);
    setEditTarget(null);
  };

  // ---- Approve / Reject (sorasori toast) ----
  const handleApprove = (a: Application) => {
    setStatus(a.id, "Approved");
    setToast(`${a.store} approved`);
  };

  const handleReject = (a: Application) => {
    setStatus(a.id, "Rejected");
    setToast(`${a.store} rejected`);
  };

  // ---- Suspend / Delete (age confirm modal) ----
  const handleConfirm = () => {
    if (!confirm) return;
    const { type, application } = confirm;

    if (type === "suspend") {
      setStatus(application.id, "Suspended");
      setToast(`${application.store} suspended`);
    } else {
      setApplications((prev) => prev.filter((a) => a.id !== application.id));
      setToast(`${application.store} deleted`);
    }
    setConfirm(null);
  };

  return (
    <div className="space-y-5 bg-gray-100/60 p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Approvals</h1>
        <p className="text-sm text-gray-600">
          Review incoming supplier applications and decide who joins the marketplace.
        </p>
      </div>

      <ApprovalStats />

      <ApprovalTable
        applications={applications}
        onView={(a) => setViewId(a.id)}
        onEdit={setEditTarget}
        onApprove={handleApprove}
        onReject={handleReject}
        onSuspend={(a) => setConfirm({ type: "suspend", application: a })}
        onDelete={(a) => setConfirm({ type: "delete", application: a })}
      />

      {/* Edit modal */}
      <ApprovalFormModal
        application={editTarget}
        onClose={() => setEditTarget(null)}
        onSubmit={handleSave}
      />

      {/* View details drawer */}
      <ApprovalDrawer application={viewApplication} onClose={() => setViewId(null)} />

      {/* Suspend / Delete confirm */}
      <ConfirmModal
        open={!!confirm}
        title={confirm?.type === "delete" ? "Delete record" : "Suspend record"}
        message={
          confirm?.type === "delete"
            ? "The selected record will be permanently deleted. This cannot be undone."
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