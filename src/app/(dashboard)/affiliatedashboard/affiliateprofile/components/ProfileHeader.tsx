"use client";

import { Share2, Pencil } from "lucide-react";
import { toast } from "react-toastify";

export function ProfileHeader({ onEditClick }: { onEditClick: () => void }) {
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText("https://marketplace.com/affiliate/DEBRAZ25");
      toast.success("Profile link copied");
    } catch {
      toast.error("Couldn't copy link");
    }
  };

  return (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">My Affiliate Profile</h1>
        <p className="text-sm text-slate-500">
          Manage your affiliate identity and performance information.
        </p>
      </div>

      <div className="flex items-center gap-2.5">
        <button
          onClick={handleShare}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
        >
          <Share2 size={16} />
          Share Profile
        </button>
        <button
          onClick={onEditClick}
          className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
        >
          <Pencil size={16} />
          Edit Profile
        </button>
      </div>
    </div>
  );
}