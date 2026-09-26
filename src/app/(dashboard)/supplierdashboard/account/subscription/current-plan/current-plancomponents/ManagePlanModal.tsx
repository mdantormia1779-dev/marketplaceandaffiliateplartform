"use client";

import { useState } from "react";
import {
  ArrowRightLeft,
  Layers,
  Mail,
  Receipt,
  RefreshCw,
  Wallet,
  X,
} from "lucide-react";
import { PlanData } from "./types";
import { formatBDT } from "./utils";

const TIERS = [
  { name: "Starter", price: 990 },
  { name: "Growth", price: 2490 },
  { name: "Pro", price: 4990 },
  { name: "Enterprise", price: 9990 },
] as const;

interface Props {
  plan: PlanData;
  onClose: () => void;
  onToggleAutoRenewal: () => void;
  onChangeBillingCycle?: (cycle: "Monthly" | "Yearly") => void;
  onUpdateBillingEmail?: (email: string) => void;
  onChangePlanTier?: (tierName: string) => void;
}

export default function ManagePlanModal({
  plan,
  onClose,
  onToggleAutoRenewal,
  onChangeBillingCycle,
  onUpdateBillingEmail,
  onChangePlanTier,
}: Props) {
  const isActive = plan.status === "Active";

  const [cycle, setCycle] = useState<"Monthly" | "Yearly">(plan.billingCycle);
  const [email, setEmail] = useState("");
  const [emailSaved, setEmailSaved] = useState(false);
  const [notice, setNotice] = useState("");
  const [selectedTier, setSelectedTier] = useState(plan.planName);
  const [appliedTier, setAppliedTier] = useState(plan.planName);
  const [bkashNumber, setBkashNumber] = useState("01712345678");
  const [editingPayment, setEditingPayment] = useState(false);
  const [bkashDraft, setBkashDraft] = useState(bkashNumber);
  const [bkashError, setBkashError] = useState("");

  const showNotice = (text: string) => {
    setNotice(text);
    setTimeout(() => setNotice(""), 2200);
  };

  const tierChanged = selectedTier !== appliedTier;

  const applyTierChange = () => {
    if (!tierChanged) return;
    onChangePlanTier?.(selectedTier);
    setAppliedTier(selectedTier);
    showNotice(`Switched to the ${selectedTier} plan.`);
  };

  const monthlyPrice = cycle === "Monthly" ? plan.price : Math.round(plan.price / 12);
  const yearlyDiscountPct = 20; // adjust to your actual pricing rule

  const handleCycleSelect = (next: "Monthly" | "Yearly") => {
    setCycle(next);
    onChangeBillingCycle?.(next);
  };

  const startEditingPayment = () => {
    setBkashDraft(bkashNumber);
    setBkashError("");
    setEditingPayment(true);
  };

  const cancelEditingPayment = () => {
    setEditingPayment(false);
    setBkashError("");
  };

  const saveBkashNumber = () => {
    const cleaned = bkashDraft.trim();
    if (!/^01[3-9]\d{8}$/.test(cleaned)) {
      setBkashError("Enter a valid 11-digit bKash number (e.g. 01712345678).");
      return;
    }
    setBkashNumber(cleaned);
    setEditingPayment(false);
    showNotice("bKash number updated.");
  };

  const handleSaveEmail = () => {
    onUpdateBillingEmail?.(email.trim());
    setEmailSaved(true);
    setTimeout(() => setEmailSaved(false), 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <button
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
      />

      {/* Panel */}
      <div className="relative w-full max-w-lg rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div>
            <h3 className="text-base font-semibold text-slate-900">Manage plan</h3>
            <p className="text-xs text-slate-500">{plan.planName} Plan · {formatBDT(plan.price)} / {cycle === "Monthly" ? "month" : "year"}</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <X size={16} />
          </button>
        </div>

        <div className="max-h-[70vh] space-y-5 overflow-y-auto px-6 py-5">
          {/* Billing cycle */}
          <section>
            <p className="mb-2 flex items-center gap-2 text-xs font-semibold text-slate-700">
              <Layers size={14} className="text-blue-600" /> Billing cycle
            </p>
            <div className="grid grid-cols-2 gap-2">
              {(["Monthly", "Yearly"] as const).map((c) => (
                <button
                  key={c}
                  onClick={() => handleCycleSelect(c)}
                  className={`rounded-lg border px-3 py-2.5 text-left text-xs font-medium transition ${
                    cycle === c
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <span className="block font-semibold">{c}</span>
                  <span className="text-[11px] text-slate-500">
                    {c === "Yearly" ? `Save ${yearlyDiscountPct}% billed annually` : "Billed every month"}
                  </span>
                </button>
              ))}
            </div>
            <p className="mt-2 text-[11px] text-slate-400">
              Switching takes effect from your next billing date ({formatBDT(monthlyPrice)}/mo equivalent).
            </p>
          </section>

          {/* Auto-renewal */}
          <section className="flex items-center justify-between rounded-lg border border-slate-100 px-4 py-3">
            <div className="flex items-center gap-2">
              <RefreshCw size={14} className="text-blue-600" />
              <div>
                <p className="text-xs font-semibold text-slate-700">Auto-renewal</p>
                <p className="text-[11px] text-slate-500">
                  {isActive ? "Automatically renews on your billing date" : "Resume your subscription to enable this"}
                </p>
              </div>
            </div>
            <button
              onClick={onToggleAutoRenewal}
              disabled={!isActive}
              className={`relative h-5 w-9 shrink-0 rounded-full transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
                plan.autoRenewal ? "bg-blue-600" : "bg-slate-200"
              }`}
            >
              <span
                className={`absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${
                  plan.autoRenewal ? "translate-x-4" : ""
                }`}
              />
            </button>
          </section>

          {/* Plan tier */}
          <section>
            <p className="mb-2 flex items-center gap-2 text-xs font-semibold text-slate-700">
              <ArrowRightLeft size={14} className="text-blue-600" /> Plan tier
            </p>
            <div className="grid grid-cols-2 gap-2">
              {TIERS.map((t) => (
                <button
                  key={t.name}
                  onClick={() => setSelectedTier(t.name)}
                  className={`rounded-lg border px-3 py-2.5 text-left text-xs font-medium transition ${
                    selectedTier === t.name
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <span className="flex items-center justify-between">
                    <span className="font-semibold">{t.name}</span>
                    {appliedTier === t.name && (
                      <span className="rounded-full bg-emerald-100 px-1.5 py-0.5 text-[9px] font-bold text-emerald-700">
                        Current
                      </span>
                    )}
                  </span>
                  <span className="text-[11px] text-slate-500">{formatBDT(t.price)} / month</span>
                </button>
              ))}
            </div>
            {tierChanged && (
              <p className="mt-2 text-[11px] text-slate-500">
                You&apos;re about to switch from <span className="font-semibold text-slate-700">{appliedTier}</span> to{" "}
                <span className="font-semibold text-slate-700">{selectedTier}</span>.
              </p>
            )}
          </section>

          {/* Payment method */}
          <section>
            <p className="mb-2 flex items-center gap-2 text-xs font-semibold text-slate-700">
              <Wallet size={14} className="text-pink-600" /> Payment method
            </p>
            {!editingPayment ? (
              <div className="flex items-center justify-between rounded-lg border border-slate-100 px-4 py-3">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-md bg-pink-50 text-[10px] font-extrabold text-pink-600">
                    bK
                  </span>
                  <div>
                    <p className="text-xs font-medium text-slate-700">bKash •• {bkashNumber}</p>
                    <p className="text-[11px] text-slate-500">Linked mobile wallet</p>
                  </div>
                </div>
                <button
                  onClick={startEditingPayment}
                  className="rounded-lg border border-slate-200 px-3 py-1.5 text-[11px] font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Update
                </button>
              </div>
            ) : (
              <div className="rounded-lg border border-slate-100 px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-pink-50 text-[10px] font-extrabold text-pink-600">
                    bK
                  </span>
                  <input
                    type="tel"
                    inputMode="numeric"
                    value={bkashDraft}
                    onChange={(e) => {
                      setBkashDraft(e.target.value.replace(/[^\d]/g, "").slice(0, 11));
                      if (bkashError) setBkashError("");
                    }}
                    placeholder="01712345678"
                    className={`h-9 flex-1 rounded-lg border px-3 text-xs text-slate-900 outline-none transition focus:ring-2 ${
                      bkashError
                        ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                        : "border-slate-200 focus:border-pink-500 focus:ring-pink-100"
                    }`}
                  />
                </div>
                {bkashError && <p className="mt-1.5 text-[11px] text-red-600">{bkashError}</p>}
                <div className="mt-2.5 flex justify-end gap-2">
                  <button
                    onClick={cancelEditingPayment}
                    className="rounded-lg px-3 py-1.5 text-[11px] font-semibold text-slate-600 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveBkashNumber}
                    className="rounded-lg bg-pink-600 px-3 py-1.5 text-[11px] font-semibold text-white hover:bg-pink-700"
                  >
                    Save
                  </button>
                </div>
              </div>
            )}
          </section>

          {/* Billing email */}
          <section>
            <p className="mb-2 flex items-center gap-2 text-xs font-semibold text-slate-700">
              <Mail size={14} className="text-blue-600" /> Billing email
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="billing@yourstore.com"
                className="h-9 flex-1 rounded-lg border border-slate-200 px-3 text-xs text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
              <button
                onClick={handleSaveEmail}
                className="rounded-lg bg-slate-900 px-3 text-xs font-semibold text-white hover:bg-slate-800"
              >
                {emailSaved ? "Saved" : "Save"}
              </button>
            </div>
            <p className="mt-1.5 text-[11px] text-slate-400">Invoices and renewal reminders go here.</p>
          </section>
        </div>

        {notice && (
          <div className="mx-6 mb-3 rounded-lg bg-amber-50 px-3 py-2 text-[11px] font-medium text-amber-700">
            {notice}
          </div>
        )}

        <div className="flex items-center justify-between gap-3 border-t border-slate-100 px-6 py-4">
          <button
            onClick={() => showNotice("Invoice history isn't available yet.")}
            className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-600 hover:text-slate-900"
          >
            <Receipt size={13} /> View invoices
          </button>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
            >
              Close
            </button>
            <button
              onClick={applyTierChange}
              disabled={!tierChanged}
              className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
            >
              <ArrowRightLeft size={13} />
              {tierChanged ? `Switch to ${selectedTier}` : "Change plan tier"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}