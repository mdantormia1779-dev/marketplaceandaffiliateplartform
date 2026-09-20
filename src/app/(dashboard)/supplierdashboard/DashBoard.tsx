"use client";

import React, { useState, useMemo, useEffect, memo } from 'react';
import { InventoryPanel } from './InventoryPanel';

/* ------------------------------------------------------------------ */
/* Dashboard icons                                                     */
/* ------------------------------------------------------------------ */
const Icons = {
  ShoppingBag: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
  ),
  DollarSign: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
  ),
  Star: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
  ),
  Bell: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
  ),
  Search: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
  ),
  Plus: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M5 12h14"/><path d="M12 5v14"/></svg>
  ),
  Download: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
  ),
  TrendingUp: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
  ),
  AlertTriangle: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>
  ),
  Clock: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
  ),
  X: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
  ),
  Menu: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
  ),
  Eye: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
  ),
};

/* ------------------------------------------------------------------ */
/* Sidebar icons                                                       */
/* ------------------------------------------------------------------ */
type IconProps = React.SVGProps<SVGSVGElement>;

const SvgIcon = ({ children, ...props }: IconProps & { children: React.ReactNode }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    {children}
  </svg>
);

const SI = {
  Store: (p: IconProps) => (
    <SvgIcon {...p}>
      <rect width="20" height="5" x="2" y="3" rx="1" />
      <path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8" />
      <path d="M10 12h4" />
    </SvgIcon>
  ),
  Dashboard: (p: IconProps) => (
    <SvgIcon {...p}>
      <rect width="7" height="9" x="3" y="3" rx="1" />
      <rect width="7" height="5" x="14" y="3" rx="1" />
      <rect width="7" height="9" x="14" y="12" rx="1" />
      <rect width="7" height="5" x="3" y="16" rx="1" />
    </SvgIcon>
  ),
  Archive: (p: IconProps) => (
    <SvgIcon {...p}>
      <rect width="20" height="5" x="2" y="3" rx="1" />
      <path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8" />
      <path d="M10 12h4" />
    </SvgIcon>
  ),
  Star: (p: IconProps) => (
    <SvgIcon {...p}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </SvgIcon>
  ),
  Bag: (p: IconProps) => (
    <SvgIcon {...p}>
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </SvgIcon>
  ),
  Gift: (p: IconProps) => (
    <SvgIcon {...p}>
      <rect x="3" y="8" width="18" height="4" rx="1" />
      <path d="M12 8v13" />
      <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
      <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
    </SvgIcon>
  ),
  Percent: (p: IconProps) => (
    <SvgIcon {...p}>
      <line x1="19" x2="5" y1="5" y2="19" />
      <circle cx="6.5" cy="6.5" r="2.5" />
      <circle cx="17.5" cy="17.5" r="2.5" />
    </SvgIcon>
  ),
  Megaphone: (p: IconProps) => (
    <SvgIcon {...p}>
      <path d="m3 11 18-5v12L3 14v-3z" />
      <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
    </SvgIcon>
  ),
  Trending: (p: IconProps) => (
    <SvgIcon {...p}>
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </SvgIcon>
  ),
  Wallet: (p: IconProps) => (
    <SvgIcon {...p}>
      <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2" />
      <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
    </SvgIcon>
  ),
  Withdraw: (p: IconProps) => (
    <SvgIcon {...p}>
      <line x1="7" x2="17" y1="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </SvgIcon>
  ),
  Repeat: (p: IconProps) => (
    <SvgIcon {...p}>
      <path d="m17 2 4 4-4 4" />
      <path d="M3 11v-1a4 4 0 0 1 4-4h14" />
      <path d="m7 22-4-4 4-4" />
      <path d="M21 13v1a4 4 0 0 1-4 4H3" />
    </SvgIcon>
  ),
  File: (p: IconProps) => (
    <SvgIcon {...p}>
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
    </SvgIcon>
  ),
  Settings: (p: IconProps) => (
    <SvgIcon {...p}>
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </SvgIcon>
  ),
  ChevronDown: (p: IconProps) => (
    <SvgIcon {...p}>
      <path d="m6 9 6 6 6-6" />
    </SvgIcon>
  ),
  ChevronRight: (p: IconProps) => (
    <SvgIcon {...p}>
      <path d="m9 18 6-6-6-6" />
    </SvgIcon>
  ),
  X: (p: IconProps) => (
    <SvgIcon {...p}>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </SvgIcon>
  ),
};

/* ------------------------------------------------------------------ */
/* Sidebar config                                                      */
/* ------------------------------------------------------------------ */
interface SidebarChild {
  id: string;
  label: string;
}

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ComponentType<IconProps>;
  badge?: number;
  children?: SidebarChild[];
}

interface SidebarGroup {
  label: string;
  items: SidebarItem[];
}

const SIDEBAR_GROUPS: SidebarGroup[] = [
  {
    label: 'Overview',
    items: [{ id: 'overview', label: 'Dashboard', icon: SI.Dashboard }],
  },
  {
    label: 'Catalog',
    items: [
      {
        id: 'products-group',
        label: 'Products',
        icon: SI.Archive,
        children: [
          { id: 'products', label: 'All Products' },
          { id: 'products:add', label: 'Add Product' },
          { id: 'products:inventory', label: 'Inventory' },
        ],
      },
      { id: 'reviews', label: 'Reviews', icon: SI.Star, badge: 12 },
    ],
  },
  {
    label: 'Orders',
    items: [
      {
        id: 'orders-group',
        label: 'Orders',
        icon: SI.Bag,
        badge: 48,
        children: [
          { id: 'orders', label: 'All Orders' },
          { id: 'orders:Pending', label: 'Pending' },
          { id: 'orders:Shipped', label: 'Shipped' },
        ],
      },
    ],
  },
  {
    label: 'Marketing',
    items: [
      { id: 'coupons', label: 'Coupons', icon: SI.Gift },
      { id: 'discounts', label: 'Discounts', icon: SI.Percent },
      { id: 'affiliates', label: 'Affiliate Campaigns', icon: SI.Megaphone },
    ],
  },
  {
    label: 'Finance',
    items: [
      { id: 'sales', label: 'Sales', icon: SI.Trending },
      { id: 'wallet', label: 'Wallet', icon: SI.Wallet },
      { id: 'withdraw', label: 'Withdraw', icon: SI.Withdraw },
    ],
  },
  {
    label: 'Account',
    items: [
      { id: 'subscription', label: 'Subscription', icon: SI.Repeat },
      { id: 'reports', label: 'Reports', icon: SI.File },
      { id: 'settings', label: 'Settings', icon: SI.Settings },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Sidebar component                                                   */
/* ------------------------------------------------------------------ */
interface SidebarProps {
  activeId: string;
  onSelect: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const SidebarBadge = ({ value }: { value: number }) => (
  <span className="inline-flex h-6 min-w-[1.5rem] items-center justify-center rounded-full bg-emerald-100 px-2 text-xs font-semibold text-emerald-800">
    {value}
  </span>
);

const Sidebar: React.FC<SidebarProps> = ({ activeId, onSelect, isOpen, onClose }) => {
  const groupHasActive = (item: SidebarItem) =>
    !!item.children?.some((c) => c.id === activeId);

  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  useEffect(() => {
    SIDEBAR_GROUPS.forEach((g) =>
      g.items.forEach((item) => {
        if (item.children?.some((c) => c.id === activeId)) {
          setExpanded((prev) => (prev[item.id] ? prev : { ...prev, [item.id]: true }));
        }
      })
    );
  }, [activeId]);

  const toggle = (id: string) => setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

  const handleSelect = (id: string) => {
    onSelect(id);
    if (typeof window !== 'undefined' && window.innerWidth < 768) onClose();
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/30 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        aria-label="Primary"
        className={`fixed inset-y-0 left-0 z-40 flex w-64 shrink-0 flex-col border-r border-slate-200/70 bg-[#f8f9fe] transition-transform duration-200 ease-in-out md:static md:inset-auto md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-5 pb-3 pt-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#4a66d9] text-white shadow-sm">
              <SI.Store className="h-5 w-5" />
            </div>
            <div className="leading-tight">
              <p className="text-base font-bold tracking-tight text-slate-950">Nexora</p>
              <p className="text-xs text-slate-500">Supplier Workspace</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="rounded-md p-1 text-slate-400 hover:text-slate-700 md:hidden"
          >
            <SI.X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 pb-6 [scrollbar-width:thin]">
          {SIDEBAR_GROUPS.map((group) => (
            <div key={group.label} className="pt-5">
              <p className="mb-1.5 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                {group.label}
              </p>

              <ul className="space-y-0.5">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const hasChildren = !!item.children?.length;
                  const isOpenGroup = !!expanded[item.id];
                  const isActive = hasChildren ? groupHasActive(item) : activeId === item.id;

                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => (hasChildren ? toggle(item.id) : handleSelect(item.id))}
                        aria-expanded={hasChildren ? isOpenGroup : undefined}
                        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[15px] font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
                          isActive
                            ? 'text-indigo-800'
                            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                        } ${isActive && !hasChildren ? 'bg-indigo-50' : ''}`}
                      >
                        <Icon
                          className={`h-5 w-5 shrink-0 ${isActive ? 'text-indigo-700' : 'text-slate-500'}`}
                        />
                        <span className="flex-1 truncate">{item.label}</span>

                        {item.badge !== undefined && item.badge > 0 && (
                          <SidebarBadge value={item.badge} />
                        )}

                        {hasChildren &&
                          (isOpenGroup ? (
                            <SI.ChevronDown className="h-4 w-4 text-slate-400" />
                          ) : (
                            <SI.ChevronRight className="h-4 w-4 text-slate-400" />
                          ))}
                      </button>

                      {hasChildren && (
                        <div
                          className={`grid transition-[grid-template-rows] duration-200 ease-out motion-reduce:transition-none ${
                            isOpenGroup ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                          }`}
                        >
                          <ul className="overflow-hidden">
                            {item.children!.map((child) => {
                              const childActive = activeId === child.id;
                              return (
                                <li key={child.id} className="pt-0.5">
                                  <button
                                    type="button"
                                    tabIndex={isOpenGroup ? 0 : -1}
                                    onClick={() => handleSelect(child.id)}
                                    aria-current={childActive ? 'page' : undefined}
                                    className={`w-full rounded-lg py-2.5 pl-11 pr-3 text-left text-[15px] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
                                      childActive
                                        ? 'bg-indigo-50 font-semibold text-indigo-800'
                                        : 'font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-800'
                                    }`}
                                  >
                                    {child.label}
                                  </button>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
};

/* ------------------------------------------------------------------ */
/* Types & data                                                        */
/* ------------------------------------------------------------------ */
export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  image: string;
  salesCount: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  date: string;
  total: number;
  itemsCount: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  shippingAddress: string;
}

export interface Review {
  id: string;
  customer: string;
  rating: number;
  comment: string;
  productName: string;
  date: string;
}

export type DashboardTab =
  | 'overview'
  | 'products'
  | 'inventory'
  | 'reviews'
  | 'orders'
  | 'coupons'
  | 'discounts'
  | 'affiliates'
  | 'sales'
  | 'wallet'
  | 'withdraw'
  | 'subscription'
  | 'reports'
  | 'settings';

const PLACEHOLDER_TABS: DashboardTab[] = [
  'coupons',
  'discounts',
  'affiliates',
  'sales',
  'wallet',
  'withdraw',
  'subscription',
  'reports',
];

const INITIAL_PRODUCTS: Product[] = [
  { id: 'PROD-101', name: 'Ergonomic Wireless Keyboard', sku: 'KB-8802', category: 'Electronics', price: 89.99, stock: 45, status: 'In Stock', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=150&q=80', salesCount: 234 },
  { id: 'PROD-102', name: 'Precision Optical Mouse', sku: 'MS-2210', category: 'Electronics', price: 42.50, stock: 8, status: 'Low Stock', image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=150&q=80', salesCount: 412 },
  { id: 'PROD-103', name: 'Ultra-Wide HD Monitor Stand', sku: 'ST-9001', category: 'Accessories', price: 129.00, stock: 0, status: 'Out of Stock', image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=150&q=80', salesCount: 89 },
  { id: 'PROD-104', name: 'Noise Cancelling Headset', sku: 'HS-4040', category: 'Audio', price: 199.99, stock: 62, status: 'In Stock', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=150&q=80', salesCount: 512 },
  { id: 'PROD-105', name: 'USB-C Multi-port Hub', sku: 'HB-1100', category: 'Accessories', price: 34.99, stock: 3, status: 'Low Stock', image: 'https://images.unsplash.com/photo-1544652478-6653e09f18a2?auto=format&fit=crop&w=150&q=80', salesCount: 301 },
];

const INITIAL_ORDERS: Order[] = [
  { id: 'ORD-8921', customerName: 'Sarah Jenkins', customerEmail: 'sarah.j@example.com', date: '2026-09-20', total: 279.98, itemsCount: 2, status: 'Pending', shippingAddress: '742 Evergreen Terrace, Springfield, OR' },
  { id: 'ORD-8920', customerName: 'Michael Chen', customerEmail: 'm.chen@example.com', date: '2026-09-19', total: 129.00, itemsCount: 1, status: 'Processing', shippingAddress: '100 Market St, San Francisco, CA' },
  { id: 'ORD-8919', customerName: 'Emma Watson', customerEmail: 'emma.w@example.com', date: '2026-09-19', total: 432.50, itemsCount: 4, status: 'Shipped', shippingAddress: '12 Baker Street, London, UK' },
  { id: 'ORD-8918', customerName: 'David Miller', customerEmail: 'dmiller@example.com', date: '2026-09-18', total: 89.99, itemsCount: 1, status: 'Delivered', shippingAddress: '456 Oak Lane, Austin, TX' },
  { id: 'ORD-8917', customerName: 'Sophia Martinez', customerEmail: 'smartinez@example.com', date: '2026-09-17', total: 199.99, itemsCount: 1, status: 'Delivered', shippingAddress: '88 Ocean Drive, Miami, FL' },
];

const REVIEWS: Review[] = [
  { id: 'REV-1', customer: 'Alex Rivera', rating: 5, comment: 'Exceptional build quality! Shipping was super quick.', productName: 'Ergonomic Wireless Keyboard', date: '2 days ago' },
  { id: 'REV-2', customer: 'Jessica Alba', rating: 4, comment: 'Great sound isolation, very comfortable for long hours.', productName: 'Noise Cancelling Headset', date: '4 days ago' },
  { id: 'REV-3', customer: 'David K.', rating: 5, comment: 'Solid aluminum frame, looks very sleek on my setup.', productName: 'Ultra-Wide HD Monitor Stand', date: '1 week ago' },
];

/* ------------------------------------------------------------------ */
/* Dashboard                                                           */
/* ------------------------------------------------------------------ */
const DashBoard: React.FC = memo(() => {
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
  const [activeNav, setActiveNav] = useState<string>('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [orderFilter, setOrderFilter] = useState<string>('All');

  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const [newProduct, setNewProduct] = useState({
    name: '',
    sku: '',
    category: 'Electronics',
    price: '',
    stock: '',
    description: ''
  });

  const stats = useMemo(() => {
    const totalRev = orders.reduce((acc, curr) => acc + curr.total, 0);
    const pendingCount = orders.filter(o => o.status === 'Pending').length;
    const lowStockCount = products.filter(p => p.stock <= 10).length;
    return {
      revenue: totalRev,
      pendingOrders: pendingCount,
      lowStock: lowStockCount,
      rating: 4.8,
      totalReviews: 142
    };
  }, [orders, products]);

  const handleNavigate = (id: string) => {
    setActiveNav(id);
    const [base, sub] = id.split(':');

    if (base === 'products' && sub === 'add') {
      setActiveTab('products');
      setIsAddProductOpen(true);
      return;
    }

    if (base === 'products' && sub === 'inventory') {
      setActiveTab('inventory');
      return;
    }

    if (base === 'orders') {
      setOrderFilter(sub ?? 'All');
    }

    setActiveTab(base as DashboardTab);
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) return;

    const stockVal = parseInt(newProduct.stock) || 0;
    const item: Product = {
      id: `PROD-${Math.floor(100 + Math.random() * 900)}`,
      name: newProduct.name,
      sku: newProduct.sku || `SKU-${Math.floor(1000 + Math.random() * 9000)}`,
      category: newProduct.category,
      price: parseFloat(newProduct.price) || 0,
      stock: stockVal,
      status: stockVal === 0 ? 'Out of Stock' : stockVal <= 10 ? 'Low Stock' : 'In Stock',
      image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=150&q=80',
      salesCount: 0
    };

    setProducts([item, ...products]);
    setIsAddProductOpen(false);
    setNewProduct({ name: '', sku: '', category: 'Electronics', price: '', stock: '', description: '' });
  };

  const handleDeleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  const filteredOrders = useMemo(() => {
    return orders.filter(o => {
      const matchesFilter = orderFilter === 'All' || o.status === orderFilter;
      const matchesSearch = o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            o.customerName.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [orders, orderFilter, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col md:flex-row antialiased">

      <Sidebar
        activeId={activeNav}
        onSelect={handleNavigate}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        <header className="h-16 bg-white border-b border-slate-200 px-4 md:px-8 flex items-center justify-between gap-4 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 md:hidden"
              aria-label="Open menu"
            >
              <Icons.Menu />
            </button>

            <div className="relative w-48 sm:w-72 md:w-96">
              <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search orders, products, SKUs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-1.5 bg-slate-100 text-sm rounded-lg border border-transparent focus:border-indigo-500 focus:bg-white focus:outline-none transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAddProductOpen(true)}
              className="hidden sm:flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-3.5 py-2 rounded-lg shadow-sm transition-colors"
            >
              <Icons.Plus className="w-4 h-4" />
              <span>Add Product</span>
            </button>

            <div className="relative">
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 relative"
              >
                <Icons.Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white"></span>
              </button>

              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 py-2 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="font-semibold text-sm text-slate-800">Notifications</h3>
                    <span className="text-xs text-indigo-600 font-medium cursor-pointer">Mark all read</span>
                  </div>
                  <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto">
                    <div className="p-3 hover:bg-slate-50 cursor-pointer">
                      <p className="text-xs font-semibold text-slate-800">New order #ORD-8921 received!</p>
                      <p className="text-xs text-slate-500 mt-1">Sarah Jenkins placed an order for $279.98</p>
                      <span className="text-[10px] text-slate-400 mt-1 block">5 mins ago</span>
                    </div>
                    <div className="p-3 hover:bg-slate-50 cursor-pointer">
                      <p className="text-xs font-semibold text-amber-800">Low Stock Alert</p>
                      <p className="text-xs text-slate-500 mt-1">Precision Optical Mouse is down to 8 units</p>
                      <span className="text-[10px] text-slate-400 mt-1 block">1 hour ago</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="h-6 w-px bg-slate-200"></div>

            <div className="flex items-center gap-2">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                alt="Avatar"
                className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-500/20"
              />
              <div className="hidden lg:block text-left">
                <p className="text-xs font-semibold text-slate-800">Alex Morgan</p>
                <p className="text-[10px] text-slate-500">Store Manager</p>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6">

          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Revenue</span>
                <span className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                  <Icons.DollarSign className="w-5 h-5" />
                </span>
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold text-slate-900">${stats.revenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
                <div className="flex items-center gap-1 text-xs text-emerald-600 font-medium mt-1">
                  <Icons.TrendingUp className="w-3.5 h-3.5" />
                  <span>+12.4% vs last month</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Pending Orders</span>
                <span className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                  <Icons.ShoppingBag className="w-5 h-5" />
                </span>
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold text-slate-900">{stats.pendingOrders}</div>
                <div className="flex items-center gap-1 text-xs text-amber-600 font-medium mt-1">
                  <Icons.Clock className="w-3.5 h-3.5" />
                  <span>Requires action</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Low Stock Warning</span>
                <span className="p-2 bg-rose-50 text-rose-600 rounded-lg">
                  <Icons.AlertTriangle className="w-5 h-5" />
                </span>
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold text-slate-900">{stats.lowStock} Items</div>
                <div className="flex items-center gap-1 text-xs text-rose-600 font-medium mt-1">
                  <span>Needs restocking</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Supplier Rating</span>
                <span className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                  <Icons.Star className="w-5 h-5 fill-indigo-600" />
                </span>
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold text-slate-900">{stats.rating} / 5.0</div>
                <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                  <span>Based on {stats.totalReviews} customer reviews</span>
                </div>
              </div>
            </div>
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                <div className="lg:col-span-2 bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-slate-800">Sales Overview</h3>
                      <p className="text-xs text-slate-500">Weekly revenue performance overview</p>
                    </div>
                    <select className="text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 bg-slate-50 text-slate-600 font-medium focus:outline-none">
                      <option>Last 7 Days</option>
                      <option>Last 30 Days</option>
                      <option>This Year</option>
                    </select>
                  </div>

                  <div className="h-56 w-full flex items-end justify-between gap-2 pt-6 pb-2 px-2">
                    {[
                      { day: 'Mon', val: 40, amt: '$1.2k' },
                      { day: 'Tue', val: 65, amt: '$2.1k' },
                      { day: 'Wed', val: 30, amt: '$900' },
                      { day: 'Thu', val: 85, amt: '$3.4k' },
                      { day: 'Fri', val: 95, amt: '$4.2k' },
                      { day: 'Sat', val: 75, amt: '$2.8k' },
                      { day: 'Sun', val: 50, amt: '$1.8k' },
                    ].map((bar, idx) => (
                      <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                        <div className="opacity-0 group-hover:opacity-100 text-[10px] bg-slate-800 text-white px-1.5 py-0.5 rounded transition-opacity">
                          {bar.amt}
                        </div>
                        <div
                          className="w-full bg-indigo-500/80 group-hover:bg-indigo-600 rounded-t transition-all duration-300"
                          style={{ height: `${bar.val}%` }}
                        ></div>
                        <span className="text-xs text-slate-400 font-medium">{bar.day}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col">
                  <h3 className="font-bold text-slate-800 mb-1">Inventory Warnings</h3>
                  <p className="text-xs text-slate-500 mb-4">Products needing immediate attention</p>

                  <div className="space-y-3 flex-1 overflow-y-auto">
                    {products.filter(p => p.stock <= 10).map((prod) => (
                      <div key={prod.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
                        <div className="flex items-center gap-3">
                          <img src={prod.image} alt={prod.name} className="w-10 h-10 rounded-md object-cover" />
                          <div>
                            <p className="text-xs font-semibold text-slate-800 truncate max-w-[120px]">{prod.name}</p>
                            <span className="text-[10px] text-slate-400">SKU: {prod.sku}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`text-xs font-bold ${prod.stock === 0 ? 'text-rose-600' : 'text-amber-600'}`}>
                            {prod.stock === 0 ? 'Out of stock' : `${prod.stock} left`}
                          </span>
                          <button
                            onClick={() => handleNavigate('products:inventory')}
                            className="block text-[10px] text-indigo-600 hover:underline mt-0.5"
                          >
                            Restock
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-slate-800">Recent Orders</h3>
                    <p className="text-xs text-slate-500">Manage order details and track fulfillment</p>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    {['All', 'Pending', 'Processing', 'Shipped', 'Delivered'].map((status) => (
                      <button
                        key={status}
                        onClick={() => setOrderFilter(status)}
                        className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${
                          orderFilter === status
                            ? 'bg-slate-900 text-white'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50/50 text-[11px] uppercase tracking-wider text-slate-400 border-b border-slate-100">
                        <th className="py-3 px-5">Order ID</th>
                        <th className="py-3 px-5">Customer</th>
                        <th className="py-3 px-5">Date</th>
                        <th className="py-3 px-5">Total</th>
                        <th className="py-3 px-5">Status</th>
                        <th className="py-3 px-5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs">
                      {filteredOrders.slice(0, 5).map((order) => (
                        <tr key={order.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3.5 px-5 font-semibold text-indigo-600">{order.id}</td>
                          <td className="py-3.5 px-5">
                            <div className="font-medium text-slate-800">{order.customerName}</div>
                            <div className="text-[10px] text-slate-400">{order.customerEmail}</div>
                          </td>
                          <td className="py-3.5 px-5 text-slate-500">{order.date}</td>
                          <td className="py-3.5 px-5 font-semibold text-slate-800">${order.total.toFixed(2)}</td>
                          <td className="py-3.5 px-5">
                            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium ${
                              order.status === 'Pending' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                              order.status === 'Processing' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                              order.status === 'Shipped' ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' :
                              'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-5 text-right">
                            <button
                              onClick={() => setSelectedOrder(order)}
                              className="text-slate-600 hover:text-indigo-600 font-medium inline-flex items-center gap-1 bg-slate-100 hover:bg-indigo-50 px-2.5 py-1 rounded-md transition-colors"
                            >
                              <Icons.Eye className="w-3.5 h-3.5" />
                              <span>View</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Product Catalog Tab */}
          {activeTab === 'products' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-800">Product Catalog</h2>
                  <p className="text-xs text-slate-500">Manage stock levels, pricing, and catalog details</p>
                </div>
                <button
                  onClick={() => setIsAddProductOpen(true)}
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium px-4 py-2 rounded-lg shadow-sm transition-colors"
                >
                  <Icons.Plus className="w-4 h-4" />
                  <span>Add New Item</span>
                </button>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-400 border-b border-slate-100">
                        <th className="py-3.5 px-5">Product Details</th>
                        <th className="py-3.5 px-5">SKU</th>
                        <th className="py-3.5 px-5">Category</th>
                        <th className="py-3.5 px-5">Price</th>
                        <th className="py-3.5 px-5">Stock</th>
                        <th className="py-3.5 px-5">Status</th>
                        <th className="py-3.5 px-5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs">
                      {products.map((product) => (
                        <tr key={product.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3.5 px-5">
                            <div className="flex items-center gap-3">
                              <img src={product.image} alt={product.name} className="w-10 h-10 rounded-lg object-cover border border-slate-100" />
                              <div>
                                <span className="font-semibold text-slate-800 block">{product.name}</span>
                                <span className="text-[10px] text-slate-400">{product.salesCount} total sales</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-5 text-slate-500 font-mono">{product.sku}</td>
                          <td className="py-3.5 px-5 text-slate-600">{product.category}</td>
                          <td className="py-3.5 px-5 font-semibold text-slate-800">${product.price.toFixed(2)}</td>
                          <td className="py-3.5 px-5 font-medium">{product.stock} units</td>
                          <td className="py-3.5 px-5">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                              product.status === 'In Stock' ? 'bg-emerald-50 text-emerald-700' :
                              product.status === 'Low Stock' ? 'bg-amber-50 text-amber-700' :
                              'bg-rose-50 text-rose-700'
                            }`}>
                              {product.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-5 text-right">
                            <button className="text-slate-400 hover:text-slate-600 font-medium p-1">
                              Edit
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* INVENTORY TAB: Render InventoryPanel Component                           */}
          {/* ========================================================================= */}
          {activeTab === 'inventory' && (
            <InventoryPanel
              products={products}
              onAddProduct={() => setIsAddProductOpen(true)}
              onDeleteProduct={handleDeleteProduct}
            />
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-800">Order Fulfillment</h2>
                  <p className="text-xs text-slate-500">Track and manage customer shipments</p>
                </div>
                <button className="flex items-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium px-3.5 py-2 rounded-lg transition-colors">
                  <Icons.Download className="w-4 h-4" />
                  <span>Export CSV</span>
                </button>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex flex-wrap gap-2">
                  {['All', 'Pending', 'Processing', 'Shipped', 'Delivered'].map((status) => (
                    <button
                      key={status}
                      onClick={() => setOrderFilter(status)}
                      className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${
                        orderFilter === status
                          ? 'bg-indigo-600 text-white'
                          : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-400 border-b border-slate-100">
                        <th className="py-3.5 px-5">Order ID</th>
                        <th className="py-3.5 px-5">Customer</th>
                        <th className="py-3.5 px-5">Shipping Address</th>
                        <th className="py-3.5 px-5">Total</th>
                        <th className="py-3.5 px-5">Status</th>
                        <th className="py-3.5 px-5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs">
                      {filteredOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3.5 px-5 font-semibold text-indigo-600">{order.id}</td>
                          <td className="py-3.5 px-5">
                            <div className="font-medium text-slate-800">{order.customerName}</div>
                            <div className="text-[10px] text-slate-400">{order.customerEmail}</div>
                          </td>
                          <td className="py-3.5 px-5 text-slate-500 max-w-xs truncate">{order.shippingAddress}</td>
                          <td className="py-3.5 px-5 font-semibold text-slate-800">${order.total.toFixed(2)}</td>
                          <td className="py-3.5 px-5">
                            <select
                              value={order.status}
                              onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value as Order['status'])}
                              className="text-xs border border-slate-200 rounded px-2 py-1 bg-white font-medium focus:outline-none"
                            >
                              <option value="Pending">Pending</option>
                              <option value="Processing">Processing</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Delivered">Delivered</option>
                            </select>
                          </td>
                          <td className="py-3.5 px-5 text-right">
                            <button
                              onClick={() => setSelectedOrder(order)}
                              className="text-indigo-600 hover:text-indigo-800 font-medium"
                            >
                              Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Wallet Tab */}
          {activeTab === 'wallet' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white p-6 rounded-2xl shadow-lg flex flex-col justify-between">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-indigo-300 font-medium">Available Balance</span>
                    <h2 className="text-3xl font-extrabold mt-2">$4,850.00</h2>
                  </div>
                  <div className="mt-6 pt-4 border-t border-indigo-800/60 flex items-center justify-between">
                    <span className="text-xs text-indigo-200">Next payout: Sept 25</span>
                    <button className="bg-indigo-500 hover:bg-indigo-400 text-white text-xs font-semibold px-3.5 py-2 rounded-lg transition-colors">
                      Withdraw Now
                    </button>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-slate-400 font-medium">Lifetime Revenue</span>
                    <h2 className="text-3xl font-extrabold text-slate-800 mt-2">$32,410.00</h2>
                  </div>
                  <p className="text-xs text-emerald-600 font-medium flex items-center gap-1 mt-4">
                    <Icons.TrendingUp className="w-4 h-4" />
                    <span>+18% from last quarter</span>
                  </p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-slate-400 font-medium">Platform Fee Rate</span>
                    <h2 className="text-3xl font-extrabold text-slate-800 mt-2">5.0%</h2>
                  </div>
                  <p className="text-xs text-slate-500 mt-4">Standard Tier Vendor Plan</p>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden p-5">
                <h3 className="font-bold text-slate-800 mb-4">Payout History</h3>
                <div className="space-y-3">
                  {[
                    { id: 'PAY-901', date: 'Sept 15, 2026', amount: '$2,140.00', status: 'Completed', method: 'Direct Deposit (...4821)' },
                    { id: 'PAY-882', date: 'Sept 01, 2026', amount: '$3,890.50', status: 'Completed', method: 'Direct Deposit (...4821)' },
                    { id: 'PAY-741', date: 'Aug 15, 2026', amount: '$1,950.00', status: 'Completed', method: 'Direct Deposit (...4821)' }
                  ].map((payout) => (
                    <div key={payout.id} className="flex items-center justify-between p-3 border-b border-slate-100 last:border-none">
                      <div>
                        <p className="text-xs font-semibold text-slate-800">{payout.id}</p>
                        <p className="text-[10px] text-slate-400">{payout.date} • {payout.method}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-bold text-slate-800 block">{payout.amount}</span>
                        <span className="text-[10px] text-emerald-600 font-medium">{payout.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === 'reviews' && (
            <div className="space-y-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold text-slate-800 mb-2">Customer Feedback</h2>
              <div className="space-y-4 divide-y divide-slate-100">
                {REVIEWS.map((rev) => (
                  <div key={rev.id} className="pt-4 first:pt-0">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs text-slate-800">{rev.customer}</span>
                      <span className="text-[10px] text-slate-400">{rev.date}</span>
                    </div>
                    <div className="flex items-center gap-1 my-1">
                      {[...Array(5)].map((_, i) => (
                        <Icons.Star
                          key={i}
                          className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-slate-600 mt-1">{rev.comment}</p>
                    <p className="text-[10px] text-indigo-600 mt-1 font-medium">Product: {rev.productName}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm max-w-2xl space-y-4">
              <h2 className="text-xl font-bold text-slate-800 border-b border-slate-100 pb-3">Supplier Settings</h2>
              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-600 font-medium mb-1">Store Display Name</label>
                  <input type="text" defaultValue="Nexora" className="w-full border border-slate-200 rounded-lg p-2 focus:outline-none focus:border-indigo-500" />
                </div>
                <div>
                  <label className="block text-slate-600 font-medium mb-1">Support Email</label>
                  <input type="email" defaultValue="support@techgearglobal.com" className="w-full border border-slate-200 rounded-lg p-2 focus:outline-none focus:border-indigo-500" />
                </div>
                <button className="bg-indigo-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* Placeholder Tabs */}
          {PLACEHOLDER_TABS.includes(activeTab) && (
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm max-w-2xl">
              <h2 className="text-xl font-bold text-slate-800 capitalize">
                {activeTab === 'affiliates' ? 'Affiliate Campaigns' : activeTab}
              </h2>
              <p className="text-xs text-slate-500 mt-2">This section is coming soon.</p>
            </div>
          )}

        </main>
      </div>

      {/* Add New Product Modal */}
      {isAddProductOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-slate-800 text-lg">Add New Product</h3>
              <button onClick={() => setIsAddProductOpen(false)} className="text-slate-400 hover:text-slate-600">
                <Icons.X />
              </button>
            </div>

            <form onSubmit={handleAddProduct} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ergonomic Chair"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="w-full border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">SKU Code</label>
                  <input
                    type="text"
                    placeholder="PROD-000"
                    value={newProduct.sku}
                    onChange={(e) => setNewProduct({ ...newProduct, sku: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Electronics">Electronics</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Audio">Audio</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="99.99"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Initial Stock</label>
                  <input
                    type="number"
                    required
                    placeholder="50"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddProductOpen(false)}
                  className="px-4 py-2 border border-slate-200 rounded-lg font-medium text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium shadow-sm"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100">
            <div className="flex justify-between items-start border-b border-slate-100 pb-3 mb-4">
              <div>
                <h3 className="font-bold text-slate-800 text-base">Order Details</h3>
                <p className="text-xs text-indigo-600 font-semibold">{selectedOrder.id}</p>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="text-slate-400 hover:text-slate-600">
                <Icons.X />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-400 font-medium block">Customer Information</span>
                <p className="font-semibold text-slate-800">{selectedOrder.customerName}</p>
                <p className="text-slate-500">{selectedOrder.customerEmail}</p>
              </div>

              <div>
                <span className="text-slate-400 font-medium block">Shipping Address</span>
                <p className="text-slate-700">{selectedOrder.shippingAddress}</p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex justify-between items-center">
                <span className="font-semibold text-slate-800">Total Amount:</span>
                <span className="font-extrabold text-indigo-600 text-sm">${selectedOrder.total.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedOrder(null)}
                className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold"
              >
                Close Modal
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
});

DashBoard.displayName = 'DashBoard';

export default DashBoard;