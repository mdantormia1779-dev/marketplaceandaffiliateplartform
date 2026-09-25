"use client";

import { usePathname } from "next/navigation";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // supplierdashboard ba affiliatedashboard hole navbar/footer hide hobe
  const isDashboard = 
    pathname?.startsWith("/supplierdashboard") || 
    pathname?.startsWith("/affiliatedashboard");

  return (
    <>
      {!isDashboard && <Navbar />}
      <main className="flex-1">{children}</main>
      {!isDashboard && <Footer />}
    </>
  );
}