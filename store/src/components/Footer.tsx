"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setSubscribed(true);
  };

  return (
    <footer className="w-full bg-[#1a1a1a] text-neutral-300">
      {/* Main Footer Content */}
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-10 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Column 1: Newsletter */}
          <div className="flex flex-col gap-3">
            <h4 className="text-[15px] font-semibold text-white leading-snug">
              Get money off by entering your email.
            </h4>
            <p className="text-[13px] text-neutral-400 leading-relaxed">
              Sign up to your newsletter and receive a discount code and future offers.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 text-[13px] text-emerald-400 py-2">
                <Check className="w-4 h-4" />
                <span>You&apos;re subscribed! Check your email.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="mt-1">
                <div className="flex border-b border-neutral-600 pb-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                    required
                    className="flex-1 bg-transparent text-[13px] text-white placeholder-neutral-500 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="p-1 text-neutral-400 hover:text-white transition-colors"
                    aria-label="Subscribe"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Column 2: Links */}
          <div className="flex flex-col gap-3">
            <Link
              href="/search"
              className="text-[13px] text-neutral-400 hover:text-white transition-colors"
            >
              Search
            </Link>
            <Link
              href="/collections/all"
              className="text-[13px] text-neutral-400 hover:text-white transition-colors"
            >
              All Products
            </Link>
            <Link
              href="/collections/wallpapers"
              className="text-[13px] text-neutral-400 hover:text-white transition-colors"
            >
              Wallpapers
            </Link>
            <Link
              href="/collections/presets"
              className="text-[13px] text-neutral-400 hover:text-white transition-colors"
            >
              Presets
            </Link>
            <Link
              href="/design-language"
              className="text-[13px] text-neutral-400 hover:text-white transition-colors"
            >
              Design Language
            </Link>
            <Link
              href="/about"
              className="text-[13px] text-neutral-400 hover:text-white transition-colors"
            >
              About
            </Link>
            <Link
              href="/faq"
              className="text-[13px] text-neutral-400 hover:text-white transition-colors"
            >
              FAQ
            </Link>
          </div>

          {/* Column 3: Brand */}
          <div className="flex flex-col gap-3">
            {/* Logo */}
            <Link
              href="/"
              className="inline-flex w-fit items-center"
              aria-label="Moraine Studio Home"
            >
              <Image
                src="/brand/moraine-studio-header-v1.png"
                alt=""
                width={2172}
                height={724}
                className="h-10 w-auto object-contain brightness-0 invert sm:h-11"
              />
            </Link>
            <p className="text-[13px] text-neutral-400 leading-relaxed">
              The premium digital product marketplace.
            </p>
            <p className="text-[13px] text-neutral-500 mt-2">
              © 2026 Moraine Studio
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
