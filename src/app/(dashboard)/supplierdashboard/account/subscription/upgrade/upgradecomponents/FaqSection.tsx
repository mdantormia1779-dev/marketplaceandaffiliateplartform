"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { faqs } from "./data";

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(1);

  return (
    <section>
      <h2 className="mb-4 text-xl font-semibold text-slate-900">Frequently Asked Questions</h2>
      <div className="divide-y divide-slate-100 rounded-xl border border-slate-200 bg-white">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.q}>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-semibold text-slate-900"
              >
                {f.q}
                <span className={`flex h-6 w-6 items-center justify-center rounded-full border ${
                  isOpen ? "border-blue-300 bg-blue-50 text-blue-600" : "border-slate-200 text-slate-500"
                }`}>
                  {isOpen ? <Minus size={12} /> : <Plus size={12} />}
                </span>
              </button>
              {isOpen && <p className="px-5 pb-5 text-sm text-slate-500">{f.a}</p>}
            </div>
          );
        })}
      </div>
    </section>
  );
}