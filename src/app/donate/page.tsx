import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Mail, Phone, ReceiptText } from "lucide-react";
import BankDetails from "@/components/BankDetails";
import { donate } from "@/data/content";
import { registrations, trust } from "@/data/site";

export const metadata: Metadata = {
  title: "Donate",
  description:
    "Support Hope Trust's education and community work in Tiruvannamalai by bank transfer. Account details, donation receipts and registration records.",
};

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
          <div>
            <p className="max-w-xl text-lg leading-relaxed text-ink-soft">
              {donate.transferNote}
            </p>

            <div className="mt-8">
              <BankDetails />
            </div>

            <div className="mt-8 rounded-[1.7rem] bg-sand p-7 sm:p-8">
              <span className="grid size-11 place-items-center rounded-full bg-white text-magenta">
                <ReceiptText size={20} />
              </span>
              <h2 className="mt-5 text-2xl font-bold leading-tight">
                {donate.receiptHeading}
              </h2>
              <p className="mt-4 max-w-xl leading-relaxed text-ink-soft">
                {donate.receiptNote}
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                <a
                  href={`tel:${trust.phoneLinks[0]}`}
                  className="focus-ring flex items-center gap-3 rounded-2xl bg-white p-5 font-bold text-ink transition hover:bg-mist"
                >
                  <Phone size={19} className="shrink-0 text-cyan-dark" />
                  <span className="break-all">{trust.phones[0]}</span>
                </a>
                <a
                  href={`mailto:${trust.email}`}
                  className="focus-ring flex items-center gap-3 rounded-2xl bg-white p-5 font-bold text-ink transition hover:bg-mist"
                >
                  <Mail size={19} className="shrink-0 text-cyan-dark" />
                  <span className="break-all">{trust.email}</span>
                </a>
              </div>

              <Link
                href="/contact"
                className="focus-ring mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 font-extrabold text-white transition hover:bg-magenta"
              >
                {donate.enquiry}
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>

          <aside className="self-start rounded-[2rem] bg-mist p-8 sm:p-10">
            <p className="eyebrow text-magenta">Registered status</p>
            <h2 className="mt-5 text-3xl font-bold leading-tight">
              Hope Trust is a registered public charitable trust.
            </h2>
            <dl className="mt-8 grid gap-4">
              {registrations.map((item) => (
                <div key={item.label} className="rounded-2xl bg-white/80 p-5">
                  <dt className="text-xs font-extrabold uppercase tracking-[0.13em] text-ink-soft/65">
                    {item.label}
                  </dt>
                  <dd className="mt-2 break-all font-bold text-ink">{item.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-7 text-sm leading-relaxed text-ink-soft">
              {donate.registrationNote}
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}
