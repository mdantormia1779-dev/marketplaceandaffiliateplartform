import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en"
    data-theme="light">
      <body className="flex flex-col min-h-screen">
        {/* টপে Navbar শো করবে */}
        <Navbar />
        
        {/* পেজের মূল কনটেন্ট */}
        <main className="flex-1">{children}</main>
        
        {/* বটমে Footer শো করবে */}
        <Footer />
      </body>
    </html>
  );
}