import type { Metadata } from "next";
import GalleryGrid from "@/components/GalleryGrid";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photographs from Hope Trust's community relief work in Tiruvannamalai.",
};

export default function GalleryPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-magenta pb-20 pt-36 text-white sm:pb-24 sm:pt-44">
        <div className="absolute -right-20 -top-20 size-80 rounded-full border-[44px] border-white/10" />
        <div className="site-shell relative">
          <p className="eyebrow text-lime">Field gallery</p>
          <h1 className="mt-6 max-w-5xl text-6xl font-bold leading-[0.9] sm:text-8xl">The people and moments behind the work.</h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/75 sm:text-xl">
            A visual record of community relief and essential-supply distribution in Tiruvannamalai. Every photograph is hosted through Hope Trust’s Cloudflare gallery.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-20">
        <div className="site-shell">
          <div className="mb-8 flex flex-col gap-2 border-b border-ink/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-3xl font-bold">Community relief collection</h2>
            <p className="text-sm font-bold text-ink-soft/65">94 photographs · Tap any image to enlarge</p>
          </div>
          <GalleryGrid />
        </div>
      </section>
    </>
  );
}
