"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { films } from "@/data/site";
import usePrefersReducedMotion from "@/components/usePrefersReducedMotion";

/** Slightly brisker than the master, which runs a touch long for an opening. */
const PLAYBACK_RATE = 1.25;

/** If the film has not started by now, let the visitor through to the site. */
const START_TIMEOUT_MS = 3500;
/** Hard ceiling so a stalled film can never hold the page hostage. */
const MAX_VISIBLE_MS = (films.intro.duration / PLAYBACK_RATE + 3) * 1000;
/** How long the static emblem is held when motion is reduced. */
const REDUCED_MOTION_MS = 1500;
const FADE_MS = 420;

/**
 * Whether this page view should show the film.
 *
 * The boot script in `layout.tsx` decides this before first paint and records it
 * on `<html data-intro>`. Read once and cached, so later changes to the
 * attribute cannot pull the layer away mid-playback.
 */
let seenAtLoad: boolean | null = null;

function getSeenSnapshot(): boolean {
  if (seenAtLoad === null) {
    seenAtLoad = document.documentElement.dataset.intro === "seen";
  }
  return seenAtLoad;
}

/** The value never changes within a page load, so there is nothing to subscribe to. */
const subscribeSeen = () => () => {};
/** The export ships the layer in its markup; CSS hides it for repeat views. */
const getSeenServerSnapshot = () => false;

/**
 * Hydration renders one pass with the server snapshot ("not seen") before the
 * store corrects it. Effects fire in that window, so they check the boot
 * script's decision directly rather than trusting that pass.
 */
const introIsHidden = () => document.documentElement.dataset.intro === "seen";

/**
 * Picks the smallest source this device can actually play.
 *
 * The `media` attribute on `<source>` is ignored by every current browser for
 * video, so the choice is made here instead. Phones get the 720p pair, which is
 * what made the film fail to start on slower mobile connections before.
 */
function chooseSource(video: HTMLVideoElement): string {
  const wide = window.matchMedia("(min-width: 1024px)").matches;
  const webm = video.canPlayType('video/webm; codecs="vp9"') !== "";
  if (wide) return webm ? films.intro.webm1080 : films.intro.mp41080;
  return webm ? films.intro.webm720 : films.intro.mp4720;
}

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
    // Releases the scroll lock straight away; the layer fades over the page.
    // "seen" is left alone — overwriting it would un-hide the layer on a repeat
    // view and flash it over the page.
    const root = document.documentElement;
    if (root.dataset.intro !== "seen") root.dataset.intro = "done";
    setClosing(true);
    window.setTimeout(() => setDismissed(true), FADE_MS);
  }, []);

  // Take focus and listen for Esc while the layer is up. Scrolling is already
  // locked by CSS from the first paint.
  useEffect(() => {
    if (!visible || introIsHidden()) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") dismiss();
    };
    skipRef.current?.focus();
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [visible, dismiss]);

  // Reduced motion: hold the emblem briefly, then reveal the page.
  useEffect(() => {
    if (!visible || !reduced || introIsHidden()) return;
    const timer = window.setTimeout(dismiss, REDUCED_MOTION_MS);
    return () => window.clearTimeout(timer);
  }, [visible, reduced, dismiss]);

  // Load and play. The source is attached here rather than in markup so that
  // reduced-motion visitors never fetch a film they will not see.
  useEffect(() => {
    // Nothing is fetched on a repeat view: the guard runs before any src is set.
    if (!showFilm || introIsHidden()) return;
    const video = videoRef.current;
    if (!video) return;

    let started = false;
    const onPlaying = () => {
      started = true;
    };
    video.addEventListener("playing", onPlaying);

    // React can attach `muted` as a property too late for the autoplay check,
    // which is what silently blocks playback on iOS. Set it before loading.
    video.muted = true;
    video.defaultMuted = true;
    video.playbackRate = PLAYBACK_RATE;
    video.src = chooseSource(video);
    video.load();

    const onLoaded = () => {
      video.playbackRate = PLAYBACK_RATE;
    };
    video.addEventListener("loadedmetadata", onLoaded);
    video.play().catch(() => dismiss());

    const startGuard = window.setTimeout(() => {
      if (!started) dismiss();
    }, START_TIMEOUT_MS);
    const hardGuard = window.setTimeout(dismiss, MAX_VISIBLE_MS);

    return () => {
      video.removeEventListener("playing", onPlaying);
      video.removeEventListener("loadedmetadata", onLoaded);
      window.clearTimeout(startGuard);
      window.clearTimeout(hardGuard);
    };
  }, [showFilm, dismiss]);

  if (!visible) return null;

  return (
    <div
      id="intro-film"
      role="dialog"
      aria-modal="true"
      aria-label="Hope Trust opening film"
      className={`fixed inset-0 z-[200] grid place-items-center overflow-hidden bg-ink transition-opacity duration-[420ms] ease-out ${
        closing ? "opacity-0" : "opacity-100"
      }`}
    >
      {showFilm ? (
        // The poster fills the screen from the first paint, so the film is what
        // the visitor sees while the video itself is still arriving.
        <video
          ref={videoRef}
          muted
          playsInline
          preload="none"
          poster={films.intro.poster}
          onEnded={dismiss}
          onError={dismiss}
          className="h-full w-full object-cover"
        />
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
