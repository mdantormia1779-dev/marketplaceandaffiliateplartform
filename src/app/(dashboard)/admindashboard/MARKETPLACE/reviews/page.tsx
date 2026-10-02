"use client";
import { exportCsv } from "./exportCsv";
import ReviewsHeader from "./ReviewsHeader";
import ReviewsTable from "./ReviewsTable";
import ReviewsToolbar from "./ReviewsToolbar";
import ReviewStats from "./ReviewStats";
import { useReviews } from "./useReviews";
import Pagination from "../shared/Pagination";

export default function ReviewsPage() {
  const r = useReviews();

  return (
    <div className="space-y-6 p-6">
      <ReviewsHeader />
      <ReviewStats stats={r.stats} />
      <section className="rounded-xl border border-gray-200 bg-white">
        <ReviewsToolbar filters={r.filters} onChange={r.updateFilters} onExport={() => exportCsv(r.filtered)} />
        <ReviewsTable rows={r.rows} onStatus={r.setStatus} onDelete={r.remove} />
        <Pagination {...r.pagination} />
      </section>
    </div>
  );
}