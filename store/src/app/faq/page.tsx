import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function FAQPage() {
  const faqs = [
    {
      q: "How are the wallpapers delivered?",
      a: "Immediately upon checkout, you will receive a secure download link on screen and sent to your email with high-speed direct access to lossless PNG and P3 HEIC files.",
    },
    {
      q: "What resolutions are included in each pack?",
      a: "Every wallpaper pack includes 6K Pro (6016×3384), 5K Retina (5120×2880), 4K UHD (3840×2160), and 9:16 mobile portrait cuts for iOS and Android.",
    },
    {
      q: "Can I use these wallpapers on multiple devices?",
      a: "Yes! A single license covers all your personal devices (Mac, Windows desktop, laptop, iPhone, iPad, Android).",
    },
    {
      q: "Do you offer commercial licensing?",
      a: "For YouTube setup tours, broadcast studio backdrops, or software demos, please contact our studio directly for commercial clearance.",
    },
    {
      q: "What if I lose my download files in the future?",
      a: "Your order receipt email contains a permanent lifetime download link. You can re-download your files whenever you want at no additional charge.",
    },
  ];

  return (
    <div className="w-full py-16 sm:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <span className="badge-pill bg-black text-white font-medium mb-4">
          Support & Help
        </span>

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-black font-sans mb-8">
          Frequently Asked Questions
        </h1>

        <div className="divide-y divide-black/[0.08] border-y border-black/[0.08]">
          {faqs.map((faq, i) => (
            <div key={i} className="py-6">
              <h3 className="text-sm font-semibold text-black mb-2">
                {faq.q}
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/collections/wallpapers"
            className="inline-flex items-center gap-2 py-3 px-6 bg-black text-white text-xs font-semibold rounded-btn hover:bg-neutral-800 transition-colors"
          >
            <span>Back to Wallpapers</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
