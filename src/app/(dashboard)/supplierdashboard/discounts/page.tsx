"use client";

import { useMemo, useState } from "react";
import { Info } from "lucide-react";
import PageHeader from "./Discountcomponents/PageHeader";
import StatCards from "./Discountcomponents/StatCards";
import CampaignSchedule from "./Discountcomponents/CampaignSchedule";
import StatusFilterTabs, { type TabKey } from "./Discountcomponents/StatusFilterTabs";
import RuleToolbar from "./Discountcomponents/RuleToolbar";
import RuleTable from "./Discountcomponents/RuleTable";
import Pagination from "./Discountcomponents/Pagination";
import { RULES, TYPE_MAP, PAGE_SIZE } from "./Discountcomponents/data";

export default function DiscountsPage() {
  const [range, setRange] = useState("30 days");
  const [tab, setTab] = useState<TabKey>("all");
  const [query, setQuery] = useState("");
  const [type, setType] = useState("All types");
  const [sort, setSort] = useState("Priority (high → low)");
  const [page, setPage] = useState(1);

  const counts = useMemo(() => {
    const base: Record<TabKey, number> = {
      all: RULES.length,
      active: 0,
      scheduled: 0,
      paused: 0,
      expired: 0,
    };
    RULES.forEach((r) => (base[r.status] += 1));
    return base;
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const rows = RULES.filter((r) => {
      if (tab !== "all" && r.status !== tab) return false;
      if (type !== "All types" && r.kind !== TYPE_MAP[type]) return false;
      if (q && !`${r.name} ${r.ref} ${r.condition}`.toLowerCase().includes(q)) return false;
      return true;
    });

    const sorted = [...rows];
    switch (sort) {
      case "Priority (low → high)":
        sorted.sort((a, b) => b.priority - a.priority);
        break;
      case "Most used":
        sorted.sort((a, b) => b.usage - a.usage);
        break;
      case "Highest revenue":
        sorted.sort((a, b) => (b.revenue ?? 0) - (a.revenue ?? 0));
        break;
      case "Ending soonest":
        sorted.sort((a, b) => a.endsAt.localeCompare(b.endsAt));
        break;
      default:
        sorted.sort((a, b) => a.priority - b.priority);
    }
    return sorted;
  }, [tab, type, query, sort]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, pageCount);
  const visible = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  function resetPage<T>(setter: (v: T) => void) {
    return (value: T) => {
      setter(value);
      setPage(1);
    };
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">
      <PageHeader range={range} onRangeChange={setRange} />

      <StatCards activeCount={counts.active} scheduledCount={counts.scheduled} />

      <CampaignSchedule rules={RULES} />

      <StatusFilterTabs
        counts={counts}
        active={tab}
        onChange={(v) => {
          setTab(v);
          setPage(1);
        }}
      />

      <RuleToolbar
        query={query}
        onQueryChange={resetPage(setQuery)}
        type={type}
        onTypeChange={resetPage(setType)}
        sort={sort}
        onSortChange={setSort}
        resultCount={filtered.length}
      />

      <RuleTable rules={visible} />

      <div className="flex flex-wrap items-center justify-between gap-2 -mt-3 text-xs text-slate-400">
        <span>
          {visible.length} of {filtered.length} rules shown
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Info className="h-3.5 w-3.5" />
          Automatic rules apply at checkout without a coupon code
        </span>
      </div>

      <Pagination
        page={current}
        pageCount={pageCount}
        onPageChange={setPage}
        totalCount={filtered.length}
        pageSize={PAGE_SIZE}
        shownCount={visible.length}
      />
    </div>
  );
}