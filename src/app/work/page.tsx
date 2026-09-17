import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { galleryImages, programs } from "@/data/site";

export const metadata: Metadata = {
  title: "Our Work",
  description: "Explore Hope Trust's work in community health, education, women-led enterprise, the environment, livelihoods and relief.",
};

const accent = {
  cyan: "bg-cyan",
  magenta: "bg-magenta text-white",
  lime: "bg-lime",
};

export default function WorkPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-ink pb-20 pt-36 text-white sm:pb-28 sm:pt-44">
        <div className="absolute -right-24 top-10 size-96 rounded-full border-[55px] border-cyan/10" />
        <div className="site-shell relative">
          <p className="eyebrow text-lime">Our work</p>
          <h1 className="mt-6 max-w-5xl text-6xl font-bold leading-[0.9] sm:text-8xl">One community. Many connected needs.</h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/70 sm:text-xl">
            Our programme areas reflect a simple truth: health, knowledge, income, dignity and a thriving environment reinforce one another.
          </p>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="site-shell space-y-6">
          {programs.map((program, index) => {
            const Icon = program.icon;
            return (
              <article key={program.title} className="grid overflow-hidden rounded-[2rem] border border-ink/10 bg-white shadow-[0_12px_50px_rgba(16,38,48,0.06)] lg:grid-cols-[0.42fr_0.58fr]">
                <div className={`${accent[program.accent]} flex min-h-64 flex-col justify-between p-8 sm:p-10`}>
                  <div className="flex items-center justify-between">
                    <span className="grid size-14 place-items-center rounded-full border border-current/15 bg-white/25"><Icon size={27} /></span>
                    <span className="font-display text-5xl font-bold opacity-25">0{index + 1}</span>
                  </div>
                  <h2 className="mt-14 text-4xl font-bold leading-tight sm:text-5xl">{program.shortTitle}</h2>
                </div>
                <div className="p-8 sm:p-10 lg:p-12">
                  <h3 className="text-3xl font-bold leading-tight sm:text-4xl">{program.title}</h3>
                  <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">{program.description}</p>
                  <ul className="mt-7 grid gap-3">
                    {program.details.map((detail) => (
                      <li key={detail} className="flex gap-3 text-base font-semibold text-ink-soft">
                        <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-mist text-cyan-dark"><Check size={15} strokeWidth={3} /></span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="bg-sand py-20 sm:py-28">
        <div className="site-shell grid items-center gap-12 lg:grid-cols-2">
          <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem]">
            <Image src={galleryImages[6].src} alt="Community members gathered during a Hope Trust programme" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
          </div>
          <div>
            <p className="eyebrow text-magenta">Our approach</p>
            <h2 className="mt-5 text-5xl font-bold leading-none sm:text-6xl">Support for today. Capacity for tomorrow.</h2>
            <p className="mt-7 text-lg leading-relaxed text-ink-soft">
              Relief matters when needs are urgent. Lasting progress also requires skills, local leadership and opportunities. We bring both perspectives together: responding with care while helping communities build stronger pathways forward.
            </p>
            <Link href="/gallery" className="focus-ring mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 font-extrabold text-white transition hover:bg-magenta">
              See the work in pictures <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="site-shell rounded-[2.3rem] bg-cyan p-8 sm:p-14">
          <p className="eyebrow text-ink">Collaboration</p>
          <div className="mt-5 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="max-w-4xl text-5xl font-bold leading-[0.98] sm:text-7xl">A good partnership starts with shared purpose.</h2>
            <Link href="/contact" className="focus-ring inline-flex shrink-0 items-center gap-2 rounded-full bg-magenta px-7 py-4 font-extrabold text-white transition hover:bg-ink">
              Contact Hope Trust <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
