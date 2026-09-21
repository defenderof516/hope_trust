/**
 * Education and donation copy, drafted from `changes.md`.
 *
 * Figures that trustees have not yet approved are deliberately absent. See
 * `pendingTrusteeApproval` at the bottom of this file for the exact wording that
 * becomes available once the board signs off.
 */

export const mission =
  "Hope Trust helps children and young people continue learning with dignity and confidence. We give special attention to girls, orphaned and semi-orphaned children, and students from families with limited financial resources — while welcoming all eligible students who need support.";

export const educationSupport =
  "Education support may include fees, books, learning materials, transport, mentoring, and safe pathways to continue in school, college, or skills training. Support will be shaped by verified need and the resources available to the trust.";

export const girlsPriority = {
  title: "Girls’ Education Priority",
  // The "at least 60%" figure from changes.md is withheld until trustees approve it.
  body: "To help address the barriers that can interrupt girls’ education, Hope Trust gives priority to girls within its direct education-support places. Support remains need-based, child-safe, and inclusive; all eligible students in vulnerable circumstances can be considered. The trust will publish its selection criteria and annual progress when the programme begins.",
  inclusion:
    "Assistance stays need-based and inclusive. Boys and young men in vulnerable circumstances remain eligible for support on the same terms.",
};

export const educationInitiative = {
  // The "₹1 crore" figure from changes.md is withheld until trustees confirm scope.
  title: "A long-term education initiative for brighter futures",
  body: "Hope Trust is building a long-term education initiative to help students stay in school, move into higher education or skills training, and access the learning support they need. Full goals, timeframe, and reporting will be published with the programme.",
};

export const rupeeFilm = {
  headline: "₹1 can light one student’s learning journey.",
  caption:
    "An invitation to take part — not a claim that one rupee pays for an education. Every contribution joins others to keep a learning journey moving.",
};

export const quotes = [
  "Every child deserves the confidence to learn and the chance to build a future.",
  "When a girl continues her education, possibility grows for her, her family, and her community.",
  "Small acts of support can keep a big dream in motion.",
  "Education opens a doorway to choice, confidence, and contribution.",
];

export const donate = {
  heading: "Your support can keep a learning journey moving.",
  lede: "Hope Trust is a registered public charitable trust in Tiruvannamalai, working alongside students and families across the district.",
  transferNote:
    "Contributions can be made by bank transfer to the trust’s account below. Please use your own name as the payment reference so the trust can identify and acknowledge your contribution.",
  receiptHeading: "Donation receipts",
  receiptNote:
    "After transferring, send your transaction reference, name and postal address to the trust and a receipt will be issued. Hope Trust is registered under Section 80G; please confirm the current tax treatment of your contribution with your own adviser.",
  enquiry: "Talk to Hope Trust",
  registrationNote:
    "These are the trust’s registration records, held under its founding deed as a public charitable trust.",
};

/**
 * Copy that `changes.md` marks as "subject to trustee approval" or "use only
 * after confirmation". Nothing here is rendered anywhere in the site.
 *
 * To publish a figure once the board has approved it, move the string into the
 * matching entry above — the layout already has room for it.
 */
export const pendingTrusteeApproval = {
  girlsPriorityTarget: {
    text: "reserving at least 60% of direct education-support places for girls",
    blockedOn:
      "Trustees must approve the percentage, eligibility criteria, geographic scope, annual budget and effective date.",
  },
  croreInitiative: {
    text: "A ₹1 crore education initiative for brighter futures",
    blockedOn:
      "Trustees must confirm whether ₹1 crore is a fundraising target, a budget, or a combined project value, plus timeframe, scope, funded expense categories and reporting cadence.",
  },
} as const;
