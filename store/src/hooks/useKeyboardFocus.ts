"use client";

import { useEffect, useState } from "react";

/** Keep programmatic dialog focus from looking like keyboard navigation. */
export function useKeyboardFocus(initialKeyboardFocus = false) {
  const [keyboardFocus, setKeyboardFocus] = useState(initialKeyboardFocus);

  useEffect(() => {
    const onPointer = () => setKeyboardFocus(false);
    const onKey = (event: KeyboardEvent) => {
      if (["Tab", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End", "PageUp", "PageDown"].includes(event.key)) {
        setKeyboardFocus(true);
      }
    };
    window.addEventListener("pointerdown", onPointer, true);
    window.addEventListener("keydown", onKey, true);
    return () => {
      window.removeEventListener("pointerdown", onPointer, true);
      window.removeEventListener("keydown", onKey, true);
    };
  }, []);

  return keyboardFocus;
}
