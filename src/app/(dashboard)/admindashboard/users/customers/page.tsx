"use client";

import { useMemo, useState } from "react";
import PageHeader from "./components/PageHeader";
import CustomerStats from "./components/CustomerStats";
import CustomersToolbar from "./components/CustomersToolbar";
import CustomersTable from "./components/CustomersTable";
import TableFooter from "./components/TableFooter";
import AddCustomerModal from "./components/AddCustomerModal";
import EditCustomerModal from "./components/EditCustomerModal";
import CustomerViewDrawer from "./components/CustomerViewDrawer";
import ConfirmActionModal from "./components/ConfirmActionModal";
import { customers as initialCustomers, stats } from "./data";
import type { Customer } from "./types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CustomersPage() {
  const [customerList, setCustomerList] = useState<Customer[]>(initialCustomers);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [country, setCountry] = useState("All");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Modal States
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  // Confirm Modal State
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    type: "suspend" | "delete" | null;
    customer: Customer | null;
  }>({
    isOpen: false,
    type: null,
    customer: null,
  });

  const countries = useMemo(
    () => Array.from(new Set(customerList.map((c) => c.country))).filter(Boolean).sort(),
    [customerList]
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return customerList.filter((c) => {
      const matchSearch =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.country.toLowerCase().includes(q);

      const matchStatus = status === "All" || c.status.toLowerCase() === status.toLowerCase();
      const matchCountry = country === "All" || c.country.toLowerCase() === country.toLowerCase();

      return matchSearch && matchStatus && matchCountry;
    });
  }, [customerList, search, status, country]);

  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  // View Handler
  const handleView = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsViewOpen(true);
  };

  // Edit Handlers
  const handleEditClick = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsEditOpen(true);
  };

  const handleSaveCustomer = (updated: Customer) => {
    setCustomerList((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
    toast.success(`${updated.name} updated successfully!`);
  };

  // Open Suspend Confirmation Modal
  const handleOpenSuspend = (customer: Customer) => {
    setConfirmModal({
      isOpen: true,
      type: "suspend",
      customer,
    });
  };

  // Open Delete Confirmation Modal
  const handleOpenDelete = (customer: Customer) => {
    setConfirmModal({
      isOpen: true,
      type: "delete",
      customer,
    });
  };

  // Confirm Suspend / Delete Action
  const handleConfirmAction = () => {
    const { type, customer } = confirmModal;
    if (!customer) return;

    if (type === "suspend") {
      setCustomerList((prev) =>
        prev.map((c) => (c.id === customer.id ? { ...c, status: "Suspended" } : c))
      );
      toast.warn(`${customer.name} has been suspended!`);
    } else if (type === "delete") {
      setCustomerList((prev) => prev.filter((c) => c.id !== customer.id));
      toast.error(`${customer.name} deleted successfully!`);
    }

    setConfirmModal({ isOpen: false, type: null, customer: null });
  };

  // Add Handler
  const handleAddCustomer = (newCustomer: Customer) => {
    setCustomerList((prev) => [newCustomer, ...prev]);
  };

  // Export CSV
  const handleExport = () => {
    const rows = [
      ["Name", "Email", "Phone", "Country", "Orders", "Total Spent", "Status", "Joined"],
      ...filtered.map((c) => [
        c.name,
        c.email,
        c.phone,
        c.country,
        c.orders,
        c.totalSpent,
        c.status,
        c.joined,
      ]),
    ];
    const csv = rows.map((r) => r.map((v) => `"${v}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "customers.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-full space-y-6 pb-10">
      <ToastContainer position="top-right" autoClose={3000} />

      <PageHeader onOpenModal={() => setIsAddOpen(true)} />
      <CustomerStats stats={stats} />

      <div className="w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <CustomersToolbar
          search={search}
          onSearch={(v) => { setSearch(v); setPage(1); }}
          status={status}
          onStatus={(v) => { setStatus(v); setPage(1); }}
          country={country}
          onCountry={(v) => { setCountry(v); setPage(1); }}
          countries={countries}
          onExport={handleExport}
        />

        <CustomersTable
          customers={paged}
          onView={handleView}
          onEdit={handleEditClick}
          onOpenSuspend={handleOpenSuspend}
          onOpenDelete={handleOpenDelete}
        />

        <TableFooter
          page={page}
          pageSize={pageSize}
          total={filtered.length}
          onPage={setPage}
          onPageSize={(s) => { setPageSize(s); setPage(1); }}
        />
      </div>

      {/* View Details Drawer */}
      <CustomerViewDrawer
        isOpen={isViewOpen}
        customer={selectedCustomer}
        onClose={() => setIsViewOpen(false)}
        onEdit={handleEditClick}
      />

      {/* Add Customer Modal */}
      <AddCustomerModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onAdd={handleAddCustomer}
      />

      {/* Edit Customer Modal */}
      <EditCustomerModal
        isOpen={isEditOpen}
        customer={selectedCustomer}
        onClose={() => setIsEditOpen(false)}
        onSave={handleSaveCustomer}
      />

      {/* Suspend & Delete Confirmation Modal */}
      <ConfirmActionModal
        isOpen={confirmModal.isOpen}
        type={confirmModal.type}
        onClose={() => setConfirmModal({ isOpen: false, type: null, customer: null })}
        onConfirm={handleConfirmAction}
      />
    </div>
  );
}