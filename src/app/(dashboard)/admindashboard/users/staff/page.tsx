"use client";

import { useMemo, useState } from "react";
import { toast } from "react-toastify";
import PageHeader from "./components/PageHeader";
import StaffStats from "./components/StaffStats";
import StaffToolbar from "./components/StaffToolbar";
import StaffTable from "./components/StaffTable";
import TableFooter from "./components/TableFooter";
import StaffFormModal from "./components/StaffFormModal";
import { staff as initialData, stats } from "./data";
import type { Staff, StaffForm } from "./types";

const validate = (form: StaffForm, list: Staff[], id?: number) => {
  const name = form.name.trim();
  const email = form.email.trim();
  const role = form.role.trim();
  const department = form.department.trim();

  if (!name) throw new Error("Full name is required.");
  if (!/^\S+@\S+\.\S+$/.test(email)) throw new Error("Please enter a valid work email.");
  if (!role) throw new Error("Role is required.");
  if (!department) throw new Error("Department is required.");
  if (list.some((s) => s.id !== id && s.email.toLowerCase() === email.toLowerCase())) {
    throw new Error("A staff member with this email already exists.");
  }
  return { name, email, role, department, status: form.status };
};

export default function StaffPage() {
  const [list, setList] = useState<Staff[]>(initialData);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [department, setDepartment] = useState("All");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [adding, setAdding] = useState(false);

  const departments = useMemo(
    () => Array.from(new Set(list.map((s) => s.department))).sort(),
    [list]
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return list.filter((s) => {
      const matchSearch =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.role.toLowerCase().includes(q) ||
        s.department.toLowerCase().includes(q);
      const matchStatus = status === "All" || s.status === status;
      const matchDept = department === "All" || s.department === department;
      return matchSearch && matchStatus && matchDept;
    });
  }, [list, search, status, department]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const paged = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleSearch = (v: string) => { setSearch(v); setPage(1); };
  const handleStatus = (v: string) => { setStatus(v); setPage(1); };
  const handleDepartment = (v: string) => { setDepartment(v); setPage(1); };
  const handlePageSize = (v: number) => { setPageSize(v); setPage(1); };

  const handleAdd = async (form: StaffForm) => {
    const data = validate(form, list);

    // await fetch("/api/staff", { method: "POST", body: JSON.stringify(data) });

    const member: Staff = {
      id: Math.max(0, ...list.map((s) => s.id)) + 1,
      ...data,
      lastActive: "Just now",
    };

    setList((prev) => [member, ...prev]);
    setSearch("");
    setStatus("All");
    setDepartment("All");
    setPage(1);
    toast.success("Staff member added successfully");
  };

  const handleUpdate = async (id: number, form: StaffForm) => {
    const data = validate(form, list, id);

    // await fetch(`/api/staff/${id}`, { method: "PUT", body: JSON.stringify(data) });

    setList((prev) => prev.map((s) => (s.id === id ? { ...s, ...data } : s)));
    toast.success("Staff member updated successfully");
  };

  const handleToggleSuspend = async (id: number) => {
    const target = list.find((s) => s.id === id);
    if (!target) throw new Error("Staff member not found.");

    const next = target.status === "Suspended" ? "Active" : "Suspended";

    // await fetch(`/api/staff/${id}/status`, { method: "PATCH", body: JSON.stringify({ status: next }) });

    setList((prev) => prev.map((s) => (s.id === id ? { ...s, status: next } : s)));
    toast.success(next === "Suspended" ? "Staff member suspended" : "Staff member activated");
  };

  const handleDelete = async (id: number) => {
    if (!list.some((s) => s.id === id)) throw new Error("Staff member not found.");

    // await fetch(`/api/staff/${id}`, { method: "DELETE" });

    setList((prev) => prev.filter((s) => s.id !== id));
    toast.success("Staff member deleted");
  };

  const handleExport = () => {
    const rows = [
      ["Name", "Email", "Role", "Department", "Last Active", "Status"],
      ...filtered.map((s) => [s.name, s.email, s.role, s.department, s.lastActive, s.status]),
    ];
    const csv = rows.map((r) => r.map((v) => `"${v}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "staff.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <PageHeader onAdd={() => setAdding(true)} />
      <StaffStats stats={stats} />

      <div className="rounded-xl border border-slate-200 bg-white">
        <StaffToolbar
          search={search}
          onSearch={handleSearch}
          status={status}
          onStatus={handleStatus}
          department={department}
          onDepartment={handleDepartment}
          departments={departments}
          onExport={handleExport}
        />
        <StaffTable
          staff={paged}
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

      {adding && (
        <StaffFormModal mode="add" onClose={() => setAdding(false)} onSubmit={handleAdd} />
      )}
    </div>
  );
}