import { Application } from "./types";

// Category dropdown (filter + edit modal) duitar jonno
export const categories = ["Outdoor", "Home & Kitchen", "Beauty", "Tools", "Apparel", "Electronics"];

export const initialApplications: Application[] = [
  { id: 1, store: "Peak Outdoors", owner: "Owen Blake", email: "owen@peakout.com", category: "Outdoor", country: "Canada", submitted: "2024-06-14", status: "Pending" },
  { id: 2, store: "Drift Surf Co", owner: "Kai Makoa", email: "kai@driftsurf.com", category: "Outdoor", country: "Australia", submitted: "2024-06-05", status: "Pending" },
  { id: 3, store: "Nordic Timber", owner: "Freja Lund", email: "freja@nordictimber.no", category: "Home & Kitchen", country: "Norway", submitted: "2024-06-11", status: "Pending" },
  { id: 4, store: "Solstice Skincare", owner: "Maya Kapoor", email: "maya@solstice.in", category: "Beauty", country: "India", submitted: "2024-06-09", status: "Pending" },
  { id: 5, store: "Ironclad Hardware", owner: "Bruno Costa", email: "bruno@ironclad.br", category: "Tools", country: "Brazil", submitted: "2024-06-12", status: "Pending" },
  { id: 6, store: "Cedar & Clay", owner: "Hana Suzuki", email: "hana@cedarclay.jp", category: "Home & Kitchen", country: "Japan", submitted: "2024-06-08", status: "Approved" },
  { id: 7, store: "Velvet Thread", owner: "Amelie Roux", email: "amelie@velvetthread.fr", category: "Apparel", country: "France", submitted: "2024-06-03", status: "Approved" },
  { id: 8, store: "Baseline Sports", owner: "Marek Novak", email: "marek@baselinesports.cz", category: "Apparel", country: "Czechia", submitted: "2024-05-30", status: "Rejected" },
  { id: 9, store: "Glacier Gear", owner: "Sven Eriksson", email: "sven@glaciergear.se", category: "Outdoor", country: "Sweden", submitted: "2024-06-13", status: "Pending" },
  { id: 10, store: "Copper Lane", owner: "Rosa Bianchi", email: "rosa@copperlane.it", category: "Home & Kitchen", country: "Italy", submitted: "2024-05-28", status: "Approved" },
  { id: 11, store: "Maple Audio", owner: "Liam Carter", email: "liam@maplaudio.ca", category: "Electronics", country: "Canada", submitted: "2024-06-10", status: "Pending" },
  { id: 12, store: "Saffron Table", owner: "Aarav Mehta", email: "aarav@saffrontable.in", category: "Home & Kitchen", country: "India", submitted: "2024-06-01", status: "Approved" },
];