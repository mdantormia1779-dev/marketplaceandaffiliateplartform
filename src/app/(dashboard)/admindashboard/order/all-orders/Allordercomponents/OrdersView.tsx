"use client";
import { useMemo, useState } from "react";
import OrdersHeader from "./OrdersHeader";
import StatCards from "./StatCards";
import OrderTabs from "./OrderTabs";
import OrdersTable from "./OrdersTable";
import OrderDetailsDrawer from "./OrderDetailsDrawer";
import BulkActionBar from "./BulkActionBar";
import { initialOrders } from "./data";
import { Order, OrderStatus, Tab } from "./types";

const nextStatus: Partial<Record<OrderStatus, OrderStatus>> = {
  Pending: "Processing",
  Processing: "Shipped",
  Shipped: "Delivered",
};

const canShip = (o: Order) => o.status === "Pending" || o.status === "Processing";

interface Props {
  title: string;
  subtitle: string;
  initialTab?: Tab;
}

export default function OrdersView({ title, subtitle, initialTab = "All Orders" }: Props) {
  // active tab ekhon URL (page) theke ashe, tai alada state lagbe na
  const tab = initialTab;

  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [bulkMode, setBulkMode] = useState(false);
  const [checked, setChecked] = useState<string[]>([]);

  const update = (id: string, patch: Partial<Order>) =>
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, ...patch } : o)));

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return orders.filter((o) => {
      const tabOk =
        tab === "All Orders" ? true :
        tab === "Refunds" ? o.payment === "Refunded" :
        o.status === tab;
      const searchOk =
        !q ||
        o.id.toLowerCase().includes(q) ||
        o.customer.name.toLowerCase().includes(q) ||
        o.supplier.toLowerCase().includes(q);
      return tabOk && searchOk;
    });
  }, [orders, tab, query]);

  /* ---------- single order actions ---------- */
  const handleShip = (id: string) => update(id, { status: "Shipped" });
  const handleRefund = (id: string) => update(id, { payment: "Refunded" });
  const handleCancel = (id: string) => update(id, { status: "Cancelled" });
  const handleAdvance = (id: string) => {
    const o = orders.find((x) => x.id === id);
    const next = o && nextStatus[o.status];
    if (next) update(id, { status: next });
  };
  const handlePrint = (id: string) => {
    setSelectedId(id);
    setTimeout(() => window.print(), 300);
  };

  /* ---------- bulk mode ---------- */
  const toggleBulk = () => { setBulkMode((b) => !b); setChecked([]); };
  const toggleOne = (id: string) =>
    setChecked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  const allChecked = filtered.length > 0 && filtered.every((o) => checked.includes(o.id));
  const toggleAll = () => setChecked(allChecked ? [] : filtered.map((o) => o.id));

  const bulkUpdate = (fn: (o: Order) => Partial<Order> | null) => {
    setOrders((prev) =>
      prev.map((o) => (checked.includes(o.id) ? { ...o, ...(fn(o) ?? {}) } : o))
    );
    setChecked([]);
  };

  const bulkShip = () => bulkUpdate((o) => (canShip(o) ? { status: "Shipped" } : null));
  const bulkDeliver = () => bulkUpdate((o) => (o.status === "Shipped" ? { status: "Delivered" } : null));
  const bulkRefund = () => bulkUpdate((o) => (o.payment === "Paid" ? { payment: "Refunded" } : null));
  const bulkCancel = () => bulkUpdate((o) => (canShip(o) ? { status: "Cancelled" } : null));
  const bulkDelete = () => {
    if (!window.confirm(`Delete ${checked.length} selected order(s)?`)) return;
    setOrders((prev) => prev.filter((o) => !checked.includes(o.id)));
    setChecked([]);
  };

  const exportList = checked.length ? filtered.filter((o) => checked.includes(o.id)) : filtered;
  const selected = orders.find((o) => o.id === selectedId) ?? null;

  return (
    <div className={`space-y-6 bg-gray-50 p-6 ${bulkMode ? "pb-28" : ""}`}>
      <OrdersHeader
        title={title}
        subtitle={subtitle}
        orders={exportList}
        bulkMode={bulkMode}
        onToggleBulk={toggleBulk}
      />
      <OrderTabs active={tab} />
      <StatCards />
      <OrdersTable
        orders={filtered}
        query={query}
        onQuery={(q) => { setQuery(q); setChecked([]); }}
        bulkMode={bulkMode}
        selected={checked}
        onToggle={toggleOne}
        onToggleAll={toggleAll}
        onView={setSelectedId}
        onShip={handleShip}
        onRefund={handleRefund}
        onCancel={handleCancel}
        onPrint={handlePrint}
      />
      <OrderDetailsDrawer
        order={selected}
        onClose={() => setSelectedId(null)}
        onPrint={handlePrint}
        onAdvance={handleAdvance}
      />
      {bulkMode && (
        <BulkActionBar
          count={checked.length}
          onShip={bulkShip}
          onDeliver={bulkDeliver}
          onRefund={bulkRefund}
          onCancel={bulkCancel}
          onDelete={bulkDelete}
          onClear={() => setChecked([])}
        />
      )}
    </div>
  );
}