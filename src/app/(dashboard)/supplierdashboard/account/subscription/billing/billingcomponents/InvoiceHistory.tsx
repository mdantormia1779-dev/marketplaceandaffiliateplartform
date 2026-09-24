"use client";

import { useMemo, useState } from "react";
import Card from "./Card";
import SectionHeader from "./SectionHeader";
import InvoiceFilters from "./InvoiceFilters";
import InvoiceTable from "./InvoiceTable";
import { DateRange, Invoice } from "./types";
import { inRange } from "./utils";

export default function InvoiceHistory({ invoices }: { invoices: Invoice[] }) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All statuses");
  const [range, setRange] = useState<DateRange>("all");

  const filtered = useMemo(
    () =>
      invoices.filter(
        (i) =>
          i.id.toLowerCase().includes(search.toLowerCase()) &&
          (status === "All statuses" || i.status === status) &&
          inRange(i.date, range)
      ),
    [invoices, search, status, range]
  );

  return (
    <Card className="overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-4 p-6">
        <SectionHeader title="Invoice History" subtitle="Download and review every invoice for this workspace." />
        <InvoiceFilters search={search} onSearch={setSearch} status={status} onStatus={setStatus} range={range} onRange={setRange} />
      </div>
      <InvoiceTable invoices={filtered} />
    </Card>
  );
}