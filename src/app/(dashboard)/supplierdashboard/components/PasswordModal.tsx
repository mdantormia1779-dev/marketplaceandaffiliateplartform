"use client";

import { useState } from "react";
import {
  X,
  Check,
  Eye,
  EyeOff,
} from "lucide-react";

type PasswordModalProps = {
  open: boolean;
  onClose: () => void;
  onPasswordChanged: () => void;
};

type PasswordData = {
  current: string;
  newPassword: string;
  confirm: string;
};

const emptyPasswordData: PasswordData = {
  current: "",
  newPassword: "",
  confirm: "",
};

export default function PasswordModal({
  open,
  onClose,
  onPasswordChanged,
}: PasswordModalProps) {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [passwordData, setPasswordData] =
    useState<PasswordData>(emptyPasswordData);

  if (!open) {
    return null;
  }

  const closeModal = () => {
    setPasswordData(emptyPasswordData);
    setShowCurrent(false);
    setShowNew(false);
    setShowConfirm(false);
    onClose();
  };

  const changePassword = () => {
    if (!passwordData.current.trim()) {
      alert("Please enter your current password.");
      return;
    }

    if (!passwordData.newPassword.trim()) {
      alert("Please enter a new password.");
      return;
    }

    if (passwordData.newPassword.length < 8) {
      alert(
        "New password must be at least 8 characters."
      );
      return;
    }

    if (
      passwordData.newPassword !==
      passwordData.confirm
    ) {
      alert(
        "New password and confirm password do not match."
      );
      return;
    }

    /*
     * Demo frontend behavior only.
     *
     * Real password changes should be handled
     * through your backend/authentication API.
     */

    localStorage.setItem(
      "supplier-password-changed",
      "true"
    );

    onPasswordChanged();

    closeModal();
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-[2px]">
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Change password
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Choose a strong password for your account.
            </p>
          </div>

          <button
            type="button"
            onClick={closeModal}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
            aria-label="Close password modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4 p-6">
          {/* Current Password */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-700">
              Current password
            </label>

            <div className="relative">
              <input
                type={
                  showCurrent
                    ? "text"
                    : "password"
                }
                value={passwordData.current}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    current: e.target.value,
                  })
                }
                className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 pr-11 text-sm font-medium text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-[#315be7] focus:ring-2 focus:ring-blue-100"
                placeholder="Enter current password"
                autoComplete="current-password"
              />

              <button
                type="button"
                onClick={() =>
                  setShowCurrent(!showCurrent)
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-slate-800"
                aria-label={
                  showCurrent
                    ? "Hide current password"
                    : "Show current password"
                }
              >
                {showCurrent ? (
                  <EyeOff size={17} />
                ) : (
                  <Eye size={17} />
                )}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-700">
              New password
            </label>

            <div className="relative">
              <input
                type={
                  showNew
                    ? "text"
                    : "password"
                }
                value={passwordData.newPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    newPassword: e.target.value,
                  })
                }
                className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 pr-11 text-sm font-medium text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-[#315be7] focus:ring-2 focus:ring-blue-100"
                placeholder="Minimum 8 characters"
                autoComplete="new-password"
              />

              <button
                type="button"
                onClick={() =>
                  setShowNew(!showNew)
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-slate-800"
                aria-label={
                  showNew
                    ? "Hide new password"
                    : "Show new password"
                }
              >
                {showNew ? (
                  <EyeOff size={17} />
                ) : (
                  <Eye size={17} />
                )}
              </button>
            </div>

            <p className="mt-1.5 text-[11px] text-slate-500">
              Password must contain at least 8 characters.
            </p>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-700">
              Confirm new password
            </label>

            <div className="relative">
              <input
                type={
                  showConfirm
                    ? "text"
                    : "password"
                }
                value={passwordData.confirm}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    confirm: e.target.value,
                  })
                }
                className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 pr-11 text-sm font-medium text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-[#315be7] focus:ring-2 focus:ring-blue-100"
                placeholder="Repeat new password"
                autoComplete="new-password"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirm(!showConfirm)
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-slate-800"
                aria-label={
                  showConfirm
                    ? "Hide confirm password"
                    : "Show confirm password"
                }
              >
                {showConfirm ? (
                  <EyeOff size={17} />
                ) : (
                  <Eye size={17} />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-slate-100 bg-slate-50 px-6 py-4">
          <button
            type="button"
            onClick={closeModal}
            className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={changePassword}
            className="flex items-center gap-2 rounded-lg bg-[#315be7] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#264fd5]"
          >
            <Check size={16} />
            Update password
          </button>
        </div>
      </div>
    </div>
  );
}