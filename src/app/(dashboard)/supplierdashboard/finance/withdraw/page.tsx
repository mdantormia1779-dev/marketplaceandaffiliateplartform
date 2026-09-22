"use client";

import { useState } from "react";

import { X } from "lucide-react";
import Navbar from "../../components/Navbar";
import WithdrawForm from "../../components/WithdrawForm";
import PayoutSidebar, { PayoutMethod } from "../../components/PayoutSidebar";
import WithdrawalHistory, { WithdrawalItem } from "../../components/WithdrawalHistory";

export default function WithdrawPage() {
  const [availableBalance, setAvailableBalance] = useState(42250.75);
  const [totalWithdrawn, setTotalWithdrawn] = useState(412300);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Payout Modal State
  const [newMethodName, setNewMethodName] = useState("");
  const [newMethodDetail, setNewMethodDetail] = useState("");
  const [newMethodType, setNewMethodType] = useState("bank");

  // Dynamic Payout Methods State
  const [payoutMethods, setPayoutMethods] = useState<PayoutMethod[]>([
    {
      id: "1",
      name: "Chase Bank",
      detail: "Bank Transfer · •••• •••• •••• 4821",
      type: "bank",
      isDefault: true,
      status: "Verified",
    },
    {
      id: "2",
      name: "PayPal",
      detail: "PayPal · ayesha@aurorastore.com",
      type: "paypal",
      isDefault: false,
      status: "Verified",
    },
    {
      id: "3",
      name: "Wise",
      detail: "Wise · Wise — Ayesha Rahman",
      type: "bank",
      isDefault: false,
      status: "Unverified",
    },
  ]);

  // Withdrawal History State matching screenshot
  const [withdrawals, setWithdrawals] = useState<WithdrawalItem[]>([
    {
      id: "1",
      withdrawalId: "WD-2041",
      requestedDate: "Sep 15, 2026",
      amount: "$5,000",
      fee: "· no fee",
      methodName: "Bank Transfer",
      methodDetail: "Chase Bank •••• 4821",
      status: "Paid",
      txnId: "TXN-99330",
    },
    {
      id: "2",
      withdrawalId: "WD-2040",
      requestedDate: "Sep 09, 2026",
      amount: "$2,500",
      fee: "· $1.50 fee",
      methodName: "PayPal",
      methodDetail: "ayesha@aurorastore.com",
      status: "Processing",
      txnId: "TXN-99302",
    },
    {
      id: "3",
      withdrawalId: "WD-2038",
      requestedDate: "Sep 01, 2026",
      amount: "$8,200",
      fee: "· no fee",
      methodName: "Bank Transfer",
      methodDetail: "Chase Bank •••• 4821",
      status: "Paid",
      txnId: "TXN-99188",
    },
    {
      id: "4",
      withdrawalId: "WD-2035",
      requestedDate: "Aug 24, 2026",
      amount: "$1,200",
      fee: "· $2.50 fee",
      methodName: "Wise",
      methodDetail: "Wise — Ayesha Rahman",
      status: "Rejected",
      txnId: "TXN-99077",
    },
    {
      id: "5",
      withdrawalId: "WD-2031",
      requestedDate: "Aug 18, 2026",
      amount: "$6,400",
      fee: "· no fee",
      methodName: "Bank Transfer",
      methodDetail: "Chase Bank •••• 4821",
      status: "Paid",
      txnId: "TXN-98990",
    },
    {
      id: "6",
      withdrawalId: "WD-2028",
      requestedDate: "Aug 10, 2026",
      amount: "$3,750",
      fee: "· $1.50 fee",
      methodName: "PayPal",
      methodDetail: "ayesha@aurorastore.com",
      status: "Approved",
      txnId: "TXN-98841",
    },
  ]);

  // Handle new withdrawal request
  const handleWithdrawSuccess = (amount: number) => {
    setAvailableBalance((prev) => prev - amount);
    setTotalWithdrawn((prev) => prev + amount);

    const newWD: WithdrawalItem = {
      id: Date.now().toString(),
      withdrawalId: `WD-${Math.floor(1000 + Math.random() * 9000)}`,
      requestedDate: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
      amount: `$${amount.toLocaleString()}`,
      fee: "· no fee",
      methodName: "Bank Transfer",
      methodDetail: "Chase Bank •••• 4821",
      status: "Processing",
      txnId: `TXN-${Math.floor(10000 + Math.random() * 90000)}`,
    };

    setWithdrawals([newWD, ...withdrawals]);
  };

  const handleDeleteMethod = (id: string) => {
    setPayoutMethods((prev) => prev.filter((m) => m.id !== id));
  };

  const handleSetDefault = (id: string) => {
    setPayoutMethods((prev) =>
      prev.map((m) => ({
        ...m,
        isDefault: m.id === id,
      }))
    );
  };

  const handleAddMethodSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMethodName || !newMethodDetail) return;

    const newMethod: PayoutMethod = {
      id: Date.now().toString(),
      name: newMethodName,
      detail: newMethodDetail,
      type: newMethodType,
      isDefault: payoutMethods.length === 0,
      status: "Unverified",
    };

    setPayoutMethods([...payoutMethods, newMethod]);
    setNewMethodName("");
    setNewMethodDetail("");
    setIsAddModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] relative">
      {/* Navbar Fixed on Top */}
      <div className="sticky top-0 z-50 bg-white border-b border-slate-100">
        <Navbar></Navbar>
      </div>

      <main className="p-6 space-y-6 max-w-[1600px] mx-auto">
        {/* Page Header */}
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Withdraw</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Move your available balance to your bank account.
          </p>
        </div>

        {/* Content Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Left Main Form Section */}
          <WithdrawForm
            availableBalance={availableBalance}
            payoutMethods={payoutMethods}
            onWithdrawSuccess={handleWithdrawSuccess}
            onOpenAddModal={() => setIsAddModalOpen(true)}
          />
          

          {/* Right Sidebar Section */}
          <PayoutSidebar
            availableBalance={availableBalance}
            totalWithdrawn={totalWithdrawn}
            payoutMethods={payoutMethods}
            onDeleteMethod={handleDeleteMethod}
            onSetDefault={handleSetDefault}
            onOpenAddModal={() => setIsAddModalOpen(true)}
          />
        </div>

        {/* Withdrawal History Bottom Section */}
        <WithdrawalHistory withdrawals={withdrawals} />
      </main>

      {/* Add Payout Method Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">Add Payout Method</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddMethodSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Method Type</label>
                <select
                  value={newMethodType}
                  onChange={(e) => setNewMethodType(e.target.value)}
                  className="w-full p-2.5 text-xs border border-slate-200 rounded-xl bg-white font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="bank">Bank Transfer</option>
                  <option value="paypal">PayPal</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Provider / Bank Name</label>
                <input
                  type="text"
                  placeholder="e.g. Bank of America, Payoneer"
                  value={newMethodName}
                  onChange={(e) => setNewMethodName(e.target.value)}
                  required
                  className="w-full p-2.5 text-xs border border-slate-200 rounded-xl bg-slate-50 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Account Details / Email</label>
                <input
                  type="text"
                  placeholder="e.g. •••• 9921 or user@email.com"
                  value={newMethodDetail}
                  onChange={(e) => setNewMethodDetail(e.target.value)}
                  required
                  className="w-full p-2.5 text-xs border border-slate-200 rounded-xl bg-slate-50 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-xs font-semibold text-slate-600 rounded-xl hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl hover:bg-indigo-700 shadow-xs cursor-pointer"
                >
                  Save Method
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}