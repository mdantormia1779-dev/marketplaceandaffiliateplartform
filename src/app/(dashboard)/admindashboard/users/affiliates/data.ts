import { Share2, UserCheck, DollarSign, Activity } from "lucide-react";
import type { Affiliate, Stat } from "./types";

export const stats: Stat[] = [
  { label: "Affiliate Users", value: "412", change: "7.6%", note: "vs last month", icon: Share2, iconBg: "bg-amber-100", iconColor: "text-amber-600" },
  { label: "Active", value: "368", change: "5.1%", note: "vs last month", icon: UserCheck, iconBg: "bg-emerald-100", iconColor: "text-emerald-600" },
  { label: "Total Payouts", value: "$184,920", change: "9.4%", note: "vs last month", icon: DollarSign, iconBg: "bg-slate-100", iconColor: "text-slate-600" },
  { label: "Pending Approval", value: "24", change: "3.3%", note: "needs review", icon: Activity, iconBg: "bg-slate-100", iconColor: "text-slate-600" },
];

export const affiliates: Affiliate[] = [
  { id: 1, name: "Jordan Blake", email: "jordan.blake@mail.com", code: "JORDAN15", referrals: 412, earnings: 18420, status: "Active", joined: "2022-08-14" },
  { id: 2, name: "Nina Foster", email: "nina.foster@mail.com", code: "NINAFIT", referrals: 287, earnings: 12180, status: "Active", joined: "2023-01-05" },
  { id: 3, name: "Carlos Mendez", email: "carlos.mendez@mail.com", code: "CARLOSAV", referrals: 198, earnings: 9640, status: "Active", joined: "2023-02-22" },
  { id: 4, name: "Ava Sinclair", email: "ava.sinclair@mail.com", code: "AVABEAUTY", referrals: 156, earnings: 7320, status: "Pending", joined: "2024-03-11" },
  { id: 5, name: "Louis Grant", email: "louis.grant@mail.com", code: "LOUISGEAR", referrals: 94, earnings: 4510, status: "Active", joined: "2023-06-18" },
  { id: 6, name: "Farah Aziz", email: "farah.aziz@mail.com", code: "FARAHDECOR", referrals: 63, earnings: 2980, status: "Suspended", joined: "2023-09-27" },
  { id: 7, name: "Marco Silva", email: "marco.silva@mail.com", code: "MARCOLUX", referrals: 221, earnings: 10760, status: "Active", joined: "2022-11-09" },
  { id: 8, name: "Zoey Turner", email: "zoey.turner@mail.com", code: "ZOEYKIDS", referrals: 134, earnings: 6140, status: "Active", joined: "2023-04-30" },
  { id: 9, name: "Ravi Sharma", email: "ravi.sharma@mail.com", code: "RAVITECH", referrals: 302, earnings: 14890, status: "Active", joined: "2022-07-21" },
  { id: 10, name: "Ella Novak", email: "ella.novak@mail.com", code: "ELLAHOME", referrals: 47, earnings: 1860, status: "Pending", joined: "2024-05-14" },
  { id: 11, name: "Omar Hassan", email: "omar.hassan@mail.com", code: "OMARTECH", referrals: 175, earnings: 8210, status: "Active", joined: "2023-03-08" },
  { id: 12, name: "Priya Nair", email: "priya.nair@mail.com", code: "PRIYASTYLE", referrals: 243, earnings: 11430, status: "Active", joined: "2022-12-19" },
  { id: 13, name: "Lucas Weber", email: "lucas.weber@mail.com", code: "LUCASFIT", referrals: 88, earnings: 3970, status: "Suspended", joined: "2023-07-25" },
  { id: 14, name: "Sara Khan", email: "sara.khan@mail.com", code: "SARAGLOW", referrals: 129, earnings: 5890, status: "Active", joined: "2023-05-02" },
  { id: 15, name: "Tom Bennett", email: "tom.bennett@mail.com", code: "TOMGEAR", referrals: 36, earnings: 1420, status: "Pending", joined: "2024-06-03" },
  { id: 16, name: "Mei Lin", email: "mei.lin@mail.com", code: "MEISHOP", referrals: 264, earnings: 12950, status: "Active", joined: "2022-09-16" },
  { id: 17, name: "Daniel Cruz", email: "daniel.cruz@mail.com", code: "DANCRUZ", referrals: 112, earnings: 5230, status: "Active", joined: "2023-08-11" },
  { id: 18, name: "Isla Murphy", email: "isla.murphy@mail.com", code: "ISLAHOME", referrals: 71, earnings: 3150, status: "Active", joined: "2023-10-04" },
  { id: 19, name: "Kenji Mori", email: "kenji.mori@mail.com", code: "KENJITECH", referrals: 198, earnings: 9380, status: "Active", joined: "2022-10-28" },
  { id: 20, name: "Fatima Noor", email: "fatima.noor@mail.com", code: "FATIMADECOR", referrals: 54, earnings: 2240, status: "Pending", joined: "2024-04-09" },
  { id: 21, name: "Ben Carter", email: "ben.carter@mail.com", code: "BENFIT", referrals: 149, earnings: 6870, status: "Active", joined: "2023-02-13" },
  { id: 22, name: "Lena Fischer", email: "lena.fischer@mail.com", code: "LENABEAUTY", referrals: 207, earnings: 9910, status: "Active", joined: "2022-11-30" },
  { id: 23, name: "Raj Patel", email: "raj.patel@mail.com", code: "RAJDEALS", referrals: 25, earnings: 980, status: "Suspended", joined: "2024-01-17" },
  { id: 24, name: "Grace Liu", email: "grace.liu@mail.com", code: "GRACEKIDS", referrals: 183, earnings: 8540, status: "Active", joined: "2023-06-06" },
];