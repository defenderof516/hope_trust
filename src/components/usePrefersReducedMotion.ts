"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const list = window.matchMedia(QUERY);
  list.addEventListener("change", onChange);
  return () => list.removeEventListener("change", onChange);
}

const getSnapshot = () => window.matchMedia(QUERY).matches;

// The server cannot know the preference, so assume the common case: motion is
// allowed. Markup then ships the video element, and a visitor who prefers
// reduced motion swaps to the still at hydration before anything is fetched.
const getServerSnapshot = () => false;

/** Tracks the visitor's reduced-motion preference, including later changes to it. */
export default function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
