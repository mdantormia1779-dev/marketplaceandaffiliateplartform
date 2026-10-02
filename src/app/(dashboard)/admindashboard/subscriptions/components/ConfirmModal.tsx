"use client";

import Modal from "./Modal";

interface ConfirmModalProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  onConfirm: () => void;
  onClose: () => void;
}

export default function ConfirmModal({ open, title, message, confirmLabel, onConfirm, onClose }: ConfirmModalProps) {
  return (
    <Modal
      open={open}
      title={title}
      onClose={onClose}
      width="max-w-[500px]"
      footer={
        <>
          <button onClick={onClose} className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-slate-900">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="rounded-lg bg-[#cc7a00] px-4 py-2 text-sm font-semibold text-white hover:bg-[#b36b00]"
          >
            {confirmLabel}
          </button>
        </>
      }
    >
      <p className="text-[15px] leading-relaxed text-slate-600">{message}</p>
    </Modal>
  );
}