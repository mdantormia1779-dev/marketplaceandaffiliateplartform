import { Review, ReviewStatus } from "./types";

export const INITIAL_REVIEWS: Review[] = [
  { id: "1", title: "Crystal clear sound", product: "Aurora Wireless Earbuds", customer: "Noah Patel", rating: 5, status: "Pending", date: "2024-06-16" },
  { id: "2", title: "Great fit, quick delivery", product: "FlexCore Training Tee", customer: "Emma Lawson", rating: 4, status: "Approved", date: "2024-06-14" },
  { id: "3", title: "One plate arrived chipped", product: "Terra Ceramic Dinner Set", customer: "Liam Schmidt", rating: 2, status: "Pending", date: "2024-06-13" },
  { id: "4", title: "Best skillet I own", product: 'Zest Cast Iron Skillet 12"', customer: "Sofia Rossi", rating: 5, status: "Approved", date: "2024-06-11" },
  { id: "5", title: "Skin feels amazing", product: "Glow Vitamin C Serum", customer: "Aiko Tanaka", rating: 5, status: "Approved", date: "2024-06-10" },
  { id: "6", title: "Stopped working in a week", product: "Pixel Pro Mechanical Keyboard", customer: "Lucas Martin", rating: 1, status: "Hidden", date: "2024-06-08" },
  { id: "7", title: "Powerful and reliable", product: "Titan Impact Drill Kit", customer: "Olivia Brown", rating: 5, status: "Approved", date: "2024-06-06" },
  { id: "8", title: "Good value for money", product: "Cosmo Smart Fitness Band", customer: "Ethan Kim", rating: 4, status: "Pending", date: "2024-06-05" },
];

// Screenshot er total gulo (list e shob review nai, tai offset diye mil kora)
const TARGET: Record<ReviewStatus, number> = { Pending: 8, Approved: 12240, Hidden: 238 };
const initialCount = (s: ReviewStatus) => INITIAL_REVIEWS.filter((r) => r.status === s).length;

export const BASE_OFFSET: Record<ReviewStatus, number> = {
  Pending: TARGET.Pending - initialCount("Pending"),
  Approved: TARGET.Approved - initialCount("Approved"),
  Hidden: TARGET.Hidden - initialCount("Hidden"),
};

// trend badge gulo (pore API theke nibi)
export const TRENDS = {
  total: { text: "6.1%", up: true, label: "vs last month" },
  pending: { text: "2", up: true, label: "awaiting moderation" },
  approved: { text: "6.4%", up: true, label: "published" },
  hidden: { text: "1.2%", up: false, label: "flagged" },
};