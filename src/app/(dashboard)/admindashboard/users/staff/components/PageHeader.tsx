"use client";

import { Plus } from "lucide-react";

export default function PageHeader({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Staff</h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage internal team members, roles and permissions.
        </p>
      </div>
      <button
        type="button"
        onClick={onAdd}
        className="flex items-center gap-2 rounded-lg bg-[#1fa85a] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#189a50]"
      >
        <Plus className="h-4 w-4" />
        Add Staff
      </button>
    </div>
  );
}