"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useSearch } from "@/context/SearchContext";
import { useCurrency } from "@/context/CurrencyContext";
import { PRODUCTS } from "@/data/products";
import { WallpaperSilhouette } from "./WallpaperSilhouette";
import { Search, X, ArrowRight } from "lucide-react";

export function SearchModal() {
  const { isOpen, closeSearch } = useSearch();
  const { formatPrice } = useCurrency();
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return PRODUCTS.filter((p) => p.title.toLowerCase().includes(q));
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 transition-opacity"
        onClick={closeSearch}
      />

      {/* Modal */}
      <div className="relative mx-auto max-w-xl bg-white rounded-lg shadow-2xl ring-1 ring-black/5 overflow-hidden">
        {/* Search Input */}
        <div className="flex items-center px-4 py-3.5 border-b border-neutral-200">
          <Search className="w-5 h-5 text-neutral-400 shrink-0 mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            autoFocus
            className="w-full bg-transparent text-[14px] text-black placeholder-neutral-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 text-neutral-400 hover:text-black"
              aria-label="Clear query"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={closeSearch}
            className="text-[11px] text-neutral-400 hover:text-black ml-2 px-1.5 py-0.5 rounded border border-neutral-200"
          >
            ESC
          </button>
        </div>

        {/* Popular searches */}
        {!query.trim() && (
          <div className="p-5">
            <p className="text-[11px] font-medium text-neutral-400 uppercase tracking-wider mb-3">
              Popular searches
            </p>
            <div className="flex flex-wrap gap-2">
              {["Wallpaper", "Blur", "Gradient", "3D", "Pack", "Bundle"].map(
                (tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="text-[12px] py-1.5 px-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-full transition-colors"
                  >
                    {tag}
                  </button>
                )
              )}
            </div>
          </div>
        )}

        {/* Results */}
        {query.trim() && (
          <div className="max-h-96 overflow-y-auto p-2">
            {results.length === 0 ? (
              <div className="py-12 text-center text-[13px] text-neutral-400">
                No products found for &ldquo;{query}&rdquo;
              </div>
            ) : (
              results.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  onClick={closeSearch}
                  className="flex items-center gap-4 p-3 hover:bg-neutral-50 rounded-lg transition-colors group"
                >
                  <div className="w-14 h-14 overflow-hidden bg-[#f0f0f0] shrink-0">
                    <WallpaperSilhouette
                      colors={product.imageColors}
                      gradientStyle={product.gradientStyle}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-[13px] font-medium text-black truncate">
                      {product.title}
                    </h4>
                    <p className="text-[12px] text-neutral-400">
                      {formatPrice(product.price)}
                    </p>
                  </div>

                  <ArrowRight className="w-3.5 h-3.5 text-neutral-300 group-hover:text-black transition-colors shrink-0" />
                </Link>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
