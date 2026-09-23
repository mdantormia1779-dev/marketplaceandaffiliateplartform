"use client";

import { useState } from "react";
import { Pencil, Trash2, Check, X, Sparkles } from "lucide-react";

export function ReviewReply({
  text,
  date,
  edited,
  onEdit,
  onDelete,
}: {
  text: string;
  date: string;
  edited?: boolean;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const [confirming, setConfirming] = useState(false);

  return (
    <div className="relative mt-3 overflow-hidden rounded-xl border border-indigo-100 bg-gradient-to-br from-indigo-50 via-white to-white p-3.5">
      <div className="absolute -right-6 -top-6 h-16 w-16 rounded-full bg-indigo-100/50" />

      <div className="relative mb-1.5 flex items-center justify-between gap-2">
        <p className="flex items-center gap-1.5 text-xs font-semibold text-indigo-700">
          <Sparkles size={12} className="text-indigo-400" />
          Your reply
          {edited && <span className="font-normal text-indigo-400">· edited</span>}
        </p>

        {confirming ? (
          <div className="flex items-center gap-1 rounded-full bg-rose-50 py-0.5 pl-2.5 pr-0.5">
            <span className="text-[11px] font-medium text-rose-600">Delete this reply?</span>
            <button
              onClick={onDelete}
              title="Confirm delete"
              className="rounded-full bg-rose-600 p-1 text-white transition hover:bg-rose-700"
            >
              <Check size={11} />
            </button>
            <button
              onClick={() => setConfirming(false)}
              title="Cancel"
              className="rounded-full p-1 text-rose-500 transition hover:bg-rose-100"
            >
              <X size={11} />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-1">
            <button
              onClick={onEdit}
              className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-medium text-indigo-600 transition hover:bg-indigo-100"
            >
              <Pencil size={11} /> Edit
            </button>
            <button
              onClick={() => setConfirming(true)}
              className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-medium text-slate-400 transition hover:bg-rose-50 hover:text-rose-600"
            >
              <Trash2 size={11} /> Delete
            </button>
          </div>
        )}
      </div>

      <p className="relative text-sm leading-relaxed text-indigo-900">{text}</p>
      <p className="relative mt-1.5 text-[11px] text-indigo-400">
        {new Date(date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
      </p>
    </div>
  );
}