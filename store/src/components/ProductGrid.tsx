"use client";

import React from "react";
import { Product } from "@/data/products";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="w-full">
      {products.length === 0 ? (
        <div className="py-24 text-center flex flex-col items-center justify-center gap-2">
          <p className="text-sm font-medium text-neutral-800">
            No products found.
          </p>
          <p className="text-xs text-neutral-400">
            Try adjusting your filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
