import {
  BookOpen,
  HeartPulse,
  Leaf,
  type LucideIcon,
  UsersRound,
  Wheat,
} from "lucide-react";

export const trust = {
  name: "Hope Trust",
  tagline: "Together towards tomorrow",
  established: "2017",
  managingTrustee: "Mr. R. Dhanaraj",
  address: [
    "No. 5/1B, Vanakara Street",
    "Tiruvannamalai, Tamil Nadu 606 601",
    "India",
  ],
  phones: ["+91 80567 03315", "+91 94873 21595"],
  phoneLinks: ["+918056703315", "+919487321595"],
  email: "hopetrusttvm2017@gmail.com",
  r2Base: "https://pub-9aa82d64f38146e3b49ffa5560be01d2.r2.dev",
} as const;

export interface Program {
  title: string;
  shortTitle: string;
  description: string;
  details: string[];
  icon: LucideIcon;
  accent: "cyan" | "magenta" | "lime";
}

export const programs: Program[] = [
  {
    title: "Education & skills for rural communities",
    shortTitle: "Education & Skills",
    description:
      "Learning support, practical training and access to knowledge that help people build resilient futures.",
    details: [
      "Education support for children and young people",
      "Vocational, digital and communication-skills training",
      "Libraries, reading rooms and community learning spaces",
    ],
    icon: BookOpen,
    accent: "cyan",
  },
  {
    title: "Health access & awareness",
    shortTitle: "Community Health",
    description:
      "Rural health programmes that bring prevention, information and care closer to families who need it.",
    details: [
      "Medical and health-awareness camps",
      "Nutrition, yoga and preventive-health programmes",
      "Reproductive health, age care and rehabilitation support",
    ],
    icon: HeartPulse,
    accent: "magenta",
  },
  {
    title: "Women-led community progress",
    shortTitle: "Women & SHGs",
    description:
      "Self-help groups and capacity-building programmes that strengthen confidence, cooperation and income security.",
    details: [
      "Rural and urban self-help group development",
      "Training for new rural women entrepreneurs",
      "Community committees and leadership support",
    ],
    icon: UsersRound,
    accent: "lime",
  },
  {
    title: "Environment & regenerative land care",
    shortTitle: "Environment",
    description:
      "Local action for healthier land, stronger ecosystems and climate-resilient communities.",
    details: [
      "Dry and wasteland development",
      "Tree planting, horticulture and permaculture",
      "Natural farming and composting awareness",
    ],
    icon: Leaf,
    accent: "cyan",
  },
  {
    title: "Livelihoods, food security & relief",
    shortTitle: "Livelihoods & Relief",
    description:
      "Practical support for families facing hardship, with a focus on dignity, food security and sustainable livelihoods.",
    details: [
      "Food and essential-supply distribution",
      "Sustainable agriculture and farmer support",
      "Support during disasters and periods of acute need",
    ],
    icon: Wheat,
    accent: "magenta",
  },
];

export interface Film {
  /** Ordered widest-first; the browser picks the first source it can play. */
  webm1080: string;
  mp41080: string;
  webm720: string;
  mp4720: string;
  /** First frame — shown instantly while the film loads. */
  poster: string;
  /** Final frame — static fallback for reduced motion or no video. */
  still: string;
  /** Seconds, for timing guards. */
  duration: number;
}

const film = (name: string, duration: number): Film => ({
  webm1080: `${trust.r2Base}/video/${name}-1080.webm`,
  mp41080: `${trust.r2Base}/video/${name}-1080.mp4`,
  webm720: `${trust.r2Base}/video/${name}-720.webm`,
  mp4720: `${trust.r2Base}/video/${name}-720.mp4`,
  poster: `${trust.r2Base}/video/${name}-poster.jpg`,
  still: `${trust.r2Base}/video/${name}-still.jpg`,
  duration,
});

export const films = {
  /** Tiruvannamalai mountain resolving into the Hope Trust emblem. */
  intro: film("mountain-intro", 8),
  /** One rupee becoming the light of a study lamp. */
  rupee: film("rupee-light", 6),
} as const;

/**
 * Hope Trust's donation account, transcribed from the trustee-supplied record.
 *
 * Internally consistent: the branch code is the first four digits of the account
 * number, and the IFSC carries Bank of Baroda's "BARB" prefix with the RBI's
 * mandatory zero as its fifth character.
 */
export const bankAccount = {
  bank: "Bank of Baroda",
  branch: "Tiruvannamalai",
  address: "RR Complex, 15 Polur Road, Tiruvannamalai, Tamil Nadu 606 601",
  accountName: "Hope Trust",
  accountNumber: "36790200000485",
  ifsc: "BARB0TIRUVN",
  branchCode: "3679",
} as const;

export const registrations = [
  { label: "Public Charitable Trust", value: "Reg. No. 20/2017" },
  { label: "NGO Darpan", value: "TN/2020/0249897" },
  { label: "12A URN", value: "AACTH0303FE20215" },
  { label: "80G URN", value: "AACTH0303FE20213" },
  { label: "CSR-1", value: "TN27-T94393477" },
];

export const galleryImages = Array.from({ length: 94 }, (_, index) => ({
  id: index + 1,
  src: `${trust.r2Base}/gallery/community-relief-${String(index + 1).padStart(3, "0")}.jpeg`,
  alt: `Hope Trust community relief distribution in Tiruvannamalai, photograph ${index + 1}`,
}));
