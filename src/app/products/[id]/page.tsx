"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import {
  Star,
  Heart,
  Share2,
  ShoppingCart,
  Zap,
  CheckCircle2,
  Store,
  Grid,
  Truck,
  ShieldCheck,
  Plus,
  Minus,
  Maximize2,
  ShoppingBag,
  RotateCcw,
  CreditCard,
  MapPin,
  Tag,
  Ticket,
  Copy,
  Award,
} from "lucide-react";
import AffiliateSection from "@/components/featured-products/AffiliateSection";
import ProductTabsSection from "@/components/featured-products/ProductTabsSection";
import FeaturedProducts from "@/components/featured-products";

// 🎯 New Arrivals সহ সব প্রোডাক্টের সম্পূর্ণ লিস্ট
const allProducts = [
  {
    id: "1",
    name: "Noise Cancelling Wireless Headphones",
    price: 8900,
    oldPrice: 12500,
    discountPercent: 29,
    vendor: "AudioTech BD",
    vendorRating: 4.8,
    vendorReviews: 3120,
    vendorProducts: 148,
    vendorSince: 2022,
    rating: 4.8,
    reviewCount: 1240,
    sold: 3120,
    category: "Electronics",
    brand: "PULSEGEAR",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: "2",
    name: "Smart Fitness Watch Series 7",
    price: 4290,
    oldPrice: 6500,
    discountPercent: 34,
    vendor: "AudioTech BD",
    vendorRating: 4.8,
    vendorReviews: 3120,
    vendorProducts: 148,
    vendorSince: 2022,
    rating: 4.6,
    reviewCount: 860,
    sold: 2410,
    category: "Electronics",
    brand: "PULSEGEAR",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544117519-31a4b719223d?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: "3",
    name: "Minimalist Leather Backpack",
    price: 2850,
    oldPrice: 4200,
    discountPercent: 32,
    vendor: "UrbanCarry",
    vendorRating: 4.7,
    vendorReviews: 890,
    vendorProducts: 64,
    vendorSince: 2021,
    rating: 4.7,
    reviewCount: 540,
    sold: 1180,
    category: "Fashion & Bags",
    brand: "URBANCARRY",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: "4",
    name: "Vitamin C Brightening Face Serum",
    price: 1190,
    oldPrice: 1800,
    discountPercent: 34,
    vendor: "GlowLab Cosmetics",
    vendorRating: 4.9,
    vendorReviews: 4500,
    vendorProducts: 92,
    vendorSince: 2023,
    rating: 4.9,
    reviewCount: 1580,
    sold: 4520,
    category: "Beauty & Care",
    brand: "GLOWLAB",
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1608248597359-2180556f8f53?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: "5",
    name: "Velvet Matte Lipstick Trio",
    price: 1590,
    oldPrice: 2400,
    discountPercent: 34,
    vendor: "GlowLab Cosmetics",
    vendorRating: 4.8,
    vendorReviews: 3200,
    vendorProducts: 92,
    vendorSince: 2023,
    rating: 4.8,
    reviewCount: 940,
    sold: 2270,
    category: "Beauty & Care",
    brand: "GLOWLAB",
    images: [
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: "6",
    name: "Portable Bluetooth Speaker Boom",
    price: 2690,
    oldPrice: 4000,
    discountPercent: 33,
    vendor: "AudioTech BD",
    vendorRating: 4.8,
    vendorReviews: 3120,
    vendorProducts: 148,
    vendorSince: 2022,
    rating: 4.5,
    reviewCount: 480,
    sold: 1380,
    category: "Electronics",
    brand: "PULSEGEAR",
    images: [
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: "7",
    name: "Insulated Stainless Steel Water Bottle",
    price: 790,
    oldPrice: 1200,
    discountPercent: 34,
    vendor: "HomeCraft Living",
    vendorRating: 4.6,
    vendorReviews: 810,
    vendorProducts: 45,
    vendorSince: 2022,
    rating: 4.5,
    reviewCount: 260,
    sold: 1050,
    category: "Home & Lifestyle",
    brand: "HOMECRAFT",
    images: [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80",
    ],
  },
  // 🚀 New Arrivals এর নতুন ৪টি প্রোডাক্ট:
  {
    id: "8",
    name: "Organic Cotton Essential T-Shirt",
    price: 890,
    oldPrice: 1400,
    discountPercent: 36,
    vendor: "StrideX Sportswear",
    vendorRating: 4.5,
    vendorReviews: 620,
    vendorProducts: 85,
    vendorSince: 2023,
    rating: 4.4,
    reviewCount: 410,
    sold: 1940,
    category: "Fashion & Apparel",
    brand: "STRIDEX",
    images: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: "9",
    name: "Handcrafted Ceramic Mug Set of 4",
    price: 1450,
    oldPrice: 2200,
    discountPercent: 34,
    vendor: "HomeCraft Living",
    vendorRating: 4.6,
    vendorReviews: 810,
    vendorProducts: 45,
    vendorSince: 2022,
    rating: 4.6,
    reviewCount: 320,
    sold: 860,
    category: "Kitchen & Dining",
    brand: "HOMECRAFT",
    images: [
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: "10",
    name: "Smart LED Desk Lamp with Wireless Charger",
    price: 2290,
    oldPrice: 3400,
    discountPercent: 33,
    vendor: "LumenWorks",
    vendorRating: 4.7,
    vendorReviews: 530,
    vendorProducts: 38,
    vendorSince: 2023,
    rating: 4.3,
    reviewCount: 210,
    sold: 640,
    category: "Home Decor & Lighting",
    brand: "LUMENWORKS",
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80",
    ],
  },
  {
    id: "11",
    name: "Polarized UV400 Sunglasses",
    price: 1690,
    oldPrice: 2600,
    discountPercent: 35,
    vendor: "UrbanCarry",
    vendorRating: 4.7,
    vendorReviews: 890,
    vendorProducts: 64,
    vendorSince: 2021,
    rating: 4.4,
    reviewCount: 290,
    sold: 740,
    category: "Fashion Accessories",
    brand: "URBANCARRY",
    images: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80",
    ],
  },
];

export default function ProductDetailsPage() {
  const params = useParams();

  const productId = params?.id ? String(params.id) : "2";
  const product = allProducts.find((p) => p.id === productId) || allProducts[1];

  const [selectedImage, setSelectedImage] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState("Graphite");
  const [selectedSize, setSelectedSize] = useState("41 mm");
  const [quantity, setQuantity] = useState(1);

  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  useEffect(() => {
    if (product && product.images.length > 0) {
      setSelectedImage(product.images[0]);
    }
  }, [product]);

  const handleCopy = (code: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2000);
    }
  };

  const colors = [
    { name: "Graphite", bg: "bg-gray-900" },
    { name: "Starlight", bg: "bg-stone-200 border border-stone-300" },
    { name: "Ocean Blue", bg: "bg-sky-300" },
  ];

  const sizes = ["41 mm", "45 mm"];

  const currentImg = selectedImage || product.images[0];

  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-50/30 font-sans text-gray-800">
      
      {/* 🚀 TOP SECTION: Product Details */}
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="mb-6 flex items-center gap-2 text-xs text-gray-500">
          <Link href="/" className="transition hover:text-gray-900">
            Home
          </Link>
          <span>&gt;</span>
          <Link href="/products" className="transition hover:text-gray-900">
            {product.category}
          </Link>
          <span>&gt;</span>
          <span className="font-medium text-gray-800">{product.name}</span>
        </nav>

        {/* 3-Column Layout */}
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          
          {/* LEFT: Image Gallery Section (5 cols) */}
          <div className="flex gap-3 lg:col-span-5 lg:sticky lg:top-6 self-start">
            {/* Thumbnails */}
            <div className="flex flex-col gap-2.5">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`relative h-16 w-16 overflow-hidden rounded-xl border transition-all ${
                    currentImg === img
                      ? "border-2 border-indigo-600 ring-2 ring-indigo-100"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} thumbnail ${idx + 1}`}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Main Image Container */}
            <div className="group relative flex-1 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
              <span className="absolute left-3 top-3 z-10 rounded-lg bg-red-500/90 px-2.5 py-1 text-xs font-bold text-white shadow-sm">
                -{product.discountPercent}% OFF
              </span>

              <div className="absolute right-3 top-3 z-10 flex flex-col gap-2">
                <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-gray-600 shadow-sm transition hover:bg-white hover:text-red-500 backdrop-blur-sm">
                  <Heart className="h-4 w-4" />
                </button>
                <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-gray-600 shadow-sm transition hover:bg-white hover:text-blue-600 backdrop-blur-sm">
                  <Share2 className="h-4 w-4" />
                </button>
              </div>

              {/* Main Image with Zoom-In Hover Effect */}
              <div className="relative aspect-square w-full overflow-hidden cursor-zoom-in">
                <Image
                  src={currentImg}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-125"
                />
              </div>

              <div className="pointer-events-none absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between text-xs">
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/80 px-2.5 py-1 text-[11px] font-medium text-gray-700 shadow-sm backdrop-blur-sm">
                  <Maximize2 className="h-3 w-3" />
                  Hover to zoom
                </span>
                <span className="rounded-lg bg-black/70 px-2 py-0.5 text-[11px] font-semibold text-white backdrop-blur-sm">
                  1/{product.images.length}
                </span>
              </div>
            </div>
          </div>

          {/* MIDDLE: Product Details & Controls (4 cols) */}
          <div className="flex flex-col justify-between lg:col-span-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
                <span>{product.category}</span>
                <span className="uppercase tracking-wider text-indigo-600">{product.brand}</span>
              </div>

              <h1 className="mt-1 text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
                {product.name}
              </h1>

              {/* Rating & Sales Stats */}
              <div className="mt-3 flex flex-wrap items-center gap-3 text-xs">
                <div className="flex items-center text-amber-500">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="ml-1.5 font-bold text-gray-800">{product.rating}</span>
                  <span className="ml-0.5 text-gray-400">({product.reviewCount})</span>
                </div>
                
                <div className="flex items-center gap-1 text-gray-500">
                  <ShoppingBag className="h-3.5 w-3.5 text-gray-400" />
                  <span><strong className="text-gray-700">{product.sold.toLocaleString()}</strong> sold</span>
                </div>

                <div className="flex items-center gap-1 font-medium text-indigo-600">
                  <Store className="h-3.5 w-3.5" />
                  <span>{product.vendor}</span>
                  <CheckCircle2 className="h-3.5 w-3.5 fill-indigo-600 text-white" />
                </div>
              </div>

              {/* Price Box */}
              <div className="mt-4 rounded-2xl border border-gray-100 bg-gray-50/50 p-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-gray-900">
                    ৳{product.price.toLocaleString()}
                  </span>
                  {product.oldPrice && (
                    <span className="text-xs font-medium text-gray-400 line-through">
                      ৳{product.oldPrice.toLocaleString()}
                    </span>
                  )}
                  {product.oldPrice && (
                    <span className="ml-2 text-xs font-medium text-red-500">
                      Save ৳{(product.oldPrice - product.price).toLocaleString()}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-[11px] text-gray-500">
                  Inclusive of all taxes. Cash on delivery available nationwide.
                </p>
              </div>

              {/* Strap Options */}
              <div className="mt-5">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-gray-500">STRAP</span>
                  <span className="font-bold text-gray-900">{selectedColor}</span>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  {colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`flex items-center gap-2 rounded-xl border px-3 py-1.5 text-xs font-medium transition ${
                        selectedColor === color.name
                          ? "border-indigo-600 bg-indigo-50/20 text-indigo-900 ring-1 ring-indigo-600"
                          : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      <span className={`h-3.5 w-3.5 rounded-full ${color.bg}`} />
                      {color.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Options */}
              <div className="mt-5">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-gray-500">CASE SIZE</span>
                  <span className="font-bold text-gray-900">{selectedSize}</span>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`rounded-xl border px-4 py-2 text-xs font-semibold transition ${
                        selectedSize === size
                          ? "border-indigo-600 bg-indigo-50/20 text-indigo-600 ring-1 ring-indigo-600"
                          : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="mt-5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-gray-500">QUANTITY</span>
                  <span className="text-gray-400 text-[11px]">10 max per order</span>
                </div>
                <div className="mt-2 flex items-center gap-4">
                  <div className="flex items-center rounded-xl border border-gray-200 bg-white">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 text-gray-500 hover:text-gray-800"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-8 text-center text-xs font-bold">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 text-gray-500 hover:text-gray-800"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="font-medium text-emerald-600">97% claimed</span>
                      <span className="text-gray-400">88 available</span>
                    </div>
                    <div className="mt-1 h-1.5 w-full rounded-full bg-gray-100">
                      <div className="h-full w-[97%] rounded-full bg-emerald-500" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex items-center gap-3">
                <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 text-xs font-semibold text-white shadow-sm transition hover:bg-indigo-700">
                  <ShoppingCart className="h-4 w-4" />
                  Add to Cart
                </button>
                <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-500 py-3 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-600">
                  <Zap className="h-4 w-4 fill-white" />
                  Buy Now
                </button>
              </div>

              {/* Wishlist & Share Buttons */}
              <div className="mt-3 flex items-center gap-3">
                <button className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-gray-200 bg-white py-2 text-xs font-medium text-gray-700 hover:bg-gray-50">
                  <Heart className="h-3.5 w-3.5 text-gray-500" /> Wishlist
                </button>
                <button className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-gray-200 bg-white py-2 text-xs font-medium text-gray-700 hover:bg-gray-50">
                  <Share2 className="h-3.5 w-3.5 text-gray-500" /> Share
                </button>
              </div>

              {/* Feature Highlights Grid */}
              <div className="mt-5 grid grid-cols-2 gap-2.5 rounded-2xl border border-gray-100 bg-gray-50/50 p-3">
                <div className="flex items-start gap-2.5">
                  <Truck className="mt-0.5 h-4 w-4 text-indigo-600 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-gray-800">Fast delivery</p>
                    <p className="text-[10px] text-gray-400">2 - 4 business days</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <RotateCcw className="mt-0.5 h-4 w-4 text-indigo-600 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-gray-800">7-day returns</p>
                    <p className="text-[10px] text-gray-400">Easy & hassle free</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="mt-0.5 h-4 w-4 text-indigo-600 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-gray-800">Buyer protection</p>
                    <p className="text-[10px] text-gray-400">Full refund guarantee</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Award className="mt-0.5 h-4 w-4 text-indigo-600 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-gray-800">Authentic product</p>
                    <p className="text-[10px] text-gray-400">Verified supplier</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Vendor Details & Delivery Specs (3 cols) */}
          <div className="flex flex-col gap-5 lg:col-span-3">
            
            {/* Vendor Profile Box */}
            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-700 font-bold text-xs">
                  🔊
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <h3 className="text-sm font-bold text-gray-900">{product.vendor}</h3>
                    <CheckCircle2 className="h-3.5 w-3.5 fill-indigo-600 text-white" />
                  </div>
                  <p className="text-[11px] text-gray-400">Premium audio & smart electronics</p>
                </div>
              </div>

              {/* Vendor Stats Table */}
              <div className="mt-4 grid grid-cols-3 divide-x divide-gray-100 text-center border-t border-b border-gray-100 py-2.5">
                <div>
                  <p className="text-xs font-bold text-gray-900">{product.vendorProducts}</p>
                  <p className="text-[10px] text-gray-400">Products</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900">{product.vendorRating}</p>
                  <p className="text-[10px] text-gray-400">Rating</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900">{product.vendorSince}</p>
                  <p className="text-[10px] text-gray-400">Since</p>
                </div>
              </div>

              <div className="mt-3 flex gap-2">
                <button className="flex flex-1 items-center justify-center gap-1 rounded-xl border border-gray-200 bg-white py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50">
                  <Store className="h-3.5 w-3.5 text-gray-500" /> Visit Store
                </button>
                <button className="flex flex-1 items-center justify-center gap-1 rounded-xl border border-gray-200 bg-white py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50">
                  <Grid className="h-3.5 w-3.5 text-gray-500" /> More Products
                </button>
              </div>
            </div>

            {/* Delivery & Returns Details Box */}
            <div className="space-y-3.5 rounded-2xl border border-gray-100 bg-white p-4 text-xs shadow-sm">
              <h4 className="flex items-center gap-1.5 font-bold text-gray-900 border-b border-gray-100 pb-2">
                <Truck className="h-4 w-4 text-gray-600" />
                Delivery & Returns
              </h4>

              <div className="flex gap-3">
                <Truck className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
                <div>
                  <p className="font-semibold text-gray-800">Delivery Time</p>
                  <p className="text-[11px] text-gray-500">2 - 4 business days</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Tag className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
                <div>
                  <p className="font-semibold text-gray-800">Shipping Fee</p>
                  <p className="text-[11px] text-gray-500">Free over ৳6,000 | ৳80 below</p>
                </div>
              </div>

              <div className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
                <div>
                  <p className="font-semibold text-gray-800">Ships From</p>
                  <p className="text-[11px] text-gray-500">{product.vendor} · Dhaka</p>
                </div>
              </div>

              <div className="flex gap-3">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
                <div>
                  <p className="font-semibold text-gray-800">Courier Partners</p>
                  <p className="text-[11px] text-gray-500">Pathao · RedX · Steadfast</p>
                </div>
              </div>

              <div className="flex gap-3">
                <CreditCard className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
                <div>
                  <p className="font-semibold text-gray-800">Cash on Delivery</p>
                  <p className="text-[11px] text-gray-500">Available nationwide</p>
                </div>
              </div>

              <div className="flex gap-3">
                <RotateCcw className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
                <div>
                  <p className="font-semibold text-gray-800">Return Window</p>
                  <p className="text-[11px] text-gray-500">7 days after delivery</p>
                </div>
              </div>
            </div>

            {/* FIXED COUPONS BOX */}
            <div className="rounded-2xl border border-gray-100 bg-white p-4 text-xs shadow-sm">
              <h4 className="flex items-center gap-1.5 font-bold text-gray-900 mb-3">
                <Ticket className="h-4 w-4 text-gray-600" />
                Available Coupons
              </h4>

              <div className="space-y-2.5">
                {/* Coupon 1 */}
                <div className="rounded-xl border border-emerald-100 bg-emerald-50/40 p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-emerald-900 text-xs">৳250 OFF</p>
                      <p className="text-[10px] text-emerald-700 mt-0.5">On wearables above ৳3,500</p>
                      <p className="font-mono text-[11px] font-bold text-emerald-800 mt-1">GADGET250</p>
                    </div>
                    <button
                      onClick={() => handleCopy("GADGET250")}
                      className="flex items-center gap-1 rounded-lg border border-emerald-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-emerald-700 hover:bg-emerald-50 shadow-xs transition active:scale-95"
                    >
                      {copiedCode === "GADGET250" ? (
                        <>
                          <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Coupon 2 */}
                <div className="rounded-xl border border-emerald-100 bg-emerald-50/40 p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-emerald-900 text-xs">Free Shipping</p>
                      <p className="text-[10px] text-emerald-700 mt-0.5">On orders above ৳2,000</p>
                      <p className="font-mono text-[11px] font-bold text-emerald-800 mt-1">FREESHIP</p>
                    </div>
                    <button
                      onClick={() => handleCopy("FREESHIP")}
                      className="flex items-center gap-1 rounded-lg border border-emerald-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-emerald-700 hover:bg-emerald-50 shadow-xs transition active:scale-95"
                    >
                      {copiedCode === "FREESHIP" ? (
                        <>
                          <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Safe & Secure Shopping Box */}
            <div className="rounded-2xl border border-gray-100 bg-white p-4 text-xs shadow-sm space-y-3">
              <h4 className="flex items-center gap-1.5 font-bold text-gray-900 border-b border-gray-100 pb-2">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                Safe & Secure Shopping
              </h4>

              <div className="space-y-2 text-gray-600 text-[11px]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <span>Secure encrypted checkout</span>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <span>Pay with bKash, Nagad, card or COD</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <span>Money-back guarantee on refunds</span>
                </div>
              </div>

              {/* Payment Badges / Logos */}
              <div className="pt-2 border-t border-gray-100 flex flex-wrap gap-1.5 text-[10px] text-gray-500 font-medium">
                <span className="rounded bg-gray-100 px-2 py-0.5">VISA</span>
                <span className="rounded bg-gray-100 px-2 py-0.5">Mastercard</span>
                <span className="rounded bg-gray-100 px-2 py-0.5">bKash</span>
                <span className="rounded bg-gray-100 px-2 py-0.5">Nagad</span>
                <span className="rounded bg-gray-100 px-2 py-0.5">SSLCommerz</span>
              </div>

              {/* Free Delivery Banner */}
              <div className="mt-2 flex items-center justify-between rounded-xl bg-emerald-50/60 p-2 text-[11px]">
                <span className="text-emerald-800 font-medium">Free delivery over</span>
                <span className="font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-md">৳6,000</span>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/*  1st: Full Width Affiliate Section */}
      <div className="w-full mt-6">
        <AffiliateSection
          productName={product.name}
          price={product.price}
        />
      </div>

      {/*  2nd: Product Tabs Section */}
      <div className="mx-auto w-full max-w-7xl px-4 pt-10 pb-6 sm:px-6 lg:px-8">
        <ProductTabsSection
          productName={product.name}
          vendorName={product.vendor}
          reviewCount={product.reviewCount}
        />
      </div>

      {/*  3rd: Recommended Products Section */}
      <div className="w-full pb-16">
        <FeaturedProducts />
      </div>

    </div>
  );
}