import { Order, OrderItem, OrderStatus, PaymentStatus } from "./types";

const mk = (
  num: number, date: string, name: string, supplier: string, amount: number,
  status: OrderStatus, payment: PaymentStatus,
  affiliate?: [string, string], items?: OrderItem[]
): Order => ({
  id: `ORD-${num}`,
  date, supplier, amount, status, payment,
  method: "Credit card",
  transaction: `TXN-${num}`,
  customer: {
    name,
    email: `${name.toLowerCase().replace(" ", ".")}@mail.com`,
    address: "412 Mission St, San Francisco, CA 94105, US",
  },
  affiliate: affiliate ? { name: affiliate[0], code: affiliate[1] } : undefined,
  items: items ?? [{ name: `${supplier} Bestseller`, sku: `SKU-${num}`, qty: 1, price: amount }],
});

export const initialOrders: Order[] = [
  mk(48219, "2024-06-19", "Noah Patel", "Northline Audio", 258, "Pending", "Paid", ["Jordan Blake", "JORDAN15"], [
    { name: "Aurora Wireless Earbuds", sku: "NL-AWE-001", qty: 1, price: 129 },
    { name: "Nimbus Noise Cancelling Headphones", sku: "NL-NCH-014", qty: 1, price: 129 },
  ]),
  mk(48218, "2024-06-19", "Emma Lawson", "Urban Fitwear", 102, "Processing", "Paid", ["Nina Foster", "NINAFIT"]),
  mk(48217, "2024-06-18", "Liam Schmidt", "Lumen Home", 178, "Shipped", "Paid"),
  mk(48216, "2024-06-18", "Aiko Tanaka", "Bloom Beauty", 84, "Delivered", "Paid", ["Ava Sinclair", "AVABEAUTY"]),
  mk(48215, "2024-06-17", "Sofia Rossi", "Northline Audio", 149, "Delivered", "Paid"),
  mk(48214, "2024-06-17", "Lucas Meyer", "Urban Fitwear", 76, "Cancelled", "Refunded"),
  mk(48213, "2024-06-16", "Olivia Brown", "Lumen Home", 215, "Shipped", "Paid", ["Jordan Blake", "JORDAN15"]),
  mk(48212, "2024-06-16", "Ethan Wright", "Bloom Beauty", 63, "Pending", "Unpaid"),
  mk(48211, "2024-06-15", "Mia Chen", "Northline Audio", 329, "Delivered", "Paid", ["Nina Foster", "NINAFIT"]),
  mk(48210, "2024-06-15", "Noel Garcia", "Lumen Home", 92, "Processing", "Paid"),
  mk(48209, "2024-06-14", "Zara Khan", "Urban Fitwear", 118, "Delivered", "Paid"),
  mk(48208, "2024-06-14", "Henry Adams", "Bloom Beauty", 57, "Delivered", "Refunded", ["Ava Sinclair", "AVABEAUTY"]),
  mk(48207, "2024-06-13", "Chloe Martin", "Northline Audio", 199, "Shipped", "Paid"),
  mk(48206, "2024-06-13", "Daniel Kim", "Lumen Home", 134, "Pending", "Paid"),
  mk(48205, "2024-06-12", "Isla Novak", "Urban Fitwear", 88, "Delivered", "Paid"),
  mk(48204, "2024-06-12", "Omar Ali", "Bloom Beauty", 71, "Cancelled", "Refunded"),
];