import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Quote } from "lucide-react";
import { galleryImages, registrations, trust } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Hope Trust's origins, purpose, leadership and registered status in Tiruvannamalai.",
};

const principles = [
  ["Listen first", "Programmes begin with the priorities people express, not assumptions made from a distance."],
  ["Build capability", "We pair immediate support with knowledge, skills and community structures that can last."],
  ["Care for the whole system", "Health, livelihoods, education and the environment are connected in everyday life."],
  ["Work with dignity", "Every person is treated as a participant in progress, never simply as a beneficiary."],
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-mist pb-20 pt-36 sm:pb-28 sm:pt-44">
        <div className="absolute right-0 top-0 h-full w-1/3 opacity-60 dot-grid" />
        <div className="site-shell relative grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="eyebrow text-magenta">Who we are</p>
            <h1 className="mt-6 text-6xl font-bold leading-[0.9] sm:text-8xl">A local trust with a wide view of wellbeing.</h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-soft sm:text-xl">
              Hope Trust was established in Tiruvannamalai in 2017 as a public charitable trust. Its founding objectives connect education, health, skills, community organisation, sustainable agriculture, environmental care and support during hardship.
            </p>
          </div>
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2rem] border-[10px] border-white shadow-2xl">
            <Image src={galleryImages[81].src} alt="Hope Trust team supporting a community member" fill sizes="(max-width: 1024px) 90vw, 35vw" className="object-cover" preload />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent p-7 pt-20 text-white">
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-lime">Our place</p>
              <p className="mt-2 font-display text-3xl font-bold">Tiruvannamalai, Tamil Nadu</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="site-shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div>
            <p className="eyebrow text-cyan-dark">Our purpose</p>
            <h2 className="mt-5 text-5xl font-bold leading-none sm:text-6xl">Progress people can shape and sustain.</h2>
          </div>
          <div className="space-y-7 text-lg leading-relaxed text-ink-soft">
            <p>
              The trust’s governing deed places rural welfare at the centre of its work. It calls for education and training, community health and medical camps, skill development, self-help groups, sustainable agriculture, natural farming, dry-land development, rehabilitation and relief.
            </p>
            <p>
              Today, that mandate is expressed through practical community programmes and collaborations in Tiruvannamalai district, with particular attention to women, families with limited resources, people with disabilities, farmers and people navigating periods of crisis.
            </p>
            <div className="rounded-[1.7rem] bg-sand p-7 text-ink">
              <Quote className="text-magenta" size={30} />
              <p className="mt-4 font-display text-3xl font-bold leading-snug">
                Together towards tomorrow is more than a line on our emblem. It is how we choose to work.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ink py-20 text-white sm:py-28">
        <div className="site-shell">
          <p className="eyebrow text-lime">How we work</p>
          <div className="mt-10 grid gap-px overflow-hidden rounded-[2rem] bg-white/15 md:grid-cols-2">
            {principles.map(([title, description], index) => (
              <article key={title} className="bg-ink p-8 sm:p-10">
                <div className="flex items-center gap-4">
                  <span className="grid size-10 place-items-center rounded-full bg-cyan font-extrabold text-ink">{index + 1}</span>
                  <h2 className="text-3xl font-bold">{title}</h2>
                </div>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-white/68">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="site-shell grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
          <div className="rounded-[2rem] bg-cyan p-8 sm:p-10">
            <p className="eyebrow text-ink">Governance</p>
            <h2 className="mt-5 text-4xl font-bold leading-tight">Public purpose, formal accountability.</h2>
            <div className="mt-8 border-t border-ink/20 pt-6">
              <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-ink/60">Managing Trustee</p>
              <p className="mt-2 font-display text-3xl font-bold">{trust.managingTrustee}</p>
            </div>
          </div>
          <div className="rounded-[2rem] border border-ink/10 bg-white p-7 sm:p-10">
            <div className="grid gap-4 sm:grid-cols-2">
              {registrations.map((item) => (
                <div key={item.label} className="rounded-2xl bg-paper p-5">
                  <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.11em] text-ink-soft/65"><CheckCircle2 size={15} className="text-lime" /> {item.label}</p>
                  <p className="mt-3 break-all font-bold">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20 sm:pb-28">
        <div className="site-shell flex flex-col gap-7 rounded-[2.2rem] bg-magenta px-8 py-12 text-white sm:flex-row sm:items-center sm:justify-between sm:px-12">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-lime">Next</p>
            <h2 className="mt-2 text-4xl font-bold">See how our purpose becomes action.</h2>
          </div>
          <Link href="/work" className="focus-ring inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3.5 font-extrabold text-magenta transition hover:bg-lime hover:text-ink">
            Explore our work <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </>
  );
}
