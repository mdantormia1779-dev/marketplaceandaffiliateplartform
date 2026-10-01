"use client";

import { useState } from "react";
import StatusBadge from "./StatusBadge";
import StaffFormModal from "./StaffFormModal";

import type { Staff, StaffForm } from "../types";
import RowActions from "./RowActions";
import StaffDrawer from "./StaffDrawer";
import ConfirmModal from "./ConfirmModal";

const avatarColors = [
  "bg-emerald-100 text-emerald-700",
  "bg-amber-100 text-amber-700",
  "bg-slate-100 text-slate-700",
];

const initials = (name: string) =>
  name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();

type Props = {
  member: Staff;
  onUpdate: (id: number, form: StaffForm) => Promise<void>;
  onToggleSuspend: (id: number) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
};

export default function StaffRow({ member, onUpdate, onToggleSuspend, onDelete }: Props) {
  const s = member;
  const [viewing, setViewing] = useState(false);
  const [editing, setEditing] = useState(false);
  const [confirm, setConfirm] = useState<null | "suspend" | "activate" | "delete">(null);
  const [loading, setLoading] = useState(false);

  const isSuspended = s.status === "Suspended";

  const handleConfirm = async () => {
    if (!confirm) return;
    setLoading(true);
    try {
      if (confirm === "delete") await onDelete(s.id);
      else await onToggleSuspend(s.id);
      setConfirm(null);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <tr className="border-t border-slate-100 text-sm text-slate-700 transition hover:bg-slate-50">
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full text-xs font-semibold ${
              avatarColors[s.id % avatarColors.length]
            }`}
          >
            {initials(s.name)}
          </div>
          <div className="leading-tight">
            <p className="font-medium text-slate-900">{s.name}</p>
            <p className="text-xs text-slate-500">{s.email}</p>
          </div>
        </div>
      </td>
      <td className="px-4 py-3 text-slate-900">{s.role}</td>
      <td className="px-4 py-3">{s.department}</td>
      <td className="px-4 py-3">{s.lastActive}</td>
      <td className="px-4 py-3">
        <StatusBadge status={s.status} />
      </td>
      <td className="px-4 py-3 text-right">
        <RowActions
          suspended={isSuspended}
          onView={() => setViewing(true)}
          onEdit={() => setEditing(true)}
          onSuspend={() => setConfirm(isSuspended ? "activate" : "suspend")}
          onDelete={() => setConfirm("delete")}
        />

        {viewing && (
          <StaffDrawer
            member={s}
            onClose={() => setViewing(false)}
            onEdit={() => {
              setViewing(false);
              setEditing(true);
            }}
          />
        )}

        {editing && (
          <StaffFormModal
            mode="edit"
            initial={s}
            onClose={() => setEditing(false)}
            onSubmit={(form) => onUpdate(s.id, form)}
          />
        )}

        {confirm && (
          <ConfirmModal
            type={confirm}
            loading={loading}
            onCancel={() => setConfirm(null)}
            onConfirm={handleConfirm}
          />
        )}
      </td>
    </tr>
  );
}