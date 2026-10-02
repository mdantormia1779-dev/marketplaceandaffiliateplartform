"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { initialSuppliers } from "./data";
import { Supplier, SupplierStatus } from "./types";
import StatsGrid from "./components/StatsGrid";
import RevenueChart from "./components/RevenueChart";
import GrowthChart from "./components/GrowthChart";
import SupplierTable from "./components/SupplierTable";
import SupplierFormModal, { SupplierFormData } from "./components/SupplierFormModal";
import SupplierDrawer from "./components/SupplierDrawer";
import ConfirmModal from "./components/ConfirmModal";
import Toast from "./components/Toast";

type ConfirmState = { type: "suspend" | "delete"; supplier: Supplier } | null;

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>(initialSuppliers);

  const [formOpen, setFormOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Supplier | null>(null); // null = Add mode
  const [viewId, setViewId] = useState<number | null>(null);
  const [confirm, setConfirm] = useState<ConfirmState>(null);
  const [toast, setToast] = useState<string | null>(null);

  // drawer e shobsomoy latest data dekhanor jonno id diye khuje ber kori
  const viewSupplier = suppliers.find((s) => s.id === viewId) ?? null;

  // ---- helpers ----
  const setStatus = (id: number, status: SupplierStatus) =>
    setSuppliers((prev) => prev.map((s) => (s.id === id ? { ...s, status } : s)));

  // ---- Add / Edit ----
  const openAdd = () => {
    setEditTarget(null);
    setFormOpen(true);
  };

  const openEdit = (s: Supplier) => {
    setEditTarget(s);
    setFormOpen(true);
  };

  const handleSave = (data: SupplierFormData) => {
    if (editTarget) {
      // Edit
      setSuppliers((prev) => prev.map((s) => (s.id === editTarget.id ? { ...s, ...data } : s)));
      setToast(`${data.store} updated`);
    } else {
      // Add
      const newSupplier: Supplier = {
        id: Date.now(),
        ...data,
        products: 0,
        revenue: 0,
        rating: 0,
        joined: new Date().toISOString().slice(0, 10),
      };
      setSuppliers((prev) => [newSupplier, ...prev]);
      setToast(`${data.store} added`);
    }
    setFormOpen(false);
  };

  // ---- Approve / Reject (sorasori toast) ----
  const handleApprove = (s: Supplier) => {
    setStatus(s.id, "Active");
    setToast(`${s.store} approved`);
  };

  const handleReject = (s: Supplier) => {
    setStatus(s.id, "Rejected");
    setToast(`${s.store} rejected`);
  };

  // ---- Suspend / Delete (age confirm modal) ----
  const handleConfirm = () => {
    if (!confirm) return;
    const { type, supplier } = confirm;

    if (type === "suspend") {
      setStatus(supplier.id, "Suspended");
      setToast(`${supplier.store} suspended`);
    } else {
      setSuppliers((prev) => prev.filter((s) => s.id !== supplier.id));
      setToast(`${supplier.store} deleted`);
    }
    setConfirm(null);
  };

  return (
    <div className="space-y-5 bg-gray-100/60 p-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Supplier List</h1>
          <p className="text-sm text-gray-600">
            Every store operating on the marketplace, with catalog size and revenue.
          </p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 rounded-lg bg-[#1fae6b] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#189a5d] print:hidden"
        >
          <Plus size={16} /> Add Supplier
        </button>
      </div>

      <StatsGrid />

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <RevenueChart />
        <GrowthChart />
      </div>

      <SupplierTable
        suppliers={suppliers}
        onView={(s) => setViewId(s.id)}
        onEdit={openEdit}
        onApprove={handleApprove}
        onReject={handleReject}
        onSuspend={(s) => setConfirm({ type: "suspend", supplier: s })}
        onDelete={(s) => setConfirm({ type: "delete", supplier: s })}
      />

      {/* Add / Edit modal */}
      <SupplierFormModal
        open={formOpen}
        supplier={editTarget}
        onClose={() => setFormOpen(false)}
        onSubmit={handleSave}
      />

      {/* View details drawer */}
      <SupplierDrawer supplier={viewSupplier} onClose={() => setViewId(null)} />

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