import type { Order } from "./types";

// Replace with data fetched from your API layer / database
export const ORDERS: Order[] = [
  {
    id: "o1",
    orderNumber: "ORD-10245",
    customerName: "Farhana Akter",
    customerPhone: "+8801711223344",
    shippingAddress: "House 12, Road 4, Mirpur, Dhaka",
    items: [
      { productId: "p1", productName: "Wireless ANC Headphones", quantity: 1, price: 3200 },
    ],
    status: "new",
    paymentStatus: "paid",
    paymentMethod: "online",
    createdAt: "2026-09-20T10:15:00Z",
  },
  {
    id: "o2",
    orderNumber: "ORD-10244",
    customerName: "Tanvir Hasan",
    customerPhone: "+8801812345678",
    shippingAddress: "Flat 3B, Green Road, Dhaka",
    items: [
      { productId: "p2", productName: "Smart Fitness Band", quantity: 2, price: 1500 },
      { productId: "p3", productName: "Portable Blender", quantity: 1, price: 1800 },
    ],
    status: "processing",
    paymentStatus: "paid",
    paymentMethod: "mobile_banking",
    createdAt: "2026-09-19T14:40:00Z",
  },
  {
    id: "o3",
    orderNumber: "ORD-10240",
    customerName: "Mst. Sultana Razia",
    customerPhone: "+8801911002233",
    shippingAddress: "Uposhohor, Rajshahi",
    items: [
      { productId: "p3", productName: "Portable Blender", quantity: 1, price: 1800 },
    ],
    status: "shipped",
    paymentStatus: "paid",
    paymentMethod: "cod",
    createdAt: "2026-09-17T09:05:00Z",
  },
  {
    id: "o4",
    orderNumber: "ORD-10231",
    customerName: "Rakibul Islam",
    customerPhone: "+8801611998877",
    shippingAddress: "Sadar, Bogura",
    items: [
      { productId: "p1", productName: "Wireless ANC Headphones", quantity: 1, price: 3200 },
      { productId: "p2", productName: "Smart Fitness Band", quantity: 1, price: 1500 },
    ],
    status: "delivered",
    paymentStatus: "paid",
    paymentMethod: "card",
    createdAt: "2026-09-12T11:20:00Z",
  },
  {
    id: "o5",
    orderNumber: "ORD-10228",
    customerName: "Nusrat Jahan",
    customerPhone: "+8801555667788",
    shippingAddress: "Shaheb Bazar, Rajshahi",
    items: [
      { productId: "p2", productName: "Smart Fitness Band", quantity: 1, price: 1500 },
    ],
    status: "cancelled",
    paymentStatus: "refunded",
    paymentMethod: "cod",
    createdAt: "2026-09-10T16:00:00Z",
  },
];