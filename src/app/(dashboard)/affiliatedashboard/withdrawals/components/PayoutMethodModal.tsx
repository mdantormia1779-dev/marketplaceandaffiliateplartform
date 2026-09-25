"use client";

import { useEffect, useState } from "react";
import ModalOverlay from "./ModalOverlay";
import { PaymentMethodType, PayoutMethod } from "./types";
import { METHOD_ICONS, PAYMENT_METHOD_TYPES } from "./constants";

interface PayoutMethodModalProps {
  mode: "add" | "edit";
  initialMethod?: PayoutMethod | null;
  onClose: () => void;
  onSave: (method: PayoutMethod) => void;
}

export default function PayoutMethodModal({
  mode,
  initialMethod,
  onClose,
  onSave,
}: PayoutMethodModalProps) {
  const [type, setType] = useState<PaymentMethodType>(initialMethod ? initialMethod.type : "bKash");
  const [accountNumber, setAccountNumber] = useState<string>(initialMethod ? initialMethod.accountNumber : "");
  const [accountName, setAccountName] = useState<string>(initialMethod ? initialMethod.accountName : "");
  const [bankName, setBankName] = useState<string>(initialMethod && initialMethod.bankName ? initialMethod.bankName : "");
  const [setDefault, setSetDefault] = useState<boolean>(initialMethod ? initialMethod.isDefault : false);

  useEffect(() => {
    if (initialMethod) {
      setType(initialMethod.type);
      setAccountNumber(initialMethod.accountNumber);
      setAccountName(initialMethod.accountName);
      setBankName(initialMethod.bankName || "");
      setSetDefault(initialMethod.isDefault);
    }
  }, [initialMethod]);

  const handleSubmit = () => {
    if (accountNumber.trim() === "" || accountName.trim() === "") {
      return;
    }

    const savedMethod: PayoutMethod = {
      id: initialMethod ? initialMethod.id : "pm-" + Date.now(),
      type,
      accountNumber: accountNumber.trim(),
      accountName: accountName.trim(),
      bankName: type === "Bank Transfer" ? bankName.trim() : undefined,
      isDefault: setDefault,
    };

    onSave(savedMethod);
  };

  return (
    <ModalOverlay
      title={mode === "add" ? "Add Payout Method" : "Edit Payout Method"}
      subtitle={
        mode === "add"
          ? "Add a new account to receive your withdrawals."
          : "Update the details for this payout account."
      }
      onClose={onClose}
      footer={
        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-5 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors"
          >
            {mode === "add" ? "Add Method" : "Save Changes"}
          </button>
        </div>
      }
    >
      <div>
        <label className="text-xs font-semibold text-slate-600 mb-2 block">Payment Method</label>
        <div className="grid grid-cols-3 gap-2">
          {PAYMENT_METHOD_TYPES.map((option) => {
            const Icon = METHOD_ICONS[option];
            const isSelected = type === option;
            const disabled = mode === "edit";
            return (
              <button
                key={option}
                type="button"
                disabled={disabled}
                onClick={() => setType(option)}
                className={
                  "flex flex-col items-center gap-1.5 rounded-xl border-2 py-3 text-xs font-semibold transition-colors " +
                  (isSelected
                    ? "border-indigo-500 text-indigo-700 bg-indigo-50"
                    : "border-slate-200 text-slate-600") +
                  (disabled ? " opacity-60 cursor-not-allowed" : " hover:border-slate-300")
                }
              >
                <Icon className="w-4 h-4" />
                {option}
              </button>
            );
          })}
        </div>
      </div>

      {type === "Bank Transfer" ? (
        <div>
          <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Bank Name</label>
          <input
            type="text"
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
            placeholder="e.g. City Bank"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      ) : null}

      <div>
        <label className="text-xs font-semibold text-slate-600 mb-1.5 block">
          {type === "Bank Transfer" ? "Account Number" : "Phone Number"}
        </label>
        <input
          type="text"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          placeholder={type === "Bank Transfer" ? "e.g. City Bank ****4092" : "e.g. 01712-345678"}
          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Account Holder Name</label>
        <input
          type="text"
          value={accountName}
          onChange={(e) => setAccountName(e.target.value)}
          placeholder="e.g. Debraz Pul"
          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
        <input
          type="checkbox"
          checked={setDefault}
          onChange={(e) => setSetDefault(e.target.checked)}
          className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
        />
        Set as default payout method
      </label>
    </ModalOverlay>
  );
}