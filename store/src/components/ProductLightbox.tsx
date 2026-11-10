"use client";

import { useKeyboardFocus } from "@/hooks/useKeyboardFocus";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X, ZoomIn, ZoomOut } from "lucide-react";

interface Props {
  active: number;
  initialKeyboardFocus?: boolean;
  count: number;
  title: string;
  label: (index: number) => string;
  select: (index: number) => void;
  close: () => void;
  preview: (index: number, sizes: string) => React.ReactNode;
}

export function ProductLightbox({ active, count, title, label, select, close, preview, initialKeyboardFocus = false }: Props) {
  const keyboardFocus = useKeyboardFocus(initialKeyboardFocus);
  const dialog = useRef<HTMLDialogElement>(null);
  const thumbnails = useRef<HTMLDivElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const frames = useRef<(HTMLElement | null)[]>([]);
  const activeRef = useRef(active);
  activeRef.current = active;
  const [zoomed, setZoomed] = useState(false);
  const scrollFrame = useRef<number | null>(null);

  useEffect(() => {
    const element = dialog.current;
    const area = viewport.current;
    if (!element || !area) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    element.showModal();
    const resize = () => {
      area.style.setProperty("--preview-height", `${area.clientHeight}px`);
      const frame = frames.current[activeRef.current];
      if (frame) area.scrollTop = frame.offsetTop;
    };
    const observer = new ResizeObserver(resize);
    observer.observe(area);
    resize();
    return () => {
      observer.disconnect();
      if (scrollFrame.current !== null) cancelAnimationFrame(scrollFrame.current);
      element.close();
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useLayoutEffect(() => {
    const frame = frames.current[activeRef.current];
    if (frame && viewport.current) {
      viewport.current.scrollTop = frame.offsetTop;
      viewport.current.scrollLeft = 0;
    }
  }, [zoomed]);

  useEffect(() => {
    const row = thumbnails.current;
    const thumb = row?.children[active] as HTMLElement | undefined;
    if (!row || !thumb) return;
    const vertical = window.matchMedia("(min-width: 768px)").matches;
    if (vertical) {
      if (thumb.offsetTop < row.scrollTop || thumb.offsetTop + thumb.offsetHeight > row.scrollTop + row.clientHeight) {
        row.scrollTop = thumb.offsetTop - (row.clientHeight - thumb.offsetHeight) / 2;
      }
    } else if (thumb.offsetLeft < row.scrollLeft || thumb.offsetLeft + thumb.offsetWidth > row.scrollLeft + row.clientWidth) {
      row.scrollLeft = thumb.offsetLeft - (row.clientWidth - thumb.offsetWidth) / 2;
    }
  }, [active]);

  const jump = (index: number) => {
    const frame = frames.current[index];
    if (!frame) return;
    select(index);
    viewport.current?.scrollTo({ top: frame.offsetTop,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };

  const updateFromScroll = () => {
    if (scrollFrame.current !== null) return;
    scrollFrame.current = requestAnimationFrame(() => {
      scrollFrame.current = null;
      const area = viewport.current;
      if (!area) return;
      const center = area.scrollTop + area.clientHeight / 2;
      let index = 0;
      let best = Infinity;
      frames.current.forEach((frame, i) => {
        if (!frame) return;
        const distance = Math.abs(frame.offsetTop + frame.offsetHeight / 2 - center);
        if (distance < best) { best = distance; index = i; }
      });
      if (index !== activeRef.current) select(index);
    });
  };

  return createPortal(
    <dialog data-keyboard-focus={keyboardFocus} ref={dialog} aria-labelledby="product-preview-title" onCancel={event => { event.preventDefault(); close(); }}
      onKeyDown={event => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault(); jump(Math.max(0, Math.min(count - 1, active + (event.key === "ArrowRight" ? 1 : -1))));
        }
      }}
      className="preview-focus-scope fixed inset-0 m-0 h-[100dvh] max-h-none w-screen max-w-none border-0 bg-[#f2f2f2] p-0 text-neutral-800 backdrop:bg-[#f2f2f2]">
      <div className="flex h-full min-h-0 flex-col">
        <div className="flex shrink-0 items-center justify-between gap-3 px-4 py-3 md:px-7 md:py-4">
          <div className="min-w-0">
            <h2 id="product-preview-title" className="truncate text-sm font-medium">{title}</h2>
            <p className="text-xs text-neutral-500" aria-live="polite">{label(active)} · {active + 1} / {count}</p>
            <p className="mt-1 text-[10px] tracking-[0.14em] text-neutral-500">SCROLL TO EXPLORE</p>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <button type="button" onClick={() => setZoomed(value => !value)} aria-label={zoomed ? "Fit previews to screen" : "Zoom in on previews"} aria-pressed={zoomed}
              className="preview-focus-target flex h-11 w-11 items-center justify-center rounded-full border border-neutral-300">
              {zoomed ? <ZoomOut size={19} /> : <ZoomIn size={19} />}
            </button>
            <button type="button" autoFocus onClick={close} aria-label="Close image preview"
              className="preview-focus-target flex h-12 w-12 items-center justify-center rounded-full border border-neutral-800 md:h-16 md:w-16">
              <X className="h-6 w-6 stroke-[1.5]" />
            </button>
          </div>
        </div>
        <div className="flex min-h-0 flex-1 flex-col gap-3 px-3 pb-4 md:flex-row md:gap-5 md:px-7 md:pb-6">
          <div ref={viewport} onScroll={updateFromScroll} tabIndex={0} aria-label="Scroll through enlarged previews"
            className="preview-focus-target relative min-h-0 min-w-0 flex-1 overflow-auto overscroll-contain">
            {Array.from({ length: count }, (_, i) => <figure key={i} ref={element => { frames.current[i] = element; }}
              className="relative m-0 min-h-[240px]" style={{ width: zoomed ? "180%" : "100%", height: zoomed ? "calc(var(--preview-height, 70vh) * 1.8)" : "var(--preview-height, 70vh)" }}>
              <div className="absolute inset-x-0 top-0 bottom-9">{preview(i, "180vw")}</div>
              <figcaption className="absolute bottom-3 left-4 text-xs text-neutral-500">{label(i)}</figcaption>
            </figure>)}
          </div>
          <div ref={thumbnails} aria-label="Expanded preview thumbnails"
            className="relative flex shrink-0 gap-2 overflow-x-auto overscroll-contain p-1 md:w-24 md:flex-col md:overflow-x-hidden md:overflow-y-auto">
            {Array.from({ length: count }, (_, i) => <button key={i} type="button" onClick={() => jump(i)} aria-label={`Scroll to ${label(i)}`} aria-pressed={i === active}
              className={`preview-focus-target relative h-20 w-20 shrink-0 overflow-hidden rounded-md border p-1 ${i === active ? "border-neutral-500 bg-white" : "border-transparent opacity-70 hover:opacity-100"}`}>
              {preview(i, "72px")}
            </button>)}
          </div>
        </div>
        <p className="sr-only">Scroll down or up to browse previews. Select a thumbnail or use the left and right arrow keys to jump to an image. Press Escape to close. Zoom in and scroll to inspect details.</p>
      </div>
    </dialog>, document.body);
}
