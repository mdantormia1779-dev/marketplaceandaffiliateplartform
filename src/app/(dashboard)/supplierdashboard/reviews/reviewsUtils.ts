import { ActiveFilter, ProductFilterValue, Review, SortOption, STAR_FILTERS } from "./types";

export function getAverageRating(reviews: Review[]): string {
  if (!reviews.length) return "0.0";
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  return (sum / reviews.length).toFixed(1);
}

export function getRatingBreakdown(reviews: Review[]) {
  const total = reviews.length;
  return STAR_FILTERS.map((star) => {
    const count = reviews.filter((r) => r.rating === star).length;
    return { star, count, pct: total ? Math.round((count / total) * 100) : 0 };
  });
}

export function getUnansweredCount(reviews: Review[]): number {
  return reviews.filter((r) => !r.reply).length;
}

export function getFlaggedCount(reviews: Review[]): number {
  return reviews.filter((r) => r.flagged).length;
}

export function getResponseRate(reviews: Review[]): number {
  if (!reviews.length) return 0;
  const unanswered = getUnansweredCount(reviews);
  return Math.round(((reviews.length - unanswered) / reviews.length) * 100);
}

export function getUniqueProducts(reviews: Review[]): string[] {
  return Array.from(new Set(reviews.map((r) => r.productName))).sort();
}

export function filterAndSortReviews(
  reviews: Review[],
  activeFilter: ActiveFilter,
  productFilter: ProductFilterValue,
  query: string,
  sort: SortOption
): Review[] {
  let list = [...reviews];

  if (activeFilter === "unanswered") {
    list = list.filter((r) => !r.reply);
  } else if (activeFilter === "flagged") {
    list = list.filter((r) => r.flagged);
  } else if (activeFilter !== "all") {
    list = list.filter((r) => r.rating === activeFilter);
  }

  if (productFilter !== "all") {
    list = list.filter((r) => r.productName === productFilter);
  }

  if (query.trim()) {
    const q = query.toLowerCase();
    list = list.filter(
      (r) =>
        r.customerName.toLowerCase().includes(q) ||
        r.productName.toLowerCase().includes(q) ||
        r.comment.toLowerCase().includes(q)
    );
  }

  list.sort((a, b) => {
    if (sort === "newest") return new Date(b.date).getTime() - new Date(a.date).getTime();
    if (sort === "oldest") return new Date(a.date).getTime() - new Date(b.date).getTime();
    if (sort === "highest") return b.rating - a.rating;
    return a.rating - b.rating;
  });

  return list;
}

export function paginate<T>(items: T[], page: number, pageSize: number): T[] {
  const start = (page - 1) * pageSize;
  return items.slice(start, start + pageSize);
}

export function getTotalPages(itemCount: number, pageSize: number): number {
  return Math.max(1, Math.ceil(itemCount / pageSize));
}