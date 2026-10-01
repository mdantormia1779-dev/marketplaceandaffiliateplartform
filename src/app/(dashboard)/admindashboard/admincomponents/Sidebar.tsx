"use client";

import { useState } from "react";
import Link from "next/link";
import {
  LayoutGrid,
  Users,
  Share2,
  UserCog,
  Truck,
  ClipboardCheck,
  CreditCard,
  BadgeDollarSign,
  Network,
  Package,
  Grid2x2,
  Tag,
  Star,
  Sparkles,
  ChevronDown,
  Store,
  type LucideIcon,
} from "lucide-react";

type Item = { label: string; href: string; icon: LucideIcon };
type Group = { title: string; items: Item[] };

const base = "/admindashboard";

const groups: Group[] = [
  {
    title: "Users",
    items: [
      
      { label: "Customers", href: `${base}/users/customers`, icon: Users },
      { label: "Affiliates", href: `${base}/users/affiliates`, icon: Share2 },
      { label: "Staff", href: `${base}/users/staff`, icon: UserCog },
    ],
  },
  {
    title: "Suppliers",
    items: [
      { label: "Supplier List", href: `${base}/suppliers`, icon: Truck },
      { label: "Approvals", href: `${base}/approvals`, icon: ClipboardCheck },
      { label: "Subscriptions", href: `${base}/subscriptions`, icon: CreditCard },
      { label: "Joining Fees", href: `${base}/joining-fees`, icon: BadgeDollarSign },
      { label: "Supplier Referrals", href: `${base}/supplier-referrals`, icon: Network },
    ],
  },
  {
    title: "Marketplace",
    items: [
      { label: "Products", href: `${base}/products`, icon: Package },
      { label: "Categories", href: `${base}/MARKETPLACE/categories`, icon: Grid2x2 },
      { label: "Brands", href: `${base}/MARKETPLACE/brands`, icon: Tag },
      { label: "Reviews", href: `${base}/MARKETPLACE/reviews`, icon: Star },
      { label: "Featured Products", href: `${base}/MARKETPLACE/featured`, icon: Sparkles },
    ],
  },
];

function NavGroup({ group }: { group: Group }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="mt-5">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500"
      >
        {group.title}
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? "" : "-rotate-90"}`} />
      </button>
      {open && (
        <ul className="space-y-0.5">
          {group.items.map(({ label, href, icon: Icon }) => (
            <li key={label}>
              <Link
                href={href}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
              >
                <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
                {label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function Sidebar() {
  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-slate-200 bg-white lg:flex">
      <div className="flex h-[68px] items-center gap-3 border-b border-slate-200 px-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1fa85a] text-white">
          <Store className="h-5 w-5" />
        </div>
        <div className="leading-tight">
          <p className="text-[15px] font-semibold text-slate-900">Vendora</p>
          <p className="text-xs text-slate-500">Super Admin</p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <Link
          href={base}
          className="flex items-center gap-3 rounded-lg bg-[#1fa85a] px-3 py-2.5 text-sm font-medium text-white"
        >
          <LayoutGrid className="h-[18px] w-[18px]" strokeWidth={1.75} />
          Dashboard
        </Link>
        {groups.map((g) => (
          <NavGroup key={g.title} group={g} />
        ))}
      </nav>

      <div className="p-3">
        <div className="flex items-center gap-3 rounded-xl bg-slate-100 px-3 py-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-sm font-semibold text-slate-800">
            AR
          </div>
          <div className="leading-tight">
            <p className="text-sm font-medium text-slate-900">Ava Reyes</p>
            <p className="text-xs text-slate-500">Platform Owner</p>
          </div>
        </div>
      </div>
    </aside>
  );
}