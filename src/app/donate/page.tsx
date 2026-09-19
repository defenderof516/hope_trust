import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Info, Mail, Phone } from "lucide-react";
import { donate } from "@/data/content";
import { registrations, trust } from "@/data/site";

export const metadata: Metadata = {
  title: "Donate",
  description:
    "Support Hope Trust's education and community work in Tiruvannamalai. Verified donation details will be published here; for now, please contact the trust directly.",
};

/**
 * Deliberately minimal donation page.
 *
 * It carries no bank account number, IFSC, UPI ID, QR code, payment gateway,
 * tax-receipt promise or fundraising total. Those are added only once trustees
 * supply verified details — see `changes.md`.
 */
export default function DonatePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-ink pb-20 pt-36 text-white sm:pb-24 sm:pt-44">
        <div className="contours pointer-events-none absolute inset-x-0 bottom-0 h-[26rem] text-cyan" />
        <div className="absolute -right-32 top-16 size-[28rem] rounded-full bg-magenta/25 blur-[110px]" />

        <div className="site-shell relative max-w-4xl">
          <p className="eyebrow text-amber-300">Donate</p>
          <h1 className="mt-6 font-display text-5xl font-bold leading-[0.95] sm:text-7xl">
            {donate.heading}
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/72 sm:text-xl">
            {donate.lede}
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="site-shell grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-[2rem] border border-ink/10 bg-white p-8 shadow-[0_18px_60px_rgba(16,38,48,0.07)] sm:p-11">
            <span className="grid size-12 place-items-center rounded-full bg-sand text-magenta">
              <Info size={24} />
            </span>
            <p className="mt-7 max-w-xl text-xl leading-relaxed text-ink sm:text-2xl">
              {donate.notice}
            </p>

            <div className="mt-9 grid gap-3 border-t border-ink/10 pt-8 sm:grid-cols-2">
              <a
                href={`tel:${trust.phoneLinks[0]}`}
                className="focus-ring flex items-center gap-3 rounded-2xl bg-paper p-5 font-bold text-ink transition hover:bg-mist"
              >
                <Phone size={19} className="shrink-0 text-cyan-dark" />
                <span className="break-all">{trust.phones[0]}</span>
              </a>
              <a
                href={`mailto:${trust.email}`}
                className="focus-ring flex items-center gap-3 rounded-2xl bg-paper p-5 font-bold text-ink transition hover:bg-mist"
              >
                <Mail size={19} className="shrink-0 text-cyan-dark" />
                <span className="break-all">{trust.email}</span>
              </a>
            </div>

            <Link
              href="/contact"
              className="focus-ring mt-7 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 font-extrabold text-white transition hover:bg-magenta"
            >
              {donate.enquiry}
              <ArrowRight size={17} />
            </Link>
          </div>

          <aside className="rounded-[2rem] bg-sand p-8 sm:p-10">
            <p className="eyebrow text-magenta">Registered status</p>
            <h2 className="mt-5 text-3xl font-bold leading-tight">
              Hope Trust is a registered public charitable trust.
            </h2>
            <dl className="mt-8 grid gap-4">
              {registrations.map((item) => (
                <div key={item.label} className="rounded-2xl bg-white/70 p-5">
                  <dt className="text-xs font-extrabold uppercase tracking-[0.13em] text-ink-soft/65">
                    {item.label}
                  </dt>
                  <dd className="mt-2 break-all font-bold text-ink">{item.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-7 text-sm leading-relaxed text-ink-soft">{donate.registrationNote}</p>
          </aside>
        </div>
      </section>
    </>
  );
}
