import type { Metadata, Viewport } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { SearchProvider } from "@/context/SearchContext";
import { CurrencyProvider } from "@/context/CurrencyContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { SearchModal } from "@/components/SearchModal";

export const metadata: Metadata = {
  title: "Wallpapers – Moraine Studio",
  description: "Moraine Studio — The premium digital product marketplace.",
  openGraph: {
    title: "Wallpapers – Moraine Studio",
    description: "Moraine Studio",
    url: "https://morainestudio.com/collections/wallpapers",
    siteName: "Moraine Studio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wallpapers – Moraine Studio",
    description: "Moraine Studio",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-white text-neutral-800 antialiased">
        <CurrencyProvider>
          <CartProvider>
            <SearchProvider>
              {/* Navigation Header */}
              <Header />

              {/* Main Content */}
              <main className="flex-1 w-full">{children}</main>

              {/* Footer */}
              <Footer />

              {/* Cart Drawer */}
              <CartDrawer />

              {/* Search Modal */}
              <SearchModal />
            </SearchProvider>
          </CartProvider>
        </CurrencyProvider>
      </body>
    </html>
  );
}
