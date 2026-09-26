"use client";

import { useMemo, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "@/app/(dashboard)/supplierdashboard/components/Navbar";

import {
  ActiveFilter,
  PAGE_SIZE,
  ProductFilterValue,
  Review,
  SortOption,
} from "./types";
import { REVIEWS } from "./reviewsData";
import {
  filterAndSortReviews,
  getAverageRating,
  getFlaggedCount,
  getHiddenCount,
  getRatingBreakdown,
  getResponseRate,
  getTotalPages,
  getUnansweredCount,
  getUniqueProducts,
  paginate,
} from "./reviewsUtils";

import { OverallRatingCard } from "./components/OverallRatingCard";
import { RatingBreakdownCard } from "./components/RatingBreakdownCard";
import { ResponseRateCard } from "./components/ResponseRateCard";
import { ReviewFilters } from "./components/ReviewFilters";
import { ReviewList } from "./components/ReviewList";
import { Pagination } from "./components/Pagination";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>(REVIEWS);
  const [activeFilter, setActiveFilter] = useState<ActiveFilter>("all");
  const [productFilter, setProductFilter] = useState<ProductFilterValue>("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortOption>("newest");
  const [page, setPage] = useState(1);

  const [openFormId, setOpenFormId] = useState<string | null>(null);
  const [formMode, setFormMode] = useState<"create" | "edit">("create");

  const average = useMemo(() => getAverageRating(reviews), [reviews]);
  const breakdown = useMemo(() => getRatingBreakdown(reviews), [reviews]);
  const unansweredCount = useMemo(() => getUnansweredCount(reviews), [reviews]);
  const flaggedCount = useMemo(() => getFlaggedCount(reviews), [reviews]);
  const hiddenCount = useMemo(() => getHiddenCount(reviews), [reviews]);
  const responseRate = useMemo(() => getResponseRate(reviews), [reviews]);
  const products = useMemo(() => getUniqueProducts(reviews), [reviews]);

  const filtered = useMemo(
    () => filterAndSortReviews(reviews, activeFilter, productFilter, query, sort),
    [reviews, activeFilter, productFilter, query, sort]
  );

  const totalPages = getTotalPages(filtered.length, PAGE_SIZE);
  const paged = useMemo(() => paginate(filtered, page, PAGE_SIZE), [filtered, page]);

  const handleActiveFilterChange = (value: ActiveFilter) => {
    setPage(1);
    setActiveFilter(value);
  };

  const handleProductFilterChange = (value: ProductFilterValue) => {
    setPage(1);
    setProductFilter(value);
  };

  const handleQueryChange = (value: string) => {
    setPage(1);
    setQuery(value);
  };

  const handleSortChange = (value: SortOption) => {
    setPage(1);
    setSort(value);
  };

  const handleOpenReply = (id: string) => {
    setOpenFormId(id);
    setFormMode("create");
  };

  const handleOpenEditReply = (id: string) => {
    setOpenFormId(id);
    setFormMode("edit");
  };

  const handleCancelForm = () => {
    setOpenFormId(null);
  };

  const handleSubmitReply = (id: string, text: string) => {
    setReviews((prev) =>
      prev.map((r) => {
        if (r.id !== id) return r;
        const isEdit = !!r.reply;
        return {
          ...r,
          reply: {
            text,
            date: new Date().toISOString(),
            edited: isEdit ? true : undefined,
          },
        };
      })
    );
    setOpenFormId(null);
    toast.success(formMode === "edit" ? "Reply updated" : "Reply posted");
  };

  const handleDeleteReply = (id: string) => {
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, reply: undefined } : r)));
    setOpenFormId(null);
    toast.info("Reply deleted");
  };

  const handleToggleFlag = (id: string) => {
    let nowFlagged = false;
    setReviews((prev) =>
      prev.map((r) => {
        if (r.id !== id) return r;
        nowFlagged = !r.flagged;
        return { ...r, flagged: nowFlagged };
      })
    );
    if (nowFlagged) {
      toast.warn("Review flagged for admin review");
    } else {
      toast.info("Flag removed");
    }
  };

  const handleToggleHide = (id: string) => {
    let nowHidden = false;
    setReviews((prev) =>
      prev.map((r) => {
        if (r.id !== id) return r;
        nowHidden = !r.hidden;
        return { ...r, hidden: nowHidden };
      })
    );
    if (nowHidden) {
      toast.info("Review hidden from storefront");
    } else {
      toast.success("Review visible on storefront again");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="px-4 py-6 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex flex-col gap-1">
            <h1 className="text-2xl font-semibold text-slate-900">Reviews</h1>
            <p className="text-sm text-slate-500">
              See what customers are saying about your products and respond to feedback.
            </p>
          </div>

          <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
            <OverallRatingCard average={average} total={reviews.length - hiddenCount} />
            <RatingBreakdownCard breakdown={breakdown} onSelectStar={handleActiveFilterChange} />
            <ResponseRateCard responseRate={responseRate} unansweredCount={unansweredCount} />
          </div>

          <ReviewFilters
            activeFilter={activeFilter}
            onFilterChange={handleActiveFilterChange}
            productFilter={productFilter}
            onProductFilterChange={handleProductFilterChange}
            products={products}
            query={query}
            onQueryChange={handleQueryChange}
            sort={sort}
            onSortChange={handleSortChange}
            unansweredCount={unansweredCount}
            flaggedCount={flaggedCount}
            hiddenCount={hiddenCount}
          />

          <ReviewList
            reviews={paged}
            openFormId={openFormId}
            formMode={formMode}
            onOpenReply={handleOpenReply}
            onOpenEditReply={handleOpenEditReply}
            onCancelForm={handleCancelForm}
            onSubmitReply={handleSubmitReply}
            onDeleteReply={handleDeleteReply}
            onToggleFlag={handleToggleFlag}
            onToggleHide={handleToggleHide}
          />

          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={2500} theme="light" />
    </div>
  );
}