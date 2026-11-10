"use client";

import React, { useState, useEffect, useRef } from "react";
import { notFound } from "next/navigation";
import { PRODUCTS } from "@/data/products";
import { ProductGallery } from "@/components/ProductGallery";
import { StickyProductDetails } from "@/components/StickyProductDetails";
import { RelatedProducts } from "@/components/RelatedProducts";
import { ProductVisual } from "@/components/ProductVisual";
import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/context/CurrencyContext";
import { ShoppingCart } from "lucide-react";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  const product = PRODUCTS.find((p) => p.slug === params.slug);

  if (!product) {
    notFound();
  }

  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();
  const [added, setAdded] = useState(false);

  // "You may also like" carousel state
  const related = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 8);

  // Sticky bar visibility
  const [showStickyBar, setShowStickyBar] = useState(false);
  const addToCartRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowStickyBar(!entry.isIntersecting);
      },
      { threshold: 0 }
    );
    if (addToCartRef.current) {
      observer.observe(addToCartRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="w-full">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-10">
        {/* ========== PRODUCT SHOWCASE — TWO COLUMNS ========== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 pt-6 pb-12 items-start">

          {/* ---- LEFT COLUMN: Image Gallery ---- */}
          <div className="lg:col-span-7 min-w-0">
            <ProductGallery key={product.id} product={product} />
          </div>

          {/* ---- RIGHT COLUMN: Product Info ---- */}
          <StickyProductDetails>
            {/* Title */}
            <h1 className="text-[22px] sm:text-[26px] font-semibold text-black tracking-tight leading-snug">
              {product.title}
            </h1>

            {/* Price */}
            <div className="flex items-center gap-3">
              {product.isSale && product.compareAtPrice ? (
                <>
                  <span className="text-[15px] text-neutral-700">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-[15px] text-neutral-400 line-through">
                    {formatPrice(product.compareAtPrice)}
                  </span>
                </>
              ) : (
                <span className="text-[15px] text-neutral-700">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>

            {/* Creator */}
            <p className="text-[13px] text-neutral-400">
              Created by <span className="text-neutral-600">{product.creator ?? "Reijo"}</span>
            </p>

            {/* Promo Banner */}
            <div className="border border-neutral-200 px-4 py-3 text-[13px] text-neutral-700">
              Buy one wallpaper pack, get another 50% off.
            </div>

            {product.downloadSummary && <div className="rounded-md bg-neutral-50 p-4">
              <h2 className="mb-2 text-[13px] font-medium text-black">Your download</h2>
              <dl className="space-y-2 text-xs leading-relaxed">
                {product.downloadSummary.map(item => <div key={item.label} className="grid grid-cols-[76px_1fr] gap-3">
                  <dt className="text-neutral-500">{item.label}</dt>
                  <dd className="text-neutral-700">{item.value}</dd>
                </div>)}
              </dl>
            </div>}

            {/* Add to Cart Button */}
            <button
              ref={addToCartRef}
              onClick={handleAddToCart}
              className="w-full py-3.5 bg-black hover:bg-neutral-800 text-white text-[13px] font-medium
                transition-colors duration-150 flex items-center justify-center gap-2 active:scale-[0.99]"
            >
              {added ? (
                <span>Added to cart ✓</span>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4 stroke-[1.5]" />
                  <span>Add to cart</span>
                </>
              )}
            </button>

            {/* Buy with Shop */}
            <button
              className="w-full py-3.5 bg-[#5A31F4] hover:bg-[#4e28d9] text-white text-[13px] font-semibold
                transition-colors duration-150 flex items-center justify-center gap-1.5 rounded-md"
            >
              Buy with <span className="font-bold italic tracking-tight">shop</span>
            </button>

            {/* More payment options */}
            <p className="text-[12px] text-neutral-500 text-center underline underline-offset-2 cursor-pointer hover:text-neutral-700 transition-colors">
              More payment options
            </p>

            {/* Description */}
            <div className="pt-4 border-t border-neutral-200 flex flex-col gap-3">
              {product.description ? product.description.map((paragraph) => (
                <p key={paragraph} className="text-[13px] text-neutral-600 leading-relaxed">{paragraph}</p>
              )) : <>
              <p className="text-[13px] text-neutral-600 leading-relaxed">
                The newest addition to our wallpaper series. Made from scratch in 3D software
                with a glass finish and lighting. Each wallpaper has its own colour
                palette, covering reds, blues, greens, monochrome and white.
              </p>
              <p className="text-[13px] text-neutral-600 leading-relaxed">
                Every design also comes flipped, so you can choose which side the
                element sits on and keep your desktop icons clear.
              </p>
              <p className="text-[13px] text-neutral-600 leading-relaxed">
                Desktop wallpapers come in at 6K resolution and work great on both
                mobile and desktop.
              </p>
              </>}
            </div>

            {/* What you get */}
            <div className="flex flex-col gap-2">
              <p className="text-[13px] font-medium text-black">What you get</p>
              <ul className="text-[13px] text-neutral-600 leading-relaxed space-y-1 list-disc list-inside">
                {product.included ? product.included.map((item) => <li key={item}>{item}</li>) : <>
                <li>64 wallpapers in total</li>
                <li>Dark and light versions</li>
                <li>Flipped versions of every design</li>
                <li>Desktop 6K resolution</li>
                <li>Mobile versions</li>
                <li>Also unlocks this pack in the Moraine Studio Wallpapers app for Mac at no extra cost</li>
                </>}
              </ul>
            </div>
          </StickyProductDetails>
        </div>

      </div>

        {/* ========== YOU MAY ALSO LIKE ========== */}
        <section className="w-full px-5 sm:px-8 lg:px-10 pt-6 pb-16" aria-label="Recommended products">
          <h2 className="text-[20px] sm:text-[24px] font-semibold text-black tracking-tight mb-8">
            You may also like
          </h2>

          <RelatedProducts products={related} />
        </section>

      {/* ========== STICKY BOTTOM BAR ========== */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-neutral-200 shadow-[0_-2px_10px_rgba(0,0,0,0.06)]
          transition-all duration-300 ease-[cubic-bezier(0.33,1,0.68,1)]
          ${showStickyBar ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"}`}
      >
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-10 py-3 flex items-center justify-between gap-4">
          {/* Product info */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 shrink-0 overflow-hidden bg-[#f0f0f0] rounded">
              <ProductVisual product={product} sizes="40px" />
            </div>
            <div className="min-w-0">
              <p className="text-[13px] font-medium text-black truncate">
                {product.title}
              </p>
              <p className="text-[12px] text-neutral-500">
                {formatPrice(product.price)}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleAddToCart}
              className="py-2.5 px-6 bg-black hover:bg-neutral-800 text-white text-[13px] font-medium
                transition-colors duration-150 flex items-center gap-2 active:scale-[0.98]"
            >
              <ShoppingCart className="w-4 h-4 stroke-[1.5]" />
              <span>Add to cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
