import React, { memo } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Box,
  Link2,
  ShieldCheck,
  Store,
  Truck,
} from "lucide-react";
import Image from "next/image";
import BannerImage from "../images/banner-products.jpg";

const Banner = memo(() => {
  return (
    <section className="relative overflow-hidden bg-[#f7f9fc]">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -bottom-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-emerald-100/50 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 py-9 sm:px-8 sm:py-12 lg:px-12 xl:px-16">
        <div className="grid items-center gap-8 sm:gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 xl:gap-20">
          {/* ================= LEFT CONTENT ================= */}
          <div className="relative z-10 max-w-[720px]">
            {/* Trust Badge */}
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm">
              <ShieldCheck size={18} className="text-emerald-500" strokeWidth={2} />
              <span className="text-sm font-medium text-slate-600">
                Trusted by 2.4M+ shoppers across Bangladesh
              </span>
            </div>

            {/* Heading */}
            <h1 className="max-w-[700px] text-[32px] font-extrabold leading-[1.08] tracking-[-1px] text-[#080b16] sm:text-[40px] sm:tracking-[-1.5px] md:text-[46px] lg:text-[42px] lg:tracking-[-2px] xl:text-[50px] 2xl:text-[54px]">
              One marketplace.
              <br />
              <span className="text-[#4865df]">Endless opportunity</span> to
              shop,
              <br />
              sell &amp; earn.
            </h1>

            {/* Description */}
            <p className="mt-7 max-w-[690px] text-base leading-7 text-slate-500 sm:text-lg">
              Discover millions of products from verified suppliers, promote
              them through trackable affiliate links, and grow with
              transparent commissions, wallets and payouts — all in one
              platform.
            </p>

            {/* Buttons */}
            <div className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row">
              <button
                className="
                  group inline-flex h-[54px] items-center justify-center
                  gap-3 rounded-lg bg-[#536fe4] px-7
                  text-base font-semibold text-white
                  shadow-[0_8px_20px_rgba(83,111,228,0.2)]
                  transition-all duration-300
                  hover:-translate-y-0.5
                  hover:bg-[#435fd4]
                "
              >
                <Box size={19} strokeWidth={2} />
                <span>Shop Now</span>
                <ArrowRight
                  size={19}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>

              <button
                className="
                  inline-flex h-[54px] items-center justify-center
                  gap-3 rounded-lg border border-slate-200
                  bg-white px-7 text-base font-semibold
                  text-slate-800 shadow-sm
                  transition-all duration-300
                  hover:-translate-y-0.5 hover:border-slate-300
                  hover:shadow-md
                "
              >
                <Store size={19} strokeWidth={2} />
                <span>Become a Supplier</span>
              </button>
            </div>

            {/* Statistics */}
            <div className="mt-10 grid grid-cols-3 gap-x-4 gap-y-6 sm:mt-12 sm:flex sm:flex-wrap sm:gap-x-12 sm:gap-y-6">
              <div>
                <div className="text-[22px] font-bold leading-none text-[#0b0f1c] sm:text-[29px]">
                  2.4M+
                </div>
                <div className="mt-2 text-xs text-slate-500 sm:text-sm">Active shoppers</div>
              </div>

              <div>
                <div className="text-[22px] font-bold leading-none text-[#0b0f1c] sm:text-[29px]">
                  18K+
                </div>
                <div className="mt-2 text-xs text-slate-500 sm:text-sm">Verified suppliers</div>
              </div>

              <div>
                <div className="text-[22px] font-bold leading-none text-[#0b0f1c] sm:text-[29px]">
                  42K+
                </div>
                <div className="mt-2 text-xs text-slate-500 sm:text-sm">Affiliates earning</div>
              </div>
            </div>
          </div>

          {/* ================= RIGHT IMAGE ================= */}
          <div className="relative mx-auto w-full max-w-[420px] sm:max-w-[480px] lg:ml-auto lg:max-w-[570px]">
            {/* Main Image */}
            <div className="relative overflow-visible">
              <div
                className="
                  relative overflow-hidden rounded-[14px]
                  shadow-[0_25px_60px_rgba(15,23,42,0.12)]
                "
              >
                <Image
                  width={570}
                  height={600}
                  src={BannerImage}
                  alt="Marketplace products"
                  className="
                    h-[260px] w-full object-cover
                    sm:h-[400px]
                    lg:h-[460px]
                    xl:h-[600px]
                  "
                />
              </div>

              {/* ================= AFFILIATE CARD ================= */}
              <div
                className="
                  absolute left-3 top-4
                  flex min-w-[170px] items-center gap-2.5
                  rounded-xl border border-slate-100
                  bg-white px-3 py-2.5
                  shadow-[0_12px_35px_rgba(15,23,42,0.12)]
                  sm:left-4 sm:top-6 sm:min-w-[200px] sm:gap-3 sm:px-4 sm:py-3
                  lg:-left-8 lg:top-8
                  xl:min-w-[220px]
                "
              >
                <div
                  className="
                    flex h-9 w-9 shrink-0 items-center
                    justify-center rounded-xl bg-emerald-100
                    sm:h-11 sm:w-11
                  "
                >
                  <Link2 size={19} className="text-emerald-600 sm:hidden" />
                  <Link2 size={21} className="hidden text-emerald-600 sm:block" />
                </div>

                <div>
                  <p className="text-xs text-slate-500 sm:text-sm">
                    Affiliate earned today
                  </p>
                  <p className="mt-0.5 text-sm font-bold text-slate-900 sm:text-base">
                    ৳184,320
                  </p>
                </div>
              </div>

              {/* ================= ORDERS CARD ================= */}
              <div
                className="
                  absolute bottom-4 right-3
                  flex min-w-[155px] items-center gap-2.5
                  rounded-xl border border-slate-100
                  bg-white px-3 py-2.5
                  shadow-[0_12px_35px_rgba(15,23,42,0.12)]
                  sm:bottom-6 sm:right-4 sm:min-w-[185px] sm:gap-3 sm:px-4 sm:py-3
                  lg:-right-8 lg:bottom-8
                  xl:min-w-[195px]
                "
              >
                <div
                  className="
                    flex h-9 w-9 shrink-0 items-center
                    justify-center rounded-xl bg-blue-50
                    sm:h-11 sm:w-11
                  "
                >
                  <Truck size={19} className="text-[#526ee0] sm:hidden" />
                  <Truck size={21} className="hidden text-[#526ee0] sm:block" />
                </div>

                <div>
                  <p className="text-xs text-slate-500 sm:text-sm">
                    Orders delivered
                  </p>
                  <p className="mt-0.5 text-sm font-bold text-slate-900 sm:text-base">
                    128,940
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Small floating icon */}
      <div
        className="
          absolute bottom-5 right-5 hidden
          h-14 w-14 items-center justify-center
          rounded-full border border-slate-200
          bg-white shadow-lg lg:flex
        "
      >
        <BadgeCheck size={27} className="text-emerald-500" />
      </div>
    </section>
  );
});

Banner.displayName = "Banner";

export default Banner;