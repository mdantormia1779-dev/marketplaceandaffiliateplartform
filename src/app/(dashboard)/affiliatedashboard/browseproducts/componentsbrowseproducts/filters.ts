import type { Product } from "./types";

export const CATEGORY_OPTIONS = [
  "All Categories",
  "Electronics",
  "Wearables",
  "Fashion",
  "Sports",
  "Home & Kitchen",
] as const;
export type CategoryOption = (typeof CATEGORY_OPTIONS)[number];

export const COMMISSION_OPTIONS = [
  "Commission Rate",
  "10% and above",
  "15% and above",
] as const;
export type CommissionOption = (typeof COMMISSION_OPTIONS)[number];

export const PRICE_RANGE_OPTIONS = [
  "Price Range",
  "Under ৳1,000",
  "৳1,000 - ৳3,000",
  "৳3,000 - ৳5,000",
  "Above ৳5,000",
] as const;
export type PriceRangeOption = (typeof PRICE_RANGE_OPTIONS)[number];

export const SORT_OPTIONS = [
  "Popularity",
  "Conversion Rate",
  "Highest Commission",
  "Lowest Price",
] as const;
export type SortOption = (typeof SORT_OPTIONS)[number];

export type ProductFilters = {
  query: string;
  category: CategoryOption;
  commission: CommissionOption;
  priceRange: PriceRangeOption;
  sort: SortOption;
  newOnly: boolean;
};

function matchesPriceRange(price: number, range: PriceRangeOption) {
  switch (range) {
    case "Under ৳1,000":
      return price < 1000;
    case "৳1,000 - ৳3,000":
      return price >= 1000 && price <= 3000;
    case "৳3,000 - ৳5,000":
      return price > 3000 && price <= 5000;
    case "Above ৳5,000":
      return price > 5000;
    default:
      return true; // "Price Range" = no filter
  }
}

// Single source of truth for turning the raw product list into what the
// grid should actually render: search + every dropdown + sort, all in one
// pass so ProductsFilterBar and page.tsx never have to duplicate this logic.
export function filterAndSortProducts(
  products: Product[],
  filters: ProductFilters
): Product[] {
  const minCommission =
    filters.commission === "15% and above"
      ? 15
      : filters.commission === "10% and above"
      ? 10
      : 0;

  const filtered = products.filter((product) => {
    const matchesQuery = product.name
      .toLowerCase()
      .includes(filters.query.trim().toLowerCase());
    const matchesCategory =
      filters.category === "All Categories" ||
      product.category === filters.category;
    const matchesCommission = product.commissionPercent >= minCommission;
    const matchesPrice = matchesPriceRange(product.price, filters.priceRange);
    const matchesNew = !filters.newOnly || product.isNew === true;

    return (
      matchesQuery &&
      matchesCategory &&
      matchesCommission &&
      matchesPrice &&
      matchesNew
    );
  });

  return [...filtered].sort((a, b) => {
    switch (filters.sort) {
      case "Conversion Rate":
        return b.conversionPercent - a.conversionPercent;
      case "Highest Commission":
        return b.commissionPercent - a.commissionPercent;
      case "Lowest Price":
        return a.price - b.price;
      default:
        return b.affiliatesCount - a.affiliatesCount; // Popularity
    }
  });
}
