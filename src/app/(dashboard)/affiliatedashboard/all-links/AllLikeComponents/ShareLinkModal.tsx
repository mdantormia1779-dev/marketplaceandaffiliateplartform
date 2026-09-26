"use client";

import { useState } from "react";
import { Link2, Copy, Check } from "lucide-react";
import ModalShell from "./ModalShell";
import {
  FacebookIcon,
  WhatsAppIcon,
  TelegramIcon,
  XIcon,
  LinkedInIcon,
} from "./ShareBrandIcons";
import type { AffiliateLink } from "./types";

type ShareLinkModalProps = {
  open: boolean;
  link: AffiliateLink;
  onClose: () => void;
};

export default function ShareLinkModal({
  open,
  link,
  onClose,
}: ShareLinkModalProps) {
  const [copied, setCopied] = useState(false);

  const shareMessage = `Check out ${link.productName} on the marketplace!`;
  const encodedUrl = encodeURIComponent(link.affiliateUrl);
  const encodedMessage = encodeURIComponent(shareMessage);

  const shareTargets = [
    {
      label: "Facebook",
      icon: FacebookIcon,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      label: "WhatsApp",
      icon: WhatsAppIcon,
      href: `https://wa.me/?text=${encodedMessage}%20${encodedUrl}`,
    },
    {
      label: "Telegram",
      icon: TelegramIcon,
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedMessage}`,
    },
    {
      label: "X",
      icon: XIcon,
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedMessage}`,
    },
    {
      label: "LinkedIn",
      icon: LinkedInIcon,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
  ];

  const handleCopy = async () => {
    await navigator.clipboard.writeText(link.affiliateUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <ModalShell
      open={open}
      onClose={onClose}
      title="Share Affiliate Link"
      subtitle={link.productName}
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Close
          </button>
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700"
          >
            {copied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            {copied ? "Copied" : "Copy Link"}
          </button>
        </>
      }
    >
      {/* Product summary */}
      <div className="mb-4 flex items-center gap-3 rounded-xl bg-gray-50 p-3">
        <img
          src={link.productImage}
          alt={link.productName}
          className="h-12 w-12 shrink-0 rounded-lg object-cover"
        />
        <div>
          <p className="text-sm font-semibold text-gray-900">
            {link.productName}
          </p>
          <p className="text-xs text-gray-400">{link.productCategory}</p>
        </div>
      </div>

      {/* Affiliate link display */}
      <p className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-gray-500">
        <Link2 className="h-3.5 w-3.5" />
        Affiliate Link
      </p>
      <div className="mb-4 truncate rounded-lg bg-gray-50 px-3 py-2.5 text-sm text-gray-700">
        {link.affiliateUrl}
      </div>

      {/* Share targets */}
      <p className="mb-2 text-xs font-medium text-gray-500">Share to</p>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {shareTargets.map(({ label, icon: Icon, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <Icon className="h-4 w-4" />
            {label}
          </a>
        ))}
      </div>
    </ModalShell>
  );
}