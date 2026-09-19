"use client";

import React, { useState } from "react";
import {
  FileText,
  SlidersHorizontal,
  MessageSquare,
  Truck,
  RotateCcw,
  CheckCheck,
  ShieldCheck,
  Award,
  Store,
} from "lucide-react";

interface ProductTabsSectionProps {
  productName?: string;
  vendorName?: string;
  reviewCount?: number;
}

export default function ProductTabsSection({
  productName = "Smart Fitness Watch Series 7",
  vendorName = "AudioTech BD",
  reviewCount = 860,
}: ProductTabsSectionProps) {
  const [activeTab, setActiveTab] = useState<string>("description");

  const tabs = [
    { id: "description", label: "Description", icon: FileText },
    { id: "specifications", label: "Specifications", icon: SlidersHorizontal },
    { id: "reviews", label: "Reviews", count: reviewCount, icon: MessageSquare },
    { id: "shipping", label: "Shipping", icon: Truck },
    { id: "return", label: "Return Policy", icon: RotateCcw },
  ];

  const highlights = [
    "1.9-inch AMOLED always-on display",
    "24/7 heart rate, SpO2 and sleep tracking",
    "120+ workout modes with auto detection",
    "Up to 14 days battery life",
    "5ATM water resistance for swimming",
  ];

  return (
    <div className="w-full rounded-2xl border border-gray-100 bg-white shadow-xs font-sans">
      {/* Top Tab Headers */}
      <div className="flex flex-wrap items-center gap-2 border-b border-gray-100 px-6 pt-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex items-center gap-2 pb-4 pt-1 text-xs sm:text-sm font-medium transition-colors ${
                isActive
                  ? "text-blue-600 font-semibold"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              <Icon className={`h-4 w-4 ${isActive ? "text-blue-600" : "text-gray-400"}`} />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-semibold text-gray-600">
                  {tab.count}
                </span>
              )}
              {/* Active Underline Indicator */}
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-blue-600" />
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Content Body */}
      <div className="p-6 sm:p-8">
        {activeTab === "description" && (
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
            {/* Left Description (7 Cols) */}
            <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-gray-600 lg:col-span-7">
              <h3 className="text-base sm:text-lg font-bold text-gray-900">
                About this product
              </h3>

              <p>
                The {productName} keeps your training, recovery and daily activity in one place. A
                bright 1.9-inch AMOLED display stays readable in direct sunlight, while the
                always-on mode keeps your stats at a glance.
              </p>

              <p>
                Track over 120 workout modes, monitor heart rate and blood oxygen around the clock,
                and get sleep insights that actually make sense. With up to 14 days of battery, you
                can leave the charger at home.
              </p>

              <p>
                Sold and shipped by {vendorName} with official warranty, nationwide delivery and full
                buyer protection on Sokoni.
              </p>
            </div>

            {/* Right Key Highlights & Trust Badges (5 Cols) */}
            <div className="space-y-4 lg:col-span-5">
              {/* Highlights Box */}
              <div className="rounded-2xl border border-gray-100 bg-[#F8FAFC]/70 p-5">
                <h4 className="text-xs sm:text-sm font-bold text-gray-900 mb-3.5">
                  Key highlights
                </h4>

                <ul className="space-y-3">
                  {highlights.map((item, index) => (
                    <li key={index} className="flex items-center gap-2.5 text-xs text-gray-700 font-medium">
                      <CheckCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom 3 Trust Badges */}
              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-100 bg-blue-50/60 px-3 py-1 text-[11px] font-semibold text-blue-800">
                  <ShieldCheck className="h-3.5 w-3.5 text-blue-600" />
                  Authentic
                </span>

                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50/70 px-3 py-1 text-[11px] font-semibold text-emerald-800">
                  <Award className="h-3.5 w-3.5 text-emerald-600" />
                  Official warranty
                </span>

                <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-100 bg-indigo-50/60 px-3 py-1 text-[11px] font-semibold text-indigo-800">
                  <Store className="h-3.5 w-3.5 text-indigo-600" />
                  {vendorName}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Placeholder Content for other tabs */}
        {activeTab === "specifications" && (
          <div className="text-xs sm:text-sm text-gray-600 py-4">
            <h3 className="text-base font-bold text-gray-900 mb-2">Technical Specifications</h3>
            <p>1.9-inch AMOLED display, 5ATM water resistance, Bluetooth 5.2, 14-day battery life.</p>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="text-xs sm:text-sm text-gray-600 py-4">
            <h3 className="text-base font-bold text-gray-900 mb-2">Customer Reviews ({reviewCount})</h3>
            <p>Verified buyer reviews and ratings will be listed here.</p>
          </div>
        )}

        {activeTab === "shipping" && (
          <div className="text-xs sm:text-sm text-gray-600 py-4">
            <h3 className="text-base font-bold text-gray-900 mb-2">Shipping Information</h3>
            <p>Standard delivery within 2-4 business days across all regions.</p>
          </div>
        )}

        {activeTab === "return" && (
          <div className="text-xs sm:text-sm text-gray-600 py-4">
            <h3 className="text-base font-bold text-gray-900 mb-2">Return & Refund Policy</h3>
            <p>Enjoy a 7-day hassle-free return window with a 100% money-back guarantee.</p>
          </div>
        )}
      </div>
    </div>
  );
}