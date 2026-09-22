// src/app/(dashboard)/supplierdashboard/components/TransactionAndPayout.tsx
"use client";

import { useState } from "react";
import {
  Search,
  Plus,
  Building2,
  CheckCircle2,
  AlertCircle,
  Trash2,
  Star,
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  Share2,
  RotateCcw,
  Gift,
  CreditCard,
  Crown,
} from "lucide-react";

const TRANSACTIONS = [
  {
    id: "1",
    title: "Order #NX-92415 · Aurora Noise-Cancelling Headphones",
    txn: "TXN-99347",
    type: "Sale",
    typeBg: "bg-emerald-100 text-emerald-800",
    date: "Sep 18, 2026",
    time: "09:24 AM",
    amount: "+$598",
    amountColor: "text-emerald-600",
    status: "Completed",
    balanceAfter: "$42,250.75",
    icon: ShoppingBag,
    iconBg: "bg-emerald-100 text-emerald-700",
  },
  {
    id: "2",
    title: "Affiliate commission — Rafi Ahmed",
    txn: "TXN-99346",
    type: "Commission",
    typeBg: "bg-teal-100 text-teal-800",
    date: "Sep 18, 2026",
    time: "09:24 AM",
    amount: "-$71.76",
    amountColor: "text-slate-900",
    status: "Completed",
    balanceAfter: "$41,652.75",
    icon: Share2,
    iconBg: "bg-slate-100 text-slate-600",
  },
  {
    id: "3",
    title: "Order #NX-92413 · Vega Smart Fitness Watch",
    txn: "TXN-99341",
    type: "Sale",
    typeBg: "bg-emerald-100 text-emerald-800",
    date: "Sep 17, 2026",
    time: "06:41 PM",
    amount: "+$189.50",
    amountColor: "text-emerald-600",
    status: "Completed",
    balanceAfter: "$41,724.51",
    icon: ShoppingBag,
    iconBg: "bg-emerald-100 text-emerald-700",
  },
  {
    id: "4",
    title: "Refund issued — Order #NX-92410",
    txn: "TXN-99338",
    type: "Refund",
    typeBg: "bg-rose-100 text-rose-800",
    date: "Sep 16, 2026",
    time: "10:07 AM",
    amount: "-$218",
    amountColor: "text-slate-900",
    status: "Completed",
    balanceAfter: "$41,535.01",
    icon: RotateCcw,
    iconBg: "bg-slate-100 text-slate-600",
  },
  {
    id: "5",
    title: "Campaign bonus — Summer Flash Sale",
    txn: "TXN-99333",
    type: "Bonus",
    typeBg: "bg-emerald-100 text-emerald-800",
    date: "Sep 15, 2026",
    time: "04:12 PM",
    amount: "+$150",
    amountColor: "text-emerald-600",
    status: "Completed",
    balanceAfter: "$41,753.01",
    icon: Gift,
    iconBg: "bg-emerald-100 text-emerald-700",
  },
  {
    id: "6",
    title: "Withdrawal to Chase Bank •••• 4821",
    txn: "TXN-99330",
    type: "Withdrawal",
    typeBg: "bg-slate-100 text-slate-700",
    date: "Sep 15, 2026",
    time: "11:30 AM",
    amount: "-$5,000",
    amountColor: "text-slate-900",
    status: "Completed",
    balanceAfter: "$46,603.01",
    icon: CreditCard,
    iconBg: "bg-slate-100 text-slate-600",
  },
  {
    id: "7",
    title: "Order #NX-92407 · Drift Ergonomic Office Chair",
    txn: "TXN-99326",
    type: "Sale",
    typeBg: "bg-emerald-100 text-emerald-800",
    date: "Sep 14, 2026",
    time: "05:11 PM",
    amount: "+$429",
    amountColor: "text-emerald-600",
    status: "Completed",
    balanceAfter: "$47,103.01",
    icon: ShoppingBag,
    iconBg: "bg-emerald-100 text-emerald-700",
  },
  {
    id: "8",
    title: "Professional plan renewal",
    txn: "TXN-99322",
    type: "Subscription",
    typeBg: "bg-amber-100 text-amber-800",
    date: "Sep 13, 2026",
    time: "08:00 AM",
    amount: "-$49",
    amountColor: "text-slate-900",
    status: "Completed",
    balanceAfter: "$46,674.01",
    icon: Crown,
    iconBg: "bg-slate-100 text-slate-600",
  },
];

export default function TransactionAndPayout() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All types");
  const [selectedStatus, setSelectedStatus] = useState("All status");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
      {/* Transaction History Section */}
      <div className="lg:col-span-2 bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Transaction History</h3>
            <p className="text-xs text-slate-400">Every credit and debit across your store wallet</p>
          </div>
          <span className="text-xs font-semibold text-slate-400">
            Reserve held: <span className="text-slate-700 font-bold">$1,860.25</span>
          </span>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by description or transaction ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50/50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer w-full sm:w-auto"
            >
              <option>All types</option>
              <option>Sale</option>
              <option>Commission</option>
              <option>Refund</option>
              <option>Bonus</option>
              <option>Withdrawal</option>
              <option>Subscription</option>
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer w-full sm:w-auto"
            >
              <option>All status</option>
              <option>Completed</option>
              <option>Pending</option>
              <option>Failed</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] uppercase tracking-wider font-bold text-slate-400">
                <th className="py-3 px-2">Transaction</th>
                <th className="py-3 px-2">Type</th>
                <th className="py-3 px-2">Date</th>
                <th className="py-3 px-2">Amount</th>
                <th className="py-3 px-2">Status</th>
                <th className="py-3 px-2 text-right">Balance After</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-xs">
              {TRANSACTIONS.map((item) => {
                const IconComp = item.icon;
                return (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-2">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-xl shrink-0 ${item.iconBg}`}>
                          <IconComp className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 leading-tight">{item.title}</p>
                          <p className="text-[10px] text-slate-400 font-medium">{item.txn}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${item.typeBg}`}>
                        {item.type}
                      </span>
                    </td>
                    <td className="py-3.5 px-2">
                      <p className="text-slate-700 font-semibold">{item.date}</p>
                      <p className="text-[10px] text-slate-400">{item.time}</p>
                    </td>
                    <td className="py-3.5 px-2 font-extrabold text-slate-900">
                      <span className={item.amountColor}>{item.amount}</span>
                    </td>
                    <td className="py-3.5 px-2">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-2 text-right font-bold text-slate-700">
                      {item.balanceAfter}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-slate-100 text-xs text-slate-500">
          <p>
            Showing <span className="font-bold text-slate-800">1–8</span> of{" "}
            <span className="font-bold text-slate-800">14</span>
          </p>
          <div className="flex items-center gap-2">
            <button
              disabled
              className="flex items-center gap-1 px-3 py-1.5 border border-slate-200 rounded-lg text-slate-300 font-medium cursor-not-allowed"
            >
              <ChevronLeft className="w-3.5 h-3.5" /> Prev
            </button>
            <button className="w-8 h-8 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
              1
            </button>
            <button className="w-8 h-8 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center justify-center">
              2
            </button>
            <button className="flex items-center gap-1 px-3 py-1.5 border border-slate-200 hover:bg-slate-50 rounded-lg text-slate-700 font-semibold">
              Next <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Payout Methods Section */}
      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">Payout Methods</h3>
            <p className="text-xs text-slate-400">Where your withdrawals are sent</p>
          </div>
          <button className="flex items-center gap-1 px-3 py-1.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-xs transition">
            <Plus className="w-3.5 h-3.5" /> Add
          </button>
        </div>

        <div className="space-y-3.5">
          {/* Method 1: Chase Bank */}
          <div className="border border-indigo-200 bg-indigo-50/20 rounded-2xl p-4 flex items-start justify-between gap-3 relative">
            <div className="flex items-start gap-3">
              <div className="bg-indigo-600 text-white p-2.5 rounded-xl shrink-0 shadow-xs">
                <Building2 className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="text-xs font-bold text-slate-900">Chase Bank</h4>
                  <span className="inline-flex items-center gap-1 bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-md text-[10px] font-bold">
                    <CheckCircle2 className="w-3 h-3" /> Default
                  </span>
                  <span className="inline-flex items-center gap-1 text-emerald-600 text-[10px] font-bold">
                    <CheckCircle2 className="w-3 h-3" /> Verified
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-medium">
                  Bank Transfer · •••• •••• •••• 4821
                </p>
              </div>
            </div>
            <button className="text-slate-300 hover:text-rose-500 transition-colors p-1">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          {/* Method 2: PayPal */}
          <div className="border border-slate-100 bg-white rounded-2xl p-4 flex items-start justify-between gap-3 relative hover:border-slate-200 transition-all">
            <div className="flex items-start gap-3">
              <div className="bg-slate-100 text-slate-600 p-2.5 rounded-xl shrink-0">
                <span className="font-black text-sm italic">P</span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="text-xs font-bold text-slate-900">PayPal</h4>
                  <span className="inline-flex items-center gap-1 text-emerald-600 text-[10px] font-bold">
                    <CheckCircle2 className="w-3 h-3" /> Verified
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-medium">
                  PayPal · ayesha@aurorastore.com
                </p>
                <button className="flex items-center gap-1 text-indigo-600 text-[11px] font-bold hover:underline pt-1">
                  <Star className="w-3 h-3" /> Set as default
                </button>
              </div>
            </div>
            <button className="text-slate-300 hover:text-rose-500 transition-colors p-1">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          {/* Method 3: Wise */}
          <div className="border border-slate-100 bg-white rounded-2xl p-4 flex items-start justify-between gap-3 relative hover:border-slate-200 transition-all">
            <div className="flex items-start gap-3">
              <div className="bg-slate-100 text-slate-600 p-2.5 rounded-xl shrink-0">
                <Building2 className="w-5 h-5 text-slate-500" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="text-xs font-bold text-slate-900">Wise</h4>
                  <span className="inline-flex items-center gap-1 text-amber-600 text-[10px] font-bold">
                    <AlertCircle className="w-3 h-3" /> Unverified
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-medium">
                  Wise · Wise — Ayesha Rahman
                </p>
                <button className="flex items-center gap-1 text-indigo-600 text-[11px] font-bold hover:underline pt-1">
                  <Star className="w-3 h-3" /> Set as default
                </button>
              </div>
            </div>
            <button className="text-slate-300 hover:text-rose-500 transition-colors p-1">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}