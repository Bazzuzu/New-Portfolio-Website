# Rule: Media & Asset Management Policy

> **Scope**: Storage architecture, semantic naming standards, SVG icon hygiene, and image optimization pipeline.
> **Source of Truth**: `AGENTS.md` (Section 3)

---

## 1. Co-Location Storage Architecture

All media assets (screenshots, UI mockups, diagrams) must be stored in a **`media/` folder co-located alongside their `.md`/`.mdx` file** in `/content/`:
- Structure: `/content/work/[case-slug]/[case-slug].md` + `/content/work/[case-slug]/media/[context]-[entity]-[state].[ext]`.
- Shared brand icons reside in `/content/shared/icons/`.
- **Strictly Forbidden**: Generic `/public/images/` or root `assets/` dumps.

---

## 2. Semantic Naming Convention (Mandatory)

Format: `[context]-[entity]-[state/descriptor].[ext]`
- ✅ **Allowed**: `travel-erp-matrix-table-dark.png`, `cro-checkout-flow-step2.png`, `banking-app-dashboard-mobile.png`.
- ❌ **Forbidden**: `cover.png`, `img1.png`, `screenshot.jpg`, `frame-12.png`, `photo.webp`.

---

## 3. SVG Icon Hygiene

1. **Format**: **Strictly SVG**. Raster formats (.png/.webp) for icons are prohibited.
2. **Naming**: `icon-[action-or-brand].svg` (e.g. `icon-arrow-top-right.svg`, `icon-figma.svg`).
3. **Hygiene**:
   - Strip all vector editor metadata (`<metadata>`, `<sketch:type>`, `id="Layer_1"`).
   - Set **`fill="currentColor"`** (or `stroke="currentColor"`).
   - Omit root width/height; declare `viewBox="0 0 24 24"`. Dimension externally via `--icon-size-[xs..xl]`.
4. **Accessibility**: Decorative icons require `aria-hidden="true"`; standalone buttons require `aria-label`.

---

## 4. Astro Image Optimization (Zero CLS)

1. **Formats**: **AVIF** (preferred) with WebP fallback.
2. **Settings**: `quality={88}`, Retina support via `densities={[1, 2]}`.
3. **Zero CLS**: Every image must declare explicit intrinsic dimensions or an aspect-ratio token (`.aspect-landscape`, `.aspect-square`, `.aspect-video`) plus `max-width: 100%; height: auto; display: block;`.
4. **Default Border Radius**: All images and media frames default strictly to **`md`** (`border-radius: var(--radius-md)`).
