"use client";

import { useMemo, useState } from "react";
import HelpSearch from "./helpcomponents/HelpSearch";
import HelpCategories from "./helpcomponents/HelpCategories";
import FaqSection from "./helpcomponents/FaqSection";
import SupportTicketsTable from "./helpcomponents/SupportTicketsTable";
import CreateTicketModal from "./helpcomponents/CreateTicketModal";
import { HELP_CATEGORIES, FAQ_ITEMS, SUPPORT_TICKETS } from "./helpcomponents/data";
import type { NewTicketInput, SupportTicket } from "./helpcomponents/types";
// import TopBar from "../Affiliatecomponents/TopBar"; // uncomment & wire props as your TopBar expects

function nextTicketId(tickets: SupportTicket[]) {
  const max = tickets.reduce((acc, t) => {
    const n = parseInt(t.ticketId.replace(/\D/g, ""), 10);
    return Number.isFinite(n) ? Math.max(acc, n) : acc;
  }, 0);
  return `TK-${String(max + 1).padStart(2, "0")}`;
}

export default function HelpPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [tickets, setTickets] = useState<SupportTicket[]>(SUPPORT_TICKETS);
  const [modalOpen, setModalOpen] = useState(false);

  const filteredCategories = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return HELP_CATEGORIES;
    return HELP_CATEGORIES.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q)
    );
  }, [searchTerm]);

  const filteredFaqs = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return FAQ_ITEMS;
    return FAQ_ITEMS.filter(
      (f) =>
        f.question.toLowerCase().includes(q) ||
        f.answer.toLowerCase().includes(q)
    );
  }, [searchTerm]);

  function handleCreateTicket(input: NewTicketInput) {
    const newTicket: SupportTicket = {
      id: Date.now().toString(),
      ticketId: nextTicketId(tickets),
      subject: input.subject,
      category: input.category,
      priority: input.priority,
      status: "Open",
      createdDate: new Date().toISOString().slice(0, 10),
      lastUpdated: new Date().toISOString().slice(0, 10),
      description: input.description,
    };

    setTickets((prev) => [newTicket, ...prev]);
    setModalOpen(false);
  }

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* <TopBar title="Help & Support" subtitle="Hi, Debraz 👋 Ready to grow your affiliate earnings?" /> */}

      <main className="mx-auto max-w-7xl space-y-6 p-6">
        {/* Page Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Help & Support</h1>
            <p className="mt-1 text-sm text-slate-500">Find answers or contact our support team.</p>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-blue-700 shadow-sm cursor-pointer"
          >
            + Create Support Ticket
          </button>
        </div>

        {/* Search */}
        <HelpSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />

        {/* Categories */}
        <HelpCategories
          categories={filteredCategories}
          onSelectCategory={(title) => setSearchTerm(title)}
        />

        {/* FAQ + Still need help */}
        <FaqSection faqs={filteredFaqs} onCreateTicket={() => setModalOpen(true)} />

        {/* Support Tickets */}
        <SupportTicketsTable tickets={tickets} />
      </main>

      {modalOpen && (
        <CreateTicketModal onClose={() => setModalOpen(false)} onSubmit={handleCreateTicket} />
      )}
    </div>
  );
}