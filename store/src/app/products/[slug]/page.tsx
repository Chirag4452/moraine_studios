"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PRODUCTS } from "@/data/products";
import { WallpaperSilhouette } from "@/components/WallpaperSilhouette";
import { ProductCard } from "@/components/ProductCard";
import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/context/CurrencyContext";
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

/* ------------------------------------------------------------------ */
/* Generate multiple "variant" color palettes from the base product   */
/* so we can simulate multiple gallery images / thumbnails             */
/* ------------------------------------------------------------------ */
function generateVariants(baseColors: string[], count: number): string[][] {
  const variants: string[][] = [baseColors];
  for (let i = 1; i < count; i++) {
    const shift = i * 25;
    variants.push(
      baseColors.map((c) => {
        const r = parseInt(c.slice(1, 3), 16);
        const g = parseInt(c.slice(3, 5), 16);
        const b = parseInt(c.slice(5, 7), 16);
        const nr = Math.min(255, Math.max(0, r + shift * (i % 2 === 0 ? 1 : -1)));
        const ng = Math.min(255, Math.max(0, g + shift * (i % 2 === 0 ? -1 : 1)));
        const nb = Math.min(255, Math.max(0, b + shift));
        return `#${nr.toString(16).padStart(2, "0")}${ng.toString(16).padStart(2, "0")}${nb.toString(16).padStart(2, "0")}`;
      })
    );
  }
  return variants;
}

const GRADIENT_STYLES = ["radial", "linear", "mesh", "conic", "layers", "circles", "stacks", "minimal-grid"] as const;

export default function ProductDetailPage({ params }: ProductPageProps) {
  const product = PRODUCTS.find((p) => p.slug === params.slug);

  if (!product) {
    notFound();
  }

  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();
  const [added, setAdded] = useState(false);

  // Gallery state — simulate multiple images
  const variantCount = 8;
  const variants = generateVariants(product.imageColors, variantCount);
  const variantGradients = variants.map((_, i) => GRADIENT_STYLES[i % GRADIENT_STYLES.length]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [slideDirection, setSlideDirection] = useState<"left" | "right">("right");
  const thumbnailsRef = useRef<HTMLDivElement>(null);

  // "You may also like" carousel state
  const related = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 8);
  const [carouselOffset, setCarouselOffset] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

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

  // Scroll active thumbnail into view
  useEffect(() => {
    if (thumbnailsRef.current) {
      const thumb = thumbnailsRef.current.children[activeIndex] as HTMLElement;
      if (thumb) {
        thumb.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      }
    }
  }, [activeIndex]);

  const navigateGallery = useCallback(
    (direction: "prev" | "next") => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setSlideDirection(direction === "next" ? "right" : "left");

      setTimeout(() => {
        setActiveIndex((prev) => {
          if (direction === "next") return (prev + 1) % variantCount;
          return (prev - 1 + variantCount) % variantCount;
        });
        setIsTransitioning(false);
      }, 280);
    },
    [isTransitioning, variantCount]
  );

  const goToSlide = useCallback(
    (index: number) => {
      if (index === activeIndex || isTransitioning) return;
      setIsTransitioning(true);
      setSlideDirection(index > activeIndex ? "right" : "left");
      setTimeout(() => {
        setActiveIndex(index);
        setIsTransitioning(false);
      }, 280);
    },
    [activeIndex, isTransitioning]
  );

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  // Carousel scroll
  const scrollCarousel = (direction: "left" | "right") => {
    if (!carouselRef.current) return;
    const scrollAmount = 280;
    if (direction === "left") {
      carouselRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-10">
        {/* ========== PRODUCT SHOWCASE — TWO COLUMNS ========== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 pt-6 pb-12 items-start">

          {/* ---- LEFT COLUMN: Image Gallery ---- */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* Main Image */}
            <div className="relative w-full aspect-[4/3] bg-[#f0f0f0] overflow-hidden group">
              {/* Image with transition */}
              <div
                className={`absolute inset-0 transition-all duration-[280ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
                  isTransitioning
                    ? slideDirection === "right"
                      ? "opacity-0 translate-x-4"
                      : "opacity-0 -translate-x-4"
                    : "opacity-100 translate-x-0"
                }`}
              >
                <WallpaperSilhouette
                  colors={variants[activeIndex]}
                  gradientStyle={variantGradients[activeIndex]}
                />
              </div>

              {/* Navigation Arrows — appear on hover */}
              <button
                onClick={() => navigateGallery("prev")}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10
                  w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm
                  flex items-center justify-center
                  text-neutral-600 hover:text-black
                  shadow-sm border border-neutral-200/60
                  opacity-0 group-hover:opacity-100
                  -translate-x-2 group-hover:translate-x-0
                  transition-all duration-200 ease-out
                  active:scale-95"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5 stroke-[1.5]" />
              </button>

              <button
                onClick={() => navigateGallery("next")}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10
                  w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm
                  flex items-center justify-center
                  text-neutral-600 hover:text-black
                  shadow-sm border border-neutral-200/60
                  opacity-0 group-hover:opacity-100
                  translate-x-2 group-hover:translate-x-0
                  transition-all duration-200 ease-out
                  active:scale-95"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5 stroke-[1.5]" />
              </button>
            </div>

            {/* Thumbnail Strip */}
            <div
              ref={thumbnailsRef}
              className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {variants.map((colors, i) => (
                <button
                  key={i}
                  onClick={() => goToSlide(i)}
                  className={`shrink-0 w-[56px] h-[56px] overflow-hidden transition-all duration-200 ${
                    activeIndex === i
                      ? "ring-2 ring-black ring-offset-1"
                      : "ring-1 ring-neutral-200 hover:ring-neutral-400"
                  }`}
                >
                  <WallpaperSilhouette
                    colors={colors}
                    gradientStyle={variantGradients[i]}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* ---- RIGHT COLUMN: Product Info ---- */}
          <div className="lg:col-span-5 flex flex-col gap-5 lg:pt-2">
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
              Created by <span className="text-neutral-600">Reijo</span>
            </p>

            {/* Promo Banner */}
            <div className="border border-neutral-200 px-4 py-3 text-[13px] text-neutral-700">
              Buy one wallpaper pack, get another 50% off.
            </div>

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
            </div>

            {/* What you get */}
            <div className="flex flex-col gap-2">
              <p className="text-[13px] font-medium text-black">What you get</p>
              <ul className="text-[13px] text-neutral-600 leading-relaxed space-y-1 list-disc list-inside">
                <li>64 wallpapers in total</li>
                <li>Dark and light versions</li>
                <li>Flipped versions of every design</li>
                <li>Desktop 6K resolution</li>
                <li>Mobile versions</li>
                <li>Also unlocks this pack in the Moraine Studio Wallpapers app for Mac at no extra cost</li>
              </ul>
            </div>
          </div>
        </div>

        {/* ========== YOU MAY ALSO LIKE ========== */}
        <div className="py-12 border-t border-neutral-200">
          <h2 className="text-[20px] sm:text-[24px] font-semibold text-black tracking-tight mb-8">
            You may also like
          </h2>

          <div className="relative group/carousel">
            {/* Carousel track */}
            <div
              ref={carouselRef}
              className="flex gap-4 overflow-x-auto scrollbar-hide pb-2"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {related.map((p) => (
                <div key={p.id} className="shrink-0 w-[240px] sm:w-[260px]">
                  <ProductCard product={p} />
                </div>
              ))}
            </div>

            {/* Carousel Arrows */}
            <button
              onClick={() => scrollCarousel("left")}
              className="absolute left-0 top-[35%] -translate-y-1/2 -translate-x-3 z-10
                w-10 h-10 rounded-full bg-white/95 backdrop-blur-sm
                flex items-center justify-center
                text-neutral-600 hover:text-black
                shadow-md border border-neutral-200/60
                opacity-0 group-hover/carousel:opacity-100
                -translate-x-5 group-hover/carousel:-translate-x-3
                transition-all duration-200 ease-out
                active:scale-95"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5 stroke-[1.5]" />
            </button>

            <button
              onClick={() => scrollCarousel("right")}
              className="absolute right-0 top-[35%] -translate-y-1/2 translate-x-3 z-10
                w-10 h-10 rounded-full bg-white/95 backdrop-blur-sm
                flex items-center justify-center
                text-neutral-600 hover:text-black
                shadow-md border border-neutral-200/60
                opacity-0 group-hover/carousel:opacity-100
                translate-x-5 group-hover/carousel:translate-x-3
                transition-all duration-200 ease-out
                active:scale-95"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5 stroke-[1.5]" />
            </button>
          </div>
        </div>
      </div>

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
              <WallpaperSilhouette
                colors={product.imageColors}
                gradientStyle={product.gradientStyle}
              />
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
