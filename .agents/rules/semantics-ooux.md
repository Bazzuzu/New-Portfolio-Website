# Rule: Semantic HTML5, Strict OOUX & Zero Client-Side JS

> **Scope**: DOM architecture, semantic element selection, 0kb JS interactive patterns, and accessibility.
> **Source of Truth**: `AGENTS.md` (Sections 1, 2, 4)

---

## 1. Zero Client-Side JS Invariant

Client `<script>` tags are **strictly forbidden** in all Astro components and templates.
All interactive UI (disclosures, corner navigation, dialogs, accordions) must be executed natively with:
- **HTML5 Elements**: `<details>`, `<summary>`, native `<dialog>`, `popover` attribute.
- **CSS Selectors**: `:hover`, `:focus-within`, `:has()`, `:checked`, `:target`.

---

## 2. Semantic HTML5 Selection Matrix

Never use `<div>` or `<span>` where a semantic HTML5 element applies:
- **Landmarks**: `<header>`, `<main>` (strictly ONE per page), `<footer>`, `<nav>`.
- **OOUX Structure**: `<section>` (macro-rhythm; requires accessible heading), `<article>` (self-contained card/case), `<aside>` (secondary/tangential content).
- **Media**: `<figure>` + `<figcaption>`.
- **Actions & Links**: `<button>` for actions/disclosures; `<a>` for navigation between URLs/anchors. Never `<div onclick>` or `<a href="#">`.
- **The `<div>` Policy**: `<div>` is strictly an anonymous CSS flex/grid layout wrapper. Never place raw text directly inside a `<div>` without `<p>`, `<h*>`, or `<span>`.

---

## 3. Canonical 0kb JS Interactive Patterns

### Pattern A: Floating Corner Navigation (Pill Trigger)
```html
<details class="corner-nav">
  <summary class="btn-pill" aria-label="Toggle site navigation">
    <span class="nav-label">Menu</span>
  </summary>
  <nav class="nav-dropdown" aria-label="Main menu">
    <ul class="nav-list">
      <li><a href="#work" class="nav-link">Work</a></li>
      <li><a href="#about" class="nav-link">About</a></li>
      <li><a href="#contact" class="nav-link">Contact</a></li>
    </ul>
  </nav>
</details>
```

### Pattern B: Native Accordions & Expandable Cards
Use native `<details name="...">` for exclusive multi-card accordions:
```html
<details name="case-study-accordion" class="accordion-item">
  <summary class="accordion-trigger"><span class="text-title-md">Deliverables</span></summary>
  <div class="accordion-content"><p class="text-body-md">Content...</p></div>
</details>
```

### Pattern C: State-Driven Styling with `:has()`
```css
/* Darken backdrop when corner navigation is expanded */
body:has(.corner-nav[open]) { /* scrim styling */ }

/* Highlight card container on keyboard focus */
.case-card:has(a:focus-visible) { outline: var(--border-w) solid var(--color-border-focus); }
```

---

## 4. Heading Hierarchy & Accessibility (GEO / A11y)

1. **Single `<h1>`**: Exactly ONE `<h1>` per page.
2. **Sequential Nesting**: `<h1>` → `<h2>` → `<h3>` → `<h4>`. Never skip levels.
3. **Descriptive Links**: Never write bare "Click here" or "Read more". Must state target: `<a href="/work/travel-erp">View Travel ERP Case Study</a>`.
4. **Icons**: Decorative icons require `aria-hidden="true"`. Standalone icon buttons require `aria-label`.
