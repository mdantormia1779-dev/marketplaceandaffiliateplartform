import { Brand } from "./types";

export const INITIAL_BRANDS: Brand[] = [
  { id: "1", name: "Northline", company: "Northline Audio", products: 148, status: "Active", created: "2022-03-11" },
  { id: "2", name: "UrbanFit", company: "Urban Fitwear", products: 92, status: "Active", created: "2022-06-24" },
  { id: "3", name: "Lumen", company: "Lumen Home", products: 210, status: "Active", created: "2021-11-30" },
  { id: "4", name: "Peak", company: "Peak Outdoors", products: 64, status: "Pending", created: "2024-04-12" },
  { id: "5", name: "Zest", company: "Zest Kitchen", products: 133, status: "Active", created: "2022-09-08" },
  { id: "6", name: "PixelCraft", company: "Pixel Craft", products: 47, status: "Suspended", created: "2023-01-19" },
  { id: "7", name: "Aroma", company: "Aroma World", products: 88, status: "Active", created: "2023-03-27" },
  { id: "8", name: "Titan", company: "Titan Tools", products: 176, status: "Active", created: "2021-07-15" },
  { id: "9", name: "Vertex", company: "Vertex Sports", products: 187, status: "Active", created: "2022-02-02" },
  { id: "10", name: "Orbit", company: "Orbit Electronics", products: 137, status: "Active", created: "2023-08-21" },
];

// trend badge gulo (pore API theke nibi)
export const TRENDS = {
  total: { text: "1", up: true, label: "registered" },
  active: { text: "1", up: true, label: "live now" },
  pending: { text: "1", up: true, label: "awaiting review" },
  products: { text: "4.8%", up: true, label: "vs last month" },
};