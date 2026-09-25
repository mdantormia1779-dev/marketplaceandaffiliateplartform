"use client";

import { useMemo, useState } from "react";
import { Copy, GlobeCode, Link, Link2, MessageCircle, Send, Sparkles } from "lucide-react";
import Modal from "./Modal";
import type { Product } from "./types";

const SOURCES = ["Facebook", "Instagram", "Google", "WhatsApp", "Direct", "Other"];
const MEDIUMS = ["Referral", "Social", "Email", "Paid Ad", "Organic"];

function buildAffiliateLink(
  product: Product,
  campaignName: string,
  source: string,
  medium: string,
  tag: string
) {
  const slug = product.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const params = new URLSearchParams();
  if (source) params.set("utm_source", source.toLowerCase());
  if (medium) params.set("utm_medium", medium.toLowerCase());
  if (campaignName) params.set("utm_campaign", campaignName.toLowerCase().replace(/\s+/g, "-"));
  if (tag) params.set("tag", tag);

  const query = params.toString();
  return `https://marketplace.com/ref/affiliate123/p-${slug}${query ? `?${query}` : ""}`;
}

type GenerateLinkModalProps = {
  product: Product;
  onClose: () => void;
};

export default function GenerateLinkModal({ product, onClose }: GenerateLinkModalProps) {
  const [campaignName, setCampaignName] = useState("Summer Campaign");
  const [source, setSource] = useState(SOURCES[0]);
  const [medium, setMedium] = useState(MEDIUMS[0]);
  const [tag, setTag] = useState("summer-campaign");
  const [copied, setCopied] = useState(false);

  // Recomputed on every keystroke, so the link field always reflects the
  // current campaign fields without a separate "Generate" step.
  const link = useMemo(
    () => buildAffiliateLink(product, campaignName, source, medium, tag),
    [product, campaignName, source, medium, tag]
  );

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable (e.g. insecure context) - fail quietly.
    }
  }

  function shareTo(network: "facebook" | "whatsapp" | "telegram" | "x" | "linkedin") {
    const encoded = encodeURIComponent(link);
    const urls: Record<typeof network, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encoded}`,
      whatsapp: `https://wa.me/?text=${encoded}`,
      telegram: `https://t.me/share/url?url=${encoded}`,
      x: `https://twitter.com/intent/tweet?url=${encoded}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`,
    };
    window.open(urls[network], "_blank", "noopener,noreferrer");
  }

  return (
    <Modal
      title="Generate Affiliate Link"
      subtitle="Share this link and earn commission on every sale."
      onClose={onClose}
      footer={
        <>
          <button
            onClick={onClose}
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={copyLink}
            className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            <Sparkles className="h-4 w-4" />
            {copied ? "Copied!" : "Generate & Copy Link"}
          </button>
        </>
      }
    >
      {/* Mini product summary */}
      <div className="mb-5 flex items-center gap-3 rounded-xl bg-gray-50 p-3">
        <img src={product.image} alt={product.name} className="h-14 w-14 rounded-lg object-cover" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-gray-900">{product.name}</p>
          <p className="text-xs text-gray-400">{product.category}</p>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-sm font-semibold text-gray-900">৳{product.price.toLocaleString()}</p>
          <p className="text-xs font-medium text-emerald-600">
            {product.commissionPercent}% commission &middot; Earn ৳{product.estEarnings.toLocaleString()}/sale
          </p>
        </div>
      </div>

      {/* Campaign fields */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-600">Campaign Name</label>
          <input
            value={campaignName}
            onChange={(e) => setCampaignName(e.target.value)}
            placeholder="Summer Campaign"
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-600">Source</label>
          <select
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          >
            {SOURCES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-600">Medium</label>
          <select
            value={medium}
            onChange={(e) => setMedium(e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          >
            {MEDIUMS.map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-600">Campaign Tag</label>
          <input
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            placeholder="summer-campaign"
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          />
        </div>
      </div>
      <p className="mt-2 text-xs text-gray-400">
        Optional tracking parameters help you see which channel drives your best conversions.
      </p>

      {/* Generated link */}
      <div className="mt-4">
        <label className="mb-1 flex items-center gap-1.5 text-xs font-medium text-gray-600">
          <Link2 className="h-3.5 w-3.5" />
          Your Affiliate Link
        </label>
        <div className="flex items-center gap-2">
          <input
            readOnly
            value={link}
            className="w-full truncate rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-600"
          />
          <button
            onClick={copyLink}
            className="flex shrink-0 items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <Copy className="h-3.5 w-3.5" />
            {copied ? "Copied" : "Copy Link"}
          </button>
        </div>
      </div>

      {/* Share row */}
      <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-gray-100 pt-4">
        <span className="mr-1 text-xs font-medium text-gray-500">Share to</span>
        <button onClick={() => shareTo("facebook")} aria-label="Share on Facebook" className="rounded-full border border-gray-200 p-2 hover:bg-gray-50">
          <Link  className="h-4 w-4 text-gray-600"/> 
        </button>
        <button onClick={() => shareTo("whatsapp")} aria-label="Share on WhatsApp" className="rounded-full border border-gray-200 p-2 hover:bg-gray-50">
          <MessageCircle className="h-4 w-4 text-gray-600" />
        </button>
        <button onClick={() => shareTo("telegram")} aria-label="Share on Telegram" className="rounded-full border border-gray-200 p-2 hover:bg-gray-50">
          <Send className="h-4 w-4 text-gray-600" />
        </button>
        <button onClick={() => shareTo("x")} aria-label="Share on X" className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50">
          X
        </button>
        <button onClick={() => shareTo("linkedin")} aria-label="Share on LinkedIn" className="rounded-full border border-gray-200 p-2 hover:bg-gray-50">
          
          <GlobeCode className="h-4 w-4 text-gray-600"/>
        </button>
        <button
          onClick={() => navigator.share?.({ url: link, title: product.name }).catch(() => {})}
          className="ml-auto text-xs font-medium text-indigo-600 hover:underline"
        >
          More options
        </button>
      </div>
    </Modal>
  );
}
