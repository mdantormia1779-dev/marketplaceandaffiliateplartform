import { Featured, Placement } from "./types";

// Screenshot er sathe mil rakhar jonno fixed "aaj" er tarikh.
// Real project e: export const TODAY = new Date().toISOString().slice(0, 10);
export const TODAY = "2024-06-17";

export const PLACEMENTS: Placement[] = ["Home Hero", "Category Top", "Deals Banner"];

export const INITIAL_FEATURED: Featured[] = [
  { id: "1", product: "Aurora Wireless Earbuds", supplier: "Northline Audio", placement: "Home Hero", start: "2024-06-01", end: "2024-06-30" },
  { id: "2", product: "Glow Vitamin C Serum", supplier: "Bloom Beauty", placement: "Category Top", start: "2024-06-05", end: "2024-07-05" },
  { id: "3", product: "Titan Impact Drill Kit", supplier: "Titan Tools", placement: "Deals Banner", start: "2024-06-10", end: "2024-06-24" },
  { id: "4", product: "Cosmo Smart Fitness Band", supplier: "Cosmo Gadgets", placement: "Home Hero", start: "2024-07-01", end: "2024-07-31" },
  { id: "5", product: "Fern Linen Throw Blanket", supplier: "Fern & Fig", placement: "Category Top", start: "2024-05-15", end: "2024-06-15" },
  { id: "6", product: 'Zest Cast Iron Skillet 12"', supplier: "Zest Kitchen", placement: "Deals Banner", start: "2024-06-18", end: "2024-07-18" },
  { id: "7", product: "Nimbus Noise Cancelling Headphones", supplier: "Northline Audio", placement: "Home Hero", start: "2024-06-20", end: "2024-07-20" },
  { id: "8", product: "Pulse Running Shorts", supplier: "Urban Fitwear", placement: "Category Top", start: "2024-06-02", end: "2024-06-16" },
];

// trend badge gulo (pore API theke nibi)
export const TRENDS = {
  slots: { text: "2", up: true, label: "active placements" },
  active: { text: "1", up: true, label: "live now" },
  scheduled: { text: "2", up: true, label: "upcoming" },
  expired: { text: "1", up: false, label: "last 30 days" },
};