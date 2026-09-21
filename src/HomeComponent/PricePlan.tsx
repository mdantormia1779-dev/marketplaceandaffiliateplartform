"use client";

import React, { memo, useState } from "react";
import {
  Check,
  ChevronRight,
  ShieldCheck,
  Store,
  Package,
  Headphones,
  BadgeCheck,
} from "lucide-react";

import PaymentCheckout from "./PaymentCheckout";

export type Plan = {
  name: string;
  description: string;
  monthlyPrice: number;
  popular: boolean;
  products: string;
  orders: string;
  support: string;
  features: string[];
};

const plans: Plan[] = [
  {
    name: "Basic",
    description: "For new suppliers getting started",
    monthlyPrice: 500,
    popular: false,
    products: "20",
    orders: "50",
    support: "Standard",
    features: [
      "Basic supplier storefront",
      "Order management",
      "Sales overview",
      "Standard support",
    ],
  },
  {
    name: "Professional",
    description: "For growing online businesses",
    monthlyPrice: 1000,
    popular: true,
    products: "100",
    orders: "500",
    support: "Priority",
    features: [
      "Advanced supplier storefront",
      "Advanced sales analytics",
      "Priority support",
      "Marketing campaigns",
      "Affiliate product promotion",
    ],
  },
  {
    name: "Business",
    description: "For established suppliers",
    monthlyPrice: 2000,
    popular: false,
    products: "Unlimited",
    orders: "Unlimited",
    support: "Priority",
    features: [
      "Premium supplier storefront",
      "Advanced analytics",
      "Priority support",
      "Campaign management",
      "Featured product opportunities",
    ],
  },
];

const PricePlan = memo(function PricePlan() {
  // Selected subscription plan
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  // false = Monthly
  // true = Yearly
  const [isYearly, setIsYearly] = useState(false);

  /**
   * Calculate subscription price.
   *
   * Monthly:
   * 500
   * 1000
   * 2000
   *
   * Yearly:
   * monthly × 12 × 80%
   *
   * Example:
   * 1000 × 12 × 0.8 = 9600
   */
  const getPrice = (monthlyPrice: number): number => {
    return isYearly ? monthlyPrice * 12 * 0.8 : monthlyPrice;
  };

  /**
   * Open checkout modal
   */
  const handleSelectPlan = (plan: Plan) => {
    setSelectedPlan(plan);
  };

  /**
   * Close checkout modal
   */
  const handleCloseCheckout = () => {
    setSelectedPlan(null);
  };

  return (
    <>
      <section className="min-h-screen bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">

          {/* ================= HEADER ================= */}
          <div className="mx-auto max-w-2xl text-center">

            {/* Badge */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
              <ShieldCheck size={14} />
              Supplier Subscription
            </div>

            {/* Heading */}
            <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
              Choose the right plan for your store
            </h1>

            {/* Description */}
            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
              Flexible subscription plans designed to help suppliers grow,
              manage products and increase sales.
            </p>

            {/* ================= BILLING TOGGLE ================= */}
            <div className="mt-8 flex items-center justify-center">
              <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white p-1.5 shadow-sm">

                {/* Monthly */}
                <button
                  type="button"
                  onClick={() => setIsYearly(false)}
                  className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200 ${
                    !isYearly
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  Monthly
                </button>

                {/* Yearly */}
                <button
                  type="button"
                  onClick={() => setIsYearly(true)}
                  className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                    isYearly
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  Yearly

                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      isYearly
                        ? "bg-white/20 text-white"
                        : "bg-emerald-50 text-emerald-600"
                    }`}
                  >
                    SAVE 20%
                  </span>
                </button>

              </div>
            </div>
          </div>

          {/* ================= PRICING PLANS ================= */}
          <div className="mt-10 grid gap-6 lg:grid-cols-3">

            {plans.map((plan) => {
              const price = getPrice(plan.monthlyPrice);

              return (
                <div
                  key={plan.name}
                  className={`relative flex flex-col rounded-3xl border bg-white p-6 transition-all duration-300 ${
                    plan.popular
                      ? "border-indigo-500 shadow-[0_20px_50px_-20px_rgba(79,70,229,0.35)] lg:-translate-y-2"
                      : "border-slate-200 shadow-sm hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg"
                  }`}
                >

                  {/* ================= POPULAR BADGE ================= */}
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="whitespace-nowrap rounded-full bg-indigo-600 px-4 py-1.5 text-[10px] font-bold tracking-wide text-white shadow-md">
                        MOST POPULAR
                      </span>
                    </div>
                  )}

                  {/* ================= PLAN HEADER ================= */}
                  <div>
                    <div className="flex items-center justify-between">

                      <h2 className="text-lg font-bold text-slate-950">
                        {plan.name}
                      </h2>

                      {plan.popular && (
                        <BadgeCheck
                          size={20}
                          className="text-indigo-600"
                        />
                      )}

                    </div>

                    <p className="mt-2 min-h-10 text-sm leading-5 text-slate-500">
                      {plan.description}
                    </p>
                  </div>

                  {/* ================= PRICE ================= */}
                  <div className="mt-7 border-b border-slate-100 pb-7">

                    <div className="flex items-end gap-2">

                      <span className="text-sm font-medium text-slate-500">
                        ৳
                      </span>

                      <span className="text-4xl font-bold tracking-tight text-slate-950">
                        {price.toLocaleString("en-BD")}
                      </span>

                      <span className="mb-1 text-sm text-slate-400">
                        / {isYearly ? "year" : "month"}
                      </span>

                    </div>

                    <div className="mt-2 flex items-center gap-2">

                      <p className="text-xs text-slate-400">
                        Flexible{" "}
                        {isYearly ? "yearly" : "monthly"} subscription
                      </p>

                      {isYearly && (
                        <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-600">
                          Save 20%
                        </span>
                      )}

                    </div>
                  </div>

                  {/* ================= QUICK STATS ================= */}
                  <div className="mt-6 grid grid-cols-3 gap-2">

                    {/* Products */}
                    <div className="rounded-xl bg-slate-50 p-3 text-center">
                      <Package
                        size={16}
                        className="mx-auto mb-1.5 text-slate-500"
                      />

                      <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
                        Products
                      </p>

                      <p className="mt-1 text-xs font-bold text-slate-800">
                        {plan.products}
                      </p>
                    </div>

                    {/* Orders */}
                    <div className="rounded-xl bg-slate-50 p-3 text-center">
                      <Store
                        size={16}
                        className="mx-auto mb-1.5 text-slate-500"
                      />

                      <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
                        Orders
                      </p>

                      <p className="mt-1 text-xs font-bold text-slate-800">
                        {plan.orders}
                      </p>
                    </div>

                    {/* Support */}
                    <div className="rounded-xl bg-slate-50 p-3 text-center">
                      <Headphones
                        size={16}
                        className="mx-auto mb-1.5 text-slate-500"
                      />

                      <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
                        Support
                      </p>

                      <p className="mt-1 text-xs font-bold text-slate-800">
                        {plan.support}
                      </p>
                    </div>

                  </div>

                  {/* ================= FEATURES ================= */}
                  <div className="mt-7 flex-1">

                    <p className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                      What's included
                    </p>

                    <ul className="space-y-3">

                      {plan.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-3 text-sm text-slate-600"
                        >
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50">
                            <Check
                              size={13}
                              strokeWidth={2.5}
                              className="text-emerald-600"
                            />
                          </span>

                          <span>{feature}</span>
                        </li>
                      ))}

                    </ul>
                  </div>

                  {/* ================= CTA ================= */}
                  <button
                    type="button"
                    onClick={() => handleSelectPlan(plan)}
                    className={`mt-8 flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-200 ${
                      plan.popular
                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700"
                        : "border border-slate-200 bg-white text-slate-800 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
                    }`}
                  >
                    {plan.name === "Basic"
                      ? "Get Started"
                      : `Choose ${plan.name}`}

                    <ChevronRight size={16} />
                  </button>

                </div>
              );
            })}

          </div>

          {/* ================= TRUST ================= */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-slate-400">

            <span className="flex items-center gap-2">
              <ShieldCheck size={15} />
              Secure payments
            </span>

            <span className="flex items-center gap-2">
              <Check size={15} />
              Transparent pricing
            </span>

            <span className="flex items-center gap-2">
              <Store size={15} />
              Built for suppliers
            </span>

          </div>

        </div>
      </section>

      {/* ================= PAYMENT CHECKOUT MODAL ================= */}
      {selectedPlan && (
        <PaymentCheckout
          plan={selectedPlan}
          isYearly={isYearly}
          onClose={handleCloseCheckout}
        />
      )}
    </>
  );
});

PricePlan.displayName = "PricePlan";

export default PricePlan;