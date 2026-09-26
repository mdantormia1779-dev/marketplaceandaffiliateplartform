"use client";

import { useState } from "react";
import { Landmark, Plus, Smartphone } from "lucide-react";
import type { PaymentAccount } from "./types";
import AddPaymentMethodModal from "./AddPaymentMethodModal";

const inputCls =
  "h-9 flex-1 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

function MethodIcon({ method }: { method: PaymentAccount["method"] }) {
  return method === "Bank Transfer" ? <Landmark size={16} /> : <Smartphone size={16} />;
}

export default function PaymentSettings({
  accounts,
  defaultAccountId,
  onSetDefault,
  onEditAccount,
  onAddAccount,
}: {
  accounts: PaymentAccount[];
  defaultAccountId: string;
  onSetDefault: (id: string) => void;
  onEditAccount: (id: string, detail: string) => void;
  onAddAccount: (account: Omit<PaymentAccount, "id">) => void;
}) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const [addOpen, setAddOpen] = useState(false);

  const startEdit = (acc: PaymentAccount) => {
    setEditingId(acc.id);
    setDraft(acc.detail);
  };

  const saveEdit = (id: string) => {
    if (!draft.trim()) return;
    onEditAccount(id, draft.trim());
    setEditingId(null);
  };

  return (
    <div className="space-y-6">
      {/* Preferred withdrawal method */}
      <div className="rounded-xl border border-slate-200 bg-white">
        <div className="flex items-center gap-3 border-b border-slate-100 px-6 py-5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
            <Landmark size={16} />
          </span>
          <div>
            <h3 className="text-base font-semibold text-slate-900">Payment Settings</h3>
            <p className="mt-0.5 text-sm text-slate-500">Choose your preferred withdrawal method.</p>
          </div>
        </div>

        <div className="grid gap-3 p-6 sm:grid-cols-3">
          {accounts.map((acc) => (
            <button
              key={acc.id}
              onClick={() => onSetDefault(acc.id)}
              className={`flex items-start gap-3 rounded-lg border px-4 py-3.5 text-left transition ${
                defaultAccountId === acc.id
                  ? "border-blue-500 bg-blue-50"
                  : "border-slate-200 hover:bg-slate-50"
              }`}
            >
              <span className="mt-0.5 text-slate-500">
                <MethodIcon method={acc.method} />
              </span>
              <div>
                <p className="text-sm font-semibold text-slate-800">{acc.method}</p>
                <p className="text-xs text-slate-500">{acc.detail}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Saved payment accounts */}
      <div className="rounded-xl border border-slate-200 bg-white">
        <div className="flex items-center justify-between gap-4 border-b border-slate-100 px-6 py-5">
          <div>
            <h3 className="text-base font-semibold text-slate-900">Saved Payment Accounts</h3>
            <p className="mt-0.5 text-sm text-slate-500">Manage the accounts used for your payouts.</p>
          </div>
          <button
            onClick={() => setAddOpen(true)}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3.5 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            <Plus size={15} /> Add Payment Method
          </button>
        </div>

        <div className="divide-y divide-slate-100">
          {accounts.map((acc) => (
            <div key={acc.id} className="flex items-center justify-between gap-4 px-6 py-4">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                  <MethodIcon method={acc.method} />
                </span>
                <div>
                  <p className="flex items-center gap-2 text-sm font-medium text-slate-800">
                    {acc.method}
                    {defaultAccountId === acc.id && (
                      <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                        DEFAULT
                      </span>
                    )}
                  </p>
                  {editingId === acc.id ? (
                    <div className="mt-1 flex items-center gap-2">
                      <input
                        value={draft}
                        onChange={(e) => setDraft(e.target.value)}
                        className={inputCls}
                      />
                      <button
                        onClick={() => saveEdit(acc.id)}
                        className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-500 hover:bg-slate-100"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-500">
                      {acc.detail} · {acc.ownerName}
                    </p>
                  )}
                </div>
              </div>
              {editingId !== acc.id && (
                <button
                  onClick={() => startEdit(acc)}
                  className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Edit
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {addOpen && (
        <AddPaymentMethodModal
          onClose={() => setAddOpen(false)}
          onAdd={onAddAccount}
        />
      )}
    </div>
  );
}