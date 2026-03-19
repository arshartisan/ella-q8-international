"use client";

import { useLenis as useLenisReact } from "lenis/react";

// Re-export the useLenis hook for easy access
export const useLenis = useLenisReact;

// Helper function to scroll to an element smoothly
export function scrollToElement(
  target: string | HTMLElement,
  options?: {
    offset?: number;
    duration?: number;
    immediate?: boolean;
  }
) {
  const lenis = (window as unknown as { lenis?: { scrollTo: (target: string | HTMLElement, options?: object) => void } }).lenis;
  if (lenis) {
    lenis.scrollTo(target, {
      offset: options?.offset ?? 0,
      duration: options?.duration ?? 1.2,
      immediate: options?.immediate ?? false,
    });
  }
}
