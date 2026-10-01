import { Product } from "./types";

export const INITIAL_PRODUCTS: Product[] = [
  { id: "1", name: "Aurora Wireless Earbuds", sku: "NL-AWE-001", category: "Audio", supplier: "Northline Audio", price: 129, stock: 342, status: "Approved", submitted: "2024-06-01" },
  { id: "2", name: "Nimbus Noise Cancelling Headphones", sku: "NL-NCH-014", category: "Audio", supplier: "Northline Audio", price: 249, stock: 128, status: "Approved", submitted: "2024-06-04" },
  { id: "3", name: "FlexCore Training Tee", sku: "UF-FCT-220", category: "Apparel", supplier: "Urban Fitwear", price: 34, stock: 890, status: "Approved", submitted: "2024-06-07" },
  { id: "4", name: "Terra Ceramic Dinner Set", sku: "LH-TCD-018", category: "Home & Kitchen", supplier: "Lumen Home", price: 89, stock: 74, status: "Pending", submitted: "2024-06-12" },
  { id: "5", name: "Summit 40L Hiking Backpack", sku: "PO-SHB-040", category: "Outdoor", supplier: "Peak Outdoors", price: 158, stock: 56, status: "Pending", submitted: "2024-06-14" },
  { id: "6", name: 'Zest Cast Iron Skillet 12"', sku: "ZK-CIS-012", category: "Home & Kitchen", supplier: "Zest Kitchen", price: 62, stock: 213, status: "Approved", submitted: "2024-05-22" },
  { id: "7", name: "Pixel Pro Mechanical Keyboard", sku: "PC-MKB-075", category: "Electronics", supplier: "Pixel Craft", price: 119, stock: 0, status: "Rejected", submitted: "2024-05-30" },
  { id: "8", name: "Amber Oud Eau de Parfum", sku: "AW-AOP-050", category: "Beauty", supplier: "Aroma World", price: 96, stock: 305, status: "Approved", submitted: "2024-05-18" },
];

// "vs last month" trends (pore API theke nibi)
export const TRENDS = {
  total: { value: 5.2, up: true, label: "vs last month" },
  pending: { value: 4.4, up: true, label: "needs moderation" },
  approved: { value: 5.6, up: true, label: "vs last month" },
  rejected: { value: 2.1, up: false, label: "vs last month" },
};

