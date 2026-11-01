import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="w-full min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-20">
      <span className="badge-pill bg-neutral-100 text-neutral-600 font-semibold mb-4">
        404 — Not Found
      </span>
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-black mb-3">
        Page Not Found
      </h1>
      <p className="text-xs text-neutral-500 max-w-sm mb-8 leading-relaxed">
        The wallpaper or collection you are looking for has been relocated or is unavailable.
      </p>
      <Link
        href="/collections/wallpapers"
        className="inline-flex items-center gap-2 py-3 px-6 bg-black text-white text-xs font-semibold rounded-btn hover:bg-neutral-800 transition-colors"
      >
        <span>Explore All Wallpapers</span>
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
