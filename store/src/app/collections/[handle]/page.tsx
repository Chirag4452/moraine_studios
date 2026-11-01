"use client";

import React, { useState, useMemo } from "react";
import { PRODUCTS } from "@/data/products";
import { FilterBar } from "@/components/FilterBar";
import { ProductGrid } from "@/components/ProductGrid";

interface CollectionPageProps {
  params: {
    handle: string;
  };
  searchParams?: {
    sort?: string;
  };
}

export default function CollectionPage({ params, searchParams }: CollectionPageProps) {
  const collectionTitle =
    params.handle === "wallpapers"
      ? "Wallpapers"
      : params.handle
          .split("-")
          .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
          .join(" ");

  const [currentSort, setCurrentSort] = useState<string>(searchParams?.sort || "featured");

  const sortedProducts = useMemo(() => {
    const list = [...PRODUCTS];

    switch (currentSort) {
      case "best-selling":
        list.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
        break;
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "title-asc":
        list.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "title-desc":
        list.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "featured":
      default:
        break;
    }

    return list;
  }, [currentSort]);

  return (
    <div className="w-full min-h-screen">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-10">
        {/* Page Title */}
        <div className="pt-10 pb-6">
          <h1 className="text-[2rem] sm:text-[2.5rem] font-semibold tracking-normal text-black leading-tight">
            {collectionTitle}
          </h1>
        </div>

        {/* Filter Bar */}
        <FilterBar
          productCount={sortedProducts.length}
          currentSort={currentSort}
          onSortChange={setCurrentSort}
        />

        {/* Product Grid */}
        <div className="mt-6 mb-16">
          <ProductGrid products={sortedProducts} />
        </div>
      </div>
    </div>
  );
}
