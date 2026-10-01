"use client";
import { useState } from "react";
import { exportCsv } from "./exportCsv";
import FeaturedHeader from "./FeaturedHeader";
import FeaturedStats from "./FeaturedStats";
import FeaturedTable from "./FeaturedTable";
import FeaturedToolbar from "./FeaturedToolbar";
import FeatureProductModal from "./FeatureProductModal";
import { useFeatured } from "./useFeatured";
import Pagination from "../components/Pagination";

export default function FeaturedPage() {
  const f = useFeatured();
  const [adding, setAdding] = useState(false);

  return (
    <div className="space-y-6 p-6">
      <FeaturedHeader onAdd={() => setAdding(true)} />
      <FeaturedStats stats={f.stats} />
      <section className="rounded-xl border border-gray-200 bg-white">
        <FeaturedToolbar filters={f.filters} onChange={f.updateFilters} onExport={() => exportCsv(f.filtered)} />
        <FeaturedTable rows={f.rows} onEndNow={f.endNow} onRenew={f.renew} onDelete={f.remove} />
        <Pagination {...f.pagination} />
      </section>
      {adding && <FeatureProductModal onClose={() => setAdding(false)} onAdd={f.add} />}
    </div>
  );
}