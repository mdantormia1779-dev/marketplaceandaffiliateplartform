"use client";

import { useState } from "react";
import { Plus, Wallet } from "lucide-react";
import Card from "./Card";
import SectionHeader from "./SectionHeader";
import PaymentMethodForm from "./PaymentMethodForm";
import { PaymentMethod } from "./types";

interface Props {
  method: PaymentMethod | null;
  onSave: (v: { provider: string; number: string }) => Promise<void>;
  onRemove: () => void;
}

const outline = "rounded-md border border-slate-200 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50";

export default function PaymentMethodCard({ method, onSave, onRemove }: Props) {
  const [editing, setEditing] = useState(false);

  const handleSave = async (v: { provider: string; number: string }) => {
    await onSave(v);
    setEditing(false);
  };

  return (
    <Card className="flex flex-col p-6">
      <SectionHeader title="Payment Method" subtitle="Wallet or card used for renewals." />

      {method ? (
        <>
          <div className="mt-5 flex items-center gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white"><Wallet size={18} /></div>
            <div>
              <p className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                {method.provider}
                {method.primary && <span className="rounded bg-blue-50 px-1.5 py-0.5 text-[10px] font-semibold text-blue-600">Primary</span>}
              </p>
              <p className="text-xs text-slate-500">•••• •••• {method.last4}</p>
            </div>
          </div>
          {!editing && (
            <div className="mt-3 grid grid-cols-2 gap-2">
              <button onClick={() => setEditing(true)} className={outline}>Change</button>
              <button onClick={() => confirm("Remove this payment method?") && onRemove()} className={outline}>Remove</button>
            </div>
          )}
        </>
      ) : (
        !editing && <p className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">No payment method added yet.</p>
      )}

      {editing ? (
        <PaymentMethodForm initialProvider={method?.provider} onSubmit={handleSave} onCancel={() => setEditing(false)} />
      ) : (
        !method && (
          <button onClick={() => setEditing(true)} className="mt-4 flex items-center justify-center gap-2 rounded-lg border border-dashed border-slate-300 py-3 text-sm text-slate-700 hover:bg-slate-50">
            <Plus size={14} /> Add Payment Method
          </button>
        )
      )}

      <p className="mt-auto pt-8 text-xs text-slate-500">Auto-charged on each renewal date.</p>
    </Card>
  );
}