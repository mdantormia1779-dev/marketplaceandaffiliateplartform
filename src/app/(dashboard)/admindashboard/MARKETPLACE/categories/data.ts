import { Category } from "./types";

export const INITIAL_CATEGORIES: Category[] = [
  { id: "1", name: "Audio", slug: "audio", products: 214, status: "Active", created: "2021-06-01" },
  { id: "2", name: "Electronics", slug: "electronics", products: 486, status: "Active", created: "2021-06-01" },
  { id: "3", name: "Apparel", slug: "apparel", products: 372, status: "Active", created: "2021-06-01" },
  { id: "4", name: "Home & Kitchen", slug: "home-kitchen", products: 528, status: "Active", created: "2021-07-14" },
  { id: "5", name: "Beauty", slug: "beauty", products: 261, status: "Active", created: "2021-08-22" },
  { id: "6", name: "Outdoor", slug: "outdoor", products: 143, status: "Active", created: "2022-01-09" },
  { id: "7", name: "Tools", slug: "tools", products: 198, status: "Active", created: "2022-03-18" },
  { id: "8", name: "Toys & Games", slug: "toys-games", products: 87, status: "Inactive", created: "2022-05-30" },
  { id: "9", name: "Sports & Fitness", slug: "sports-fitness", products: 612, status: "Active", created: "2022-08-11" },
  { id: "10", name: "Stationery", slug: "stationery", products: 383, status: "Inactive", created: "2022-10-03" },
];

// trend badge gulo (pore API theke nibi)
export const TRENDS = {
  total: { text: "0%", up: true, label: "across catalog" },
  active: { text: "2", up: true, label: "visible" },
  inactive: { text: "1", up: false, label: "hidden" },
  products: { text: "5.2%", up: true, label: "vs last month" },
};