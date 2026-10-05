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
  Clock,
  RefreshCw,
  ShoppingBag,
  CheckCircle,
  XCircle,
  RotateCcw,
  MousePointer,
  TrendingUp,
  DollarSign,
  Gift,
  UserPlus,
  Link as LinkIcon,
  ArrowLeftRight,
  Wallet,
  Banknote,
  Megaphone,
  Ticket,
  Zap,
  Image as ImageIcon,
  BarChart3,
  LineChart,
  UserCheck,
  Percent,
  Award,
  Settings,
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
     { label: "Supplier List", href: `${base}/supplier/suppliers`, icon: Truck },
{ label: "Approvals", href: `${base}/supplier/approvals`, icon: ClipboardCheck },
{ label: "Subscriptions", href: `${base}/supplier/subscriptions`, icon: CreditCard },
{ label: "Joining Fees", href: `${base}/supplier/joining-fees`, icon: BadgeDollarSign },
{ label: "Supplier Referrals", href: `${base}/supplier/supplier-referrals`, icon: Network },
    ],
  },
  {
    title: "Marketplace",
    items: [
      { label: "Products", href: `${base}/MARKETPLACE/products`, icon: Package },
      { label: "Categories", href: `${base}/MARKETPLACE/categories`, icon: Grid2x2 },
      { label: "Brands", href: `${base}/MARKETPLACE/brands`, icon: Tag },
      { label: "Reviews", href: `${base}/MARKETPLACE/reviews`, icon: Star },
      { label: "Featured Products", href: `${base}/MARKETPLACE/featured`, icon: Sparkles },
    ],
  },
  {
    title: "Orders",
    items: [
      { label: "All Orders", href: `${base}/order/all-orders`, icon: ShoppingBag },
      { label: "Pending", href: `${base}/order/pending-orders`, icon: Clock },
      { label: "Processing", href: `${base}/order/processing-orders`, icon: RefreshCw },
      { label: "Shipped", href: `${base}/order/shipped-orders`, icon: Truck },
      { label: "Delivered", href: `${base}/order/delivered-orders`, icon: CheckCircle },
      { label: "Cancelled", href: `${base}/order/cancelled-orders`, icon: XCircle },
      { label: "Refunds", href: `${base}/order/refunds`, icon: RotateCcw },
    ],
  },
  {
    title: "Affiliate",
    items: [
      { label: "Affiliates", href: `${base}/affiliates`, icon: Users },
      { label: "Links", href: `${base}/affiliate-links`, icon: LinkIcon },
      { label: "Clicks", href: `${base}/affiliate-clicks`, icon: MousePointer },
      { label: "Conversions", href: `${base}/affiliate-conversions`, icon: TrendingUp },
      { label: "Commissions", href: `${base}/affiliate-commissions`, icon: DollarSign },
      { label: "Bonuses", href: `${base}/affiliate-bonuses`, icon: Gift },
      { label: "Referrals", href: `${base}/affiliate-referrals`, icon: UserPlus },
    ],
  },
  {
    title: "Finance",
    items: [
      { label: "Revenue", href: `${base}/finance/revenue`, icon: DollarSign },
      { label: "Transactions", href: `${base}/finance/transactions`, icon: ArrowLeftRight },
      { label: "Wallets", href: `${base}/finance/wallets`, icon: Wallet },
      { label: "Withdrawals", href: `${base}/finance/withdrawals`, icon: Banknote },
      { label: "Refunds", href: `${base}/finance/refunds`, icon: RotateCcw },
    ],
  },
  {
    title: "Marketing",
    items: [
      { label: "Campaigns", href: `${base}/campaigns`, icon: Megaphone },
      { label: "Coupons", href: `${base}/coupons`, icon: Ticket },
      { label: "Discounts", href: `${base}/discounts`, icon: Tag },
      { label: "Flash Sales", href: `${base}/flash-sales`, icon: Zap },
      { label: "Banners", href: `${base}/banners`, icon: ImageIcon },
    ],
  },
  {
    title: "Reports",
    items: [
      { label: "Sales", href: `${base}/reports/sales`, icon: BarChart3 },
      { label: "Revenue", href: `${base}/reports/revenue`, icon: LineChart },
      { label: "Affiliate", href: `${base}/reports/affiliate`, icon: Users },
      { label: "Supplier", href: `${base}/reports/supplier`, icon: Truck },
      { label: "Customer", href: `${base}/reports/customer`, icon: UserCheck },
    ],
  },
  {
    title: "Settings",
    items: [
      { label: "Commission", href: `${base}/settings/Commission`, icon: Percent },
      { label: "Subscription", href: `${base}/settings/Subscription`, icon: CreditCard },
      { label: "Joining Fee", href: `${base}/settings/joiningfee`, icon: DollarSign },
      { label: "Referral", href: `${base}/settings/Referral`, icon: UserPlus },
      { label: "Bonus", href: `${base}/settings/bonus`, icon: Award },
      { label: "Payment", href: `${base}/settings/Payment`, icon: CreditCard },
      { label: "General Settings", href: `${base}/settings/General`, icon: Settings },
    ],
  },
];

function NavGroup({ group }: { group: Group }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="mt-5">
      <button
        type="button"
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
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-slate-200 bg-white">
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