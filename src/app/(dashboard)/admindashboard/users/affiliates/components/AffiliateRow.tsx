"use client";

import { useState } from "react";
import StatusBadge from "./StatusBadge";
import RowActions from "./RowActions";
import AffiliateDrawer from "./AffiliateDrawer";
import EditAffiliateModal from "./EditAffiliateModal";
import ConfirmModal from "./ConfirmModal";
import type { Affiliate, AffiliateForm } from "../types";

const avatarColors = [
  "bg-emerald-100 text-emerald-700",
  "bg-amber-100 text-amber-700",
  "bg-slate-100 text-slate-700",
];

const initials = (name: string) =>
  name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();

type Props = {
  affiliate: Affiliate;
  onUpdate: (id: number, form: AffiliateForm) => Promise<void>;
  onToggleSuspend: (id: number) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
};

export default function AffiliateRow({ affiliate, onUpdate, onToggleSuspend, onDelete }: Props) {
  const a = affiliate;
  const [viewing, setViewing] = useState(false);
  const [editing, setEditing] = useState(false);
  const [confirm, setConfirm] = useState<null | "suspend" | "activate" | "delete">(null);
  const [loading, setLoading] = useState(false);

  const isSuspended = a.status === "Suspended";

  const handleSave = async (form: AffiliateForm) => {
    try {
      await onUpdate(a.id, form);
      setEditing(false);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  const handleConfirm = async () => {
    if (!confirm) return;
    setLoading(true);
    try {
      if (confirm === "delete") await onDelete(a.id);
      else await onToggleSuspend(a.id);
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
              avatarColors[a.id % avatarColors.length]
            }`}
          >
            {initials(a.name)}
          </div>
          <div className="leading-tight">
            <p className="font-medium text-slate-900">{a.name}</p>
            <p className="text-xs text-slate-500">{a.email}</p>
          </div>
        </div>
      </td>
      <td className="px-4 py-3">
        <span className="rounded-md bg-slate-100 px-2 py-1 font-mono text-xs text-slate-700">
          {a.code}
        </span>
      </td>
      <td className="px-4 py-3 font-medium text-slate-900">{a.referrals}</td>
      <td className="px-4 py-3 font-medium text-slate-900">
        {a.earnings.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 0,
        })}
      </td>
      <td className="px-4 py-3">
        <StatusBadge status={a.status} />
      </td>
      <td className="px-4 py-3">{a.joined}</td>
      <td className="px-4 py-3 text-right">
        <RowActions
          suspended={isSuspended}
          onView={() => setViewing(true)}
          onEdit={() => setEditing(true)}
          onSuspend={() => setConfirm(isSuspended ? "activate" : "suspend")}
          onDelete={() => setConfirm("delete")}
        />

        {viewing && (
          <AffiliateDrawer
            affiliate={a}
            onClose={() => setViewing(false)}
            onEdit={() => {
              setViewing(false);
              setEditing(true);
            }}
          />
        )}

        {editing && (
          <EditAffiliateModal
            affiliate={a}
            onClose={() => setEditing(false)}
            onSave={handleSave}
          />
        )}

        {confirm && (
          <ConfirmModal
            type={confirm}
            name={a.name}
            loading={loading}
            onCancel={() => setConfirm(null)}
            onConfirm={handleConfirm}
          />
        )}
      </td>
    </tr>
  );
}