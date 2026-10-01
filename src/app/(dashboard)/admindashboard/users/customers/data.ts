import { Users, UserCheck, Repeat, UserX } from "lucide-react";
import type { Customer, Stat } from "./types";

export const stats: Stat[] = [
  { label: "Total Customers", value: "9,842", change: "4.1%", up: true, icon: Users, iconBg: "bg-emerald-100", iconColor: "text-emerald-600" },
  { label: "Active", value: "9,118", change: "3.2%", up: true, icon: UserCheck, iconBg: "bg-slate-100", iconColor: "text-slate-600" },
  { label: "Repeat Buyers", value: "3,240", change: "6.8%", up: true, icon: Repeat, iconBg: "bg-amber-100", iconColor: "text-amber-600" },
  { label: "Suspended", value: "128", change: "1.1%", up: false, icon: UserX, iconBg: "bg-slate-100", iconColor: "text-slate-600" },
];

export const customers: Customer[] = [
  { id: 1, name: "Noah Patel", email: "noah.patel@mail.com", phone: "+1 415 220 1187", country: "United States", orders: 34, totalSpent: 12480, status: "Active", joined: "2023-02-14" },
  { id: 2, name: "Emma Lawson", email: "emma.lawson@mail.com", phone: "+44 20 7946 0312", country: "United Kingdom", orders: 21, totalSpent: 7940.5, status: "Active", joined: "2023-03-02" },
  { id: 3, name: "Liam Schmidt", email: "liam.schmidt@mail.com", phone: "+49 30 1234 8890", country: "Germany", orders: 12, totalSpent: 3120.75, status: "Active", joined: "2023-04-19" },
  { id: 4, name: "Sofia Rossi", email: "sofia.rossi@mail.com", phone: "+39 06 6982 4431", country: "Italy", orders: 6, totalSpent: 1460, status: "Pending", joined: "2024-01-08" },
  { id: 5, name: "Aiko Tanaka", email: "aiko.tanaka@mail.com", phone: "+81 3 6205 7723", country: "Japan", orders: 29, totalSpent: 9880.2, status: "Active", joined: "2022-11-27" },
  { id: 6, name: "Lucas Martin", email: "lucas.martin@mail.com", phone: "+33 1 42 68 5521", country: "France", orders: 3, totalSpent: 540, status: "Suspended", joined: "2024-05-30" },
  { id: 7, name: "Olivia Brown", email: "olivia.brown@mail.com", phone: "+61 2 9876 4432", country: "Australia", orders: 18, totalSpent: 6240.9, status: "Active", joined: "2023-07-11" },
  { id: 8, name: "Ethan Kim", email: "ethan.kim@mail.com", phone: "+82 2 555 9911", country: "South Korea", orders: 9, totalSpent: 2780, status: "Active", joined: "2023-09-23" },
  { id: 9, name: "Mia Johnson", email: "mia.johnson@mail.com", phone: "+1 312 555 0148", country: "United States", orders: 25, totalSpent: 8150.3, status: "Active", joined: "2022-12-05" },
  { id: 10, name: "Diego Hernandez", email: "diego.h@mail.com", phone: "+34 91 555 8823", country: "Spain", orders: 4, totalSpent: 890, status: "Pending", joined: "2024-06-17" },
  { id: 11, name: "Chloe Dubois", email: "chloe.dubois@mail.com", phone: "+33 4 72 10 2233", country: "France", orders: 15, totalSpent: 4310.4, status: "Active", joined: "2023-10-09" },
  { id: 12, name: "Arjun Mehta", email: "arjun.mehta@mail.com", phone: "+91 22 5550 1234", country: "India", orders: 22, totalSpent: 5620, status: "Active", joined: "2023-01-21" },
  { id: 13, name: "Hannah Muller", email: "hannah.muller@mail.com", phone: "+49 89 5550 7788", country: "Germany", orders: 7, totalSpent: 1980.6, status: "Suspended", joined: "2024-03-12" },
  { id: 14, name: "Yuki Sato", email: "yuki.sato@mail.com", phone: "+81 6 5550 4321", country: "Japan", orders: 11, totalSpent: 3340, status: "Active", joined: "2023-08-30" },
];