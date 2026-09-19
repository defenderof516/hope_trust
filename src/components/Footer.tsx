import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { trust } from "@/data/site";

const explore = [
  { label: "About us", href: "/about" },
  { label: "Our work", href: "/work" },
  { label: "Field gallery", href: "/gallery" },
  { label: "Donate", href: "/donate" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      <div className="absolute -right-28 -top-28 size-80 rounded-full border-[44px] border-cyan/15" />
      <div className="site-shell relative grid gap-12 py-16 lg:grid-cols-[1.2fr_0.7fr_1fr] lg:py-20">
        <div>
          <div className="flex items-center gap-4">
            <span className="grid size-16 place-items-center overflow-hidden rounded-full bg-white">
              <Image src="/assets/hope-trust-logo.png" alt="" width={64} height={64} className="h-full w-full object-contain" />
            </span>
            <div>
              <p className="font-display text-3xl font-bold">Hope Trust</p>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan">Together towards tomorrow</p>
            </div>
          </div>
          <p className="mt-6 max-w-md text-base leading-relaxed text-white/68">
            A public charitable trust advancing health, education, the environment, self-help groups and rural women-led enterprise across Tiruvannamalai district.
          </p>
        </div>

        <div>
          <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-lime">Explore</p>
          <div className="mt-5 grid gap-2">
            {explore.map((item) => (
              <Link key={item.href} href={item.href} className="focus-ring group flex w-fit items-center gap-2 rounded text-white/75 transition hover:text-white">
                {item.label}
                <ArrowUpRight size={14} className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-lime">Reach us</p>
          <div className="mt-5 space-y-4 text-sm text-white/75">
            <p className="flex gap-3">
              <MapPin size={19} className="mt-1 shrink-0 text-cyan" />
              <span>{trust.address.join(", ")}</span>
            </p>
            <a className="focus-ring flex w-fit gap-3 rounded transition hover:text-white" href={`mailto:${trust.email}`}>
              <Mail size={19} className="shrink-0 text-cyan" />
              {trust.email}
            </a>
            <a className="focus-ring flex w-fit gap-3 rounded transition hover:text-white" href={`tel:${trust.phoneLinks[0]}`}>
              <Phone size={19} className="shrink-0 text-cyan" />
              {trust.phones.join(" / ")}
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="site-shell flex flex-col gap-2 py-5 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Hope Trust. All rights reserved.</p>
          <p>Public Charitable Trust · Reg. No. 20/2017</p>
        </div>
      </div>
    </footer>
  );
}
