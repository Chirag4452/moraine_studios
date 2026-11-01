"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { X, ChevronDown } from "lucide-react";
import { useCurrency } from "@/context/CurrencyContext";
import { CurrencyDropdown } from "./CurrencyDropdown";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/collections/all", label: "All Products" },
  { href: "/collections/wallpapers", label: "Wallpapers" },
  { href: "/collections/presets", label: "Presets" },
  { href: "/design-language", label: "Design Language" },
  { href: "/contact", label: "Contact" },
];

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { selectedCurrency } = useCurrency();
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const currencyBtnRef = useRef<HTMLButtonElement>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-white shadow-2xl flex flex-col p-6">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-neutral-200">
            <div className="flex items-center gap-2">
              <div className="w-[20px] h-[20px] rounded-full bg-black flex items-center justify-center">
                <div className="w-[9px] h-[9px] rounded-full border-2 border-white" />
              </div>
              <span className="font-bold text-[14px] tracking-[0.04em] text-black">
                MORAINE STUDIO
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-black"
              aria-label="Close menu"
            >
              <X className="w-5 h-5 stroke-[1.5]" />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="flex flex-col gap-1 py-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="text-[15px] text-neutral-700 hover:text-black transition-colors py-2.5"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Footer: Currency Selector */}
        <div className="mt-auto pt-6 border-t border-neutral-200 relative">
          <button
            ref={currencyBtnRef}
            onClick={() => setCurrencyOpen(!currencyOpen)}
            className="flex items-center gap-1.5 text-[13px] text-neutral-700 hover:text-black transition-colors"
          >
            <span>{selectedCurrency.code}</span>
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform duration-200 ${
                currencyOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {currencyOpen && (
            <div className="absolute bottom-full left-0 mb-2 w-[280px]">
              <CurrencyDropdown
                isOpen={currencyOpen}
                onClose={() => setCurrencyOpen(false)}
                anchorRef={currencyBtnRef}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
