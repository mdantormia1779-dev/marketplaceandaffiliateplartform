"use client";

import { AlertTriangle, Trash2 } from "lucide-react";
import ModalShell from "./ModalShell";

type DeleteLinkModalProps = {
  open: boolean;
  productName: string;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function DeleteLinkModal({
  open,
  productName,
  onCancel,
  onConfirm,
}: DeleteLinkModalProps) {
  return (
    <ModalShell
      open={open}
      onClose={onCancel}
      title="Delete Affiliate Link"
      subtitle="This action cannot be undone."
      footer={
        <>
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-700"
          >
            <Trash2 className="h-4 w-4" />
            Delete Link
          </button>
        </>
      }
    >
      <div className="flex items-start gap-3 rounded-xl bg-amber-50 p-4">
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
        <p className="text-sm text-amber-800">
          Are you sure you want to delete the affiliate link for{" "}
          <span className="font-semibold">{productName}</span>? You will stop
          earning commission from this link.
        </p>
      </div>
    </ModalShell>
  );
}