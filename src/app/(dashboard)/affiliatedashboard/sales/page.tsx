"use client";

import { useMemo, useState } from "react";
import { ShoppingCart, DollarSign, Receipt, TrendingUp } from "lucide-react";

import SalesHeader from "./components/SalesHeader";
import StatCard from "./components/StatCard";
import OrdersFilterBar from "./components/OrdersFilterBar";
import OrdersTable from "./components/OrdersTable";
import { Order, SalesStat, StatusFilter } from "./components/types";

const STATS: SalesStat[] = [
  {
    label: "Total Sales",
    value: "428",
    change: "+8.4%",
    icon: ShoppingCart,
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-600",
    topBarColor: "bg-indigo-500",
  },
  {
    label: "Total Revenue",
    value: "৳6,84,200",
    change: "+14.8%",
    icon: DollarSign,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    topBarColor: "bg-emerald-500",
  },
  {
    label: "Average Order Value",
    value: "৳1,598",
    change: "+3.1%",
    icon: Receipt,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
    topBarColor: "bg-amber-500",
  },
  {
    label: "Conversion Rate",
    value: "3.42%",
    change: "+0.8%",
    icon: TrendingUp,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    topBarColor: "bg-blue-500",
  },
];

const ORDERS: Order[] = [
  { id: "ORD-10284", product: "Wireless Headphones", emoji: "🎧", customer: "Rina Akter", orderDate: "2026-09-23", orderAmount: "2,499", commission: "375", status: "Pending" },
  { id: "ORD-10279", product: "Smart Watch", emoji: "⌚", customer: "Tanvir Hasan", orderDate: "2026-09-22", orderAmount: "3,899", commission: "468", status: "Approved" },
  { id: "ORD-10271", product: "Premium Backpack", emoji: "🎒", customer: "Sadia Islam", orderDate: "2026-09-21", orderAmount: "1,899", commission: "285", status: "Completed" },
  { id: "ORD-10264", product: "Pour-Over Coffee Maker", emoji: "☕", customer: "Imran Kabir", orderDate: "2026-09-20", orderAmount: "3,199", commission: "448", status: "Pending" },
  { id: "ORD-10258", product: "Running Shoes", emoji: "👟", customer: "Nusrat Jahan", orderDate: "2026-09-19", orderAmount: "2,299", commission: "207", status: "Approved" },
  { id: "ORD-10249", product: "Mechanical Keyboard", emoji: "⌨️", customer: "Arif Mahmud", orderDate: "2026-09-18", orderAmount: "4,299", commission: "473", status: "Completed" },
  { id: "ORD-10238", product: "Bluetooth Speaker", emoji: "🔊", customer: "Fahim Rahman", orderDate: "2026-09-16", orderAmount: "1,499", commission: "120", status: "Refunded" },
  { id: "ORD-10224", product: "LED Desk Lamp", emoji: "💡", customer: "Maliha Chowdhury", orderDate: "2026-09-15", orderAmount: "1,299", commission: "208", status: "Completed" },
  { id: "ORD-10211", product: "Non-Slip Yoga Mat", emoji: "🧘", customer: "Rezaul Karim", orderDate: "2026-09-13", orderAmount: "999", commission: "130", status: "Cancelled" },
  { id: "ORD-10202", product: "Polarized Sunglasses", emoji: "🕶️", customer: "Sharmin Sultana", orderDate: "2026-09-11", orderAmount: "1,599", commission: "288", status: "Pending" },
  { id: "ORD-10196", product: "Wireless Headphones", emoji: "🎧", customer: "Kamal Uddin", orderDate: "2026-09-09", orderAmount: "2,499", commission: "249", status: "Approved" },
  { id: "ORD-10188", product: "Smart Watch", emoji: "⌚", customer: "Ayesha Siddika", orderDate: "2026-09-07", orderAmount: "3,899", commission: "468", status: "Completed" },
];

export default function SalesPage() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<StatusFilter>("All Statuses");

  const filteredOrders = useMemo<Order[]>(() => {
    return ORDERS.filter((order) => {
      const matchesStatus =
        selectedStatus === "All Statuses" || order.status === selectedStatus;

      const term = searchTerm.trim().toLowerCase();
      const matchesSearch =
        term === "" ||
        order.id.toLowerCase().includes(term) ||
        order.product.toLowerCase().includes(term) ||
        order.customer.toLowerCase().includes(term);

      return matchesStatus && matchesSearch;
    });
  }, [searchTerm, selectedStatus]);

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 md:p-8 space-y-6">
      <SalesHeader />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat, idx) => (
          <StatCard key={stat.label} {...stat} delay={idx * 80} />
        ))}
      </div>

      <OrdersFilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
      />

      <OrdersTable orders={filteredOrders} />
    </div>
  );
}