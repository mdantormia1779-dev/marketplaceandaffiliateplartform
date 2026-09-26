"use client";

import { useMemo, useState } from "react";
import { CreditCard, Hourglass, Landmark, Wallet } from "lucide-react";

import WithdrawalsHeader from "./components/WithdrawalsHeader";
import BalanceHero from "./components/BalanceHero";
import StatCard from "./components/StatCard";
import PayoutMethodsSection from "./components/PayoutMethodsSection";
import PayoutMethodModal from "./components/PayoutMethodModal";
import WithdrawalFilterBar from "./components/WithdrawalFilterBar";
import WithdrawalRequestsTable from "./components/WithdrawalRequestsTable";
import RequestWithdrawalModal from "./components/RequestWithdrawalModal";
import WithdrawalDetailsModal from "./components/WithdrawalDetailsModal";

import {
  PayoutMethod,
  PaymentMethodType,
  WithdrawalRequest,
  WithdrawalStat,
  WithdrawalStatusFilter,
} from "./components/types";

const STATS_BASE: Omit<WithdrawalStat, "value" | "change" | "note">[] = [
  { label: "Available Balance", icon: CreditCard, iconBg: "bg-indigo-50", iconColor: "text-indigo-600", topBarColor: "bg-indigo-500" },
  { label: "Pending Withdrawal", icon: Hourglass, iconBg: "bg-amber-50", iconColor: "text-amber-600", topBarColor: "bg-amber-500" },
  { label: "Total Withdrawn", icon: Landmark, iconBg: "bg-emerald-50", iconColor: "text-emerald-600", topBarColor: "bg-emerald-500" },
  { label: "Lifetime Earnings", icon: Wallet, iconBg: "bg-blue-50", iconColor: "text-blue-600", topBarColor: "bg-blue-500" },
];

const INITIAL_REQUESTS: WithdrawalRequest[] = [
  {
    id: "WD-20481",
    date: "2026-09-20",
    amount: "15,000",
    method: "bKash",
    status: "Completed",
    processedDate: "2026-09-21",
    timeline: [
      { label: "Withdrawal request submitted", timestamp: "Sep 20, 2026 · 10:24 AM", completed: true },
      { label: "Payout approved by finance", timestamp: "Sep 20, 2026 · 03:10 PM", completed: true },
      { label: "Transfer sent to bKash", timestamp: "Sep 21, 2026 · 09:02 AM", completed: true },
      { label: "Funds received by affiliate", timestamp: "Sep 21, 2026 · 09:05 AM", completed: true },
    ],
  },
  {
    id: "WD-20462",
    date: "2026-09-08",
    amount: "10,000",
    method: "Nagad",
    status: "Completed",
    processedDate: "2026-09-09",
    timeline: [
      { label: "Withdrawal request submitted", timestamp: "Sep 8, 2026 · 11:40 AM", completed: true },
      { label: "Payout approved by finance", timestamp: "Sep 8, 2026 · 04:20 PM", completed: true },
      { label: "Transfer sent to Nagad", timestamp: "Sep 9, 2026 · 10:00 AM", completed: true },
      { label: "Funds received by affiliate", timestamp: "Sep 9, 2026 · 10:05 AM", completed: true },
    ],
  },
  {
    id: "WD-20448",
    date: "2026-08-28",
    amount: "8,500",
    method: "Bank Transfer",
    status: "Processing",
    processedDate: null,
    timeline: [
      { label: "Withdrawal request submitted", timestamp: "Aug 28, 2026 · 09:15 AM", completed: true },
      { label: "Under review by finance team", timestamp: "In progress", completed: false },
      { label: "Transfer to Bank Account", timestamp: "—", completed: false },
      { label: "Funds received by affiliate", timestamp: "—", completed: false },
    ],
  },
  {
    id: "WD-20431",
    date: "2026-08-15",
    amount: "12,000",
    method: "bKash",
    status: "Completed",
    processedDate: "2026-08-16",
    timeline: [
      { label: "Withdrawal request submitted", timestamp: "Aug 15, 2026 · 01:05 PM", completed: true },
      { label: "Payout approved by finance", timestamp: "Aug 15, 2026 · 05:30 PM", completed: true },
      { label: "Transfer sent to bKash", timestamp: "Aug 16, 2026 · 09:00 AM", completed: true },
      { label: "Funds received by affiliate", timestamp: "Aug 16, 2026 · 09:04 AM", completed: true },
    ],
  },
  {
    id: "WD-20419",
    date: "2026-08-02",
    amount: "6,000",
    method: "bKash",
    status: "Rejected",
    processedDate: "2026-08-03",
    timeline: [
      { label: "Withdrawal request submitted", timestamp: "Aug 2, 2026 · 10:12 AM", completed: true },
      { label: "Reviewed by finance team", timestamp: "Aug 3, 2026 · 02:00 PM", completed: true },
      { label: "Request rejected — invalid account details", timestamp: "Aug 3, 2026 · 02:05 PM", completed: true },
    ],
  },
];

export default function WithdrawalsPage() {
  const [payoutMethods, setPayoutMethods] = useState<PayoutMethod[]>([]);
  const [withdrawalRequests, setWithdrawalRequests] = useState<WithdrawalRequest[]>(INITIAL_REQUESTS);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<WithdrawalStatusFilter>("All Statuses");

  const [isMethodModalOpen, setIsMethodModalOpen] = useState<boolean>(false);
  const [methodModalMode, setMethodModalMode] = useState<"add" | "edit">("add");
  const [editingMethod, setEditingMethod] = useState<PayoutMethod | null>(null);

  const [isRequestModalOpen, setIsRequestModalOpen] = useState<boolean>(false);
  const [preselectedMethodType, setPreselectedMethodType] = useState<PaymentMethodType | null>(null);

  const [detailsRequest, setDetailsRequest] = useState<WithdrawalRequest | null>(null);

  const defaultMethod = useMemo(() => {
    return payoutMethods.find((m) => m.isDefault) || null;
  }, [payoutMethods]);

  const filteredRequests = useMemo<WithdrawalRequest[]>(() => {
    return withdrawalRequests.filter((request) => {
      const matchesStatus = selectedStatus === "All Statuses" || request.status === selectedStatus;

      const term = searchTerm.trim().toLowerCase();
      const matchesSearch =
        term === "" ||
        request.id.toLowerCase().includes(term) ||
        request.method.toLowerCase().includes(term);

      return matchesStatus && matchesSearch;
    });
  }, [withdrawalRequests, searchTerm, selectedStatus]);

  const stats: WithdrawalStat[] = [
    { ...STATS_BASE[0], value: "৳42,680", change: "+6.1%", note: "ready to withdraw" },
    { ...STATS_BASE[1], value: "৳5,500", change: "processing", note: "in review" },
    { ...STATS_BASE[2], value: "৳86,320", change: "+9.4%", note: "lifetime payouts" },
    { ...STATS_BASE[3], value: "৳1,48,520", change: "+15.2%", note: "all-time commission" },
  ];

  const handleOpenAddMethod = () => {
    setMethodModalMode("add");
    setEditingMethod(null);
    setIsMethodModalOpen(true);
  };

  const handleOpenEditMethod = (method: PayoutMethod) => {
    setMethodModalMode("edit");
    setEditingMethod(method);
    setIsMethodModalOpen(true);
  };

  const handleSaveMethod = (method: PayoutMethod) => {
    setPayoutMethods((prev) => {
      let updated: PayoutMethod[];

      const exists = prev.some((m) => m.id === method.id);
      if (exists) {
        updated = prev.map((m) => (m.id === method.id ? method : m));
      } else {
        updated = [...prev, method];
      }

      if (method.isDefault) {
        updated = updated.map((m) => ({ ...m, isDefault: m.id === method.id }));
      }

      return updated;
    });

    setIsMethodModalOpen(false);
  };

  const handleUseMethod = (method: PayoutMethod) => {
    setPreselectedMethodType(method.type);
    setIsRequestModalOpen(true);
  };

  const handleOpenRequestModal = () => {
    setPreselectedMethodType(defaultMethod ? defaultMethod.type : null);
    setIsRequestModalOpen(true);
  };

  // ✅ ঠিক করা হয়েছে: এখানে আর মডাল বন্ধ করা হয় না।
  // RequestWithdrawalModal নিজেই সাবমিটের পর "success" view দেখাবে,
  // এবং ইউজার "Done" চাপলে তার onClose() কল হয়ে মডাল বন্ধ হবে।
  const handleSubmitRequest = (request: WithdrawalRequest) => {
    setWithdrawalRequests((prev) => [request, ...prev]);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 md:p-8 space-y-6">
      <WithdrawalsHeader onRequestWithdrawal={handleOpenRequestModal} />

      <BalanceHero
        availableBalance="42,680"
        pendingWithdrawal="5,500"
        totalWithdrawn="86,350"
        defaultMethod={defaultMethod}
        onRequestWithdrawal={handleOpenRequestModal}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <StatCard key={stat.label} {...stat} delay={idx * 80} />
        ))}
      </div>

      <PayoutMethodsSection
        methods={payoutMethods}
        onAddMethod={handleOpenAddMethod}
        onEditMethod={handleOpenEditMethod}
        onUseMethod={handleUseMethod}
        delay={350}
      />

      <div className="space-y-4 animate-fade-up" style={{ animationDelay: "450ms" }}>
        <WithdrawalFilterBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
        />

        <WithdrawalRequestsTable requests={filteredRequests} onViewDetails={setDetailsRequest} />
      </div>

      {isMethodModalOpen ? (
        <PayoutMethodModal
          mode={methodModalMode}
          initialMethod={editingMethod}
          onClose={() => setIsMethodModalOpen(false)}
          onSave={handleSaveMethod}
        />
      ) : null}

      {isRequestModalOpen ? (
        <RequestWithdrawalModal
          availableBalance="42,680"
          payoutMethods={payoutMethods}
          preselectedMethodType={preselectedMethodType}
          onClose={() => setIsRequestModalOpen(false)}
          onSubmit={handleSubmitRequest}
        />
      ) : null}

      {detailsRequest ? (
        <WithdrawalDetailsModal request={detailsRequest} onClose={() => setDetailsRequest(null)} />
      ) : null}
    </div>
  );
}