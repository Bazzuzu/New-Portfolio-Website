# Rule: Design Tokens & Styling Architecture

> **Scope**: Design tokens, layout hierarchy, variable naming, and strict value constraints.
> **Source of Truth (CSS)**: `src/styles/tokens.css`
> **Philosophy**: Pure semantic tokens, strict OOUX, 4px/8px modular grid, OKLCH alpha-masking, zero inline raw values.

---

## 1. Core Invariants & Guardrails

1. **Zero Raw Values & Zero Invented Tokens**: Direct HEX (`#fff`), RGB, HSL, or arbitrary inline pixel/rem values in Astro templates and component `<style>` are **strictly forbidden**. All styles MUST consume tokens via `var(--...)` defined in `src/styles/tokens.css`. Values not referencing established tokens are prohibited.
2. **User-Owned Token Additions**: The agent is strictly prohibited from inventing new tokens (`size-2`, arbitrary steps) or using values outside the token system. If a new token is genuinely needed, the user will add it after review.
3. **Default Size Rule**: If size is not specified in an instruction, **`md`** is always the default.
4. **Width & Height Defaults**:
   - `width` defaults to **`100%`** of available space, bounded by `--container-page-max` (`80rem` / `1280px`). Constraints must use `max-width: var(...)` + `width: 100%`.
   - `height` defaults to content (`height: auto`). Dynamic content blocks MUST use `min-height` (`--*-min-h-*`), never fixed `height`.

---

## 2. OOUX Hierarchy & Spacing Tokens

Layout is divided into three OOUX levels with properties `px` (`padding-inline`), `py` (`padding-block`), and `gap`:
- **Section (`<section>`)**: 100% width macro-blocks. Tokens: `--section-[px|py|gap]-[xs|sm|md|lg|xl]` (24px to 160px; md default is 80px, gap-md 64px).
- **Container**: Mid-level groupings. Tokens: `--container-[px|py|gap]-[xs|sm|md|lg|xl]` (8px to 64px; md default is 24px).
- **Component**: Reusable atoms/molecules. Tokens: `--component-[px|py|gap]-[xs|sm|md|lg|xl]` (4px to 24px; md default is 12px).

---

## 3. Typography System

Role-based hierarchy (`lg`, `md`, `sm`), Code is `md` only:
- **Families**: Display/Headline/Title/Label: `'Space Grotesk'`; Body: `'Noto Serif'`; Code: `'Google Sans Code'`.
- **Weights**: Display/Headline: `700`; Title: lg/md `700`, sm `600`; Body: `500` (bold `700`); Label: lg `500`, md `400`, sm `500`; Code: `500`.
- **Variable Pattern**: `--text-[role]-[size]-[size|line|weight|tracking|family]`.
- **Utility Classes**: `.text-display-[lg|md|sm]`, `.text-headline-*`, `.text-title-*`, `.text-body-*`, `.text-label-*`, `.text-code-md`.
- *Refer to `src/styles/tokens.css` for exact line-height and tracking values.*

---

## 4. Sizing, Shape & Interactive Controls

- **Macro Page Bounds**: `--container-page-max: 80rem` (`1280px`).
- **Containers**: `--container-[w|h]-[xs|sm|md|lg|xl]` (240px to 640px; md default is 400px).
- **Components**: `--component-[w|h]-[xs|sm|md|lg|xl]` (120px to 480px; md default is 240px).
- **Text Measure**: `--text-w-sm` (320px), `--text-w-md` (640px / ~65ch prose), `--text-w-lg` (800px lead).
- **Icons (1:1)**: `--icon-size-[xs|sm|md|lg|xl]` (12px, 16px, 24px default, 32px, 64px).
- **Media**: `--media-w-[xs|sm|md|lg|xl]` (240px to 640px). Ratios: `--ratio-[square|landscape|portrait|video]`.
- **Interactive Controls (Buttons/Inputs)**:
  - **Button Shape**: ALL buttons are strictly **pill** (`border-radius: var(--radius-full)` / `.btn-pill`).
  - **Touch Target Min-Heights**: `--control-min-h-sm` (32px), `--control-min-h-md` (44px WCAG default), `--control-min-h-lg` (48px).
  - **Viewport Height**: `--size-screen-h: 100dvh` (with 100vh fallback).
- **Border & Radii**:
  - Border stroke: `--border-w: 1px` (focus states handled via color/shadow).
  - Radii scale: `--radius-[3xs|2xs|xs|sm|md|lg|xl|2xl|full]` (2px, 4px, 8px, 12px, 16px default, 24px, 32px, 48px, full=9999px).

---

## 5. Color, Elevation & Motion (OKLCH Architecture)

- **Palette Primitives**: Defined in `src/styles/tokens.css` (canvas `#faf9f6`, brand terracotta `#D93636`, interactive blue `#3E70A2`).
- **Alpha Masking Model**: Neutral text, borders, and ghost states derive dynamically from Onyx (`oklch(18.2% 0 0)`):
  - Text: Primary `88%` (`oklch(... / 88%)`), Secondary `60%`, Disabled `35%`.
  - Borders: Default `8%`, Subtle `4%`, Strong `88%`.
  - Actions & Scrim: Ghost hover `5%`, Ghost pressed `10%`, Modal scrim `30%`, Scrim subtle `8%`.
- **Elevation (Shadows)**: Multi-stop soft OKLCH: `--shadow-[xs|sm|md|lg|xl]`.
- **Stacking (Z-Index)**: `--z-[behind|base|raised|sticky|drawer|overlay|modal|popover|tooltip]`. Corner navigation uses `--z-sticky: 100`.
- **Motion**: `--duration-[instant|fast|normal|slow]`, `--ease-[default|in|out|spring]`, `--transition-[colors|fade|transform|all]`. Reduced motion guardrail (`prefers-reduced-motion`) enforced.
