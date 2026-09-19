"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { films } from "@/data/site";
import { rupeeFilm } from "@/data/content";
import usePrefersReducedMotion from "@/components/usePrefersReducedMotion";

/**
 * The "one rupee" education film.
 *
 * It plays once when it scrolls into view rather than looping, so it never
 * competes with the reading around it. When motion is reduced, the closing
 * frame is shown as a still and no video bytes are fetched.
 */
export default function RupeeFilm() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const [played, setPlayed] = useState(false);

  useEffect(() => {
    if (reduced || played) return;
    const frame = frameRef.current;
    if (!frame) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        observer.disconnect();
        setPlayed(true);
        videoRef.current?.play().catch(() => {
          // Autoplay refused — the replay control is still available.
        });
      },
      { threshold: 0.45 },
    );
    observer.observe(frame);
    return () => observer.disconnect();
  }, [reduced, played]);

  const replay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    video.play().catch(() => {});
  }, []);

  return (
    <section className="relative overflow-hidden bg-ink py-20 text-white sm:py-28">
      <div className="absolute -left-40 top-10 size-[30rem] rounded-full bg-amber-400/10 blur-[120px]" />
      <div className="absolute -right-32 bottom-0 size-[26rem] rounded-full bg-cyan/15 blur-[110px]" />

      <div className="site-shell relative grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div
          ref={frameRef}
          className="relative aspect-video overflow-hidden rounded-[2rem] border border-white/10 bg-black shadow-[0_40px_90px_rgba(0,0,0,0.45)]"
        >
          {!reduced ? (
            <>
              <video
                ref={videoRef}
                muted
                playsInline
                preload="metadata"
                poster={films.rupee.poster}
                className="h-full w-full object-cover"
              >
                <source src={films.rupee.webm1080} type="video/webm" media="(min-width: 1024px)" />
                <source src={films.rupee.mp41080} type="video/mp4" media="(min-width: 1024px)" />
                <source src={films.rupee.webm720} type="video/webm" />
                <source src={films.rupee.mp4720} type="video/mp4" />
              </video>
              <button
                type="button"
                onClick={replay}
                className="focus-ring absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-ink/65 px-4 py-2 text-xs font-extrabold text-white backdrop-blur-md transition hover:border-white hover:bg-white hover:text-ink"
              >
                <Play size={14} />
                {played ? "Play again" : "Play the film"}
              </button>
            </>
          ) : (
            <Image
              src={films.rupee.still}
              alt="A student studying at a sunlit desk in Tamil Nadu"
              fill
              sizes="(max-width: 1024px) 100vw, 52vw"
              className="object-cover"
            />
          )}

          {/* The film carries no burnt-in text, so the line is laid over it here. */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent p-6 pt-24 sm:p-8 sm:pt-28">
            <p className="max-w-lg font-display text-2xl font-bold leading-tight text-white drop-shadow sm:text-3xl">
              {rupeeFilm.headline}
            </p>
          </div>
        </div>

        <div>
          <p className="eyebrow text-amber-300">Education</p>
          <h2 className="mt-6 font-display text-4xl font-bold leading-[1.05] sm:text-5xl">
            {rupeeFilm.headline}
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/72">
            {rupeeFilm.caption}
          </p>

          <Link
            href="/donate"
            className="focus-ring mt-9 inline-flex items-center gap-3 rounded-full bg-amber-300 px-7 py-4 font-extrabold text-ink transition hover:-translate-y-0.5 hover:bg-white"
          >
            Support education
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
