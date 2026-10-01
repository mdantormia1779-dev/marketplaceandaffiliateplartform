import { UserCog, Activity, ShieldCheck, UserX } from "lucide-react";
import type { Staff, Stat } from "./types";

export const stats: Stat[] = [
  { label: "Team Members", value: "8", change: "0%", note: "total staff", up: true, icon: UserCog, iconBg: "bg-emerald-100", iconColor: "text-emerald-600" },
  { label: "Active Now", value: "5", change: "2", note: "online today", up: true, icon: Activity, iconBg: "bg-slate-100", iconColor: "text-slate-600" },
  { label: "Departments", value: "6", change: "1", note: "across teams", up: true, icon: ShieldCheck, iconBg: "bg-amber-100", iconColor: "text-amber-600" },
  { label: "Inactive", value: "2", change: "1", note: "needs review", up: false, icon: UserX, iconBg: "bg-slate-100", iconColor: "text-slate-600" },
];

export const staff: Staff[] = [
  { id: 1, name: "Ava Reyes", email: "ava.reyes@vendora.io", role: "Platform Owner", department: "Executive", lastActive: "2 minutes ago", status: "Active" },
  { id: 2, name: "Daniel Cole", email: "daniel.cole@vendora.io", role: "Operations Lead", department: "Operations", lastActive: "18 minutes ago", status: "Active" },
  { id: 3, name: "Priya Menon", email: "priya.menon@vendora.io", role: "Marketplace Manager", department: "Catalog", lastActive: "1 hour ago", status: "Active" },
  { id: 4, name: "Tobias Frank", email: "tobias.frank@vendora.io", role: "Affiliate Manager", department: "Growth", lastActive: "3 hours ago", status: "Active" },
  { id: 5, name: "Sara Lindqvist", email: "sara.l@vendora.io", role: "Support Supervisor", department: "Support", lastActive: "Yesterday", status: "Active" },
  { id: 6, name: "Jamal Wright", email: "jamal.wright@vendora.io", role: "Finance Analyst", department: "Finance", lastActive: "4 days ago", status: "Inactive" },
  { id: 7, name: "Mei Lin", email: "mei.lin@vendora.io", role: "Content Moderator", department: "Trust & Safety", lastActive: "26 minutes ago", status: "Active" },
  { id: 8, name: "Oscar Diaz", email: "oscar.diaz@vendora.io", role: "Logistics Coordinator", department: "Operations", lastActive: "2 days ago", status: "Suspended" },
];