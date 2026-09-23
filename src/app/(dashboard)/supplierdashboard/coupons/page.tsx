"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, Ticket, Timer } from "lucide-react";
import Topbar from "./components/Topbar";
import PageHeader from "./components/PageHeader";
import StatCard from "./components/StatCard";
import RedemptionHealth from "./components/RedemptionHealth";
import TopPerformingCodes from "./components/TopPerformingCodes";
import StatusFilterTabs, { type TabKey } from "./components/StatusFilterTabs";
import CouponToolbar from "./components/CouponToolbar";
import CouponTable from "./components/CouponTable";
import NewCodeDialog from "./components/NewCodeDialog";
import EditCodeDialog from "./components/EditCodeDialog";
import DeleteConfirmDialog from "./components/DeleteConfirmDialog";
import { COUPONS, TYPE_MAP, type Coupon } from "./components/data";
import { daysBetween, couponsToCsv, downloadCsv } from "./components/lib";

export default function CouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>(COUPONS);
  const [range, setRange] = useState("30 days");
  const [tab, setTab] = useState<TabKey>("all");
  const [query, setQuery] = useState("");
  const [type, setType] = useState("All types");
  const [sort, setSort] = useState("Most redeemed");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isNewCodeOpen, setIsNewCodeOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
  const [deletingCoupon, setDeletingCoupon] = useState<Coupon | null>(null);

  const counts = useMemo(() => {
    const base: Record<TabKey, number> = {
      all: coupons.length,
      active: 0,
      scheduled: 0,
      expired: 0,
      disabled: 0,
    };
    coupons.forEach((c) => (base[c.status] += 1));
    return base;
  }, [coupons]);

  const expiringSoon = useMemo(
    () =>
      coupons.filter((c) => {
        const d = daysBetween(c.endsAt);
        return c.status === "active" && d >= 0 && d <= 7;
      }).length,
    [coupons]
  );

  const fullyRedeemed = useMemo(
    () => coupons.filter((c) => c.maxUses !== null && c.redemptions >= c.maxUses).length,
    [coupons]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const rows = coupons.filter((c) => {
      if (tab !== "all" && c.status !== tab) return false;
      if (type !== "All types" && c.type !== TYPE_MAP[type]) return false;
      if (q && !`${c.code} ${c.name}`.toLowerCase().includes(q)) return false;
      return true;
    });

    const sorted = [...rows];
    switch (sort) {
      case "Highest revenue":
        sorted.sort((a, b) => (b.revenue ?? 0) - (a.revenue ?? 0));
        break;
      case "Ending soonest":
        sorted.sort((a, b) => a.endsAt.localeCompare(b.endsAt));
        break;
      case "Newest first":
        sorted.sort((a, b) => b.startsAt.localeCompare(a.startsAt));
        break;
      default:
        sorted.sort((a, b) => b.redemptions - a.redemptions);
    }
    return sorted;
  }, [coupons, tab, type, query, sort]);

  const copyCode = async (c: Coupon) => {
    try {
      await navigator.clipboard.writeText(c.code);
      setCopiedId(c.id);
      setTimeout(() => setCopiedId(null), 1600);
    } catch {
      /* clipboard unavailable */
    }
  };

  function handleExport() {
    const csv = couponsToCsv(filtered);
    const today = new Date().toISOString().slice(0, 10);
    downloadCsv(`coupon-codes-${today}.csv`, csv);
  }

  function handleCreateCoupon(coupon: Coupon) {
    setCoupons((prev) => [coupon, ...prev]);
    setIsNewCodeOpen(false);
  }

  function handleUpdateCoupon(updated: Coupon) {
    setCoupons((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
    setEditingCoupon(null);
  }

  function handleDeleteCoupon() {
    if (!deletingCoupon) return;
    setCoupons((prev) => prev.filter((c) => c.id !== deletingCoupon.id));
    setDeletingCoupon(null);
  }

  const existingCodes = coupons.map((c) => c.code.toUpperCase());

  return (
    <div className="min-h-screen bg-slate-50/70">
      <Topbar
        title="Coupons"
        subtitle="Create and manage promotional coupon codes."
        notificationCount={3}
      />

      <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <PageHeader
          range={range}
          onRangeChange={setRange}
          onExport={handleExport}
          onNewCode={() => setIsNewCodeOpen(true)}
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard
            label="Active Coupons"
            value={String(counts.active)}
            caption="Live and redeemable right now"
            icon={<Ticket className="h-4 w-4 text-blue-600" />}
            tint="bg-blue-50"
          />
          <StatCard
            label="Expiring Soon"
            value={String(expiringSoon)}
            caption="Codes ending within 7 days"
            icon={<Timer className="h-4 w-4 text-amber-600" />}
            tint="bg-amber-50"
          />
          <StatCard
            label="Fully Redeemed"
            value={String(fullyRedeemed)}
            caption="Codes that hit their max uses"
            icon={<CheckCircle2 className="h-4 w-4 text-emerald-600" />}
            tint="bg-emerald-50"
          />
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
          <RedemptionHealth fullyRedeemed={fullyRedeemed} />
          <TopPerformingCodes codes={coupons} />
        </div>

        <StatusFilterTabs counts={counts} active={tab} onChange={setTab} />

        <CouponToolbar
          query={query}
          onQueryChange={setQuery}
          type={type}
          onTypeChange={setType}
          sort={sort}
          onSortChange={setSort}
          resultCount={filtered.length}
        />

        <CouponTable
          coupons={filtered}
          copiedId={copiedId}
          onCopy={copyCode}
          onEdit={setEditingCoupon}
          onDeleteRequest={setDeletingCoupon}
        />

        <div className="flex flex-wrap items-center justify-between gap-2 pb-6 text-xs text-slate-400">
          <span>
            {filtered.length} of {coupons.length} codes shown
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Ticket className="h-3.5 w-3.5" />
            Redemption totals cover the last {range.toLowerCase()}
          </span>
        </div>

        <NewCodeDialog
          open={isNewCodeOpen}
          onClose={() => setIsNewCodeOpen(false)}
          onCreate={handleCreateCoupon}
          existingCodes={existingCodes}
        />

        <EditCodeDialog
          coupon={editingCoupon}
          onClose={() => setEditingCoupon(null)}
          onUpdate={handleUpdateCoupon}
          existingCodes={existingCodes}
        />

        <DeleteConfirmDialog
          coupon={deletingCoupon}
          onCancel={() => setDeletingCoupon(null)}
          onConfirm={handleDeleteCoupon}
        />
      </div>
    </div>
  );
}