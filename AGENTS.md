# Repository Guidelines

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Project Structure & Module Organization

Next.js 16 App Router static-export site (React 19, TypeScript 5, Tailwind CSS 4). The `next.config.ts` sets `output: "export"` — **no server-side features** (API routes, server actions, `next/headers`, etc.) are available.

```
src/
  app/          # Route segments — each subdirectory has a page.tsx
  components/   # Shared UI components (Navbar, Footer, HeroSection, …)
  data/         # Static typed data modules (activities.ts, barren.ts, founder.ts)
public/assets/  # Images and video served at /assets/
```

Path alias `@/*` resolves to `src/*`. Use it for all internal imports.

## Build & Development Commands

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Static export → out/
npm run start    # Serve the production build
npm run lint     # ESLint (flat config, eslint-config-next core-web-vitals + typescript)
```

There is no test suite configured. `npm run build` is the primary correctness check.

## Coding Style & Naming Conventions

- **TypeScript strict mode** is on (`"strict": true`). No `any`, no type suppressions.
- **Tailwind CSS 4** for all styling via `@tailwindcss/postcss`. No CSS modules or global styles beyond what Next.js scaffolds.
- **ESLint 9 flat config** (`eslint.config.mjs`) — run `npm run lint` before committing. Fix all reported errors; warnings should not be introduced.
- No Prettier is configured. Match the formatting style of surrounding code.
- Component files use **PascalCase** (`ActivityCard.tsx`). Data files use **camelCase** (`activities.ts`).
- Icons come from `lucide-react`. Do not add other icon libraries.

## Commit Guidelines

Only 2 commits exist; no strict convention is established. Use short, descriptive imperative messages (e.g., `Add contact form validation`).
