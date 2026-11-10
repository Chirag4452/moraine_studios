"use client";

import { useKeyboardFocus } from "@/hooks/useKeyboardFocus";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ZoomIn } from "lucide-react";
import { Product } from "@/data/products";
import { ProductLightbox } from "./ProductLightbox";
import { ProductVisual } from "./ProductVisual";
import { WallpaperSilhouette } from "./WallpaperSilhouette";

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


export function ProductGallery({ product }: { product: Product }) {
  const keyboardFocus = useKeyboardFocus();
  const count = product.gallery?.length || 8;
  const variants = generateVariants(product.imageColors, count);
  const [active, setActive] = useState(0);
  const [loaded, setLoaded] = useState<Set<number>>(() => new Set());
  const [failed, setFailed] = useState<Set<number>>(() => new Set());
  const [requested, setRequested] = useState<Set<number>>(() => new Set([0, 1]));
  const strip = useRef<HTMLDivElement>(null);
  const galleryViewport = useRef<HTMLDivElement>(null);
  const pointer = useRef<{ x: number; y: number; left: number; mouse: boolean } | null>(null);
  const suppressClick = useRef(false);
  const openButton = useRef<HTMLButtonElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [moving, setMoving] = useState(false);
  const settleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const markMoving = () => {
    setMoving(true);
    if (settleTimer.current) clearTimeout(settleTimer.current);
    settleTimer.current = setTimeout(() => setMoving(false), 160);
  };
  useEffect(() => () => { if (settleTimer.current) clearTimeout(settleTimer.current); }, []);
  const label = (index: number) => product.gallery?.[index]?.label ?? `Preview ${index + 1}`;
  const preview = (index: number, sizes: string) => product.gallery
    ? <ProductVisual product={product} index={index} sizes={sizes} loading={Math.abs(index - active) <= 1 ? "eager" : "lazy"} />
    : <WallpaperSilhouette colors={variants[index]} gradientStyle={GRADIENT_STYLES[index % GRADIENT_STYLES.length]} />;
  const markActive = (index: number) => {
    setActive(index);
    setRequested(previous => new Set([...Array.from(previous), index, (index + 1) % count, (index - 1 + count) % count]));
  };

  const select = (index: number) => {
    markActive(index);
    galleryViewport.current?.scrollTo({ left: index * galleryViewport.current.clientWidth,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };

  useEffect(() => {
    const viewport = galleryViewport.current;
    if (!viewport) return;
    const observer = new ResizeObserver(() => {
      const index = Number(viewport.dataset.active ?? 0);
      viewport.scrollTo({ left: index * viewport.clientWidth, behavior: "auto" });
    });
    observer.observe(viewport);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const row = strip.current;
    const thumb = row?.children[active] as HTMLElement | undefined;
    if (!row || !thumb) return;
    // Scroll only the thumbnail row; scrollIntoView also moves page ancestors.
    const left = thumb.offsetLeft;
    if (left < row.scrollLeft || left + thumb.offsetWidth > row.scrollLeft + row.clientWidth) {
      row.scrollTo({ left: left - (row.clientWidth - thumb.offsetWidth) / 2, behavior: "auto" });
    }
  }, [active]);

  return <div data-keyboard-focus={keyboardFocus} className="preview-focus-scope flex flex-col gap-4 min-w-0">
    <div className="relative">
    <div ref={galleryViewport} data-active={active} role="region" aria-label="Wallpaper preview gallery" tabIndex={0}
      onKeyDown={event => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault(); select((active + (event.key === "ArrowRight" ? 1 : -1) + count) % count);
        }
      }}
      onScroll={event => {
        markMoving();
        const element = event.currentTarget;
        const index = Math.max(0, Math.min(count - 1, Math.round(element.scrollLeft / element.clientWidth)));
        if (index !== active) markActive(index);
      }}
      onPointerDown={event => {
        suppressClick.current = false;
        if (!event.isPrimary || event.button !== 0) return;
        pointer.current = { x: event.clientX, y: event.clientY, left: event.currentTarget.scrollLeft, mouse: event.pointerType === "mouse" };
      }}
      onPointerMove={event => {
        const start = pointer.current;
        if (!start) return;
        if (start.mouse && event.buttons !== 1) { pointer.current = null; event.currentTarget.style.scrollSnapType = ""; return; }
        const dx = event.clientX - start.x;
        if (Math.abs(dx) > 8 || Math.abs(event.clientY - start.y) > 8) { suppressClick.current = true; markMoving(); }
        if (start.mouse && Math.abs(dx) > 8) {
          event.currentTarget.setPointerCapture(event.pointerId);
          event.currentTarget.style.scrollSnapType = "none";
          event.currentTarget.scrollLeft = start.left - dx;
        }
      }}
      onPointerUp={event => {
        const start = pointer.current; pointer.current = null;
        if (start?.mouse && suppressClick.current) {
          event.currentTarget.style.scrollSnapType = "";
          select(Math.max(0, Math.min(count - 1, Math.round(event.currentTarget.scrollLeft / event.currentTarget.clientWidth))));
        }
      }}
      onPointerCancel={event => { pointer.current = null; event.currentTarget.style.scrollSnapType = ""; }}
      onDragStart={event => event.preventDefault()}
      className={`preview-focus-target relative flex w-full ${product.gallery ? "aspect-square" : "aspect-[4/3]"} snap-x snap-mandatory overflow-x-auto overflow-y-hidden overscroll-x-contain bg-[#e6e5e7] scrollbar-hide`}>
      {variants.map((colors, i) => <div key={product.gallery?.[i]?.src ?? i} className="relative h-full w-full shrink-0 snap-center">
        {product.gallery ? requested.has(i) && <ProductVisual product={product} index={i} priority={i === 0} loading="eager"
          sizes="(max-width: 1023px) calc(100vw - 40px), (max-width: 1400px) 55vw, 760px"
          onLoad={() => setLoaded(previous => new Set([...Array.from(previous), i]))}
          onError={() => setFailed(previous => new Set([...Array.from(previous), i]))} />
          : <WallpaperSilhouette colors={colors} gradientStyle={GRADIENT_STYLES[i % GRADIENT_STYLES.length]} />}
        {product.gallery && !loaded.has(i) && <div role={i === active ? "status" : undefined} className="absolute inset-0 flex items-center justify-center bg-[#e6e5e7] text-sm text-neutral-600">
          {failed.has(i) ? "This preview couldn’t load. Please refresh to try again." : "Loading preview…"}
        </div>}
        <button type="button" tabIndex={i === active ? 0 : -1}
          onClick={event => {
            if (suppressClick.current && event.detail !== 0) { event.preventDefault(); return; }
            markActive(i); setExpanded(true);
          }} aria-label={`Expand ${label(i)}`}
          className="preview-focus-target absolute inset-0 cursor-zoom-in select-none">
        </button>
      </div>)}
    </div>
    <button ref={openButton} type="button" onClick={() => setExpanded(true)} aria-label={`Enlarge ${label(active)}`}
      className={`preview-focus-target absolute bottom-3 right-3 z-10 flex min-h-11 items-center gap-1.5 rounded-full bg-white/90 px-3 py-2 text-xs text-neutral-700 transition-opacity duration-150 ease-out motion-reduce:transition-none ${moving ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
      <ZoomIn size={15} aria-hidden="true" /> Enlarge
    </button>
    </div>
    <div className="flex items-center justify-between gap-3">
      <p className="text-xs text-neutral-500" aria-live="polite">{label(active)} <span aria-hidden="true">·</span> {active + 1} / {count}</p>
      <button type="button" onClick={() => select((active + 1) % count)} aria-label="Next preview; you can also swipe left or right"
        className="preview-focus-target flex min-h-11 shrink-0 items-center gap-2 px-2 text-[10px] font-medium tracking-[0.18em] text-neutral-500 transition-colors duration-150 hover:text-neutral-800 motion-reduce:transition-none">
        SWIPE <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
      </button>
    </div>
    <div ref={strip} className="relative flex gap-2 overflow-x-auto px-1 pt-1 pb-2 scrollbar-hide" aria-label="Product previews">
      {variants.map((colors, i) => <button key={product.gallery?.[i]?.src ?? i} onClick={() => select(i)}
        aria-label={product.gallery?.[i]?.label ?? product.gallery?.[i]?.alt ?? `View image ${i + 1}`} aria-pressed={active === i}
        className={`preview-focus-target relative shrink-0 w-14 h-14 overflow-hidden ${active === i ? "opacity-100" : "opacity-60 hover:opacity-100"}`}>
        {product.gallery ? <ProductVisual product={product} index={i} sizes="56px" /> : <WallpaperSilhouette colors={colors} gradientStyle={GRADIENT_STYLES[i % GRADIENT_STYLES.length]} />}
        {active === i && <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-neutral-500" />}
      </button>)}
    </div>
    {product.previewNote && <p className="text-xs leading-relaxed text-neutral-500">{product.previewNote}</p>}
    {expanded && <ProductLightbox initialKeyboardFocus={keyboardFocus} active={active} count={count} title={product.title} label={label} select={markActive}
      preview={preview} close={() => {
        setExpanded(false);
        galleryViewport.current?.scrollTo({ left: active * galleryViewport.current.clientWidth, behavior: "auto" });
        requestAnimationFrame(() => openButton.current?.focus({ preventScroll: true }));
      }} />}
  </div>;
}
