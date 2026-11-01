"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import { useCurrency } from "@/context/CurrencyContext";
import { CurrencyItem } from "@/data/currencies";
import { Search, X, Check, Globe, Sparkles, ArrowRight } from "lucide-react";

export function CurrencyModal() {
  const {
    selectedCurrency,
    setCurrency,
    isCurrencyModalOpen,
    closeCurrencyModal,
    isAutoDetected,
    detectedCountry,
    redetectLocation,
    allCurrencies,
  } = useCurrency();

  const [query, setQuery] = useState("");
  const [hoveredCurrency, setHoveredCurrency] = useState<CurrencyItem | null>(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus input when modal opens
  useEffect(() => {
    if (isCurrencyModalOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = "unset";
      setQuery("");
      setHoveredCurrency(null);
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isCurrencyModalOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isCurrencyModalOpen) {
        closeCurrencyModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCurrencyModalOpen, closeCurrencyModal]);

  // Filter currencies by country name, currency name, code, or symbol
  const filteredCurrencies = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allCurrencies;
    return allCurrencies.filter(
      (c) =>
        c.country.toLowerCase().includes(q) ||
        c.name.toLowerCase().includes(q) ||
        c.code.toLowerCase().includes(q) ||
        c.symbol.toLowerCase().includes(q)
    );
  }, [query, allCurrencies]);

  // Popular currencies for quick access
  const popularCurrencies = useMemo(
    () => allCurrencies.filter((c) => c.popular),
    [allCurrencies]
  );

  const handleSelect = (currency: CurrencyItem) => {
    setCurrency(currency, true);
    closeCurrencyModal();
  };

  const handleRedetect = async () => {
    setIsDetecting(true);
    await redetectLocation();
    setIsDetecting(false);
  };

  if (!isCurrencyModalOpen) return null;

  // Active item to display in the bottom preview bar (hovered item takes priority, otherwise selected)
  const previewItem = hoveredCurrency || selectedCurrency;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-12 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={closeCurrencyModal}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl ring-1 ring-black/5 overflow-hidden flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-5 py-4 border-b border-neutral-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-800">
              <Globe className="w-4 h-4 stroke-[1.5]" />
            </div>
            <div>
              <h2 className="text-[15px] font-semibold text-black tracking-tight">
                Select Country & Currency
              </h2>
              <p className="text-[12px] text-neutral-400">
                Prices and checkout will convert to your local currency
              </p>
            </div>
          </div>

          <button
            onClick={closeCurrencyModal}
            className="p-1.5 text-neutral-400 hover:text-black transition-colors rounded-lg hover:bg-neutral-100"
            aria-label="Close currency modal"
          >
            <X className="w-5 h-5 stroke-[1.5]" />
          </button>
        </div>

        {/* Location Detection Banner */}
        <div className="bg-neutral-50 px-5 py-2.5 border-b border-neutral-200 flex items-center justify-between text-[12px]">
          <div className="flex items-center gap-2 text-neutral-600">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>
              {isAutoDetected && detectedCountry ? (
                <>
                  Auto-detected for <strong className="text-black">{detectedCountry}</strong> ({selectedCurrency.code})
                </>
              ) : (
                <>
                  Current preference: <strong className="text-black">{selectedCurrency.country}</strong> ({selectedCurrency.code})
                </>
              )}
            </span>
          </div>

          <button
            onClick={handleRedetect}
            disabled={isDetecting}
            className="text-[11px] font-medium text-neutral-600 hover:text-black flex items-center gap-1.5 transition-colors underline disabled:opacity-50"
          >
            <Sparkles className="w-3 h-3 text-neutral-500" />
            <span>{isDetecting ? "Detecting location..." : "Auto-detect my location"}</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b border-neutral-200 bg-white">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 pointer-events-none" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by country (e.g. United States, Germany) or currency (e.g. USD, Euro, Yen)..."
              className="w-full pl-10 pr-9 py-2.5 bg-neutral-100/70 hover:bg-neutral-100 focus:bg-white text-[13px] text-black placeholder-neutral-400 rounded-lg border border-neutral-200/80 focus:border-black focus:outline-none transition-colors"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 p-1 text-neutral-400 hover:text-black"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Popular Currencies Chips */}
          {!query && (
            <div className="flex items-center gap-1.5 mt-3 overflow-x-auto pb-1 scrollbar-hide">
              <span className="text-[11px] font-medium text-neutral-400 uppercase tracking-wider shrink-0 mr-1">
                Popular:
              </span>
              {popularCurrencies.map((c) => (
                <button
                  key={c.id}
                  onClick={() => handleSelect(c)}
                  onMouseEnter={() => setHoveredCurrency(c)}
                  onMouseLeave={() => setHoveredCurrency(null)}
                  className={`shrink-0 px-2.5 py-1 text-[12px] rounded-full border transition-all flex items-center gap-1.5 ${
                    selectedCurrency.id === c.id
                      ? "bg-black text-white border-black font-medium"
                      : "bg-white text-neutral-700 border-neutral-200 hover:border-black hover:bg-neutral-50"
                  }`}
                >
                  <span>{c.flag}</span>
                  <span className="font-medium">{c.code}</span>
                  <span className="text-[11px] opacity-75">{c.symbol.trim()}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Currency List */}
        <div className="flex-1 overflow-y-auto divide-y divide-neutral-100 p-2">
          {filteredCurrencies.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-[14px] font-medium text-neutral-800">
                No matching countries or currencies
              </p>
              <p className="text-[12px] text-neutral-400 mt-1">
                Try searching for &quot;United States&quot;, &quot;Euro&quot;, or &quot;USD&quot;
              </p>
              <button
                onClick={() => setQuery("")}
                className="mt-3 px-3 py-1.5 text-[12px] bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-md transition-colors"
              >
                Clear search filter
              </button>
            </div>
          ) : (
            filteredCurrencies.map((item) => {
              const isSelected = selectedCurrency.id === item.id;
              const isHovered = hoveredCurrency?.id === item.id;

              return (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setHoveredCurrency(item)}
                  onMouseLeave={() => setHoveredCurrency(null)}
                  className={`group px-3.5 py-2.5 rounded-lg flex items-center justify-between cursor-pointer transition-all ${
                    isSelected
                      ? "bg-neutral-100 font-medium"
                      : isHovered
                      ? "bg-neutral-100/80"
                      : "hover:bg-neutral-50"
                  }`}
                >
                  {/* Left: Flag + Country Name */}
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-xl shrink-0 leading-none" role="img" aria-label={item.country}>
                      {item.flag}
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[13px] text-neutral-900 group-hover:text-black truncate">
                          {item.country}
                        </span>
                        {isSelected && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] bg-black text-white font-medium">
                            Active
                          </span>
                        )}
                      </div>
                      {/* Under-title: Currency name & code */}
                      <p className="text-[11px] text-neutral-400 group-hover:text-neutral-600 transition-colors truncate">
                        {item.name} ({item.code})
                      </p>
                    </div>
                  </div>

                  {/* Right: Code & on-hover Symbol + Full Name preview badge */}
                  <div className="flex items-center gap-2 shrink-0">
                    {/* Hover state badge: clearly exposes currency name and symbol */}
                    <div
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[12px] transition-all duration-150 ${
                        isHovered || isSelected
                          ? "bg-black text-white shadow-sm opacity-100 scale-100"
                          : "bg-neutral-100 text-neutral-600 opacity-90 scale-95"
                      }`}
                    >
                      <span className="font-semibold">{item.code}</span>
                      <span className="text-neutral-300 font-normal">•</span>
                      <span className="font-bold text-amber-300">{item.symbol.trim()}</span>
                      <span className="text-[11px] text-neutral-200 hidden sm:inline font-normal">
                        ({item.name})
                      </span>
                    </div>

                    {isSelected && (
                      <Check className="w-4 h-4 text-black stroke-[2] ml-1" />
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Live Hover/Active Inspection Footer */}
        <div className="px-5 py-3 bg-neutral-900 text-white border-t border-neutral-800 flex items-center justify-between text-[12px]">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-base">{previewItem.flag}</span>
            <div className="min-w-0 truncate">
              <span className="text-neutral-400 mr-1.5">
                {hoveredCurrency ? "Hovered:" : "Current:"}
              </span>
              <strong className="text-white font-medium">{previewItem.country}</strong>
              <span className="mx-1.5 text-neutral-500">•</span>
              <span className="text-neutral-200">{previewItem.name}</span>
              <span className="ml-1.5 px-1.5 py-0.5 bg-neutral-800 border border-neutral-700 rounded text-amber-300 font-mono font-bold text-[11px]">
                {previewItem.symbol.trim()}
              </span>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 shrink-0 text-neutral-400 text-[11px]">
            <span>1 {previewItem.code} ≈ Rs. {(1 / previewItem.rateFromINR).toFixed(2)}</span>
            <button
              onClick={() => handleSelect(previewItem)}
              className="ml-2 px-2.5 py-1 bg-white text-black font-semibold rounded text-[11px] hover:bg-neutral-200 transition-colors flex items-center gap-1"
            >
              <span>Select</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
