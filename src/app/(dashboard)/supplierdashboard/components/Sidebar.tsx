"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import {
  LayoutDashboard,
  Package,
  Star,
  ShoppingBag,
  Gift,
  Percent,
  Megaphone,
  TrendingUp,
  Wallet,
  Banknote,
  Repeat,
  FileText,
  Settings,
  ChevronDown,
  ChevronRight,
  Store,
  X,
} from "lucide-react";

type MenuChild = {
  label: string;
  href: string;
};

type MenuItem = {
  label: string;
  href?: string;
  icon: React.ElementType;
  badge?: number;
  children?: MenuChild[];
};

type MenuGroup = {
  label: string;
  items: MenuItem[];
};

const SIDEBAR_GROUPS: MenuGroup[] = [
  {
    label: "Overview",
    items: [
      {
        label: "Dashboard",
        href: "/supplierdashboard",
        icon: LayoutDashboard,
      },
    ],
  },

  {
    label: "Catalog",
    items: [
      {
        label: "Products",
        icon: Package,
        children: [
          {
            label: "All Products",
            href: "/supplierdashboard/products",
          },
          {
            label: "Add Product",
            href: "/supplierdashboard/products/add",
          },
          {
            label: "Inventory",
            href: "/supplierdashboard/products/inventory",
          },
        ],
      },

      {
        label: "Reviews",
        href: "/supplierdashboard/reviews",
        icon: Star,
        badge: 12,
      },
    ],
  },

  {
    label: "Orders",
    items: [
      {
        label: "Orders",
        icon: ShoppingBag,
        badge: 48,
        children: [
          {
            label: "All Orders",
            href: "/supplierdashboard/orders",
          },
          {
            label: "Pending",
            href: "/supplierdashboard/orders/pending",
          },
          {
            label: "Shipped",
            href: "/supplierdashboard/orders/shipped",
          },
        ],
      },
    ],
  },

  {
    label: "Marketing",
    items: [
      {
        label: "Coupons",
        href: "/supplierdashboard/coupons",
        icon: Gift,
      },
      {
        label: "Discounts",
        href: "/supplierdashboard/discounts",
        icon: Percent,
      },
      {
        label: "Affiliate Campaigns",
        href: "/supplierdashboard/affiliates",
        icon: Megaphone,
      },
    ],
  },

  {
    label: "Finance",
    items: [
      {
        label: "Sales",
        href: "/supplierdashboard/finance/sales",
        icon: TrendingUp,
      },
      {
        label: "Wallet",
        href: "/supplierdashboard/finance/wallet",
        icon: Wallet,
      },
      {
        label: "Withdraw",
        href: "/supplierdashboard/finance/withdraw",
        icon: Banknote,
      },
    ],
  },

  {
    label: "Account",
    items: [
      {
        label: "Subscription",
        icon: Repeat,
        children: [
          {
            label: "Current Plan",
            href: "/supplierdashboard/account/subscription/current-plan",
          },
          {
            label: "Upgrade",
            href: "/supplierdashboard/account/subscription/upgrade",
          },
          {
            label: "Billing",
            href: "/supplierdashboard/account/subscription/billing",
          },
        ],
      },

      {
        label: "Reports",
        href: "/supplierdashboard/account/reports",
        icon: FileText,
      },

      {
        label: "Settings",
        href: "/supplierdashboard/account/settings",
        icon: Settings,
      },
    ],
  },
];

function SidebarBadge({ value }: { value: number }) {
  return (
    <span className="inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-emerald-100 px-1.5 text-[11px] font-semibold text-emerald-800">
      {value}
    </span>
  );
}

export default function Sidebar() {
  const pathname = usePathname();

  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const isActive = (href?: string) => {
    if (!href) return false;

    if (href === "/supplierdashboard") {
      return pathname === href;
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const hasActiveChild = (children?: MenuChild[]) => {
    if (!children) return false;

    return children.some((child) => isActive(child.href));
  };

  /*
   * Automatically open the parent menu when
   * one of its child pages is currently active.
   */
  useEffect(() => {
    SIDEBAR_GROUPS.forEach((group) => {
      group.items.forEach((item) => {
        if (hasActiveChild(item.children)) {
          setExpanded((prev) => ({
            ...prev,
            [item.label]: true,
          }));
        }
      });
    });
  }, [pathname]);

  const toggleMenu = (label: string) => {
    setExpanded((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  return (
    <aside className="fixed left-0 top-0 bottom-0 z-40 flex h-screen w-64 shrink-0 flex-col overflow-hidden border-r border-slate-200/80 bg-white">
      {/* =====================================================
          BRAND HEADER
      ====================================================== */}
      <div className="flex shrink-0 items-center justify-between px-5 pb-3 pt-5">
        <Link
          href="/supplierdashboard"
          className="flex items-center gap-3"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#4f46e5] text-white shadow-md">
            <Store className="h-5 w-5" />
          </div>

          <div className="leading-tight">
            <p className="text-base font-bold tracking-tight text-slate-900">
              Nexora
            </p>

            <p className="text-xs font-medium text-slate-400">
              Supplier Workspace
            </p>
          </div>
        </Link>

        <button
          type="button"
          className="rounded-md p-1 text-slate-400 hover:text-slate-700 md:hidden"
          aria-label="Close menu"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* =====================================================
          NAVIGATION
      ====================================================== */}
      <nav className="flex-1 overflow-y-auto px-3.5 pb-6">
        {SIDEBAR_GROUPS.map((group) => (
          <div key={group.label} className="pt-4">
            {/* Group title */}
            <p className="mb-2 px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              {group.label}
            </p>

            <ul className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;

                const hasChildren =
                  !!item.children && item.children.length > 0;

                const isOpen = !!expanded[item.label];

                const active =
                  isActive(item.href) ||
                  hasActiveChild(item.children);

                return (
                  <li key={item.label}>
                    {/* =================================================
                        MENU WITH CHILDREN
                    ================================================== */}
                    {hasChildren ? (
                      <>
                        <button
                          type="button"
                          onClick={() => toggleMenu(item.label)}
                          className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition-all ${
                            item.label === "Subscription" && isOpen
                              ? "border border-slate-900 bg-white text-slate-700"
                              : active
                                ? "bg-indigo-600 text-white shadow-sm"
                                : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
                          }`}
                        >
                          {/* Icon */}
                          <Icon
                            className={`h-4 w-4 shrink-0 ${
                              item.label === "Subscription" && isOpen
                                ? "text-slate-700"
                                : active
                                  ? "text-white"
                                  : "text-slate-500"
                            }`}
                          />

                          {/* Label */}
                          <span className="flex-1 truncate">
                            {item.label}
                          </span>

                          {/* Badge */}
                          {item.badge !== undefined && (
                            <SidebarBadge value={item.badge} />
                          )}

                          {/* Arrow */}
                          {isOpen ? (
                            <ChevronDown className="h-4 w-4 text-slate-400" />
                          ) : (
                            <ChevronRight
                              className={`h-4 w-4 ${
                                active
                                  ? "text-white/80"
                                  : "text-slate-400"
                              }`}
                            />
                          )}
                        </button>

                        {/* =================================================
                            SUBMENU
                        ================================================== */}
                        <div
                          className={`grid transition-[grid-template-rows] duration-200 ease-out ${
                            isOpen
                              ? "grid-rows-[1fr]"
                              : "grid-rows-[0fr]"
                          }`}
                        >
                          <div className="overflow-hidden">
                            <ul className="mt-1 ml-5 space-y-1 pl-3">
                              {item.children?.map((child) => {
                                const childActive = isActive(child.href);

                                return (
                                  <li key={child.href}>
                                    <Link
                                      href={child.href}
                                      className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                                        childActive
                                          ? "font-semibold text-slate-900"
                                          : "font-medium text-slate-500 hover:text-slate-900"
                                      }`}
                                    >
                                      {child.label}
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        </div>
                      </>
                    ) : (
                      /* =================================================
                         NORMAL MENU ITEM
                      ================================================== */
                      <Link
                        href={item.href || "#"}
                        className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all ${
                          active
                            ? "bg-indigo-600 text-white shadow-sm"
                            : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
                        }`}
                      >
                        <Icon
                          className={`h-4 w-4 shrink-0 ${
                            active
                              ? "text-white"
                              : "text-slate-500"
                          }`}
                        />

                        <span className="flex-1 truncate">
                          {item.label}
                        </span>

                        {item.badge !== undefined && (
                          <SidebarBadge value={item.badge} />
                        )}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}