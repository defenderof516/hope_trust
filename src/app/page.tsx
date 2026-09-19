import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, MapPin, Sparkles } from "lucide-react";
import EducationPriority from "@/components/EducationPriority";
import RupeeFilm from "@/components/RupeeFilm";
import { mission } from "@/data/content";
import { galleryImages, programs, registrations } from "@/data/site";

const accentClasses = {
  cyan: "bg-cyan text-ink",
  magenta: "bg-magenta text-white",
  lime: "bg-lime text-ink",
};

export default function Home() {
  return (
    <>
      <section className="noise relative min-h-[760px] overflow-hidden bg-ink pb-24 pt-32 text-white lg:min-h-[820px] lg:pb-28 lg:pt-40">
        <div className="absolute inset-0 opacity-[0.08] dot-grid" />
        <div className="absolute -left-40 top-20 size-[28rem] rounded-full bg-magenta/30 blur-[100px]" />
        <div className="absolute -right-32 bottom-0 size-[34rem] rounded-full bg-cyan/25 blur-[110px]" />

        <div className="site-shell relative grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative z-10">
            <p className="eyebrow text-cyan">Tiruvannamalai · Since 2017</p>
            <h1 className="mt-7 max-w-3xl text-[clamp(4rem,9vw,7.7rem)] font-bold leading-[0.84]">
              Hope is a <span className="text-lime italic">public</span> act.
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/72 sm:text-xl">
              {mission}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/donate" className="focus-ring group inline-flex items-center justify-center gap-3 rounded-full bg-cyan px-7 py-4 font-extrabold text-ink transition hover:-translate-y-1 hover:bg-white">
                Support education
                <ArrowRight size={19} className="transition group-hover:translate-x-1" />
              </Link>
              <Link href="/work" className="focus-ring inline-flex items-center justify-center rounded-full border border-white/25 px-7 py-4 font-extrabold text-white transition hover:border-white hover:bg-white/10">
                Explore our work
              </Link>
            </div>
          </div>

          <div className="relative mx-auto h-[29rem] w-full max-w-[34rem] sm:h-[34rem]">
            <div className="absolute inset-x-8 top-0 h-[82%] overflow-hidden rounded-[2.2rem] border-[6px] border-white/10 bg-cyan shadow-[0_40px_80px_rgba(0,0,0,0.36)] sm:inset-x-12">
              <Image
                src={galleryImages[89].src}
                alt="Hope Trust team meeting community members in Tiruvannamalai"
                fill
                sizes="(max-width: 1024px) 80vw, 38vw"
                className="object-cover"
                preload
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-lime">In the community</p>
                  <p className="mt-1 font-display text-2xl font-bold">Presence before promises.</p>
                </div>
                <MapPin className="shrink-0 text-cyan" />
              </div>
            </div>

            <div className="float-card absolute bottom-0 left-0 w-[44%] overflow-hidden rounded-[1.5rem] border-4 border-ink bg-white shadow-2xl">
              <div className="relative aspect-[4/5]">
                <Image src={galleryImages[23].src} alt="Hope Trust relief distribution" fill sizes="22vw" className="object-cover" />
              </div>
            </div>

            <div className="absolute -right-1 bottom-7 rotate-3 rounded-[1.4rem] bg-magenta px-5 py-5 text-white shadow-2xl sm:right-0">
              <Sparkles size={22} />
              <p className="mt-4 max-w-32 font-display text-2xl font-bold leading-tight">Together towards tomorrow.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="overflow-hidden border-y border-ink/10 bg-lime py-4">
        <div className="marquee-track flex w-max items-center gap-8 whitespace-nowrap text-sm font-extrabold uppercase tracking-[0.16em] text-ink">
          {[...Array(2)].flatMap((_, group) => [
            "Community health",
            "Education",
            "Women-led enterprise",
            "Self-help groups",
            "Environment",
            "Sustainable livelihoods",
          ].map((item) => (
            <span key={`${group}-${item}`} className="flex items-center gap-8">
              {item}<span aria-hidden="true">✦</span>
            </span>
          )))}
        </div>
      </div>

      <EducationPriority />

      <RupeeFilm />

      <section className="py-20 sm:py-28">
        <div className="site-shell">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="eyebrow text-magenta">How we serve</p>
              <h2 className="mt-5 text-5xl font-bold leading-[0.98] sm:text-6xl">Five connected paths to stronger communities.</h2>
            </div>
            <div className="self-end">
              <p className="max-w-2xl text-lg leading-relaxed text-ink-soft">
                Hope Trust’s work is grounded in the objectives set out in its founding deed: education, health, skills, self-help groups, sustainable agriculture, environmental restoration and support for people facing hardship.
              </p>
              <Link href="/about" className="focus-ring mt-6 inline-flex items-center gap-2 rounded font-extrabold text-cyan-dark hover:text-magenta">
                Read our story <ArrowRight size={18} />
              </Link>
            </div>
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {programs.map((program, index) => {
              const Icon = program.icon;
              return (
                <article key={program.title} className={`group min-h-[23rem] rounded-[2rem] p-7 transition duration-300 hover:-translate-y-2 ${index === 0 ? "lg:col-span-2" : ""} ${accentClasses[program.accent]}`}>
                  <div className="flex items-start justify-between">
                    <span className="grid size-12 place-items-center rounded-full border border-current/20 bg-white/15"><Icon size={24} /></span>
                    <span className="font-display text-4xl font-bold opacity-25">0{index + 1}</span>
                  </div>
                  <h3 className={`mt-16 font-bold leading-tight ${index === 0 ? "max-w-2xl text-4xl sm:text-5xl" : "text-3xl"}`}>{program.title}</h3>
                  <p className="mt-5 max-w-xl text-base leading-relaxed opacity-80">{program.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-sand py-20 sm:py-28">
        <div className="site-shell">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow text-cyan-dark">From the field</p>
              <h2 className="mt-5 max-w-2xl text-5xl font-bold leading-none sm:text-6xl">Care, documented in real moments.</h2>
            </div>
            <Link href="/gallery" className="focus-ring inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-extrabold text-white transition hover:bg-magenta">
              View all 94 photos <ArrowRight size={17} />
            </Link>
          </div>

          <div className="mt-12 grid h-[38rem] grid-cols-2 grid-rows-2 gap-3 sm:grid-cols-4 sm:gap-5">
            {[0, 34, 66, 88].map((index, photoIndex) => (
              <div key={index} className={`relative overflow-hidden rounded-[1.5rem] ${photoIndex === 0 ? "col-span-2 row-span-2" : photoIndex === 3 ? "col-span-2" : ""}`}>
                <Image src={galleryImages[index].src} alt={galleryImages[index].alt} fill sizes="(max-width: 640px) 50vw, 25vw" className="object-cover transition duration-700 hover:scale-105" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="site-shell grid overflow-hidden rounded-[2.3rem] bg-white shadow-[0_24px_80px_rgba(16,38,48,0.1)] lg:grid-cols-[0.8fr_1.2fr]">
          <div className="bg-cyan p-8 sm:p-12">
            <BadgeCheck size={44} />
            <p className="eyebrow mt-8 text-ink">Accountable by design</p>
            <h2 className="mt-5 text-4xl font-bold leading-tight sm:text-5xl">Registered. Transparent. Community-rooted.</h2>
          </div>
          <div className="grid gap-px bg-ink/10 sm:grid-cols-2">
            {registrations.map((item) => (
              <div key={item.label} className="bg-white p-7 sm:p-9">
                <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-ink-soft/60">{item.label}</p>
                <p className="mt-3 break-all font-display text-2xl font-bold text-ink">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20 sm:pb-28">
        <div className="site-shell relative overflow-hidden rounded-[2.4rem] bg-magenta px-7 py-16 text-white sm:px-14 sm:py-20">
          <div className="absolute right-0 top-0 size-64 translate-x-1/3 -translate-y-1/3 rounded-full border-[30px] border-white/10" />
          <p className="eyebrow text-lime">Work with us</p>
          <h2 className="mt-5 max-w-4xl text-5xl font-bold leading-[0.98] sm:text-7xl">Local action grows through trusted partnerships.</h2>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/donate" className="focus-ring inline-flex items-center justify-center gap-3 rounded-full bg-white px-7 py-4 font-extrabold text-magenta transition hover:bg-lime hover:text-ink">
              Support a student <ArrowRight size={18} />
            </Link>
            <Link href="/contact" className="focus-ring inline-flex items-center justify-center rounded-full border border-white/35 px-7 py-4 font-extrabold text-white transition hover:border-white hover:bg-white/10">
              Partner with Hope Trust
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
