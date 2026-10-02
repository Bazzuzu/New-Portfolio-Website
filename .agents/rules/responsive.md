# Rule: Responsive Layout & Viewport Protocol

> **Scope**: Breakpoint standards, 3-phase adaptation workflow, and layout isolation rules.
> **Source of Truth (CSS)**: `src/styles/tokens.css`

---

## 1. Viewports & Range Query Standards

| Tier | Target Width | Range Syntax | Scope |
| :--- | :--- | :--- | :--- |
| **Desktop (Base)** | **`1440px`** | Unscoped base `:root` and component styles | Default desktop layout (>= 1024px) |
| **Tablet** | **`768px`** | `@media (768px <= width < 1024px)` | iPad / tablet portrait bridge |
| **Mobile** | **`375px`** | `@media (width < 768px)` | iPhone / smartphones (< 768px) |

---

## 2. Three-Phase Adaptation Workflow

1. **Phase 1 (Desktop First / 1440px)**: Base CSS written for desktop. Macro bounds: `--container-page-max` (1280px / 80rem).
2. **Phase 2 (Mobile Adaptation / 375px)**: Scoped strictly inside `@media (width < 768px)`. Grids collapse to `1fr`, section `px` steps down, touch targets >= `44px` (`--control-min-h-md`).
3. **Phase 3 (Tablet Calibration / 768px)**: Scoped inside `@media (768px <= width < 1024px)`. Balances 2-column grids and typography line lengths.

---

## 3. Strict Modification Isolation Guardrail

1. **Never mutate base Desktop rules when working on Mobile or Tablet**:
   - Mobile changes MUST be placed exclusively within `@media (width < 768px)`.
   - Tablet changes MUST be placed exclusively within the tablet media query.
2. **Never duplicate HTML markup for responsive variations**:
   - DOM tree remains identical across all viewports.
   - Strictly forbidden: separate `.desktop-only` and `.mobile-only` markup blocks.
3. **Prefer Container Queries (`@container`) for Component-Level Adaptations**:
   - When component appearance depends on parent column width, declare `container-type: inline-size` on the parent and style children with `@container (inline-size < ...)`.

---

## 4. Zero Horizontal Overflow (Anti-Regression Rules)

Horizontal scrolling on any viewport (375px, 768px, 1440px) is an automatic verification failure:
- **Root Protection**: `html, body { width: 100%; min-height: 100%; overflow-x: clip; box-sizing: border-box; }`.
- **Safe Width**: Never write fixed widths without max-width bounds (`max-width: var(...)` + `width: 100%`).
- **Zero CLS Media**: Images, videos, and SVGs must declare explicit dimensions or aspect-ratio tokens (`.aspect-landscape`, `.aspect-square`, `.aspect-video`) and `max-width: 100%; height: auto; display: block;`.

---

## 5. Verification Checklist
- [ ] **375px**: Zero horizontal scroll, touch targets >= 44px, text readable.
- [ ] **768px**: Balanced 2-column or fluid layouts, clean wrapping.
- [ ] **1440px**: Desktop layout preserved, macro container bounded by 1280px.
