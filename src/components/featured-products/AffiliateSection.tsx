"use client";

import React, { useState } from "react";
import {
  Link2,
  QrCode,
  Share2,
  Image as ImageIcon,
  LayoutGrid,
  Megaphone,
  Sparkles,
  ShieldCheck,
  Check,
} from "lucide-react";

interface AffiliateSectionProps {
  productName?: string;
  price?: number;
  commissionRate?: number;
  cookieDays?: number;
}

export default function AffiliateSection({
  productName = "Smart Fitness Watch Series 7",
  price = 4290,
  commissionRate = 10,
  cookieDays = 30,
}: AffiliateSectionProps) {
  const [isGenerated, setIsGenerated] = useState(false);

  const perSaleCommission = Math.round((price * commissionRate) / 100);

  const affiliateTools = [
    {
      title: "Copy Link",
      desc: "Copy your tracked URL",
      icon: Link2,
    },
    {
      title: "QR Code",
      desc: "Download & print",
      icon: QrCode,
    },
    {
      title: "Social Share",
      desc: "Post in one tap",
      icon: Share2,
    },
    {
      title: "Product Banner",
      desc: "Ready-made creatives",
      icon: ImageIcon,
    },
    {
      title: "Product Card",
      desc: "Embeddable widget",
      icon: LayoutGrid,
    },
    {
      title: "Campaign Link",
      desc: "Eid Campaign 2026",
      icon: Megaphone,
    },
  ];

  const handleGenerateLink = () => {
    setIsGenerated(true);
    setTimeout(() => setIsGenerated(false), 3000);
  };

  return (
    /* Full-width outer wrapper */
    <section className="w-full bg-[#EBF8F2] border-y border-emerald-100/60 font-sans py-12 md:py-16">
      {/* Max-w-7xl centered content */}
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 👉 Changed `items-start` to `items-stretch` so both columns have equal height */}
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
          
          {/* LEFT COLUMN (7 Cols) */}
          <div className="flex flex-col justify-between space-y-6 lg:col-span-7">
            <div>
              {/* Top Pill Badge */}
              <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300 bg-white px-3.5 py-1 text-xs font-semibold text-emerald-800 shadow-[0_1px_2px_rgba(0,0,0,0.04)] mb-4">
                <Link2 className="h-3.5 w-3.5 rotate-45 text-emerald-600" />
                <span>Affiliate Program</span>
              </div>

              {/* Title & Description */}
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  Earn {commissionRate}% commission promoting this product
                </h2>
                <p className="mt-2.5 max-w-xl text-xs sm:text-sm leading-relaxed text-gray-600">
                  Generate a trackable affiliate link in seconds. Share it anywhere, and every sale that
                  comes through your link is credited to your wallet automatically — no upfront cost,
                  paid out monthly.
                </p>
              </div>
            </div>

            <div className="space-y-3.5">
              {/* 3 Stats Cards */}
              <div className="grid grid-cols-3 gap-3.5">
                <div className="rounded-2xl border border-white/60 bg-white p-4 sm:p-5 shadow-xs">
                  <span className="text-lg sm:text-xl font-bold text-gray-900">
                    {commissionRate}%
                  </span>
                  <p className="mt-1 text-[11px] font-semibold tracking-wider text-gray-400 uppercase">
                    COMMISSION
                  </p>
                </div>

                <div className="rounded-2xl border border-white/60 bg-white p-4 sm:p-5 shadow-xs">
                  <span className="text-lg sm:text-xl font-bold text-gray-900">
                    ৳{perSaleCommission}
                  </span>
                  <p className="mt-1 text-[11px] font-semibold tracking-wider text-gray-400 uppercase">
                    PER SALE
                  </p>
                </div>

                <div className="rounded-2xl border border-white/60 bg-white p-4 sm:p-5 shadow-xs">
                  <span className="text-lg sm:text-xl font-bold text-gray-900">
                    {cookieDays} days
                  </span>
                  <p className="mt-1 text-[11px] font-semibold tracking-wider text-gray-400 uppercase">
                    COOKIE WINDOW
                  </p>
                </div>
              </div>

              {/* 6 Feature Tools Grid */}
              <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-3">
                {affiliateTools.map((tool, index) => {
                  const Icon = tool.icon;
                  return (
                    <div
                      key={index}
                      className="group flex flex-col justify-between rounded-2xl border border-white/60 bg-white p-4 shadow-xs transition hover:border-emerald-200 hover:shadow-sm cursor-pointer"
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition group-hover:bg-emerald-100">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="mt-4">
                        <h4 className="text-xs font-bold text-gray-900">{tool.title}</h4>
                        <p className="mt-0.5 text-[11px] text-gray-400">{tool.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Affiliate Link Generator (5 Cols) */}
          {/* 👉 Added `h-full` to the outer div to stretch it to match left column */}
          <div className="lg:col-span-5 h-full">
            {/* 👉 Flex container that stretches and distributes internal space */}
            <div className="flex h-full flex-col rounded-3xl border border-white/80 bg-white p-6 shadow-sm">
              {/* Header Bar */}
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <h3 className="text-sm sm:text-base font-bold text-gray-900">
                  Affiliate Link Generator
                </h3>
                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[11px] font-medium text-emerald-700">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                  Active
                </span>
              </div>

              {/* Inner Dashed Action Box */}
              {/* 👉 Added `flex-1` and `mt-5` to stretch this dashed container perfectly inside the white card */}
              <div className="mt-5 flex flex-1 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-emerald-300/80 bg-emerald-50/25 px-6 text-center">
                {/* Center Green Circle Icon */}
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#00A76F] text-white shadow-md shadow-emerald-600/20">
                  <Link2 className="h-5 w-5 rotate-45" />
                </div>

                <h4 className="mt-4 text-sm sm:text-base font-bold text-gray-900">
                  Generate your tracked link
                </h4>
                <p className="mt-1.5 max-w-[280px] sm:max-w-xs text-xs text-gray-500 leading-relaxed">
                  Create a unique link for {productName}. Clicks, orders and commission are tracked
                  automatically.
                </p>

                {/* Primary Button */}
                <button
                  onClick={handleGenerateLink}
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-[#00A76F] px-6 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-[#008f5d] active:scale-95 transition"
                >
                  {isGenerated ? (
                    <>
                      <Check className="h-4 w-4" /> Link Generated!
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" /> Generate Affiliate Link
                    </>
                  )}
                </button>

                {/* Footnote */}
                <p className="mt-4 text-[11px] text-gray-400">
                  Free to join · Paid out monthly · No monthly fees
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}