"use client";

import { Copy, Share2, BarChart2, Trash2 } from "lucide-react";

type LinkRowActionsProps = {
  onCopy?: () => void;
  onShare?: () => void;
  onViewStats?: () => void;
  onDelete?: () => void;
};

function ActionButton({
  icon: Icon,
  onClick,
  label,
}: {
  icon: React.ElementType;
  onClick?: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50"
    >
      <Icon className="h-3.5 w-3.5" />
    </button>
  );
}

export default function LinkRowActions({
  onCopy,
  onShare,
  onViewStats,
  onDelete,
}: LinkRowActionsProps) {
  return (
    <div className="flex items-center justify-end gap-1.5">
      <ActionButton icon={Copy} onClick={onCopy} label="Copy link" />
      <ActionButton icon={Share2} onClick={onShare} label="Share link" />
      <ActionButton icon={BarChart2} onClick={onViewStats} label="View stats" />
      <ActionButton icon={Trash2} onClick={onDelete} label="Delete link" />
    </div>
  );
}