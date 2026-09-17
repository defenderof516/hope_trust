import type { Metadata } from "next";
import { ArrowUpRight, Clock3, Mail, MapPin, Phone } from "lucide-react";
import { trust } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Hope Trust in Tiruvannamalai to discuss volunteering, programme partnerships and community support.",
};

export default function ContactPage() {
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(trust.address.join(", "))}`;

  return (
    <>
      <section className="relative overflow-hidden bg-cyan pb-20 pt-36 sm:pb-28 sm:pt-44">
        <div className="absolute inset-y-0 right-0 w-2/5 opacity-30 dot-grid" />
        <div className="site-shell relative">
          <p className="eyebrow text-ink">Contact</p>
          <h1 className="mt-6 max-w-5xl text-6xl font-bold leading-[0.9] sm:text-8xl">A conversation can be the first useful step.</h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-soft sm:text-xl">
            Get in touch about programme partnerships, volunteering, institutional support or a need in the community.
          </p>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="site-shell grid gap-7 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-[2.2rem] bg-ink p-8 text-white sm:p-12">
            <p className="eyebrow text-lime">Reach Hope Trust</p>
            <div className="mt-10 grid gap-5">
              <a href={`mailto:${trust.email}`} className="focus-ring group rounded-[1.4rem] border border-white/12 bg-white/5 p-6 transition hover:bg-white/10">
                <span className="flex items-start gap-4">
                  <span className="grid size-12 shrink-0 place-items-center rounded-full bg-magenta"><Mail size={22} /></span>
                  <span>
                    <span className="block text-xs font-extrabold uppercase tracking-[0.14em] text-white/50">Email</span>
                    <span className="mt-2 block break-all text-lg font-bold">{trust.email}</span>
                  </span>
                </span>
              </a>

              <div className="rounded-[1.4rem] border border-white/12 bg-white/5 p-6">
                <span className="flex items-start gap-4">
                  <span className="grid size-12 shrink-0 place-items-center rounded-full bg-cyan text-ink"><Phone size={22} /></span>
                  <span>
                    <span className="block text-xs font-extrabold uppercase tracking-[0.14em] text-white/50">Phone</span>
                    <span className="mt-2 flex flex-col gap-1 text-lg font-bold">
                      {trust.phones.map((phone, index) => (
                        <a key={phone} href={`tel:${trust.phoneLinks[index]}`} className="focus-ring rounded hover:text-cyan">{phone}</a>
                      ))}
                    </span>
                  </span>
                </span>
              </div>

              <a href={mapUrl} target="_blank" rel="noreferrer" className="focus-ring group rounded-[1.4rem] border border-white/12 bg-white/5 p-6 transition hover:bg-white/10">
                <span className="flex items-start gap-4">
                  <span className="grid size-12 shrink-0 place-items-center rounded-full bg-lime text-ink"><MapPin size={22} /></span>
                  <span className="flex-1">
                    <span className="block text-xs font-extrabold uppercase tracking-[0.14em] text-white/50">Office</span>
                    <span className="mt-2 block text-lg font-bold leading-relaxed">{trust.address.join(", ")}</span>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-extrabold text-lime">Open in maps <ArrowUpRight size={15} /></span>
                  </span>
                </span>
              </a>
            </div>
          </div>

          <aside className="flex flex-col gap-7">
            <div className="rounded-[2.2rem] bg-sand p-8 sm:p-10">
              <Clock3 size={34} className="text-magenta" />
              <h2 className="mt-8 text-4xl font-bold">Before you visit</h2>
              <p className="mt-5 text-lg leading-relaxed text-ink-soft">
                Please call ahead so the right team member can meet you. Field activities may take staff away from the office during the day.
              </p>
            </div>
            <div className="rounded-[2.2rem] bg-magenta p-8 text-white sm:p-10">
              <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-lime">Partnership enquiries</p>
              <h2 className="mt-4 text-4xl font-bold">Tell us what you hope to make possible.</h2>
              <a href={`mailto:${trust.email}?subject=Partnership%20enquiry%20for%20Hope%20Trust`} className="focus-ring mt-7 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 font-extrabold text-magenta transition hover:bg-lime hover:text-ink">
                Write to us <ArrowUpRight size={17} />
              </a>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
