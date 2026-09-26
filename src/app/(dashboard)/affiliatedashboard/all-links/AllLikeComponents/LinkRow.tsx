"use client";

import { useState } from "react";
import { Check, Copy as CopyIcon } from "lucide-react";
import StatusBadge from "./StatusBadge";
import LinkRowActions from "./LinkRowActions";
import DeleteLinkModal from "./DeleteLinkModal";
import ShareLinkModal from "./ShareLinkModal";
import type { AffiliateLink } from "./types";

function truncateUrl(url: string, max = 34) {
  return url.length > max ? `${url.slice(0, max)}...` : url;
}

type LinkRowProps = {
  link: AffiliateLink;
  onDelete: (id: string) => void;
};

export default function LinkRow({ link, onDelete }: LinkRowProps) {
  const [copied, setCopied] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(link.affiliateUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleConfirmDelete = () => {
    onDelete(link.id);
    setDeleteOpen(false);
  };

  return (
    <>
      <tr className="border-b border-gray-100 last:border-0">
        <td className="whitespace-nowrap px-4 py-4">
          <div className="flex items-center gap-3">
            <img
              src={link.productImage}
              alt={link.productName}
              className="h-11 w-11 shrink-0 rounded-lg object-cover"
            />
            <div>
              <p className="text-sm font-semibold text-gray-900">
                {link.productName}
              </p>
              <p className="text-xs text-gray-400">{link.productCategory}</p>
            </div>
          </div>
        </td>

        <td className="px-4 py-4">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded-md bg-gray-50 px-2.5 py-1.5 text-xs text-gray-600 hover:bg-gray-100"
          >
            {truncateUrl(link.affiliateUrl)}
            {copied ? (
              <Check className="h-3 w-3 text-emerald-500" />
            ) : (
              <CopyIcon className="h-3 w-3 text-gray-400" />
            )}
          </button>
        </td>

        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-600">
          {link.createdAt}
        </td>

        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-900">
          {link.clicks.toLocaleString()}
        </td>

        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-900">
          {link.sales}
        </td>

        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-900">
          {link.conversionPercent}%
        </td>

        <td className="whitespace-nowrap px-4 py-4 text-sm font-semibold text-indigo-600">
          ৳{link.commission.toLocaleString()}
        </td>

        <td className="whitespace-nowrap px-4 py-4">
          <StatusBadge status={link.status} />
        </td>

        <td className="whitespace-nowrap px-4 py-4">
          <LinkRowActions
            onCopy={handleCopy}
            onShare={() => setShareOpen(true)}
            onDelete={() => setDeleteOpen(true)}
          />
        </td>
      </tr>

      <ShareLinkModal
        open={shareOpen}
        link={link}
        onClose={() => setShareOpen(false)}
      />

      <DeleteLinkModal
        open={deleteOpen}
        productName={link.productName}
        onCancel={() => setDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}