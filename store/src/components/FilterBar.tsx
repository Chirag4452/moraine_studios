"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FilterBarProps {
  productCount: number;
  currentSort: string;
  onSortChange: (sort: string) => void;
}

export function FilterBar({
  productCount,
  currentSort,
  onSortChange,
}: FilterBarProps) {
  const [availabilityOpen, setAvailabilityOpen] = useState(false);

  return (
    <div className="w-full flex items-center justify-between py-4 border-b border-neutral-200">
      {/* Left: Availability dropdown */}
      <div className="relative">
        <button
          onClick={() => setAvailabilityOpen(!availabilityOpen)}
          className="flex items-center gap-1.5 text-[13px] text-neutral-700 hover:text-black transition-colors"
        >
          <span>Availability</span>
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${availabilityOpen ? 'rotate-180' : ''}`} />
        </button>

        {availabilityOpen && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setAvailabilityOpen(false)}
            />
            <div className="absolute top-full left-0 mt-2 bg-white border border-neutral-200 rounded-md shadow-lg z-20 py-2 min-w-[180px]">
              <label className="flex items-center gap-2 px-3 py-1.5 hover:bg-neutral-50 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded border-neutral-300" />
                <span className="text-[13px] text-neutral-700">In stock</span>
              </label>
              <label className="flex items-center gap-2 px-3 py-1.5 hover:bg-neutral-50 cursor-pointer">
                <input type="checkbox" className="rounded border-neutral-300" />
                <span className="text-[13px] text-neutral-700">Out of stock</span>
              </label>
            </div>
          </>
        )}
      </div>

      {/* Right: Item count + Sort + Grid toggles */}
      <div className="flex items-center gap-4">
        {/* Item count */}
        <span className="text-[13px] text-neutral-500 hidden sm:inline">
          {productCount} items
        </span>

        {/* Sort */}
        <div className="flex items-center gap-1.5">
          <label htmlFor="sort-select" className="text-[13px] text-neutral-700">
            Sort
          </label>
          <div className="relative">
            <select
              id="sort-select"
              value={currentSort}
              onChange={(e) => onSortChange(e.target.value)}
              className="appearance-none bg-transparent text-[13px] text-neutral-700 pr-5 cursor-pointer focus:outline-none"
            >
              <option value="featured">Featured</option>
              <option value="best-selling">Best selling</option>
              <option value="title-asc">Alphabetically, A-Z</option>
              <option value="title-desc">Alphabetically, Z-A</option>
              <option value="price-asc">Price, low to high</option>
              <option value="price-desc">Price, high to low</option>
              <option value="date-asc">Date, old to new</option>
              <option value="date-desc">Date, new to old</option>
            </select>
            <ChevronDown className="w-3 h-3 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500" />
          </div>
        </div>

        {/* Grid view toggle */}
        <div className="hidden md:flex items-center gap-1.5 ml-2">
          <button
            className="p-1 text-black"
            aria-label="Grid view"
            title="Grid view"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <rect x="0" y="0" width="7" height="7" />
              <rect x="9" y="0" width="7" height="7" />
              <rect x="0" y="9" width="7" height="7" />
              <rect x="9" y="9" width="7" height="7" />
            </svg>
          </button>
          <button
            className="p-1 text-neutral-300 hover:text-neutral-500 transition-colors"
            aria-label="List view"
            title="List view"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <rect x="0" y="0" width="16" height="3" />
              <rect x="0" y="5" width="16" height="3" />
              <rect x="0" y="10" width="16" height="3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
