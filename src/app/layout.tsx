import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import Footer from "@/components/Footer";
import IntroFilm from "@/components/IntroFilm";
import Navbar from "@/components/Navbar";
import "./globals.css";

const display = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const body = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

/**
 * Runs before the intro layer is parsed, so the decision is made in the very
 * first paint rather than after hydration. Without this, the page would flash
 * into view, get covered by the film, and then reappear.
 *
 * Sets data-intro on <html>: "show" on the first page view of a session,
 * "seen" on every later one. globals.css acts on both.
 */
const INTRO_BOOT = `(function(){var e=document.documentElement;try{if(sessionStorage.getItem("hope-trust-intro-seen")==="1"){e.dataset.intro="seen";return}sessionStorage.setItem("hope-trust-intro-seen","1")}catch(_){}e.dataset.intro="show"})()`;

export const metadata: Metadata = {
  title: {
    default: "Hope Trust | Tiruvannamalai",
    template: "%s | Hope Trust",
  },
  description:
    "Hope Trust is a public charitable trust in Tiruvannamalai supporting education for students, community health, women-led enterprise, the environment and sustainable rural livelihoods.",
  keywords: [
    "Hope Trust Tiruvannamalai",
    "Tamil Nadu NGO",
    "girls education support",
    "student education support",
    "rural women entrepreneurs",
    "self-help groups",
    "community health",
    "environment",
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // The boot script below stamps data-intro on this element before React
    // hydrates, which React would otherwise report as a mismatch. The flag
    // covers this element's own attributes only, not the tree beneath it.
    <html
      lang="en"
      className={`${display.variable} ${body.variable}`}
      suppressHydrationWarning
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: INTRO_BOOT }} />
        <IntroFilm />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
