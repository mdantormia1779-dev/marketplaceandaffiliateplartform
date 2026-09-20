"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Zap, ArrowRight } from "lucide-react";
import { ProductCard, type Product } from "./product-card";

const flashProducts: Product[] = [
  {
    id: "1",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
    vendor: "AudioTech BD",
    cashback: 12,
    name: "Noise Cancelling Wireless Headphones",
    rating: 4.8,
    reviewCount: 1240,
    price: 8900,
    oldPrice: 12500,
    discountPercent: 29,
    sold: 3120,
    stockLabel: "In Stock",
    stockVariant: "inStock",
    tag: "Best Seller",
  },
  {
    id: "4",
    image:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80",
    vendor: "GlowLab Cosmetics",
    cashback: 18,
    name: "Vitamin C Brightening Face Serum",
    rating: 4.9,
    reviewCount: 1580,
    price: 1190,
    oldPrice: 1800,
    discountPercent: 34,
    sold: 4520,
    stockLabel: "In Stock",
    stockVariant: "inStock",
    tag: "Top Rated",
  },
  {
    id: "6",
    image:
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80",
    vendor: "AudioTech BD",
    cashback: 12,
    name: "Portable Bluetooth Speaker Boom",
    rating: 4.5,
    reviewCount: 480,
    price: 2690,
    oldPrice: 4000,
    discountPercent: 33,
    sold: 1380,
    stockLabel: "In Stock",
    stockVariant: "inStock",
  },
  {
    id: "7",
    // 👉 প্রফেশনাল স্টুডিও শট মেটালিক ইনসুলেটেড ওয়াটার বোতল
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80",
    vendor: "HomeCraft Living",
    cashback: 15,
    name: "Insulated Stainless Steel Water Bottle",
    rating: 4.5,
    reviewCount: 260,
    price: 790,
    oldPrice: 1200,
    discountPercent: 34,
    sold: 1050,
    stockLabel: "In Stock",
    stockVariant: "inStock",
  },
];

export default function FlashSaleSection() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 8,
    minutes: 36,
    seconds: 34,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => String(num).padStart(2, "0");

  return (
    <section className="w-full py-6 font-sans">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white p-3 shadow-xs sm:p-4">
          <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-12">
            
            {/* 🚀 LEFT: Blue Flash Sale Banner (4 Cols) */}
            <div className="flex flex-col justify-between rounded-2xl bg-gradient-to-br from-[#4F46E5] to-[#4338CA] p-6 text-white shadow-sm sm:p-8 lg:col-span-4">
              <div>
                {/* Limited Stock Pill Badge */}
                <div className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-md">
                  <Zap className="h-3.5 w-3.5 fill-white text-white" />
                  <span>LIMITED STOCK</span>
                </div>

                {/* Title & Description */}
                <h3 className="mt-5 text-2xl font-extrabold tracking-tight sm:text-3xl">
                  Flash Sale <br /> up to 45% off
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-indigo-100/90 sm:text-sm">
                  Grab today's biggest deals before the timer runs out. New offers drop every day.
                </p>
              </div>

              {/* Timer & CTA Button */}
              <div className="mt-8 space-y-5">
                <div>
                  <p className="text-[11px] font-semibold tracking-wider text-indigo-200 uppercase">
                    ENDS IN
                  </p>
                  
                  {/* Black Digital Clock Blocks */}
                  <div className="mt-2 flex items-center gap-2 font-mono text-sm font-bold">
                    <span className="flex h-9 w-10 items-center justify-center rounded-lg bg-[#0F172A] text-white shadow-xs">
                      {formatNumber(timeLeft.hours)}
                    </span>
                    <span className="text-base text-white/60">:</span>
                    <span className="flex h-9 w-10 items-center justify-center rounded-lg bg-[#0F172A] text-white shadow-xs">
                      {formatNumber(timeLeft.minutes)}
                    </span>
                    <span className="text-base text-white/60">:</span>
                    <span className="flex h-9 w-10 items-center justify-center rounded-lg bg-[#0F172A] text-white shadow-xs">
                      {formatNumber(timeLeft.seconds)}
                    </span>
                  </div>
                </div>

                {/* Green Shop Flash Deals Button */}
                <Link
                  href="/flash-deals"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#00A76F] px-5 py-3 text-xs font-semibold text-white shadow-sm transition hover:bg-[#008f5d] active:scale-95"
                >
                  Shop Flash Deals <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/*  RIGHT: 4 Product Cards Grid (8 Cols) */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-4 lg:col-span-8">
              {flashProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}