"use client";

import React, { useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/context/CurrencyContext";
import { ProductVisual } from "./ProductVisual";
import { X, Plus, Minus, Trash2, ArrowRight } from "lucide-react";

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    subtotal,
    updateQuantity,
    removeFromCart,
  } = useCart();
  const { formatPrice } = useCurrency();

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 transition-opacity duration-200"
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Slide-over panel */}
      <div className="fixed inset-y-0 right-0 flex max-w-full">
        <div className="w-screen max-w-[420px] bg-white shadow-2xl flex flex-col justify-between">
          {/* Close button */}
          <div className="absolute top-4 right-4 z-10">
            <button
              onClick={closeCart}
              className="p-1.5 text-neutral-400 hover:text-black transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5 stroke-[1.5]" />
            </button>
          </div>

          {/* Cart Content */}
          <div className="flex-1 overflow-y-auto">
            {items.length === 0 ? (
              /* Empty State */
              <div className="h-full flex flex-col items-center justify-center text-center px-8">
                <h2 className="text-xl font-semibold text-black mb-3">
                  Your cart is empty
                </h2>
                <p className="text-[13px] text-neutral-500 mb-6">
                  Have an account?{" "}
                  <button className="text-black underline underline-offset-2">
                    Log in
                  </button>{" "}
                  to check out faster.
                </p>
                <button
                  onClick={closeCart}
                  className="py-3 px-8 bg-black text-white text-[13px] font-medium rounded-md hover:bg-neutral-800 transition-colors"
                >
                  Continue shopping
                </button>
              </div>
            ) : (
              /* Cart Items */
              <div className="p-6 pt-12">
                <h2 className="text-lg font-semibold text-black mb-6">
                  Your cart
                </h2>
                <div className="divide-y divide-neutral-100">
                  {items.map((item) => (
                    <div
                      key={item.product.id}
                      className="py-4 flex gap-4"
                    >
                      {/* Thumbnail */}
                      <div className="w-20 h-20 overflow-hidden bg-[#f0f0f0] shrink-0">
                        <ProductVisual product={item.product} sizes="80px" />
                      </div>

                      {/* Details */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div className="flex justify-between items-start gap-2">
                          <h3 className="text-[13px] font-medium text-black leading-snug">
                            {item.product.title}
                          </h3>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-neutral-400 hover:text-black transition-colors p-0.5 shrink-0"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          {/* Quantity stepper */}
                          <div className="flex items-center border border-neutral-200 rounded">
                            <button
                              onClick={() =>
                                updateQuantity(item.product.id, item.quantity - 1)
                              }
                              className="p-1.5 hover:bg-neutral-50 text-neutral-500 hover:text-black transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-3 text-[13px] font-medium text-black">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.product.id, item.quantity + 1)
                              }
                              className="p-1.5 hover:bg-neutral-50 text-neutral-500 hover:text-black transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <span className="text-[13px] font-medium text-black">
                            {formatPrice(item.product.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer with Checkout */}
          {items.length > 0 && (
            <div className="p-6 border-t border-neutral-200 flex flex-col gap-4">
              <div className="flex justify-between items-baseline">
                <span className="text-[13px] text-neutral-600">Subtotal</span>
                <span className="text-[15px] font-semibold text-black">
                  {formatPrice(subtotal)}
                </span>
              </div>

              <p className="text-[11px] text-neutral-400">
                Tax included. Shipping calculated at checkout.
              </p>

              <button
                onClick={() => {
                  alert("Checkout: Routes to Shopify/Stripe checkout.");
                }}
                className="w-full py-3.5 bg-black hover:bg-neutral-800 text-white font-medium text-[13px] rounded-md transition-colors flex items-center justify-center gap-2"
              >
                <span>Check out</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
