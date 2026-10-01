import React from "react";
import ConditionalLayout from "./ConditionalLayout";
import "./globals.css";
import { ToastContainer } from "react-toastify";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light">
      <body className="flex flex-col min-h-screen">
        <ConditionalLayout>{children}</ConditionalLayout>
        <ToastContainer position="top-right" autoClose={3000} />
      </body>
    </html>
  );
}