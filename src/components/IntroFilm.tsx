"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { films } from "@/data/site";
import usePrefersReducedMotion from "@/components/usePrefersReducedMotion";

const SESSION_KEY = "hope-trust-intro-seen";

/** If the film has not started by now, let the visitor through to the site. */
const START_TIMEOUT_MS = 2500;
/** Hard ceiling so a stalled film can never hold the page hostage. */
const MAX_VISIBLE_MS = (films.intro.duration + 3) * 1000;
/** How long the static emblem is held when motion is reduced. */
const REDUCED_MOTION_MS = 1500;
const FADE_MS = 420;

/**
 * Whether this browser session has already seen the film.
 *
 * Captured once per page load and cached, so marking the session as seen later
 * cannot yank the layer away mid-playback.
 */
let seenAtLoad: boolean | null = null;

function getSeenSnapshot(): boolean {
  if (seenAtLoad === null) {
    try {
      seenAtLoad = window.sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      // Without sessionStorage the film shows once per page load rather than
      // once per session. Still better than blocking the visitor.
      seenAtLoad = false;
    }
  }
  return seenAtLoad;
}

/** The value never changes within a page load, so there is nothing to subscribe to. */
const subscribeSeen = () => () => {};
/** The static export renders no overlay; it appears after hydration if needed. */
const getSeenServerSnapshot = () => true;

/**
 * Full-screen welcome layer shown on the first page view of a browser session.
 *
 * It never blocks the site: autoplay refusal, a load error, a slow network, or
 * a reduced-motion preference all fall through to the Home page immediately.
 */
export default function IntroFilm() {
  const seen = useSyncExternalStore(subscribeSeen, getSeenSnapshot, getSeenServerSnapshot);
  const reduced = usePrefersReducedMotion();
  const [dismissed, setDismissed] = useState(false);
  const [closing, setClosing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const skipRef = useRef<HTMLButtonElement>(null);

  const visible = !seen && !dismissed;
  const showFilm = visible && !reduced;

  const dismiss = useCallback(() => {
    setClosing(true);
    window.setTimeout(() => setDismissed(true), FADE_MS);
  }, []);

  // Mark the session as seen. Cached above, so this cannot affect the current view.
  useEffect(() => {
    try {
      window.sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // Nothing to persist to.
    }
  }, []);

  // Lock scrolling, take focus, and listen for Esc while the layer is up.
  useEffect(() => {
    if (!visible) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") dismiss();
    };
    document.body.style.overflow = "hidden";
    skipRef.current?.focus();
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [visible, dismiss]);

  // Reduced motion: hold the emblem briefly, then reveal the page.
  useEffect(() => {
    if (!visible || !reduced) return;
    const timer = window.setTimeout(dismiss, REDUCED_MOTION_MS);
    return () => window.clearTimeout(timer);
  }, [visible, reduced, dismiss]);

  // Playback guards.
  useEffect(() => {
    if (!showFilm) return;
    const video = videoRef.current;
    if (!video) return;

    let started = false;
    const onPlaying = () => {
      started = true;
    };
    video.addEventListener("playing", onPlaying);
    video.play().catch(() => dismiss());

    const startGuard = window.setTimeout(() => {
      if (!started) dismiss();
    }, START_TIMEOUT_MS);
    const hardGuard = window.setTimeout(dismiss, MAX_VISIBLE_MS);

    return () => {
      video.removeEventListener("playing", onPlaying);
      window.clearTimeout(startGuard);
      window.clearTimeout(hardGuard);
    };
  }, [showFilm, dismiss]);

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Hope Trust opening film"
      className={`fixed inset-0 z-[200] grid place-items-center overflow-hidden bg-ink transition-opacity duration-[420ms] ease-out ${
        closing ? "opacity-0" : "opacity-100"
      }`}
    >
      {showFilm ? (
        <video
          ref={videoRef}
          muted
          playsInline
          autoPlay
          preload="auto"
          poster={films.intro.poster}
          onEnded={dismiss}
          onError={dismiss}
          className="h-full w-full object-cover"
        >
          {/* Larger screens take the 1080p pair; everything else takes 720p. */}
          <source src={films.intro.webm1080} type="video/webm" media="(min-width: 1024px)" />
          <source src={films.intro.mp41080} type="video/mp4" media="(min-width: 1024px)" />
          <source src={films.intro.webm720} type="video/webm" />
          <source src={films.intro.mp4720} type="video/mp4" />
        </video>
      ) : (
        <Image
          src="/assets/hope-trust-logo.png"
          alt="Hope Trust"
          width={320}
          height={320}
          preload
          className="w-40 sm:w-56"
        />
      )}

      <button
        ref={skipRef}
        type="button"
        onClick={dismiss}
        className="focus-ring absolute bottom-6 right-5 rounded-full border border-white/25 bg-ink/60 px-5 py-2.5 text-sm font-extrabold text-white backdrop-blur-md transition hover:border-white hover:bg-white hover:text-ink sm:bottom-9 sm:right-9"
      >
        Skip intro
      </button>
    </div>
  );
}
