"use client";

import React, { memo, useState } from "react";
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  Clipboard,
  Copy,
  CreditCard,
  Info,
  LockKeyhole,
  Receipt,
  ShieldCheck,
  Smartphone,
  Tag,
  X,
} from "lucide-react";

type Plan = {
  name: string;
  description: string;
  monthlyPrice: number;
  popular: boolean;
  products: string;
  orders: string;
  support: string;
  features: string[];
};

type PaymentCheckoutProps = {
  plan: Plan;
  isYearly: boolean;
  onClose: () => void;
};

const PaymentCheckout = memo(function PaymentCheckout({
  plan,
  isYearly,
  onClose,
}: PaymentCheckoutProps) {
  const [senderNumber, setSenderNumber] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [copied, setCopied] = useState(false);

  const targetNumber = "01318964063";

  // 20% yearly discount
  const price = isYearly
    ? plan.monthlyPrice * 12 * 0.8
    : plan.monthlyPrice;

  const billingInterval = isYearly ? "Annual" : "Monthly";

  const copyNumber = async () => {
    try {
      await navigator.clipboard.writeText(targetNumber);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy number:", error);
    }
  };

  const handleApplyCoupon = () => {
    if (!coupon.trim()) return;

    setCouponApplied(true);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log({
      plan: plan.name,
      billingInterval,
      amount: price,
      senderNumber,
      transactionId,
      coupon,
    });

    // UI only for now.
    // Backend/payment verification will be connected later.
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-sm">
      <div className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">

          {/* ================= HEADER ================= */}
          <div className="mb-5 flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-white/90 transition hover:bg-white/10 hover:text-white"
            >
              <ArrowLeft size={17} />
              Back to Plans
            </button>

            <button
              type="button"
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
              aria-label="Close checkout"
            >
              <X size={18} />
            </button>
          </div>

          {/* ================= CHECKOUT CARD ================= */}
          <div className="overflow-hidden rounded-3xl bg-slate-50 shadow-2xl">

            {/* Top Header */}
            <div className="border-b border-slate-200 bg-white px-6 py-6 sm:px-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                      <CreditCard size={18} />
                    </div>

                    <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
                      Supplier Subscription
                    </span>
                  </div>

                  <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                    Complete your subscription
                  </h1>

                  <p className="mt-1 text-sm text-slate-500">
                    Submit your bKash transaction for manual verification.
                  </p>
                </div>

                <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">
                  <ShieldCheck size={15} />
                  Secure Payment
                </div>

              </div>
            </div>

            {/* ================= CONTENT ================= */}
            <div className="grid lg:grid-cols-[1fr_360px]">

              {/* ================= LEFT ================= */}
              <div className="border-b border-slate-200 bg-white p-6 sm:p-8 lg:border-b-0 lg:border-r">

                {/* Payment Method */}
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <h2 className="text-base font-bold text-slate-950">
                        Payment Method
                      </h2>

                      <p className="mt-1 text-xs text-slate-500">
                        Complete the payment using manual bKash Send Money.
                      </p>
                    </div>
                  </div>

                  {/* bKash Method */}
                  <div className="rounded-2xl border border-pink-200 bg-pink-50/50 p-4">
                    <div className="flex items-center gap-4">

                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-600 text-lg font-bold text-white">
                        bK
                      </div>

                      <div className="flex-1">
                        <h3 className="text-sm font-bold text-slate-950">
                          bKash
                        </h3>

                        <p className="mt-1 text-xs text-slate-500">
                          Manual Send Money
                        </p>
                      </div>

                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-pink-600 text-white">
                        <Check size={14} />
                      </div>

                    </div>
                  </div>
                </div>

                {/* ================= SEND MONEY STEPS ================= */}
                <div className="mt-8">

                  <div className="mb-5">
                    <h2 className="text-base font-bold text-slate-950">
                      Send Money Steps
                    </h2>

                    <p className="mt-1 text-xs text-slate-500">
                      Follow these steps to complete your bKash payment.
                    </p>
                  </div>

                  <div className="space-y-5">

                    {/* Step 1 */}
                    <div className="flex gap-4">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-xs font-bold text-indigo-600">
                        01
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-slate-800">
                          Open bKash App or dial *247#
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          Use your Personal or Merchant bKash account.
                        </p>
                      </div>
                    </div>

                    {/* Step 2 */}
                    <div className="flex gap-4">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-xs font-bold text-indigo-600">
                        02
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-slate-800">
                          Select Send Money
                        </p>
                      </div>
                    </div>

                    {/* Step 3 */}
                    <div className="flex gap-4">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-xs font-bold text-indigo-600">
                        03
                      </div>

                      <div className="w-full">
                        <p className="text-sm font-semibold text-slate-800">
                          Enter bKash Number
                        </p>

                        <div className="mt-2 flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-3">

                          <span className="font-mono text-sm font-bold text-slate-900">
                            {targetNumber}
                          </span>

                          <button
                            type="button"
                            onClick={copyNumber}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700"
                          >
                            {copied ? (
                              <>
                                <Check size={14} />
                                Copied
                              </>
                            ) : (
                              <>
                                <Copy size={14} />
                                Copy
                              </>
                            )}
                          </button>

                        </div>
                      </div>
                    </div>

                    {/* Step 4 */}
                    <div className="flex gap-4">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-xs font-bold text-indigo-600">
                        04
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-slate-800">
                          Enter the exact amount
                        </p>

                        <p className="mt-1 text-lg font-bold text-slate-950">
                          ৳{price.toLocaleString("en-BD")}
                        </p>
                      </div>
                    </div>

                    {/* Step 5 */}
                    <div className="flex gap-4">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-xs font-bold text-indigo-600">
                        05
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-slate-800">
                          Complete the transaction
                        </p>
                      </div>
                    </div>

                    {/* Step 6 */}
                    <div className="flex gap-4">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-xs font-bold text-indigo-600">
                        06
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-slate-800">
                          Save your TrxID
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          You&apos;ll need the transaction ID below.
                        </p>
                      </div>
                    </div>

                  </div>
                </div>

                {/* ================= VERIFICATION FORM ================= */}
                <form
                  onSubmit={handleSubmit}
                  className="mt-8 border-t border-slate-200 pt-8"
                >

                  <div className="mb-5">
                    <h2 className="text-base font-bold text-slate-950">
                      Payment Verification
                    </h2>

                    <p className="mt-1 text-xs text-slate-500">
                      Enter the details from your completed bKash transaction.
                    </p>
                  </div>

                  <div className="space-y-5">

                    {/* Sender Number */}
                    <div>
                      <label
                        htmlFor="senderNumber"
                        className="mb-2 block text-sm font-semibold text-slate-800"
                      >
                        Sender bKash Number
                        <span className="ml-1 text-red-500">*</span>
                      </label>

                      <div className="relative">
                        <Smartphone
                          size={17}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                          id="senderNumber"
                          type="tel"
                          value={senderNumber}
                          onChange={(event) =>
                            setSenderNumber(event.target.value)
                          }
                          placeholder="017xxxxxxxx"
                          required
                          className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
                        />
                      </div>
                    </div>

                    {/* Transaction ID */}
                    <div>
                      <label
                        htmlFor="transactionId"
                        className="mb-2 block text-sm font-semibold text-slate-800"
                      >
                        Transaction ID (TrxID)
                        <span className="ml-1 text-red-500">*</span>
                      </label>

                      <div className="relative">
                        <Receipt
                          size={17}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                          id="transactionId"
                          type="text"
                          value={transactionId}
                          onChange={(event) =>
                            setTransactionId(event.target.value)
                          }
                          placeholder="e.g. 9G8H7F6E"
                          required
                          className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm uppercase text-slate-900 outline-none transition placeholder:normal-case placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
                        />
                      </div>
                    </div>

                    {/* Coupon */}
                    <div>
                      <label
                        htmlFor="coupon"
                        className="mb-2 block text-sm font-semibold text-slate-800"
                      >
                        Promo / Coupon Code
                      </label>

                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <Tag
                            size={17}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                          />

                          <input
                            id="coupon"
                            type="text"
                            value={coupon}
                            onChange={(event) =>
                              setCoupon(event.target.value)
                            }
                            placeholder="Enter coupon e.g. LAUNCH50"
                            className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm uppercase text-slate-900 outline-none transition placeholder:normal-case placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
                          />
                        </div>

                        <button
                          type="button"
                          onClick={handleApplyCoupon}
                          className="rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
                        >
                          Apply
                        </button>
                      </div>

                      {couponApplied && (
                        <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-emerald-600">
                          <CheckCircle2 size={14} />
                          Coupon applied successfully.
                        </p>
                      )}
                    </div>

                    {/* Notice */}
                    <div className="flex gap-3 rounded-xl border border-amber-100 bg-amber-50 p-4">
                      <Info
                        size={17}
                        className="mt-0.5 shrink-0 text-amber-600"
                      />

                      <p className="text-xs leading-5 text-amber-800">
                        Make sure the sender number and TrxID exactly match
                        your bKash transaction before submitting.
                      </p>
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700"
                    >
                      <ShieldCheck size={17} />
                      Submit Payment for Verification
                    </button>

                  </div>
                </form>
              </div>

              {/* ================= RIGHT SUMMARY ================= */}
              <aside className="bg-slate-50 p-6 sm:p-8">

                <div className="sticky top-6">

                  <div className="flex items-center gap-2">
                    <LockKeyhole
                      size={17}
                      className="text-indigo-600"
                    />

                    <h2 className="text-base font-bold text-slate-950">
                      Summary of Charges
                    </h2>
                  </div>

                  {/* Plan */}
                  <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-5">

                    <div className="flex items-start justify-between gap-4">

                      <div>
                        <p className="text-xs text-slate-400">
                          Plan Package
                        </p>

                        <p className="mt-1 text-base font-bold text-slate-950">
                          {plan.name}
                        </p>
                      </div>

                      {plan.popular && (
                        <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-[10px] font-bold text-indigo-600">
                          POPULAR
                        </span>
                      )}

                    </div>

                    <div className="my-5 border-t border-slate-100" />

                    {/* Billing */}
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-sm text-slate-500">
                        Billing Interval
                      </span>

                      <span className="text-sm font-semibold text-slate-900">
                        {billingInterval}
                      </span>
                    </div>

                    {isYearly && (
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-sm text-slate-500">
                          Annual Discount
                        </span>

                        <span className="text-xs font-bold text-emerald-600">
                          Save 20%
                        </span>
                      </div>
                    )}

                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-sm text-slate-500">
                        Base Price
                      </span>

                      <span className="text-sm font-semibold text-slate-900">
                        ৳{price.toLocaleString("en-BD")}
                      </span>
                    </div>

                    {couponApplied && (
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-sm text-slate-500">
                          Coupon
                        </span>

                        <span className="text-xs font-semibold text-emerald-600">
                          Applied
                        </span>
                      </div>
                    )}

                    <div className="my-5 border-t border-dashed border-slate-200" />

                    <div className="flex items-end justify-between gap-4">

                      <div>
                        <p className="text-xs text-slate-400">
                          Total Payable
                        </p>

                        <p className="mt-1 text-2xl font-bold tracking-tight text-slate-950">
                          ৳{price.toLocaleString("en-BD")}
                        </p>
                      </div>

                      <span className="mb-1 rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-bold text-amber-700">
                        PENDING
                      </span>

                    </div>

                  </div>

                  {/* Target Number */}
                  <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-5">

                    <p className="text-xs font-medium text-slate-400">
                      Target bKash Number
                    </p>

                    <div className="mt-2 flex items-center justify-between gap-3">

                      <span className="font-mono text-base font-bold tracking-wide text-slate-950">
                        {targetNumber}
                      </span>

                      <button
                        type="button"
                        onClick={copyNumber}
                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-500 transition hover:bg-indigo-50 hover:text-indigo-600"
                        aria-label="Copy bKash number"
                      >
                        {copied ? (
                          <Check size={16} />
                        ) : (
                          <Clipboard size={16} />
                        )}
                      </button>

                    </div>

                  </div>

                  {/* Verification Notice */}
                  <div className="mt-4 rounded-2xl border border-indigo-100 bg-indigo-50 p-4">

                    <div className="flex gap-3">

                      <ShieldCheck
                        size={18}
                        className="mt-0.5 shrink-0 text-indigo-600"
                      />

                      <div>
                        <p className="text-xs font-bold text-indigo-900">
                          Manual verification
                        </p>

                        <p className="mt-1 text-xs leading-5 text-indigo-700">
                          Your payment will be reviewed manually after you
                          submit the transaction details.
                        </p>
                      </div>

                    </div>

                  </div>

                </div>
              </aside>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
});

PaymentCheckout.displayName = "PaymentCheckout";

export default PaymentCheckout;