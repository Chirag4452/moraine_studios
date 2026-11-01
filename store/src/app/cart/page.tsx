"use client";

import React from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/context/CurrencyContext";
import { WallpaperSilhouette } from "@/components/WallpaperSilhouette";
import { Plus, Minus, Trash2, ArrowRight, ShieldCheck, ShoppingBag } from "lucide-react";

export default function CartPage() {
  const { items, itemCount, subtotal, updateQuantity, removeFromCart } = useCart();
  const { formatPrice } = useCurrency();

  return (
    <div className="w-full min-h-[70vh] py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl font-bold tracking-tight text-black mb-8">
          Shopping Bag ({itemCount})
        </h1>

        {items.length === 0 ? (
          <div className="py-20 text-center flex flex-col items-center justify-center gap-4 bg-neutral-50 rounded-xl border border-black/[0.04]">
            <div className="w-14 h-14 rounded-full bg-neutral-200/60 flex items-center justify-center text-neutral-400">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <div>
              <p className="text-base font-semibold text-black">Your bag is currently empty</p>
              <p className="text-xs text-neutral-500 mt-1">
                Explore our minimalist digital wallpapers engineered for high-resolution screens.
              </p>
            </div>
            <Link
              href="/collections/wallpapers"
              className="mt-2 py-3 px-6 bg-black hover:bg-neutral-800 text-white text-xs font-semibold rounded-btn transition-colors"
            >
              Browse Wallpapers
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Items list */}
            <div className="lg:col-span-7 divide-y divide-black/[0.06] border-y border-black/[0.06]">
              {items.map((item) => (
                <div key={item.product.id} className="py-6 flex gap-4">
                  <div className="w-24 h-16 rounded-md overflow-hidden bg-neutral-100 shrink-0 border border-black/[0.06]">
                    <WallpaperSilhouette
                      colors={item.product.imageColors}
                      gradientStyle={item.product.gradientStyle}
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <Link
                          href={`/products/${item.product.slug}`}
                          className="text-sm font-semibold text-black hover:underline"
                        >
                          {item.product.title}
                        </Link>
                        <p className="text-xs text-neutral-400 mt-0.5">
                          Digital Wallpaper Pack
                        </p>
                      </div>
                      <span className="text-sm font-semibold text-black">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-black/[0.08] rounded-btn">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1.5 hover:bg-neutral-100 text-neutral-500 hover:text-black"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs font-medium text-black">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1.5 hover:bg-neutral-100 text-neutral-500 hover:text-black"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-neutral-400 hover:text-red-600 transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-5 bg-neutral-50 p-6 rounded-xl border border-black/[0.06] flex flex-col gap-4">
              <h2 className="text-sm font-bold text-black uppercase tracking-wider">
                Order Summary
              </h2>

              <div className="flex justify-between text-xs text-neutral-600">
                <span>Digital Delivery</span>
                <span className="text-emerald-600 font-medium">Instant (Free)</span>
              </div>

              <div className="flex justify-between text-xs text-neutral-600">
                <span>Included Resolutions</span>
                <span className="font-mono text-black">4K / 5K / 6K</span>
              </div>

              <div className="border-t border-black/[0.06] pt-3 flex justify-between items-baseline">
                <span className="text-sm font-semibold text-black">Subtotal</span>
                <span className="text-lg font-bold text-black">{formatPrice(subtotal)}</span>
              </div>

              <p className="text-[11px] text-neutral-400">
                Digital files and lifetime download link delivered immediately to your email.
              </p>

              <button
                onClick={() => alert("Simulated Checkout: Ready for Shopify / Stripe production integration.")}
                className="w-full py-3.5 px-4 bg-black hover:bg-neutral-800 text-white font-medium text-xs rounded-btn transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-neutral-400 pt-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>256-Bit SSL Encrypted Checkout</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
