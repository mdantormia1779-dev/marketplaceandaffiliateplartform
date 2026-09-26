"use client";

import { useMemo, useState } from "react";
import { Info } from "lucide-react";
import Navbar from "../components/Navbar";
import PageHeader from "./Discountcomponents/PageHeader";
import StatCards from "./Discountcomponents/StatCards";
import CampaignSchedule from "./Discountcomponents/CampaignSchedule";
import StatusFilterTabs, { type TabKey } from "./Discountcomponents/StatusFilterTabs";
import RuleToolbar from "./Discountcomponents/RuleToolbar";
import RuleTable from "./Discountcomponents/RuleTable";
import Pagination from "./Discountcomponents/Pagination";
import NewRuleDialog from "./Discountcomponents/NewRuleDialog";
import EditRuleDialog from "./Discountcomponents/EditRuleDialog";
import DeleteConfirmDialog from "./Discountcomponents/DeleteConfirmDialog";
import { RULES, TYPE_MAP, PAGE_SIZE, type Rule } from "./Discountcomponents/data";
import { rulesToCsv, downloadCsv } from "./Discountcomponents/lib";

export default function DiscountsPage() {
  const [rules, setRules] = useState<Rule[]>(RULES);
  const [range, setRange] = useState("30 days");
  const [tab, setTab] = useState<TabKey>("all");
  const [query, setQuery] = useState("");
  const [type, setType] = useState("All types");
  const [sort, setSort] = useState("Priority (high → low)");
  const [page, setPage] = useState(1);
  const [isNewRuleOpen, setIsNewRuleOpen] = useState(false);
  const [editingRule, setEditingRule] = useState<Rule | null>(null);
  const [deletingRule, setDeletingRule] = useState<Rule | null>(null);

  const counts = useMemo(() => {
    const base: Record<TabKey, number> = {
      all: rules.length,
      active: 0,
      scheduled: 0,
      paused: 0,
      expired: 0,
    };
    rules.forEach((r) => (base[r.status] += 1));
    return base;
  }, [rules]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const rows = rules.filter((r) => {
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
  }, [rules, tab, type, query, sort]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, pageCount);
  const visible = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  function resetPage<T>(setter: (v: T) => void) {
    return (value: T) => {
      setter(value);
      setPage(1);
    };
  }

  function handleExport() {
    const csv = rulesToCsv(filtered);
    const today = new Date().toISOString().slice(0, 10);
    downloadCsv(`discount-rules-${today}.csv`, csv);
  }

  function handleCreateRule(rule: Rule) {
    setRules((prev) => [rule, ...prev]);
    setIsNewRuleOpen(false);
    setPage(1);
  }

  function handleUpdateRule(updated: Rule) {
    setRules((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
    setEditingRule(null);
  }

  function handleDeleteRule() {
    if (!deletingRule) return;
    setRules((prev) => prev.filter((r) => r.id !== deletingRule.id));
    setDeletingRule(null);
  }



    return (
    <div className="min-h-screen bg-slate-50/70">
      <Navbar />

      <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <PageHeader
          range={range}
          onRangeChange={setRange}
          onExport={handleExport}
          onNewRule={() => setIsNewRuleOpen(true)}
        />

        <StatCards activeCount={counts.active} scheduledCount={counts.scheduled} />

        <CampaignSchedule rules={rules} />

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

        <RuleTable rules={visible} onEdit={setEditingRule} onDeleteRequest={setDeletingRule} />

        <div className="-mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
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

        <NewRuleDialog
          open={isNewRuleOpen}
          onClose={() => setIsNewRuleOpen(false)}
          onCreate={handleCreateRule}
          existingCount={rules.length}
        />

        <EditRuleDialog rule={editingRule} onClose={() => setEditingRule(null)} onUpdate={handleUpdateRule} />

        <DeleteConfirmDialog
          rule={deletingRule}
          onCancel={() => setDeletingRule(null)}
          onConfirm={handleDeleteRule}
        />
      </div>
    </div>
  );
}