"use client";

import { useState } from "react";
import Image from "next/image";
import {
  X,
  Link2,
  Copy,
  Check,
  ChevronDown,
  Sparkles,
  Share2,
} from "lucide-react";
import { Product } from "../types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface GenerateLinkModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function GenerateLinkModal({
  product,
  isOpen,
  onClose,
}: GenerateLinkModalProps) {
  const [copied, setCopied] = useState(false);
  const [campaignName, setCampaignName] = useState("Summer Campaign");
  const [source, setSource] = useState("Facebook");
  const [medium, setMedium] = useState("Social");
  const [campaignTag, setCampaignTag] = useState("summer-campaign");
  const [imgError, setImgError] = useState(false);

  if (!isOpen || !product) return null;

  const affiliateUrl = `https://marketplace.com/ref/affiliate123/p-${product.id}?utm_source=${source.toLowerCase()}&utm_campaign=${campaignTag}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(affiliateUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-[2px]">
      <div className="relative w-full max-w-[500px] rounded-3xl bg-white p-6 shadow-2xl transition-all">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-[19px] font-bold text-slate-900">
              Generate Affiliate Link
            </h2>
            <p className="mt-0.5 text-xs text-slate-500">
              Share this link and earn commission on every sale.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <X className="h-5 w-5 stroke-[2]" />
          </button>
        </div>

        {/* Selected Product Card */}
        <div className="mt-5 flex items-center gap-3.5 rounded-2xl border border-slate-100 bg-[#f8fafc]/90 p-3.5">
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-white p-1.5 shadow-sm border border-slate-100 flex items-center justify-center">
            {!imgError ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="64px"
                onError={() => setImgError(true)}
                className="object-contain p-1"
              />
            ) : (
              <span className="text-xl">📦</span>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-sm font-bold text-slate-900">
              {product.name}
            </h3>
            <p className="text-[11px] text-slate-400">{product.category}</p>
            <div className="mt-1 flex items-center gap-2.5">
              <span className="text-sm font-bold text-slate-900">
                ৳{product.price.toLocaleString()}
              </span>
              <span className="rounded-full bg-[#dcfce7] px-2.5 py-0.5 text-[10px] font-semibold text-[#15803d]">
                {product.commissionRate}% commission
              </span>
              <span className="text-xs font-semibold text-[#3b66f5]">
                Earn ৳{product.estimatedEarnings}/sale
              </span>
            </div>
          </div>
        </div>

        {/* Inputs */}
        <div className="mt-4 grid grid-cols-2 gap-3.5">
          <div>
            <label className="text-xs font-semibold text-slate-700">
              Campaign Name
            </label>
            <Input
              value={campaignName}
              onChange={(e) => setCampaignName(e.target.value)}
              className="mt-1.5 h-11 rounded-xl border-slate-200 bg-[#f8fafc]/70 text-xs font-medium text-slate-800 shadow-none focus-visible:bg-white focus-visible:ring-1 focus-visible:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700">
              Source
            </label>
            <div className="relative mt-1.5">
              <select
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-[#f8fafc]/70 px-3.5 pr-8 text-xs font-medium text-slate-800 outline-none transition-all focus:bg-white focus:border-[#3b66f5] cursor-pointer"
              >
                <option value="Facebook">Facebook</option>
                <option value="WhatsApp">WhatsApp</option>
                <option value="Telegram">Telegram</option>
                <option value="Twitter">X (Twitter)</option>
                <option value="YouTube">YouTube</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 stroke-[2]" />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700">
              Medium
            </label>
            <div className="relative mt-1.5">
              <select
                value={medium}
                onChange={(e) => setMedium(e.target.value)}
                className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-[#f8fafc]/70 px-3.5 pr-8 text-xs font-medium text-slate-800 outline-none transition-all focus:bg-white focus:border-[#3b66f5] cursor-pointer"
              >
                <option value="Social">Social</option>
                <option value="Direct">Direct</option>
                <option value="Email">Email</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 stroke-[2]" />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700">
              Campaign Tag
            </label>
            <Input
              value={campaignTag}
              onChange={(e) => setCampaignTag(e.target.value)}
              className="mt-1.5 h-11 rounded-xl border-dashed border-slate-300 bg-[#f8fafc]/70 text-xs font-medium text-slate-800 shadow-none focus-visible:bg-white focus-visible:ring-1 focus-visible:ring-blue-500"
            />
          </div>
        </div>

        <p className="mt-2.5 text-[11px] text-slate-400 leading-normal">
          Optional tracking parameters help you see which channel drives your best conversions.
        </p>

        {/* Affiliate Link Input & Copy Button */}
        <div className="mt-4">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
            <Link2 className="h-3.5 w-3.5 stroke-[2.5]" />
            Your Affiliate Link
          </div>
          <div className="mt-2 flex gap-2">
            <Input
              readOnly
              value={affiliateUrl}
              className="h-11 truncate rounded-xl border-slate-200 bg-[#f8fafc]/80 text-xs text-slate-600 shadow-none focus-visible:ring-0"
            />
            <Button
              type="button"
              variant="outline"
              onClick={handleCopy}
              className="h-11 shrink-0 gap-2 rounded-xl border-slate-200 bg-white px-4 text-xs font-semibold text-slate-700 shadow-none hover:bg-slate-50"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-600 stroke-[2.5]" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 text-slate-500" />
                  Copy Link
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Share to Section */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-1.5 font-semibold text-slate-700">
              <Share2 className="h-3.5 w-3.5 text-slate-500" />
              Share to
            </span>
            <button
              type="button"
              className="font-medium text-[#3b66f5] hover:underline"
            >
              More options
            </button>
          </div>

          <div className="mt-2.5 flex flex-wrap items-center gap-2">
            {/* Facebook */}
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(affiliateUrl)}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-9 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              <span className="flex h-4 w-4 items-center justify-center font-bold text-[#1877f2]">
                f
              </span>
              Facebook
            </a>

            {/* WhatsApp */}
            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(affiliateUrl)}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-9 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              <span className="text-[#25d366]">💬</span>
              WhatsApp
            </a>

            {/* Telegram */}
            <a
              href={`https://t.me/share/url?url=${encodeURIComponent(affiliateUrl)}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-9 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              <span className="text-[#0088cc]">✈</span>
              Telegram
            </a>

            {/* X (Twitter) */}
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(affiliateUrl)}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-9 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              <span className="font-bold text-slate-900">𝕏</span>
              X
            </a>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="mt-6 flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="h-11 rounded-2xl border-slate-200 px-6 text-xs font-semibold text-slate-700 shadow-none hover:bg-slate-50"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleCopy}
            className="h-11 gap-2 rounded-2xl bg-[#3b66f5] px-6 text-xs font-semibold text-white shadow-none hover:bg-[#2b55e5]"
          >
            <Sparkles className="h-4 w-4" />
            Generate &amp; Copy Link
          </Button>
        </div>
      </div>
    </div>
  );
}