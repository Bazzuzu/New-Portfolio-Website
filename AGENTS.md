# Agent Operating Directives

> **Human Context**: Root repository manifest. Single source of truth for the AI agent in Antigravity.
> Philosophy: Semantic HTML First, Pure Modern CSS, Zero Client-side JS, Machine-Readable Data, Strict OOUX.

---

## 1. Stack & Architecture

- **Engine**: Astro (Static SSG compiler only; strictly 0kb client-side runtime JS).
- **Styling**: Modern Native CSS (CSS Variables, native nesting). No CSS frameworks (no Tailwind).
- **Content Store**: Local Markdown/MDX inside root `/content/` directory.
- **Hosting**: GitHub Pages (`new.lexkonovalov.com`).
- **AI Target**: Antigravity Active Agent runtime.

---

## 2. Invariants & Guardrails (Strict Constraints)

1. **Zero Client-Side JS**: Client `<script>` tags are forbidden unless an interaction cannot be achieved with semantic HTML5 (`<details>`, native `<dialog>`) or CSS (`:hover`, `:has()`, `:focus-within`).
2. **Pure Semantic Tokens**:
   - MUST use variables defined in `src/styles/tokens.css`.
   - STRICTLY FORBIDDEN: Raw HEX (`#fff`), RGB, HSL values, arbitrary inline pixel/rem values, or invented/non-existent tokens.
   - Values not referencing established tokens are prohibited.
   - If a new token is needed, the agent must never invent it; the user will add/approve it after review.
3. **No Heavy Frameworks**: Do not suggest or install Tailwind, React, Vue, Sass, or external UI component libraries.

---

## 3. Media & Asset Management Policy

- **Location**: Store all media assets in a dedicated `media/` folder co-located alongside their respective `.md` file in `/content/` (e.g. `/content/work/[slug]/media/`).
- **Semantic Naming Convention (MANDATORY)**:
  - Pattern: `[context]-[entity]-[state/descriptor].[ext]`
  - Allowed: `travel-erp-matrix-table-dark.png`, `cro-checkout-flow-step2.png`
  - FORBIDDEN: `cover.png`, `img1.png`, `screenshot.jpg`, `frame-12.png`
- **Icons**:
  - Format: Strictly **SVG**. Raster formats (.png/.webp) for icons are prohibited.
  - Naming: `icon-[action-or-brand].svg` (e.g., `icon-arrow-top-right.svg`, `icon-figma.svg`).
  - Hygiene: Must be stripped of vector editor metadata; use `fill="currentColor"`.
- **Image Optimization Pipeline**:
  - Target formats: **AVIF** (preferred) and **WebP** fallback.
  - Quality setting: `quality={88}` for high-fidelity UI screenshots.
  - Density: Mandatory Retina support via `densities={[1, 2]}`.
  - Zero CLS: Explicit `aspect-ratio` or `width`/`height` required on every image.
  - Default Radius: Images strictly default to `md` (`border-radius: var(--radius-md)`).

---

## 4. SEO, GEO & LLM-Friendly Rules

The site is built for dual consumption: human readers and generative AI crawlers (GEO):

1. **Semantic DOM**: Must build a clean Accessibility Tree. Never use `<div>` where semantic HTML5 tags (`<article>`, `<section>`, `<header>`, `<main>`, `<footer>`, `<aside>`) apply.
2. **Schema.org**: Inject JSON-LD structured data (`Person` on homepage, `CreativeWork` / `TechArticle` on case studies).
3. **LLM Feeds**: Ensure build step automatically compiles a `/llms.txt` plain-text summary of portfolio capabilities.

---

## 5. Verification (Definition of Done)

Before marking any task as complete, the agent MUST:
1. Execute `pnpm verify` (typecheck + static build + token validation) and ensure exit code 0.
2. Ensure no horizontal overflows on viewports: 375px, 768px, 1440px.
3. Provide a concise response: execution status, list of modified files, and build confirmation. Do not dump raw build logs.
