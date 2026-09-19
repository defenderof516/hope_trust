import Image from "next/image";
import Link from "next/link";
import { ArrowRight, GraduationCap, Quote, ShieldCheck } from "lucide-react";
import { educationInitiative, educationSupport, girlsPriority, quotes } from "@/data/content";
import { galleryImages } from "@/data/site";

/**
 * Education support, the girls' education priority, and a values quote.
 *
 * The specific figures drafted in `changes.md` — "at least 60%" and "₹1 crore" —
 * are held back until trustees approve them. See `pendingTrusteeApproval` in
 * `src/data/content.ts`.
 */
export default function EducationPriority() {
  return (
    <section className="relative overflow-hidden bg-paper py-20 sm:py-28">
      <div className="contours pointer-events-none absolute inset-x-0 top-0 h-[30rem] text-ink" />

      <div className="site-shell relative">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <p className="eyebrow text-cyan-dark">Education that keeps futures open</p>
            <h2 className="mt-6 font-display text-5xl font-bold leading-[0.98] sm:text-6xl">
              {educationInitiative.title}
            </h2>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink-soft">
              {educationInitiative.body}
            </p>
            <div className="mt-8 flex gap-4 rounded-[1.6rem] border border-ink/10 bg-white p-6">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-mist text-cyan-dark">
                <GraduationCap size={21} />
              </span>
              <p className="text-base leading-relaxed text-ink-soft">{educationSupport}</p>
            </div>
          </div>

          <div className="relative mx-auto aspect-[4/5] w-full max-w-md self-center overflow-hidden rounded-[2rem] border-[8px] border-white shadow-[0_30px_80px_rgba(16,38,48,0.14)]">
            <Image
              src={galleryImages[41].src}
              alt="Hope Trust supporting families in Tiruvannamalai"
              fill
              sizes="(max-width: 1024px) 90vw, 38vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* Girls' Education Priority */}
        <div className="mt-16 grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
          <article className="rounded-[2.2rem] bg-ink p-8 text-white sm:p-12">
            <span className="grid size-12 place-items-center rounded-full bg-magenta text-white">
              <ShieldCheck size={23} />
            </span>
            <h2 className="mt-7 font-display text-4xl font-bold leading-tight sm:text-5xl">
              {girlsPriority.title}
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/72">
              {girlsPriority.body}
            </p>
            <p className="mt-8 border-t border-white/15 pt-6 text-sm leading-relaxed text-white/55">
              {girlsPriority.inclusion}
            </p>
          </article>

          <article className="flex flex-col justify-between rounded-[2.2rem] bg-sand p-8 sm:p-10">
            <div>
              <Quote className="text-magenta" size={30} />
              <p className="mt-7 font-display text-3xl font-bold leading-snug text-ink">
                “{quotes[1]}”
              </p>
            </div>
            <Link
              href="/donate"
              className="focus-ring mt-10 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 font-extrabold text-white transition hover:bg-magenta"
            >
              Support education
              <ArrowRight size={17} />
            </Link>
          </article>
        </div>
      </div>
    </section>
  );
}
