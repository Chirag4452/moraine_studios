"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Product } from "@/data/products";
import { ProductCardPreview } from "./ProductCardPreview";
import { ProductVisual } from "./ProductVisual";
import { useCurrency } from "@/context/CurrencyContext";

interface ProductCardProps {
  product: Product;
  interactivePreview?: boolean;
}

export function ProductCard({ product, interactivePreview = false }: ProductCardProps) {
  const { formatPrice } = useCurrency();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group flex flex-col w-full text-left"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Area */}
      <div className={`relative block w-full aspect-square overflow-hidden bg-[#f0f0f0] ${interactivePreview ? "rounded-md" : "rounded-none"}`}>
        {interactivePreview ? <ProductCardPreview product={product} /> : <Link href={`/products/${product.slug}`} className="block h-full w-full">
          <ProductVisual product={product} isHovered={isHovered} />
        </Link>}

        {/* Badges */}
        {product.isBestSeller && (
          <div className="pointer-events-none absolute top-3 left-1/2 -translate-x-1/2 z-10">
            <span className="bg-white text-black text-[10px] font-semibold tracking-[0.06em] uppercase px-3 py-1 rounded-sm shadow-sm">
              BEST SELLER
            </span>
          </div>
        )}

        {product.isSale && (
          <div className="pointer-events-none absolute bottom-3 left-3 z-10">
            <span className="bg-red-500 text-white text-[10px] font-semibold tracking-[0.04em] uppercase px-2.5 py-1 rounded-sm">
              SALE
            </span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="pt-3 pb-1 flex flex-col gap-0.5">
        <Link
          href={`/products/${product.slug}`}
          className="text-[13px] font-normal text-neutral-900 hover:text-neutral-600 transition-colors leading-snug"
        >
          {product.title}
        </Link>

        <div className="flex items-center gap-2">
          {product.isSale && product.compareAtPrice ? (
            <>
              <span className="text-[13px] text-red-600 font-normal">
                {formatPrice(product.price)}
              </span>
              <span className="text-[13px] text-neutral-400 line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            </>
          ) : (
            <span className="text-[13px] text-neutral-600 font-normal">
              {formatPrice(product.price)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
