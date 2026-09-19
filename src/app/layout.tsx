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
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <IntroFilm />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
