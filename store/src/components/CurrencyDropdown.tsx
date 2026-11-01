"use client";

import React, { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { useCurrency } from "@/context/CurrencyContext";
import { CurrencyItem } from "@/data/currencies";
import { Search, XCircle } from "lucide-react";

interface CurrencyDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  anchorRef: React.RefObject<HTMLButtonElement>;
}

export function CurrencyDropdown({ isOpen, onClose, anchorRef }: CurrencyDropdownProps) {
  const { selectedCurrency, setCurrency, allCurrencies } = useCurrency();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filter currencies by country name (primary), then by code/name as fallback
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allCurrencies;
    return allCurrencies.filter(
      (c) =>
        c.country.toLowerCase().includes(q) ||
        c.code.toLowerCase().includes(q) ||
        c.name.toLowerCase().includes(q)
    );
  }, [query, allCurrencies]);

  // Focus input & reset query when opened
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [isOpen]);

  // Close on ESC
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Close on click outside (excluding the anchor button)
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(target) &&
        anchorRef.current &&
        !anchorRef.current.contains(target)
      ) {
        onClose();
      }
    };
    const id = setTimeout(() => {
      document.addEventListener("mousedown", handleClickOutside);
    }, 0);
    return () => {
      clearTimeout(id);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose, anchorRef]);

  const handleSelect = useCallback(
    (currency: CurrencyItem) => {
      setCurrency(currency, true);
      onClose();
    },
    [setCurrency, onClose]
  );

  /**
   * Country name highlighting:
   * As typed, matching characters become UN-BOLD and lighter (text-neutral-400),
   * while the remaining untyped characters stay BOLD (font-semibold text-neutral-800).
   * When there's no query, active country is bold, others are regular.
   */
  const renderCountryName = (country: string, isSelected: boolean) => {
    const q = query.trim();
    if (!q) {
      return (
        <span className={isSelected ? "font-semibold text-black" : "font-normal text-neutral-700"}>
          {country}
        </span>
      );
    }

    const idx = country.toLowerCase().indexOf(q.toLowerCase());
    if (idx === -1) {
      return (
        <span className={isSelected ? "font-semibold text-black" : "font-normal text-neutral-700"}>
          {country}
        </span>
      );
    }

    const before = country.slice(0, idx);
    const match = country.slice(idx, idx + q.length);
    const after = country.slice(idx + q.length);

    return (
      <span className="truncate">
        {before && <span className="font-semibold text-neutral-800">{before}</span>}
        <span className="font-normal text-neutral-400">{match}</span>
        {after && <span className="font-semibold text-neutral-800">{after}</span>}
      </span>
    );
  };

  /**
   * Format currency code & symbol (e.g. "IDR Rp", "USD $", "EUR €", "INR Rs.")
   */
  const getCurrencyLabel = (c: CurrencyItem) => {
    const sym = c.symbol.trim();
    if (sym.startsWith(c.code)) {
      return sym;
    }
    return `${c.code} ${sym}`;
  };

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute top-full right-0 mt-2.5 w-[360px] max-w-[calc(100vw-24px)] bg-white rounded-2xl shadow-2xl border border-neutral-200/90 z-50 overflow-hidden"
      role="listbox"
      aria-label="Select country and currency"
    >
      {/* Search Input Box */}
      <div className="p-3 pb-1.5">
        <div className="flex items-center border border-neutral-800 rounded-lg px-3 py-2 bg-white">
          <Search className="w-4 h-4 text-neutral-500 shrink-0 mr-2.5 stroke-[1.75]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-[14px] text-black placeholder-neutral-400 focus:outline-none"
            aria-label="Search countries"
          />
          {query && (
            <button
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
              className="shrink-0 text-neutral-700 hover:text-black transition-colors ml-1.5"
              aria-label="Clear search"
            >
              <XCircle className="w-[18px] h-[18px] stroke-[1.5]" />
            </button>
          )}
        </div>
      </div>

      {/* Results List — inset with margins so hover pill never fills full rectangle */}
      <div className="px-2 py-1.5 max-h-[260px] overflow-y-auto scrollbar-hide flex flex-col gap-0.5">
        {filtered.length === 0 ? (
          <p className="px-5 py-4 text-[13px] text-neutral-400 text-center">
            No countries found.
          </p>
        ) : (
          filtered.map((c) => {
            const isSelected = selectedCurrency.id === c.id;
            return (
              <button
                key={c.id}
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelect(c)}
                className="w-full text-left px-3.5 py-2.5 text-[14px] rounded-xl transition-colors flex items-center justify-between group hover:bg-[#f3f3f3]"
              >
                {/* Country Name with dynamic un-bold typed match */}
                <div className="min-w-0 pr-2">
                  {renderCountryName(c.country, isSelected)}
                </div>

                {/* Currency Code & Symbol (e.g. "IDR Rp", "USD $") — revealed on hover */}
                <span className="shrink-0 text-[13.5px] font-normal text-neutral-400 group-hover:text-neutral-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  {getCurrencyLabel(c)}
                </span>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
