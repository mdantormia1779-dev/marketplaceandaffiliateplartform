"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Clock } from "lucide-react";
import ModalOverlay from "./ModalOverlay";
import { PaymentMethodType, PayoutMethod, WithdrawalRequest } from "./types";
import { METHOD_ICONS, PAYMENT_METHOD_TYPES, QUICK_AMOUNTS } from "./constants";

interface RequestWithdrawalModalProps {
  availableBalance: string;
  payoutMethods: PayoutMethod[];
  preselectedMethodType?: PaymentMethodType | null;
  onClose: () => void;
  onSubmit: (request: WithdrawalRequest) => void;
}

export default function RequestWithdrawalModal({
  availableBalance,
  payoutMethods,
  preselectedMethodType,
  onClose,
  onSubmit,
}: RequestWithdrawalModalProps) {
  const [amount, setAmount] = useState<string>("");
  const [selectedType, setSelectedType] = useState<PaymentMethodType>(
    preselectedMethodType ? preselectedMethodType : "bKash"
  );
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [note, setNote] = useState<string>("");

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [submittedRequest, setSubmittedRequest] = useState<WithdrawalRequest | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const savedMethod = payoutMethods.find((m) => m.type === selectedType);
    setAccountNumber(savedMethod ? savedMethod.accountNumber : "");
  }, [selectedType, payoutMethods]);

  const handleSubmit = () => {
    const numericAmount = parseFloat(amount);

    if (!numericAmount || numericAmount < 500) {
      setErrorMessage("Minimum withdrawal amount is ৳500.");
      return;
    }

    if (accountNumber.trim() === "") {
      setErrorMessage("Please provide an account number.");
      return;
    }

    setErrorMessage("");

    const today = new Date().toISOString().slice(0, 10);

    const newRequest: WithdrawalRequest = {
      id: "WD-" + Math.floor(20000 + Math.random() * 900),
      date: today,
      amount: numericAmount.toLocaleString(),
      method: selectedType,
      status: "Pending",
      processedDate: null,
      timeline: [
        { label: "Withdrawal request submitted", timestamp: today, completed: true },
        { label: "Payout approved by finance", timestamp: "—", completed: false },
        { label: "Transfer sent to " + selectedType, timestamp: "—", completed: false },
        { label: "Funds received by affiliate", timestamp: "—", completed: false },
      ],
    };

    // এখানেই আসল সাবমিট হয়, কিন্তু মডাল সাথে সাথে বন্ধ হয় না —
    // আগে success state দেখানো হয়, তারপর "Done" চাপলে বন্ধ হবে।
    setSubmittedRequest(newRequest);
    setIsSubmitted(true);
    onSubmit(newRequest);
  };

  const handleDone = () => {
    onClose();
  };

  // ================= SUCCESS VIEW =================
  if (isSubmitted && submittedRequest) {
    return (
      <ModalOverlay
        title="Request Submitted"
        subtitle="We've received your withdrawal request."
        onClose={handleDone}
        footer={
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleDone}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors"
            >
              Done
            </button>
          </div>
        }
      >
        <div className="flex flex-col items-center text-center py-4 animate-fade-up">
          <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mb-4">
            <CheckCircle2 className="w-9 h-9 text-emerald-500" />
          </div>

          <h3 className="text-lg font-bold text-slate-900">
            ৳{submittedRequest.amount} withdrawal requested
          </h3>
          <p className="text-sm text-slate-500 mt-1.5 max-w-xs">
            Your request has been sent for review. You'll be notified once it's approved.
          </p>

          <div className="w-full mt-6 rounded-xl bg-slate-50 divide-y divide-slate-200 text-left">
            <div className="flex items-center justify-between px-4 py-3">
              <span className="text-xs font-medium text-slate-500">Request ID</span>
              <span className="text-sm font-bold text-slate-900">{submittedRequest.id}</span>
            </div>
            <div className="flex items-center justify-between px-4 py-3">
              <span className="text-xs font-medium text-slate-500">Payment Method</span>
              <span className="text-sm font-semibold text-slate-800">{submittedRequest.method}</span>
            </div>
            <div className="flex items-center justify-between px-4 py-3">
              <span className="text-xs font-medium text-slate-500">Status</span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                Pending
              </span>
            </div>
          </div>
        </div>
      </ModalOverlay>
    );
  }

  // ================= FORM VIEW =================
  return (
    <ModalOverlay
      title="Request Withdrawal"
      subtitle="Payouts are reviewed within 1-3 business days."
      onClose={onClose}
      footer={
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Minimum withdrawal: ৳500</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              Processing time: 1-3 business days
            </span>
          </div>
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
              Submit Request
            </button>
          </div>
        </div>
      }
    >
      <div className="flex items-center justify-between rounded-xl bg-indigo-50 px-4 py-3">
        <span className="text-sm font-semibold text-indigo-700">Available Balance</span>
        <span className="text-lg font-bold text-indigo-900">৳{availableBalance}</span>
      </div>

      {errorMessage ? (
        <div className="rounded-xl bg-red-50 border border-red-100 px-4 py-2.5 text-sm text-red-600 font-medium">
          {errorMessage}
        </div>
      ) : null}

      <div>
        <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="৳ 0.00"
          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <div className="flex gap-2 mt-2">
          {QUICK_AMOUNTS.map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setAmount(value.toString())}
              className="px-3 py-1.5 rounded-full bg-slate-100 text-xs font-semibold text-slate-600 hover:bg-slate-200 transition-colors"
            >
              ৳{value.toLocaleString()}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-xs font-semibold text-slate-600 mb-2 block">Payment Method</label>
        <div className="grid grid-cols-3 gap-2">
          {PAYMENT_METHOD_TYPES.map((option) => {
            const Icon = METHOD_ICONS[option];
            const isSelected = selectedType === option;
            return (
              <button
                key={option}
                type="button"
                onClick={() => setSelectedType(option)}
                className={
                  "flex flex-col items-center gap-1.5 rounded-xl border-2 py-3 text-xs font-semibold transition-colors " +
                  (isSelected
                    ? "border-indigo-500 text-indigo-700 bg-indigo-50"
                    : "border-slate-200 text-slate-600 hover:border-slate-300")
                }
              >
                <Icon className="w-4 h-4" />
                {option}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Account Number</label>
        <input
          type="text"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          placeholder="01712-345678"
          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Note (optional)</label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Add any details for the finance team..."
          rows={3}
          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
    </ModalOverlay>
  );
}