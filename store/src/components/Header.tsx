"use client";

import React, { useState, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useSearch } from "@/context/SearchContext";
import { useCurrency } from "@/context/CurrencyContext";
import { MobileMenu } from "./MobileMenu";
import { CurrencyDropdown } from "./CurrencyDropdown";
import { Search, User, ShoppingBag, Menu } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/collections/all", label: "All Products" },
  { href: "/collections/wallpapers", label: "Wallpapers" },
  { href: "/collections/presets", label: "Presets" },
  { href: "/design-language", label: "Design Language" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const { openCart, itemCount } = useCart();
  const { openSearch } = useSearch();
  const { selectedCurrency } = useCurrency();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const currencyBtnRef = useRef<HTMLButtonElement>(null);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname?.startsWith(href);
  };

  const toggleCurrency = useCallback(() => {
    setCurrencyOpen((prev) => !prev);
  }, []);

  const closeCurrency = useCallback(() => {
    setCurrencyOpen(false);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white border-b border-neutral-200">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-10 h-[60px] flex items-center justify-between">
          {/* Left: Logo + Nav */}
          <div className="flex items-center gap-8">
            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-1 -ml-1 text-neutral-800 hover:text-black"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Logo */}
            <Link
              href="/"
              className="flex items-center shrink-0"
              aria-label="Moraine Studio Home"
            >
              <Image
                src="/brand/moraine-studio-header-v1.png"
                alt=""
                width={2172}
                height={724}
                priority
                className="h-9 w-auto object-contain sm:h-10"
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-[13px] transition-colors ${
                    isActive(link.href)
                      ? "text-black font-medium"
                      : "text-neutral-500 hover:text-black"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right: Currency, Search, Account, Cart */}
          <div className="flex items-center gap-4">
            {/* Currency selector — inline dropdown */}
            <div className="relative hidden md:block">
              <button
                ref={currencyBtnRef}
                onClick={toggleCurrency}
                className="flex items-center gap-1 text-[13px] text-neutral-700 hover:text-black transition-colors px-2 py-1 rounded hover:bg-neutral-100"
                title={`${selectedCurrency.name} (${selectedCurrency.symbol.trim()}) — Click to change`}
                aria-label={`Currency: ${selectedCurrency.name} (${selectedCurrency.code})`}
                aria-expanded={currencyOpen}
                aria-haspopup="listbox"
              >
                <span>{selectedCurrency.code}</span>
                <svg
                  className={`w-3 h-3 text-neutral-500 transition-transform duration-200 ${
                    currencyOpen ? "rotate-180" : ""
                  }`}
                  viewBox="0 0 12 12"
                  fill="none"
                >
                  <path
                    d="M3 4.5L6 7.5L9 4.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <CurrencyDropdown
                isOpen={currencyOpen}
                onClose={closeCurrency}
                anchorRef={currencyBtnRef}
              />
            </div>

            {/* Search */}
            <button
              onClick={openSearch}
              className="p-1.5 text-neutral-700 hover:text-black transition-colors"
              aria-label="Search"
            >
              <Search className="w-[18px] h-[18px] stroke-[1.5]" />
            </button>

            {/* Account */}
            <button
              className="p-1.5 text-neutral-700 hover:text-black transition-colors hidden sm:flex"
              aria-label="Account"
            >
              <User className="w-[18px] h-[18px] stroke-[1.5]" />
            </button>

            {/* Cart */}
            <button
              onClick={openCart}
              className="relative p-1.5 text-neutral-700 hover:text-black transition-colors"
              aria-label={`Cart with ${itemCount} items`}
            >
              <ShoppingBag className="w-[18px] h-[18px] stroke-[1.5]" />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-[16px] px-1 bg-black text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}
