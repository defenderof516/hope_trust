"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useState } from "react";
import { galleryImages } from "@/data/site";

const INITIAL_COUNT = 18;

export default function GalleryGrid() {
  const [visible, setVisible] = useState(INITIAL_COUNT);
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    if (selected === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
      if (event.key === "ArrowRight") setSelected((current) => current === null ? 0 : (current + 1) % galleryImages.length);
      if (event.key === "ArrowLeft") setSelected((current) => current === null ? 0 : (current - 1 + galleryImages.length) % galleryImages.length);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selected]);

  const showPrevious = () => setSelected((current) => current === null ? 0 : (current - 1 + galleryImages.length) % galleryImages.length);
  const showNext = () => setSelected((current) => current === null ? 0 : (current + 1) % galleryImages.length);

  return (
    <>
      <div className="grid auto-rows-[12rem] grid-cols-2 gap-3 sm:auto-rows-[15rem] md:grid-cols-3 lg:grid-cols-4">
        {galleryImages.slice(0, visible).map((image, index) => (
          <button
            key={image.id}
            type="button"
            onClick={() => setSelected(index)}
            className={`focus-ring group relative overflow-hidden rounded-[1.3rem] bg-mist ${index % 11 === 0 ? "row-span-2" : ""} ${index % 13 === 0 ? "sm:col-span-2" : ""}`}
            aria-label={`Open photograph ${image.id}`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
            <span className="absolute bottom-3 right-3 grid size-8 place-items-center rounded-full bg-white/90 text-xs font-extrabold text-ink opacity-0 shadow-lg transition group-hover:opacity-100 group-focus-visible:opacity-100">
              {String(image.id).padStart(2, "0")}
            </span>
          </button>
        ))}
      </div>

      {visible < galleryImages.length && (
        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={() => setVisible((count) => Math.min(count + 20, galleryImages.length))}
            className="focus-ring rounded-full bg-ink px-7 py-4 font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-magenta"
          >
            Load more photographs · {galleryImages.length - visible} remaining
          </button>
        </div>
      )}

      {selected !== null && (
        <div className="fixed inset-0 z-[100] grid place-items-center bg-ink/95 p-4" role="dialog" aria-modal="true" aria-label={`Photograph ${selected + 1} of ${galleryImages.length}`}>
          <button type="button" onClick={() => setSelected(null)} className="focus-ring absolute right-4 top-4 grid size-12 place-items-center rounded-full bg-white text-ink sm:right-7 sm:top-7" aria-label="Close photograph">
            <X size={23} />
          </button>
          <button type="button" onClick={showPrevious} className="focus-ring absolute left-3 z-10 grid size-11 place-items-center rounded-full bg-white text-ink sm:left-7 sm:size-12" aria-label="Previous photograph">
            <ChevronLeft size={25} />
          </button>
          <div className="relative h-[78vh] w-[86vw] max-w-6xl overflow-hidden rounded-[1.5rem] bg-black">
            <Image src={galleryImages[selected].src} alt={galleryImages[selected].alt} fill sizes="90vw" className="object-contain" preload />
          </div>
          <button type="button" onClick={showNext} className="focus-ring absolute right-3 z-10 grid size-11 place-items-center rounded-full bg-white text-ink sm:right-7 sm:size-12" aria-label="Next photograph">
            <ChevronRight size={25} />
          </button>
          <p className="absolute bottom-4 text-sm font-bold text-white/70 sm:bottom-7">{selected + 1} / {galleryImages.length}</p>
        </div>
      )}
    </>
  );
}
