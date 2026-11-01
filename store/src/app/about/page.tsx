import React from "react";
import Link from "next/link";
import { ArrowRight, Monitor, Palette, Sparkles } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="w-full py-16 sm:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <span className="badge-pill bg-black text-white font-medium mb-4">
          Studio Philosophy
        </span>

        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-black font-sans leading-[1.1] mb-8">
          Crafting Digital Hardware for High-Resolution Screens.
        </h1>

        <div className="space-y-6 text-sm text-neutral-600 leading-relaxed">
          <p>
            Moraine Studio was founded on a simple realization: modern hardware displays (Apple Pro Display XDR, Studio Display, LG UltraFine, and OLED panels) feature extraordinary dynamic range, yet most wallpapers are compressed with visible color banding and visual artifacts.
          </p>
          <p>
            Every silhouette in our collection is mathematically drafted, rendered in native 6K and 5K raster resolutions, and calibrated to Display P3 wide-gamut specifications.
          </p>

          <div className="my-10 p-6 bg-neutral-50 rounded-xl border border-black/[0.06] flex flex-col gap-4">
            <h3 className="text-xs font-bold text-black uppercase tracking-wider">
              Studio Standards
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="flex flex-col gap-1">
                <Monitor className="w-4 h-4 text-black mb-1" />
                <span className="font-semibold text-black">6K Master Files</span>
                <span className="text-neutral-500">6016 × 3384 native raster density</span>
              </div>
              <div className="flex flex-col gap-1">
                <Palette className="w-4 h-4 text-black mb-1" />
                <span className="font-semibold text-black">Display P3</span>
                <span className="text-neutral-500">Wide-gamut calibrated color profile</span>
              </div>
              <div className="flex flex-col gap-1">
                <Sparkles className="w-4 h-4 text-black mb-1" />
                <span className="font-semibold text-black">AMOLED Black</span>
                <span className="text-neutral-500">Zero energy waste on OLED pixels</span>
              </div>
            </div>
          </div>

          <p>
            We believe your digital workspace should provoke clarity, calm, and uncompromising focus.
          </p>
        </div>

        <div className="mt-12 pt-8 border-t border-black/[0.06]">
          <Link
            href="/collections/wallpapers"
            className="inline-flex items-center gap-2 py-3 px-6 bg-black text-white text-xs font-semibold rounded-btn hover:bg-neutral-800 transition-colors"
          >
            <span>Explore the Wallpapers Collection</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
