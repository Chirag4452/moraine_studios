"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Product } from "@/data/products";
import { WallpaperSilhouette } from "./WallpaperSilhouette";
import { useCurrency } from "@/context/CurrencyContext";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { formatPrice } = useCurrency();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group flex flex-col w-full text-left"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Area */}
      <Link
        href={`/products/${product.slug}`}
        className="relative block w-full aspect-square overflow-hidden bg-[#f0f0f0] rounded-none"
      >
        <WallpaperSilhouette
          colors={product.imageColors}
          gradientStyle={product.gradientStyle}
          isHovered={isHovered}
        />

        {/* Badges */}
        {product.isBestSeller && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10">
            <span className="bg-white text-black text-[10px] font-semibold tracking-[0.06em] uppercase px-3 py-1 rounded-sm shadow-sm">
              BEST SELLER
            </span>
          </div>
        )}

        {product.isSale && (
          <div className="absolute bottom-3 left-3 z-10">
            <span className="bg-red-500 text-white text-[10px] font-semibold tracking-[0.04em] uppercase px-2.5 py-1 rounded-sm">
              SALE
            </span>
          </div>
        )}
      </Link>

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
