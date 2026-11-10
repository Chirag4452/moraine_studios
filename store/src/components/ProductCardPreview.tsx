"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "@/data/products";
import { ProductVisual } from "./ProductVisual";

/** Navigation belongs to this product's images, never to the recommendation row. */
export function ProductCardPreview({ product }: { product: Product }) {
  const count = product.gallery?.length || 1;
  const [active, setActive] = useState(0);
  const area = useRef<HTMLDivElement>(null);
  const gesture = useRef<{ x: number; y: number; left: number; index: number } | null>(null);
  const moved = useRef(false);
  const select = (index: number) => {
    const next = (index + count) % count;
    setActive(next);
    area.current?.scrollTo({ left: next * area.current.clientWidth,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };

  return <div className="group/preview relative h-full w-full">
    <div ref={area} aria-label={`${product.title} previews`}
      onScroll={event => setActive(Math.max(0, Math.min(count - 1, Math.round(event.currentTarget.scrollLeft / event.currentTarget.clientWidth))))}
      onPointerDown={event => {
        moved.current = false;
        if (count < 2 || !event.isPrimary || event.button !== 0) return;
        gesture.current = { x: event.clientX, y: event.clientY, left: event.currentTarget.scrollLeft, index: active };
      }}
      onPointerMove={event => {
        const start = gesture.current;
        if (!start) return;
        const dx = event.clientX - start.x;
        if (Math.abs(dx) > 8 || Math.abs(event.clientY - start.y) > 8) moved.current = true;
        if (event.pointerType === "mouse" && event.buttons === 1 && Math.abs(dx) > 8) {
          event.currentTarget.setPointerCapture(event.pointerId);
          event.currentTarget.style.scrollSnapType = "none";
          event.currentTarget.scrollLeft = start.left - dx;
        }
      }}
      onPointerUp={event => {
        const start = gesture.current; gesture.current = null;
        event.currentTarget.style.scrollSnapType = "";
        if (event.pointerType === "mouse" && start && moved.current) {
          const dx = event.clientX - start.x;
          select(Math.abs(dx) > 40 ? Math.max(0, Math.min(count - 1, start.index + (dx < 0 ? 1 : -1))) : start.index);
        }
      }}
      onPointerCancel={event => { gesture.current = null; event.currentTarget.style.scrollSnapType = ""; }}
      onDragStart={event => event.preventDefault()}
      onClickCapture={event => { if (moved.current && event.detail !== 0) { event.preventDefault(); event.stopPropagation(); } }}
      className="flex h-full w-full snap-x snap-mandatory overflow-x-auto overflow-y-hidden overscroll-x-contain scrollbar-hide">
      {Array.from({ length: count }, (_, i) => <Link key={product.gallery?.[i]?.src ?? i} href={`/products/${product.slug}`} draggable={false}
        tabIndex={i === active ? 0 : -1} aria-label={`View ${product.title}${product.gallery?.[i]?.label ? `: ${product.gallery[i].label}` : ""}`}
        className="relative block h-full w-full shrink-0 snap-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-neutral-500">
        <ProductVisual product={product} index={i} sizes="(max-width: 1023px) 45vw, 320px" />
      </Link>)}
    </div>
    {count > 1 && <>
      {([-1, 1] as const).map(direction => <button key={direction} type="button" onClick={() => select(active + direction)}
        aria-label={`${direction < 0 ? "Previous" : "Next"} preview of ${product.title}`}
        className={`absolute ${direction < 0 ? "left-2" : "right-2"} top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/75 text-neutral-700 md:opacity-0 md:group-hover/preview:opacity-100 md:group-focus-within/preview:opacity-100 focus-visible:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-neutral-500 transition-opacity duration-150 motion-reduce:transition-none`}>
        {direction < 0 ? <ChevronLeft size={17} /> : <ChevronRight size={17} />}
      </button>)}
      <span className="absolute bottom-2 right-2 rounded-full bg-white/80 px-2 py-1 text-[10px] text-neutral-600" aria-live="polite">{active + 1} / {count}</span>
    </>}
  </div>;
}
