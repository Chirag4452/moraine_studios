"use client";

import React, { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Search } from "lucide-react";

export default function SearchResultsPage() {
  const searchParams = useSearchParams();
  const initialQ = searchParams.get("q") || "";
  const [searchTerm, setSearchTerm] = useState(initialQ);

  const filtered = useMemo(() => {
    if (!searchTerm.trim()) return PRODUCTS;
    const q = searchTerm.toLowerCase();
    return PRODUCTS.filter((p) => p.title.toLowerCase().includes(q));
  }, [searchTerm]);

  return (
    <div className="w-full min-h-screen py-12">
      <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-black mb-6">
          Search Wallpapers
        </h1>

        {/* Search input field */}
        <div className="relative max-w-xl mb-10">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search wallpapers by title, device, or color style..."
            className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-black/[0.1] rounded-btn text-xs text-black placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-black"
          />
        </div>

        {/* Results stats */}
        <div className="text-xs text-neutral-500 mb-6">
          Found {filtered.length} {filtered.length === 1 ? "result" : "results"}
          {searchTerm && <span> for &ldquo;{searchTerm}&rdquo;</span>}
        </div>

        {/* Results grid */}
        {filtered.length === 0 ? (
          <div className="py-20 text-center text-xs text-neutral-400">
            No wallpapers matched your search criteria.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
