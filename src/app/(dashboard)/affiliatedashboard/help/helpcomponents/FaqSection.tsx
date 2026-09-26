"use client";

import { useState } from "react";
import { BookOpen, ChevronDown, MessageSquare, Mail, Ticket } from "lucide-react";
import type { FaqItem } from "./types";

interface FaqSectionProps {
  faqs: FaqItem[];
  onCreateTicket: () => void;
}

export default function FaqSection({ faqs, onCreateTicket }: FaqSectionProps) {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* FAQ List */}
      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm lg:col-span-2">
        <div className="mb-4 flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
            <BookOpen size={16} />
          </span>
          <div>
            <h3 className="text-base font-bold text-slate-900">Frequently Asked Questions</h3>
            <p className="text-xs text-slate-400">Quick answers to the most common affiliate questions.</p>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {faqs.length > 0 ? (
            faqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div key={faq.id} className="py-3">
                  <button
                    onClick={() => toggle(faq.id)}
                    className="flex w-full items-center justify-between gap-3 text-left cursor-pointer"
                  >
                    <span className="text-sm font-semibold text-slate-800">{faq.question}</span>
                    <ChevronDown
                      size={16}
                      className={`shrink-0 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {isOpen && (
                    <p className="mt-2 text-xs leading-relaxed text-slate-500">{faq.answer}</p>
                  )}
                </div>
              );
            })
          ) : (
            <p className="py-6 text-center text-sm text-slate-400">No matching questions found.</p>
          )}
        </div>
      </div>

      {/* Still need help */}
      <div className="space-y-4">
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <MessageSquare size={16} />
            </span>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Still need help?</h3>
              <p className="text-xs text-slate-400">Our support team is one click away.</p>
            </div>
          </div>

          <div className="space-y-3">
            <button className="flex w-full items-center gap-3 rounded-xl border border-slate-100 p-3 text-left transition hover:bg-slate-50 cursor-pointer">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                <MessageSquare size={16} />
              </span>
              <div>
                <p className="text-xs font-bold text-slate-800">Live Chat</p>
                <p className="text-[11px] text-slate-400">Average reply in under 5 minutes</p>
              </div>
            </button>

            <button className="flex w-full items-center gap-3 rounded-xl border border-slate-100 p-3 text-left transition hover:bg-slate-50 cursor-pointer">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                <Mail size={16} />
              </span>
              <div>
                <p className="text-xs font-bold text-slate-800">Email Support</p>
                <p className="text-[11px] text-slate-400">support@marketplace.com · replies in 24h</p>
              </div>
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <p className="text-xs font-bold text-slate-800">Create a support ticket</p>
          <p className="mt-1 text-[11px] text-slate-400">
            Best for billing, payouts and account issues that need tracking.
          </p>
          <button
            onClick={onCreateTicket}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-2.5 text-xs font-bold text-white transition hover:bg-blue-700 shadow-xs cursor-pointer"
          >
            <Ticket size={14} /> Create Support Ticket
          </button>
        </div>
      </div>
    </div>
  );
}