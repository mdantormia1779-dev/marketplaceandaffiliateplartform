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

  // dashboard route হলে navbar/footer hide হবে
  const isDashboard = pathname?.startsWith("/supplierdashboard");

  return (
    <>
      {!isDashboard && <Navbar />}
      <main className="flex-1">{children}</main>
      {!isDashboard && <Footer />}
    </>
  );
}