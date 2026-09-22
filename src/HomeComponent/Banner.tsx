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

      <div className="relative mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
          
          {/* ================= LEFT CONTENT ================= */}
          <div className="relative z-10 max-w-[720px]">
            
            {/* Trust Badge */}
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm">
              <ShieldCheck
                size={18}
                className="text-emerald-500"
                strokeWidth={2}
              />

              <span className="text-sm font-medium text-slate-600">
                Trusted by 2.4M+ shoppers across Bangladesh
              </span>
            </div>

            {/* Heading */}
            <h1 className="max-w-[750px] text-[48px] font-extrabold leading-[1.02] tracking-[-2.5px] text-[#080b16] sm:text-[58px] lg:text-[60px] xl:text-[64px]">
              One marketplace.
              <br />

              <span className="text-[#4865df]">
                Endless opportunity
              </span>{" "}
              to shop,
              <br />

              sell & earn.
            </h1>

            {/* Description */}
            <p className="mt-7 max-w-[690px] text-base leading-7 text-slate-500 sm:text-lg">
              Discover millions of products from verified suppliers, promote
              them through trackable affiliate links, and grow with
              transparent commissions, wallets and payouts — all in one
              platform.
            </p>

            {/* Buttons */}
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
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
            <div className="mt-12 flex flex-wrap gap-x-12 gap-y-6">
              
              <div>
                <div className="text-[29px] font-bold leading-none text-[#0b0f1c]">
                  2.4M+
                </div>

                <div className="mt-2 text-sm text-slate-500">
                  Active shoppers
                </div>
              </div>

              <div>
                <div className="text-[29px] font-bold leading-none text-[#0b0f1c]">
                  18K+
                </div>

                <div className="mt-2 text-sm text-slate-500">
                  Verified suppliers
                </div>
              </div>

              <div>
                <div className="text-[29px] font-bold leading-none text-[#0b0f1c]">
                  42K+
                </div>

                <div className="mt-2 text-sm text-slate-500">
                  Affiliates earning
                </div>
              </div>

            </div>
          </div>

          {/* ================= RIGHT IMAGE ================= */}
          <div className="relative mx-auto w-full max-w-[570px] lg:ml-auto">
            
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
                    h-[430px] w-full object-cover
                    sm:h-[500px]
                    lg:h-[600px]
                  "
                />
              </div>

              {/* ================= AFFILIATE CARD ================= */}
              <div
                className="
                  absolute -left-8 top-12
                  hidden min-w-[220px]
                  rounded-xl border border-slate-100
                  bg-white px-4 py-3
                  shadow-[0_12px_35px_rgba(15,23,42,0.12)]
                  sm:flex sm:items-center sm:gap-3
                  lg:-left-32
                "
              >
                <div
                  className="
                    flex h-11 w-11 shrink-0 items-center
                    justify-center rounded-xl bg-emerald-100
                  "
                >
                  <Link2
                    size={21}
                    className="text-emerald-600"
                  />
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    Affiliate earned today
                  </p>

                  <p className="mt-0.5 text-base font-bold text-slate-900">
                    ৳184,320
                  </p>
                </div>
              </div>

              {/* ================= ORDERS CARD ================= */}
              <div
                className="
                  absolute -right-8 bottom-16
                  hidden min-w-[195px]
                  rounded-xl border border-slate-100
                  bg-white px-4 py-3
                  shadow-[0_12px_35px_rgba(15,23,42,0.12)]
                  sm:flex sm:items-center sm:gap-3
                  lg:-right-32
                "
              >
                <div
                  className="
                    flex h-11 w-11 shrink-0 items-center
                    justify-center rounded-xl bg-blue-50
                  "
                >
                  <Truck
                    size={21}
                    className="text-[#526ee0]"
                  />
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    Orders delivered
                  </p>

                  <p className="mt-0.5 text-base font-bold text-slate-900">
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
        <BadgeCheck
          size={27}
          className="text-emerald-500"
        />
      </div>
    </section>
  );
});

Banner.displayName = "Banner";

export default Banner;