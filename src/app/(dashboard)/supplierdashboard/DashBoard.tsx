"use client";

import StoreBanner from "./components/StoreBanner";
import AnalyticsOverview from "./components/AnalyticsOverview";
import Navbar from "./components/Navbar";

// Define and export the Product interface here
export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  salesCount: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  image: string;
}

const DashBoard = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans">
      {/* Navbar */}
      <Navbar />

      {/* Dashboard Content */}
      <main className="p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Store Banner */}
        <StoreBanner />

        {/* Analytics Overview */}
        <AnalyticsOverview />
      </main>
    </div>
  );
};

export default DashBoard;