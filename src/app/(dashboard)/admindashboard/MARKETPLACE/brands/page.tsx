"use client";
import { useState } from "react";
import AddBrandModal from "./AddBrandModal";
import BrandsHeader from "./BrandsHeader";
import BrandsTable from "./BrandsTable";
import BrandsToolbar from "./BrandsToolbar";
import BrandStats from "./BrandStats";

import Pagination from "../components/Pagination";
import { useBrands } from "./useBrands";
import { exportCsv } from "./exportCsv";

export default function BrandsPage() {
  const b = useBrands();
  const [adding, setAdding] = useState(false);

  return (
    <div className="space-y-6 p-6">
      <BrandsHeader onAdd={() => setAdding(true)} />
      <BrandStats stats={b.stats} />
      <section className="rounded-xl border border-gray-200 bg-white">
        <BrandsToolbar filters={b.filters} onChange={b.updateFilters} onExport={() => exportCsv(b.filtered)} />
        <BrandsTable rows={b.rows} onStatus={b.setStatus} onDelete={b.remove} />
        <Pagination {...b.pagination} />
      </section>
      {adding && <AddBrandModal onClose={() => setAdding(false)} onAdd={b.add} />}
    </div>
  );
}