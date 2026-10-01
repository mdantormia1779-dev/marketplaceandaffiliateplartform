"use client";

import { useMemo, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PageHeader from "./components/PageHeader";
import AffiliateStats from "./components/AffiliateStats";
import AffiliatesToolbar from "./components/AffiliatesToolbar";
import AffiliatesTable from "./components/AffiliatesTable";
import TableFooter from "./components/TableFooter";
import InviteAffiliateModal from "./components/InviteAffiliateModal";
import { affiliates as initialData, stats } from "./data";
import type { Affiliate, AffiliateForm, InviteForm } from "./types";

export default function AffiliatesPage() {
  const [list, setList] = useState<Affiliate[]>(initialData);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [inviting, setInviting] = useState(false);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return list.filter((a) => {
      const matchSearch =
        !q ||
        a.name.toLowerCase().includes(q) ||
        a.email.toLowerCase().includes(q) ||
        a.code.toLowerCase().includes(q);
      const matchStatus = status === "All" || a.status === status;
      return matchSearch && matchStatus;
    });
  }, [list, search, status]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const paged = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleSearch = (v: string) => { setSearch(v); setPage(1); };
  const handleStatus = (v: string) => { setStatus(v); setPage(1); };
  const handlePageSize = (v: number) => { setPageSize(v); setPage(1); };

  const handleInvite = async (form: InviteForm) => {
    const name = form.name.trim();
    const email = form.email.trim();
    let code = form.code.trim().toUpperCase();

    if (!name) throw new Error("Full name is required.");
    if (!/^\S+@\S+\.\S+$/.test(email)) throw new Error("Please enter a valid email address.");
    if (list.some((a) => a.email.toLowerCase() === email.toLowerCase())) {
      throw new Error("An affiliate with this email already exists.");
    }

    if (!code) {
      const base = name.split(" ")[0].replace(/[^a-zA-Z]/g, "").toUpperCase() || "AFF";
      code = `${base}${Math.floor(10 + Math.random() * 90)}`;
    }
    if (list.some((a) => a.code.toLowerCase() === code.toLowerCase())) {
      throw new Error("This referral code is already in use.");
    }

    // await fetch("/api/affiliates", { method: "POST", body: JSON.stringify({ name, email, code, status: form.status }) });

    const newAffiliate: Affiliate = {
      id: Math.max(0, ...list.map((a) => a.id)) + 1,
      name,
      email,
      code,
      referrals: 0,
      earnings: 0,
      status: form.status,
      joined: new Date().toISOString().slice(0, 10),
    };

    setList((prev) => [newAffiliate, ...prev]);
    setSearch("");
    setStatus("All");
    setPage(1);
    toast.success("Affiliate added successfully");
  };

  const handleUpdate = async (id: number, form: AffiliateForm) => {
    const name = form.name.trim();
    const email = form.email.trim();
    const code = form.code.trim();

    if (!name) throw new Error("Full name is required.");
    if (!/^\S+@\S+\.\S+$/.test(email)) throw new Error("Please enter a valid email address.");
    if (!code) throw new Error("Referral code is required.");
    if (list.some((a) => a.id !== id && a.code.toLowerCase() === code.toLowerCase())) {
      throw new Error("This referral code is already used by another affiliate.");
    }
    if (list.some((a) => a.id !== id && a.email.toLowerCase() === email.toLowerCase())) {
      throw new Error("This email is already used by another affiliate.");
    }

    setList((prev) => prev.map((a) => (a.id === id ? { ...a, ...form, name, email, code } : a)));
    toast.success("Affiliate updated successfully");
  };

  const handleToggleSuspend = async (id: number) => {
    const target = list.find((a) => a.id === id);
    if (!target) throw new Error("Affiliate not found.");

    const next = target.status === "Suspended" ? "Active" : "Suspended";

    setList((prev) => prev.map((a) => (a.id === id ? { ...a, status: next } : a)));
    toast.success(next === "Suspended" ? "Affiliate suspended" : "Affiliate activated");
  };

  const handleDelete = async (id: number) => {
    if (!list.some((a) => a.id === id)) throw new Error("Affiliate not found.");

    setList((prev) => prev.filter((a) => a.id !== id));
    toast.success("Affiliate deleted");
  };

  const handleExport = () => {
    const rows = [
      ["Name", "Email", "Referral Code", "Referrals", "Earnings", "Status", "Joined"],
      ...filtered.map((a) => [a.name, a.email, a.code, a.referrals, a.earnings, a.status, a.joined]),
    ];
    const csv = rows.map((r) => r.map((v) => `"${v}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "affiliates.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <PageHeader onInvite={() => setInviting(true)} />
      <AffiliateStats stats={stats} />

      <div className="rounded-xl border border-slate-200 bg-white">
        <AffiliatesToolbar
          search={search}
          onSearch={handleSearch}
          status={status}
          onStatus={handleStatus}
          onExport={handleExport}
        />
        <AffiliatesTable
          affiliates={paged}
          onUpdate={handleUpdate}
          onToggleSuspend={handleToggleSuspend}
          onDelete={handleDelete}
        />
        <TableFooter
          page={currentPage}
          pageSize={pageSize}
          total={filtered.length}
          onPage={setPage}
          onPageSize={handlePageSize}
        />
      </div>

      {inviting && (
        <InviteAffiliateModal onClose={() => setInviting(false)} onInvite={handleInvite} />
      )}

      <ToastContainer position="top-right" autoClose={2500} theme="light" />
    </div>
  );
}