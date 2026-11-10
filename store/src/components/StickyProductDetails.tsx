"use client";

import { CSSProperties, ReactNode, useEffect, useRef, useState } from "react";

export function StickyProductDetails({ children }: { children: ReactNode }) {
  const panel = useRef<HTMLDivElement>(null);
  const [top, setTop] = useState(84);

  useEffect(() => {
    const element = panel.current;
    if (!element) return;
    // Short panels pin below the 60px header. Tall panels scroll far enough
    // to expose their bottom before sticking, without a nested scroll area.
    const measure = () => setTop(Math.min(84, window.innerHeight - element.offsetHeight - 24));
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    window.addEventListener("resize", measure);
    measure();
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return <div ref={panel} style={{ "--product-sticky-top": `${top}px` } as CSSProperties}
    className="lg:col-span-5 flex flex-col gap-5 lg:pt-2 lg:sticky lg:top-[var(--product-sticky-top)] self-start min-w-0">
    {children}
  </div>;
}
