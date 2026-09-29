# EchoGPT — Landing Page

Marketing site for EchoGPT, a multi-model AI workspace available as a Chrome extension
and a web app. Single route, App Router, fully prerendered.

> The chat application is a separate project (`EchoGPT/Web-App-Chat-UI`). The two share
> no code — only the brand token values are kept in sync by hand.

---

## At a glance

| | |
| --- | --- |
| Route | `/` — no blog, docs, auth, or app shell |
| Rendering | Prerendered at build time; no API routes, server actions, or dynamic params |
| Environment variables | None |
| Package manager | pnpm `10.28.1` (pinned via `packageManager`) |
| Node.js | ≥ 20.9 (Next.js 16 floor; not enforced by an `engines` field) |

---

## What's built

`src/app/page.tsx` composes twelve sections:

| # | Section | Component | Notes |
| --- | --- | --- | --- |
| 1 | Navbar | `Navbar.tsx` | Sticky header, Docs dropdown, theme toggle, Chrome install CTA |
| 2 | Hero | `Hero.tsx` | Headline, value props, animated chat preview |
| 3 | Stats | `Stats.tsx` | Rating, model count, latency, active users |
| 4 | Features | `Features.tsx` | Bento grid with the side-by-side model comparison |
| 5 | Models catalog | `ModelsCatalog.tsx` | Searchable table, 41 models with per-vendor branding |
| 6 | Product preview | `ProductPreview.tsx` | Tabbed walkthrough of the product surface |
| 7 | Comparison | `WhyChoose.tsx` | EchoGPT vs. ChatGPT Plus, Claude Pro, Perplexity Pro |
| 8 | Pricing | `Pricing.tsx` | Free and Pro plan cards |
| 9 | FAQ | `Faq.tsx` | Accordion |
| 10 | Testimonials | `Testimonials.tsx` | Six cards, avatars from `randomuser.me` |
| 11 | Final CTA | `FinalCta.tsx` | Chrome install and web app entry points |
| 12 | Footer | `Footer.tsx` | Link columns, social links, legal line |

All outbound URLs are centralized in `src/lib/links.ts` — Chrome Web Store listing,
`echogpt.live`, platform docs, and the GitHub repository. Two social links in
`Footer.tsx` are still hardcoded locally.

### Design tokens

`src/styles/tokens.css` is the brand source of truth. It is deliberately free of
`@import` statements so the file can be copied into other projects intact.
`globals.css` imports it first, then maps the tokens onto Tailwind v4's `@theme inline`
and the shadcn semantic layer.

```css
--echo-brand-600: #7650ec;   /* canonical violet → --color-brand */
--echo-azure:     #4979fb;   /* focus rings → --color-azure */
--echo-aurora-magenta: #f7306e;
--echo-aurora-cyan:    #00aeff;
--echo-aurora-pink:    #eb78f9;
--echo-aurora-amber:   #f1a455;
```

Also defined: a full `--echo-brand-50` → `-900` ramp, four gradients, nine per-model
brand colors, a six-step radius scale, three aura layers, and an eleven-variable type
scale.

Shadows are namespaced `--echo-shadow-sm | md | lg | xl | glow` rather than the bare
`--shadow-*` names. Tailwind v4 ships its own `--shadow-md`, `--shadow-lg`, and
`--shadow-xl` as built-in theme variables, and because `tokens.css` is imported before
`tailwindcss`, an unprefixed name loses the cascade and silently resolves to Tailwind's
light-mode default. The `echo-` prefix keeps the dark-site shadows authoritative.

Three themes are defined by a `data-theme` attribute on `<html>`. Each variant overrides
only the semantic layer — surfaces, borders, text, auras. Brand, radii, shadows, and
gradients are inherited from `:root`.

| Attribute | Background | Text | Reachable from UI |
| --- | --- | --- | --- |
| *(absent)* | `#0a0713` void | `#f8fafc` | Yes — default |
| `light` | `#f8fafc` | `#0f172a` | Yes |
| `oled` | `#000000` | `#ffffff` | No — dark/light only, by design |

`src/lib/theme.ts` holds the storage key and the pre-paint script together, and
`ThemeToggle.tsx` imports the key from it, so the two cannot drift. The script is
injected in `layout.tsx` and applies a stored light theme before the first paint, which
removes the dark flash on return visits.

### Motion and accessibility

The two preview animations (`HeroPreview`, `ComparePreview`) loop on timers. Both read
`prefers-reduced-motion: reduce` and render a static final state when it is set, and
`globals.css` disables the `gradient-pan`, `orb-drift`, and `shimmer` animations under
the same query.

### Server/client split

Eight files carry `"use client"`, out of thirty tracked files under `src/`:

```
landing/Navbar          landing/ModelsCatalog   landing/ProductPreview
landing/HeroPreview     landing/ComparePreview   landing/ThemeToggle
ui/separator            ui/tooltip
```

Everything else — including `page.tsx`, `Hero`, `Features`, `Pricing`, and `Faq` — is a
Server Component.

---

## Getting started

```bash
pnpm install
pnpm dev
```

Runs at <http://localhost:3000>.

| Command | Action |
| --- | --- |
| `pnpm dev` | Start the dev server |
| `pnpm build` | Production build |
| `pnpm start` | Serve the production build |
| `pnpm lint` | ESLint (flat config, `eslint-config-next`) |
| `pnpm exec tsc --noEmit` | Typecheck — requires a prior build |

`pnpm lint` invokes bare `eslint` with no path argument, so `pnpm lint <file>` does not
work. Scope it with `pnpm exec eslint <path>`.

### Working notes

- **`tsc` needs a prior build.** `layout.tsx` uses Next.js 16's global `LayoutProps<"/">`
  type, generated into `.next/types` by `build` or `dev`. Typechecking a clean `.next`
  fails with `Cannot find name 'LayoutProps'`.
- **`.next` is shared** by `build` and `dev`. Building while a dev server runs corrupts
  its state and surfaces phantom React errors — restart the dev server afterward.
- **One dev server per directory.** A second `next dev` in the same project exits and
  points at the running one.
- **Google Fonts are fetched at build time** by `next/font/google`. An offline build
  fails or falls back to a system stack.

---

## Project structure

```
src/
├── app/
│   ├── layout.tsx        Root layout, fonts, metadata
│   ├── page.tsx          Section composition (the entire site)
│   ├── globals.css       Tailwind bridge, shadcn contract, custom utilities
│   └── icon.svg          Favicon
├── components/
│   ├── landing/          12 sections + 4 helpers
│   │   ├── ThemeToggle.tsx     Dark/light toggle (client)
│   │   ├── HeroPreview.tsx     Animated chat window (client)
│   │   ├── ComparePreview.tsx  Model duel animation (client)
│   │   └── ChromeIcon.tsx      Inline Chrome logo SVG
│   └── ui/               7 shadcn base-nova primitives
├── lib/
│   ├── links.ts          Centralized outbound URLs
│   └── utils.ts          `cn` re-export
└── styles/
    └── tokens.css        Brand tokens — source of truth

public/logo-echogpt.svg
tests/design-token.test.mjs
```

Path alias `@/*` maps to `src/*`.

---

## Verification

`tests/design-token.test.mjs` is a dependency-free Node script that reads the token,
layout, and button files as text and asserts the brand contract — hex values, theme
selectors, the shadcn remapping, font wiring, and metadata. There is no test framework
installed and no `test` script; run it directly:

```bash
node tests/design-token.test.mjs
```

**It currently reports 17 of 18 passing.** The single failure is a stale assertion — see
Known gaps.

---

## Deployment

No environment variables, no secrets, no external service dependencies.
`pnpm install && pnpm build` is the entire pipeline.

**Vercel** — import the repository, framework preset Next.js (auto-detected), build
command `pnpm build`, output `.next`, install command `pnpm install --frozen-lockfile`.

**Netlify** — build command `pnpm build`, publish directory `.next`, Node 20 or newer.
The Next.js runtime is auto-detected; add `@netlify/plugin-nextjs` if it is not.

---

## Tooling

| Tool | Version | Notes |
| --- | --- | --- |
| Next.js | 16.3.6 | Pinned exactly |
| React | 19.2.8 | Pinned exactly |
| Tailwind CSS | 4.3.3 | CSS-first config; no `tailwind.config` |
| TypeScript | 5.9.3 | `strict: true` |
| shadcn | 4.21.0 | Style `base-nova`, built on `@base-ui/react` |
| lucide-react | 1.48.0 | Icon set |

Primitives are generated against **`@base-ui/react`**, not Radix, so Radix examples do
not apply. Read the installed primitive's own API before use:

```bash
pnpm exec shadcn add <component>
```

`next.config.ts` allows exactly one remote image host — `randomuser.me` over HTTPS — used
by the testimonial avatars. Any other host requires a config edit.

---

## Known gaps

Two loose ends, neither of which blocks a deploy.

| Issue | Detail |
| --- | --- |
| **Token test failing** | `tests/design-token.test.mjs` asserts the default background is `#09080e`; `tokens.css` ships `#0a0713`. The shipped value is the intended one — the assertion is stale and needs updating. |
| **Dead code** | `ui/tooltip.tsx` and `public/window.svg` are unused. `components.json` aliases `hooks` to `src/hooks`, which does not exist, so a `shadcn add` that needs a hook will fail. |

Deliberately out of scope: the OLED theme tokens are defined and tested but the toggle
ships dark/light only, and `layout.tsx` carries no Open Graph or `metadataBase` tags.

---

## Git workflow

`main` ← `development` ← `feature/*`, Conventional Commits:

```
feat(pricing): implement pricing cards
fix(footer): fix footer section links
refac(hero): adjust hero ui
```

`development` is at 37 commits, in sync with `origin/development`, clean working tree.
Fourteen of the sixteen local branches are already merged and can be pruned.

---

## License

Private and proprietary. All rights reserved.
