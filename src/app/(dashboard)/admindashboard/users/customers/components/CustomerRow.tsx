"use client";

import { useState, useRef, useEffect } from "react";
import { MoreHorizontal, Eye, Edit2, Ban, Trash2 } from "lucide-react";
import StatusBadge from "./StatusBadge";
import type { Customer } from "../types";

type Props = {
  customer: Customer;
  onView: (customer: Customer) => void;
  onEdit: (customer: Customer) => void;
  onOpenSuspend: (customer: Customer) => void;
  onOpenDelete: (customer: Customer) => void;
};

const avatarColors = [
  "bg-emerald-100 text-emerald-700",
  "bg-slate-100 text-slate-700",
  "bg-amber-100 text-amber-700",
];

const initials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

export default function CustomerRow({
  customer,
  onView,
  onEdit,
  onOpenSuspend,
  onOpenDelete,
}: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const c = customer;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <tr className="border-t border-slate-100 text-sm text-slate-700 transition hover:bg-slate-50/70">
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
              avatarColors[c.id % avatarColors.length]
            }`}
          >
            {initials(c.name)}
          </div>
          <div className="leading-tight">
            <p className="font-medium text-slate-900">{c.name}</p>
            <p className="text-xs text-slate-500">{c.email}</p>
          </div>
        </div>
      </td>

      <td className="px-4 py-3 whitespace-nowrap">{c.phone}</td>
      <td className="px-4 py-3 whitespace-nowrap">{c.country}</td>
      <td className="px-4 py-3 font-medium text-slate-900 whitespace-nowrap">{c.orders}</td>
      <td className="px-4 py-3 font-medium text-slate-900 whitespace-nowrap">
        {c.totalSpent.toLocaleString("en-US", { style: "currency", currency: "USD" })}
      </td>
      <td className="px-4 py-3 whitespace-nowrap">
        <StatusBadge status={c.status} />
      </td>
      <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{c.joined}</td>

      <td className="px-4 py-3 text-right">
        <div ref={menuRef} className="relative inline-block text-left">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen(!menuOpen);
            }}
            className="flex h-8 w-8 items-center justify-center rounded-md text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
          >
            <MoreHorizontal className="h-4 w-4" />
          </button>

          {menuOpen && (
            <div
              onMouseDown={(e) => e.stopPropagation()}
              className="absolute right-0 top-full mt-1 z-50 w-44 rounded-xl border border-slate-100 bg-white py-1.5 shadow-xl ring-1 ring-black/5"
            >
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  onView(c);
                }}
                className="flex w-full items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-50"
              >
                <Eye className="h-3.5 w-3.5 text-slate-500" />
                View details
              </button>

              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  onEdit(c);
                }}
                className="flex w-full items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-50"
              >
                <Edit2 className="h-3.5 w-3.5 text-slate-500" />
                Edit
              </button>

              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  onOpenSuspend(c);
                }}
                className="flex w-full items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-50"
              >
                <Ban className="h-3.5 w-3.5 text-slate-500" />
                Suspend
              </button>

              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  onOpenDelete(c);
                }}
                className="flex w-full items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-amber-700 transition hover:bg-amber-50/60"
              >
                <Trash2 className="h-3.5 w-3.5 text-amber-700" />
                Delete
              </button>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
}