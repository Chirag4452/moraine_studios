"use client";

import React, { useEffect } from "react";
import Link from "next/link";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="w-full min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-20">
      <span className="badge-pill bg-red-100 text-red-700 font-semibold mb-4">
        Application Notice
      </span>
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-black mb-3">
        Something went wrong
      </h1>
      <p className="text-xs text-neutral-500 max-w-sm mb-6">
        An unexpected error occurred while loading this page.
      </p>
      <div className="flex items-center gap-3">
        <button
          onClick={() => reset()}
          className="py-2.5 px-5 bg-black text-white text-xs font-semibold rounded-btn hover:bg-neutral-800 transition-colors"
        >
          Try again
        </button>
        <Link
          href="/collections/wallpapers"
          className="py-2.5 px-5 bg-neutral-100 text-neutral-800 text-xs font-semibold rounded-btn hover:bg-neutral-200 transition-colors"
        >
          Browse Wallpapers
        </Link>
      </div>
    </div>
  );
}
