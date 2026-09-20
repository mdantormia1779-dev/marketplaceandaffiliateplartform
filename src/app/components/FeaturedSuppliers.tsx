import Link from "next/link";

import {
  BadgeCheck,
  Box,
  MapPin,
  Store,
  Star,
  Headphones,
  Leaf,
  ShoppingBag,
  Home,
  Dumbbell,
  Sun,
} from "lucide-react";

const suppliers = [
  {
    name: "AudioTech BD",
    description: "Premium audio & smart electronics",
    rating: "4.8",
    reviews: "3,120",
    products: "148",
    location: "Dhaka, BD",
    since: "Since 2022",
    icon: Headphones,
    iconBg: "bg-[#fff5df]",
    iconColor: "text-[#78909c]",
  },
  {
    name: "GlowLab Cosmetics",
    description: "Dermatologist-tested beauty essentials",
    rating: "4.7",
    reviews: "2,380",
    products: "96",
    location: "Chattogram, BD",
    since: "Since 2021",
    icon: Leaf,
    iconBg: "bg-[#f3f8df]",
    iconColor: "text-[#69a33b]",
  },
  {
    name: "UrbanCarry",
    description: "Handcrafted bags & essentials",
    rating: "4.6",
    reviews: "1,540",
    products: "74",
    location: "Dhaka, BD",
    since: "Since 2020",
    icon: ShoppingBag,
    iconBg: "bg-[#fff0d2]",
    iconColor: "text-[#243b53]",
  },
  {
    name: "HomeCraft Living",
    description: "Thoughtful design for modern homes",
    rating: "4.5",
    reviews: "980",
    products: "112",
    location: "Sylhet, BD",
    since: "Since 2023",
    icon: Home,
    iconBg: "bg-[#f4eee5]",
    iconColor: "text-[#d97706]",
  },
  {
    name: "StrideX Sportswear",
    description: "Performance gear for everyday athletes",
    rating: "4.7",
    reviews: "1,870",
    products: "88",
    location: "Dhaka, BD",
    since: "Since 2022",
    icon: Dumbbell,
    iconBg: "bg-[#f7f8fa]",
    iconColor: "text-[#111827]",
  },
  {
    name: "LumenWorks",
    description: "Smart lighting for modern spaces",
    rating: "4.4",
    reviews: "640",
    products: "52",
    location: "Khulna, BD",
    since: "Since 2024",
    icon: Sun,
    iconBg: "bg-[#e9eaee]",
    iconColor: "text-[#526581]",
  },
];

function Rating({
  rating,
  reviews,
}: {
  rating: string;
  reviews: string;
}) {
  return (
    <div className="mt-1 flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={14}
            strokeWidth={1.5}
            className="fill-[#f59e0b] text-[#f59e0b]"
          />
        ))}
      </div>

      <span className="text-[13px] font-medium text-[#334155]">
        {rating}
      </span>

      <span className="text-[13px] text-[#526581]">
        ({reviews})
      </span>
    </div>
  );
}

export default function FeaturedSuppliers() {
  return (
    <section className="w-full bg-[#f7faff] px-5 py-10 md:px-8 lg:px-5 lg:py-10.5">
      <div className="mx-auto max-w-350">
        {/* Header */}
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-[#10b981]" />

              <span className="text-[12px] font-semibold uppercase tracking-[1.5px] text-[#315be7]">
                Verified partners
              </span>
            </div>

            <h2 className="text-[25px] font-semibold leading-[1.2] tracking-[-0.5px] text-[#0b1220]">
              Featured suppliers
            </h2>

            <p className="mt-2 max-w-180 text-[14px] leading-6 text-[#526581]">
              Shop with confidence from our top-rated, verified stores — each
              with transparent ratings and fast fulfilment.
            </p>
          </div>

          {/* Desktop Browse All Suppliers */}
          <Link
            href="/products"
            className="hidden shrink-0 items-center gap-2 pb-1 text-[14px] font-medium text-[#315be7] md:flex"
          >
            Browse all suppliers
            <span className="text-[18px]">→</span>
          </Link>
        </div>

        {/* Supplier Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {suppliers.map((supplier) => {
            const Icon = supplier.icon;

            return (
              <div
                key={supplier.name}
                className="rounded-xl border border-[#e2e8f0] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.02)]"
              >
                {/* Supplier Top */}
                <div className="flex items-start gap-4">
                  <div
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-lg ${supplier.iconBg}`}
                  >
                    <Icon
                      size={25}
                      strokeWidth={1.7}
                      className={supplier.iconColor}
                    />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-1">
                      <h3 className="truncate text-[14px] font-medium text-[#101828]">
                        {supplier.name}
                      </h3>

                      <BadgeCheck
                        size={16}
                        strokeWidth={2}
                        className="shrink-0 fill-[#315be7] text-white"
                      />
                    </div>

                    <p className="mt-0.5 truncate text-[13px] text-[#64748b]">
                      {supplier.description}
                    </p>

                    <Rating
                      rating={supplier.rating}
                      reviews={supplier.reviews}
                    />
                  </div>
                </div>

                {/* Divider */}
                <div className="my-4 border-t border-[#edf1f5]" />

                {/* Details */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-4 text-[12px] text-[#526581]">
                    <div className="flex items-center gap-1.5">
                      <Box size={15} strokeWidth={1.7} />
                      <span>{supplier.products} products</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <MapPin size={15} strokeWidth={1.7} />
                      <span>{supplier.location}</span>
                    </div>
                  </div>

                  <span className="shrink-0 rounded-full border border-[#d8e3ee] bg-[#eef5fb] px-3 py-1 text-[11px] font-medium text-[#31516f]">
                    {supplier.since}
                  </span>
                </div>

                {/* Visit Store */}
                <Link
                  href={`/products?supplier=${encodeURIComponent(
                    supplier.name
                  )}`}
                  className="mt-5 flex h-10 w-full items-center justify-center gap-2 rounded-md border border-[#dbe3ec] bg-white text-[14px] font-medium text-[#101828] transition hover:bg-[#f8fafc]"
                >
                  <Store size={16} strokeWidth={1.8} />
                  Visit Store
                </Link>
              </div>
            );
          })}
        </div>

        {/* Mobile Browse All Suppliers */}
        <Link
          href="/products"
          className="mt-6 flex items-center gap-2 text-[14px] font-medium text-[#315be7] md:hidden"
        >
          Browse all suppliers
          <span className="text-[18px]">→</span>
        </Link>
      </div>
    </section>
  );
}