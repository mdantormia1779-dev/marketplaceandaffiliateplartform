"use client";

import { useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import PageHeader from "./components/PageHeader";
import StatCards from "./components/StatCards";
import TopAffiliates from "./components/TopAffiliates";
import CommissionOverview from "./components/CommissionOverview";
import StatusFilterTabs from "./components/StatusFilterTabs";
import AffiliateToolbar from "./components/AffiliateToolbar";
import AffiliateTable from "./components/AffiliateTable";
import Pagination from "./components/Pagination";
import NewCampaignModal, { type NewCampaignInput } from "./components/NewCampaignModal";
import { exportAffiliatesToCsv } from "./components/exportCsv";
import {
  AFFILIATES,
  CAMPAIGNS,
  PRODUCT_OPTIONS,
  SORT_OPTIONS,
  type Affiliate,
  type AffiliateStatus,
  type Campaign,
} from "./components/data";

type TabKey = "all" | AffiliateStatus;

const PAGE_SIZE = 8;
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatShort(iso: string) {
  const [, m, d] = iso.split("-").map(Number);
  return `${MONTHS[m - 1]} ${d}`;
}

export default function AffiliatesPage() {
  const [range, setRange] = useState("30 days");
  const [status, setStatus] = useState<TabKey>("all");
  const [query, setQuery] = useState("");
  const [product, setProduct] = useState("All products");
  const [sort, setSort] = useState(SORT_OPTIONS[0]);
  const [page, setPage] = useState(1);

  const [affiliates, setAffiliates] = useState<Affiliate[]>(AFFILIATES);
  const [campaigns, setCampaigns] = useState<Campaign[]>(CAMPAIGNS);
  const [campaignModalOpen, setCampaignModalOpen] = useState(false);

  const counts = useMemo(() => {
    const base: Record<TabKey, number> = { all: affiliates.length, active: 0, pending: 0, paused: 0 };
    affiliates.forEach((a) => (base[a.status] += 1));
    return base;
  }, [affiliates]);

  const totals = useMemo(() => {
    const clicks = affiliates.reduce((s, a) => s + a.clicks, 0);
    const orders = affiliates.reduce((s, a) => s + a.orders, 0);
    const commission = affiliates.reduce((s, a) => s + a.commissionEarned, 0);
    return { clicks, orders, commission };
  }, [affiliates]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const rows = affiliates.filter((a) => {
      if (status !== "all" && a.status !== status) return false;
      if (product !== "All products" && !a.products.includes(product)) return false;
      if (q && !`${a.name} ${a.email}`.toLowerCase().includes(q)) return false;
      return true;
    });

    const sorted = [...rows];
    switch (sort) {
      case "Most orders":
        sorted.sort((a, b) => b.orders - a.orders);
        break;
      case "Most clicks":
        sorted.sort((a, b) => b.clicks - a.clicks);
        break;
      case "Newest":
        sorted.sort((a, b) => b.joinedAt.localeCompare(a.joinedAt));
        break;
      default:
        sorted.sort((a, b) => b.commissionEarned - a.commissionEarned);
    }
    return sorted;
  }, [affiliates, status, query, product, sort]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, pageCount);
  const visible = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  function resetPage<T>(setter: (v: T) => void) {
    return (value: T) => {
      setter(value);
      setPage(1);
    };
  }

  /* ------------------------------ Export ------------------------------ */
  function handleExport() {
    const filename = `affiliates-${range.replace(" ", "-")}.csv`;
    exportAffiliatesToCsv(filtered, filename);
  }

  /* ---------------------------- Affiliates ----------------------------- */
  function handleToggleAffiliatePause(id: string) {
    setAffiliates((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, status: a.status === "paused" ? "active" : "paused" } : a
      )
    );
  }

  function handleDeleteAffiliate(id: string) {
    const target = affiliates.find((a) => a.id === id);
    if (target && !window.confirm(`Remove ${target.name} from your affiliates?`)) return;
    setAffiliates((prev) => prev.filter((a) => a.id !== id));
  }

  /* ----------------------------- Campaigns ------------------------------ */
  function handleAddCampaign(input: NewCampaignInput) {
    const newCampaign: Campaign = {
      id: `cp-${Date.now()}`,
      name: input.name,
      commissionRate: input.commissionRate,
      window: `${formatShort(input.startDate)} – ${formatShort(input.endDate)}`,
      status: "active",
    };
    setCampaigns((prev) => [newCampaign, ...prev]);
    setCampaignModalOpen(false);
  }

  function handleToggleCampaignStatus(id: string) {
    setCampaigns((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, status: c.status === "active" ? "paused" : "active" } : c
      )
    );
  }

  function handleDeleteCampaign(id: string) {
    const target = campaigns.find((c) => c.id === id);
    if (target && !window.confirm(`Delete campaign "${target.name}"? This can't be undone.`)) return;
    setCampaigns((prev) => prev.filter((c) => c.id !== id));
  }

  return (
    <div className="min-h-screen bg-slate-50/70">
      <Navbar />

      <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <PageHeader
          range={range}
          onRangeChange={setRange}
          onExport={handleExport}
          onNewCampaign={() => setCampaignModalOpen(true)}
        />

        <StatCards
          activeCount={counts.active}
          clicks={totals.clicks}
          orders={totals.orders}
          commission={totals.commission}
        />

        <div className="grid gap-4 lg:grid-cols-[1.1fr_1fr]">
          <TopAffiliates affiliates={affiliates} />
          <CommissionOverview
            campaigns={campaigns}
            onToggleStatus={handleToggleCampaignStatus}
            onDelete={handleDeleteCampaign}
          />
        </div>

        <StatusFilterTabs
          counts={counts}
          active={status}
          onChange={(v) => {
            setStatus(v);
            setPage(1);
          }}
        />

        <AffiliateToolbar
          query={query}
          onQueryChange={resetPage(setQuery)}
          product={product}
          onProductChange={resetPage(setProduct)}
          productOptions={PRODUCT_OPTIONS}
          sort={sort}
          onSortChange={setSort}
          resultCount={filtered.length}
        />

        <AffiliateTable
          affiliates={visible}
          onTogglePause={handleToggleAffiliatePause}
          onDelete={handleDeleteAffiliate}
        />

        <Pagination
          page={current}
          pageCount={pageCount}
          onPageChange={setPage}
          totalCount={filtered.length}
          pageSize={PAGE_SIZE}
          shownCount={visible.length}
        />

        <NewCampaignModal
          open={campaignModalOpen}
          onClose={() => setCampaignModalOpen(false)}
          onSubmit={handleAddCampaign}
        />
      </div>
    </div>
  );
}