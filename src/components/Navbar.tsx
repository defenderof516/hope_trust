"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/work", label: "Our Work" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6">
      <div className="site-shell flex h-[4.5rem] items-center justify-between rounded-[1.35rem] border border-white/70 bg-white/90 px-3 shadow-[0_18px_60px_rgba(16,38,48,0.12)] backdrop-blur-xl sm:px-5">
        <Link href="/" className="focus-ring flex items-center gap-3 rounded-xl" aria-label="Hope Trust home">
          <span className="relative grid size-12 shrink-0 place-items-center overflow-hidden rounded-full border border-cyan/25 bg-white">
            <Image
              src="/assets/hope-trust-logo.png"
              alt="Hope Trust logo"
              width={48}
              height={48}
              className="h-full w-full object-contain"
              preload
            />
          </span>
          <span className="leading-none">
            <span className="block font-display text-xl font-bold text-ink sm:text-2xl">Hope Trust</span>
            <span className="mt-1 hidden text-[0.66rem] font-bold uppercase tracking-[0.19em] text-magenta sm:block">
              Tiruvannamalai
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`focus-ring rounded-full px-4 py-2 text-sm font-bold transition ${
                  active ? "bg-ink text-white" : "text-ink-soft hover:bg-mist hover:text-cyan-dark"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/contact"
            className="focus-ring ml-2 rounded-full bg-magenta px-5 py-2.5 text-sm font-extrabold text-white shadow-[0_8px_24px_rgba(168,7,102,0.24)] transition hover:-translate-y-0.5 hover:bg-ink"
          >
            Partner with us
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="focus-ring grid size-11 place-items-center rounded-full bg-ink text-white lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>

      {open && (
        <nav className="site-shell mt-2 overflow-hidden rounded-[1.35rem] border border-white/70 bg-white p-3 shadow-2xl lg:hidden" aria-label="Mobile navigation">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`focus-ring flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-bold ${
                pathname === link.href ? "bg-ink text-white" : "text-ink hover:bg-mist"
              }`}
            >
              {link.label}
              <span aria-hidden="true">↗</span>
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
