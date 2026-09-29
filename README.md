# EchoGPT — Landing Page

The public marketing site for **EchoGPT**, a multi-model AI workspace delivered as a
Chrome extension and a web application. This repository contains the landing page only:
a single route, fully prerendered, with no backend.

| | |
| --- | --- |
| **Live (Vercel)** | https://echo-gpt-landing-page.vercel.app |
| **Live (Netlify)** | https://echo-gpt-landing-page.netlify.app |
| **Repository** | https://github.com/AbuBakkarSiddique007/EchoGPT_Landing_Page |
| **Route** | `/` — no blog, docs, authentication, or application shell |
| **Rendering** | Prerendered at build time; no API routes, server actions, or dynamic params |
| **Environment variables** | None |
| **Package manager** | pnpm `10.28.1`, pinned via `packageManager` |
| **Node.js** | ≥ 20.9 (Next.js 16 requirement; not enforced by an `engines` field) |

> The chat application is developed separately in `EchoGPT/Web-App-Chat-UI`. The two
> projects share no code. Only the brand token values are kept aligned by hand.

---

## Contents

1. [Page sections](#page-sections)
2. [Design system](#design-system)
3. [Theming](#theming)
4. [Motion and accessibility](#motion-and-accessibility)
5. [Rendering model](#rendering-model)
6. [Getting started](#getting-started)
7. [Project structure](#project-structure)
8. [Verification](#verification)
9. [Deployment](#deployment)
10. [Tooling](#tooling)
11. [Known gaps](#known-gaps)
12. [Git workflow](#git-workflow)

---

## Page sections

`src/app/page.tsx` composes twelve sections in a fixed order.

| # | Section | Component | Summary |
| --- | --- | --- | --- |
| 1 | Navbar | `Navbar.tsx` | Sticky header, documentation menu, theme toggle, install call to action |
| 2 | Hero | `Hero.tsx` | Positioning statement, key value propositions, animated product preview |
| 3 | Stats | `Stats.tsx` | Model count, store rating, first-token latency, active users |
| 4 | Features | `Features.tsx` | Bento grid, including the side-by-side model comparison |
| 5 | Models catalog | `ModelsCatalog.tsx` | Searchable catalogue of 41 models with per-vendor branding |
| 6 | Product preview | `ProductPreview.tsx` | Tabbed walkthrough of the product surface |
| 7 | Comparison | `WhyChoose.tsx` | EchoGPT against ChatGPT Plus, Claude Pro, and Perplexity Pro |
| 8 | Pricing | `Pricing.tsx` | Free and Pro plan cards |
| 9 | FAQ | `Faq.tsx` | Accordion of common questions |
| 10 | Testimonials | `Testimonials.tsx` | Six customer cards, portraits served from `randomuser.me` |
| 11 | Final call to action | `FinalCta.tsx` | Chrome install and web application entry points |
| 12 | Footer | `Footer.tsx` | Link columns, social links, legal notice |

All outbound destinations are centralised in `src/lib/links.ts`, covering the Chrome Web
Store listing, the live web application, the platform documentation, and this repository.
Two social links in `Footer.tsx` remain local to that component.

---

## Design system

`src/styles/tokens.css` is the single source of truth for the brand. It is deliberately
written without any `@import` statement so the file can be copied into another project
intact. `globals.css` imports it first, then projects the tokens onto Tailwind v4's
`@theme inline` layer and the shadcn semantic contract.

```css
--echo-brand-600: #7650ec;   /* canonical violet, exposed as --color-brand */
--echo-azure:     #4979fb;   /* focus rings, exposed as --color-azure */
--echo-aurora-magenta: #f7306e;
--echo-aurora-cyan:    #00aeff;
--echo-aurora-pink:    #eb78f9;
--echo-aurora-amber:   #f1a455;
```

The file also defines a complete `--echo-brand-50` through `-900` ramp, four gradients,
nine per-model brand colours, a six-step radius scale, three ambient aura layers, and an
eleven-variable type scale.

### Token namespacing

Shadows are declared as `--echo-shadow-sm | md | lg | xl | glow` rather than the bare
`--shadow-*` names. Tailwind v4 ships its own `--shadow-md`, `--shadow-lg`, and
`--shadow-xl` as built-in theme variables, and because `tokens.css` is imported before
`tailwindcss`, an unprefixed declaration loses the cascade and silently resolves to
Tailwind's light-mode default. The `echo-` prefix keeps the dark-surface shadows
authoritative. This applies to any new token whose name could collide with a Tailwind
built-in.

### Performance note

The ambient glows in `Hero.tsx` and `FinalCta.tsx` use `radial-gradient` backgrounds
rather than `blur-3xl` filters, and the page aurora lives on a fixed `body::before` layer
instead of `background-attachment: fixed`. Filter blurs and fixed background attachments
are disproportionately expensive to repaint, and both are triggered whenever a theme
change invalidates the custom properties they depend on. Gradients achieve the same visual
result at a fraction of the repaint cost.

---

## Theming

Themes are selected by a `data-theme` attribute on the `<html>` element. Each variant
overrides only the semantic layer — surfaces, borders, text, and auras. Brand, radii,
shadows, and gradients are inherited from `:root`.

| Attribute | Background | Foreground | Selectable in the interface |
| --- | --- | --- | --- |
| *(absent)* | `#0a0713` | `#f8fafc` | Yes — the default |
| `light` | `#f8fafc` | `#0f172a` | Yes |
| `oled` | `#000000` | `#ffffff` | No — dark and light only, by design |

The OLED tokens are defined and asserted by the token test, but the shipped toggle
deliberately exposes two states.

### Implementation

`src/lib/theme.ts` owns the storage key and the pre-paint script. `layout.tsx` injects
that script into the document head, so a stored light theme is applied before the first
paint and return visits never flash dark.

`ThemeToggle.tsx` holds no React state. It reads the active theme directly from the
`data-theme` attribute, writes the next value synchronously on click, and persists it to
`localStorage` under the key `echogpt-theme`. The moon and sun icons are driven by CSS
against the same attribute. Consequently nothing can reapply a stale theme after
hydration, and both toggle instances in the navigation stay in sync without a shared
store or listener.

---

## Motion and accessibility

`HeroPreview` and `ComparePreview` run looping animations. Both read
`prefers-reduced-motion: reduce` and render a static terminal state when it is set.
`globals.css` disables the `gradient-pan`, `orb-drift`, and `shimmer` animations under the
same media query.

---

## Rendering model

Eight of the thirty tracked files under `src/` carry `"use client"`:

```
landing/Navbar            landing/ModelsCatalog    landing/ProductPreview
landing/HeroPreview       landing/ComparePreview   landing/ThemeToggle
ui/separator              ui/tooltip
```

Every other module — including `page.tsx`, `Hero`, `Features`, `Pricing`, and `Faq` — is
a React Server Component. The route is emitted as static output at build time.

---

## Getting started

```bash
pnpm install
pnpm dev
```

The development server listens on <http://localhost:3000>.

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Start the development server |
| `pnpm build` | Create a production build |
| `pnpm start` | Serve the production build |
| `pnpm lint` | Run ESLint using the flat configuration |
| `pnpm exec tsc --noEmit` | Type-check the project |

`pnpm lint` invokes `eslint` without a path argument, so it always lints the project
root. To scope it, call `pnpm exec eslint <path>` directly.

### Development notes

- **Type-check after a build.** `layout.tsx` uses the global `LayoutProps<"/">` type that
  Next.js generates into `.next/types` during `build` or `dev`. Running `tsc --noEmit`
  against a clean `.next` fails with `Cannot find name 'LayoutProps'`.
- **`build` and `dev` share the `.next` directory.** Building while a development server
  is running corrupts its state and produces spurious React errors. Restart the
  development server after every build.
- **One development server per directory.** A second `next dev` in the same project exits
  immediately and redirects to the running instance.
- **Fonts are fetched during the build.** `next/font/google` retrieves Plus Jakarta Sans
  and JetBrains Mono at build time. An offline build fails or silently falls back to a
  system stack.

---

## Project structure

```
src/
├── app/
│   ├── layout.tsx        Root layout, font loading, metadata, pre-paint script
│   ├── page.tsx          Section composition — the entire site
│   ├── globals.css       Token bridge, shadcn contract, custom utilities
│   └── icon.svg          Favicon
├── components/
│   ├── landing/          Twelve page sections and four supporting components
│   │   ├── ThemeToggle.tsx     Light and dark toggle
│   │   ├── HeroPreview.tsx     Animated chat window
│   │   ├── ComparePreview.tsx  Animated model comparison
│   │   └── ChromeIcon.tsx      Inline Chrome browser mark
│   └── ui/               Seven shadcn base-nova primitives
├── lib/
│   ├── links.ts          Centralised outbound destinations
│   ├── theme.ts          Storage key and pre-paint script
│   └── utils.ts          `cn` class-name helper
└── styles/
    └── tokens.css        Brand tokens — source of truth

public/logo-echogpt.svg
tests/design-token.test.mjs
```

The path alias `@/*` resolves to `src/*`.

---

## Verification

`tests/design-token.test.mjs` is a dependency-free Node script. It reads the token,
layout, and component files as plain text and asserts the brand contract: hexadecimal
values, theme selectors, the shadcn remapping, font wiring, and metadata. No test
framework is installed and no `test` script is defined, so it is executed directly:

```bash
node tests/design-token.test.mjs
```

The suite currently reports **17 of 18 checks passing**. The single failure is a stale
assertion, recorded under [Known gaps](#known-gaps).

`pnpm lint` and `pnpm exec tsc --noEmit` both pass on the current tree.

---

## Deployment

The site has no environment variables, no secrets, and no external service dependencies.
The complete pipeline is `pnpm install && pnpm build`.

Both live sites are up. Each repository import was configured with the following
settings.

| Setting | Value |
| --- | --- |
| Install command | `pnpm install --frozen-lockfile` |
| Build command | `pnpm build` |
| Output / publish directory | `.next` |
| Node.js | 20 or newer |
| Framework preset | Next.js — detected automatically |

| Target | Address |
| --- | --- |
| Vercel | https://echo-gpt-landing-page.vercel.app |
| Netlify | https://echo-gpt-landing-page.netlify.app |

Two deployment-specific constraints:

- **Remote images are restricted.** `next.config.ts` allows exactly one host —
  `randomuser.me` over HTTPS — used for the testimonial portraits. Introducing any other
  host requires a configuration change, and a missing entry fails the build rather than
  degrading.
- **Build-time network access is required** for Google Fonts. Confirm the build
  environment is online, otherwise the fonts fall back to a system stack.

---

## Tooling

| Tool | Version | Notes |
| --- | --- | --- |
| Next.js | 16.3.6 | Pinned to an exact version |
| React | 19.2.8 | Pinned to an exact version |
| Tailwind CSS | 4.3.3 | CSS-first configuration; no `tailwind.config` file |
| TypeScript | 5.9.3 | `strict` mode enabled |
| shadcn | 4.21.0 | Style `base-nova`, built on `@base-ui/react` |
| lucide-react | 1.48.0 | Icon set |

Component primitives are generated against **`@base-ui/react`** rather than Radix, so
Radix-based documentation will not apply. Consult the installed primitive's own API before
use:

```bash
pnpm exec shadcn add <component>
```

---

## Known gaps

Two outstanding items, neither of which affects a deployment.

| Item | Detail |
| --- | --- |
| **Token test failure** | `tests/design-token.test.mjs` asserts that the default background is `#09080e`, while `tokens.css` ships `#0a0713`. The shipped value is the intended one and the assertion is out of date. |
| **Unused code** | `ui/tooltip.tsx` and `public/window.svg` are not referenced. The `hooks` alias in `components.json` points at `src/hooks`, which does not exist, so a `shadcn add` that requires a hook will fail. |

Out of scope by decision: the OLED theme tokens exist and are covered by the token test,
but the interface exposes only the dark and light themes. The root layout also carries no
Open Graph tags or `metadataBase` configuration.

---

## Git workflow

`main` receives merges from `development`, which in turn receives merges from `feature/*`
branches. Commit messages follow the Conventional Commits specification.

```
feat(pricing): implement pricing cards
fix(footer): fix footer section links
refac(hero): adjust hero ui
```

`development` currently stands at 37 commits, in sync with `origin/development`, with a
clean working tree. Fourteen of the sixteen local branches are already merged and can be
pruned.

---

## License

Private and proprietary. All rights reserved.
