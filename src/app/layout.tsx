import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import FloatingCartBar from "@/components/FloatingCartBar";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Toko Madura | Marketplace Katalog Lengkap 24 Jam",
  description: "Marketplace katalog sembako, rokok, dan kebutuhan harian terlengkap khas Toko Madura.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-full flex flex-col bg-gray-50 text-gray-900`}>
        <CartProvider>
          <Suspense fallback={<div className="h-16 bg-white border-b border-gray-100" />}>
            <Navbar />
          </Suspense>
          <main className="flex-1 py-4 sm:py-6">
            {children}
          </main>
          <footer className="bg-white border-t border-gray-100 py-8">
            <div className="container mx-auto px-4 text-center">
              <p className="text-gray-500 text-sm">
                © 2026 Toko Madura Nusantara. Selalu Ada, Selalu Lengkap.
              </p>
            </div>
          </footer>
          <FloatingCartBar />
        </CartProvider>
      </body>
    </html>
  );
}
