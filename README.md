# Pannkakor – Recipe Site

A small recipe site built with semantic HTML, modern CSS, and accessibility in mind. It has three pages: a start page, a recipe page (pancakes), and a "Share a recipe" form.

## Files

- `index.html` – start page with hero, categories, and recipe cards
- `recept.html` – recipe page with facts, ingredients, and steps
- `dela-recept.html` – form for submitting your own recipe
- `style.css` – design system, tokens, reset, and all styling
- `script.js` – registers the service worker; added as a result of Lighthouse performance testing (enables the PWA/offline score)
- `sw.js` – service worker for caching/offline; added as a result of Lighthouse performance testing (network-first cache so the site stays fast and works offline)

## Requirements and how they are met

### Structure and accessibility

| Requirement | Met |
| --- | --- |
| Semantic HTML: landmarks (`header`, `nav`, `main`, `footer`), `section` and `article` where appropriate | Yes – all three pages use landmarks; recipe cards are `article`, sections are `section` |
| One `h1` per page and headings in logical order | Yes – one `h1` per page, `h2` for sections |
| Recipe details use suitable elements (`dl` for facts, checkbox list for ingredients, `ol` for steps) | Yes – `dl` for facts, `ul` with checkbox labels, `ol` for steps |
| Images with thoughtful `alt` text (`alt=""` for decorative) | Yes – hero/cards have descriptive alt, serving images have `alt=""` |
| `figure` and `figcaption` where a visible caption adds value | Yes – serving suggestions |
| Menu shows the active page with `aria-current="page"` | Yes |
| Keyboard, screen reader, no WAVE errors | Yes – skip link, `:focus-visible`, semantic structure |
| CSS reset with source comment | Yes – comment with source (Andy Bell) |
| Colors, fonts, and spacing in variables (tokens), no hardcoded colors | Yes – `:root` with `--color-*`, `--spacing-*` |
| Unit strategy (rem/px) and 200% text size without clipping | Yes – rem for scale, px for borders; `clamp()` |
| Clear selectors without `!important`, e.g. `li:has(:checked)` | Yes |
| Clear `:hover` and `:focus-visible` states | Yes |

### Layout

| Requirement | Met |
| --- | --- |
| `box-sizing: border-box`, deliberate padding/margin, logical properties | Yes – `border-box`, `padding-inline`, `margin-block`, etc. |
| Deliberate choice between Flexbox and Grid | Yes – Flexbox for menu/categories, Grid for cards and page sections |
| Hero with heading over the image via grid (shared cell) | Yes – `grid-template-areas: "hero"` |
| No unnecessary wrapper divs, no locking fixed heights | Yes |

### Responsiveness and color

| Requirement | Met |
| --- | --- |
| Fluid design from ~300px to ~1920px | Yes – `clamp()`, `min()`, `max()` |
| Menu/categories wrap with `flex-wrap` (no hamburger menu) | Yes |
| Recipe cards change columns with `repeat(auto-fit, minmax(...))` without media queries | Yes |
| Typography/spacing scale with `clamp()` | Yes |
| No `@media` | Yes |
| Modern colors (`oklch()`), good contrast (WCAG AA) | Yes |

#### 60–30–10 color guideline

The 60–30–10 rule comes from interior design, where it helps balance the colors in a room. In web design, it gives the dominant color about 60% of the visual space, the supporting color about 30%, and the accent color about 10%. These approximate proportions help readers distinguish the main content, supporting sections, and key actions.

- **60% base.** Near-white in light mode and near-black in dark mode cover the main content, header, footer, and recipe cards (`--color-bg`).
- **30% supporting.** Muted blue-gray shades frame the page and group category tags, recipe introductions, and form sections (`--color-page-bg`, `--color-category-bg`, and `--color-intro-bg`).
- **10% accent.** Reserve the strongest color emphasis for primary actions. Today, **Skicka recept** has a strong fill, **Dela recept** uses the supporting fill, and purple appears mainly on keyboard focus rings (`--color-focus`). A shared accent for the two actions would make the hierarchy more consistent across both themes.

### Forms

| Requirement | Met |
| --- | --- |
| Every field has a linked `label`, grouped with `fieldset`/`legend` | Yes |
| Correct `type`, `required` where needed | Yes |
| Clear visual feedback for valid/invalid fields | Yes – `:user-valid` / `:user-invalid` |

### Other

| Requirement | Met |
| --- | --- |
| Avoid JS except `sw.js` and `script.js` (Lighthouse) | Yes – `script.js` only registers the service worker |
| No `@media` | Yes |
| Theme toggle without `@media` or JS | Yes – checkbox + `:has()` |

## WCAG AAA

Full WCAG AAA conformance is **not claimed** (AAA is a high bar and requires manual screen-reader and expert review). The site targets WCAG AA as the course requires, and it meets several AAA-level techniques. The "how" column states exactly how each criterion is satisfied in the code:

| AAA technique | How it is met (in the code) |
| --- | --- |
| 2.4.13 Focus Appearance (AAA) | Every interactive element gets `:focus-visible { outline: 3px solid var(--color-focus); outline-offset: 2px; box-shadow: 0 0 0 4px var(--color-focus-shadow) }` – a thick, high-contrast ring that is easy to see (style.css). |
| 2.5.5 Target Size (AAA, 44×44) | `--min-target-size: 44px` is applied via `min-inline-size`/`min-block-size` to links, the theme toggle, and radio rows, so every tap target is at least 44×44 CSS px. |
| 1.4.6 Contrast Enhanced (AAA, 7:1) | Body text uses `--color-text` (oklch 15% lightness) on `--color-bg` (oklch 99%) – a very dark-on-very-light pair that exceeds 7:1; headings use `--color-heading` (oklch 32%) which is also >7:1. |
| 1.4.8 Visual Presentation (AAA) | Typography is fluid via `clamp()` with `line-height: 1.5`; there are no fixed heights, text wraps with `overflow-wrap`, and the layout reflows at 200% zoom without clipping. |
| 2.1.1 / 2.1.2 Keyboard (A/AAA) | A skip link is the first focusable element, the tab order follows the DOM, and `:focus-visible` makes the focused control obvious; there are no keyboard traps. |
| 3.3.1 / 3.3.2 Labels (A/AAA) | Every form field has a linked `label` (`for`/`id`), fields are grouped with `fieldset`/`legend`, and errors are shown inline via `:user-invalid + .error-message`. |

### Minimal ARIA

A rule was to use **as little ARIA as possible** and rely on semantic HTML instead. The only ARIA used is `aria-current="page"` in the menu to mark the active page; everything else (landmarks, headings, lists, labels, `alt`, `figure`/`figcaption`) is native HTML. No `role`, `aria-label`, or live regions are added.

Not claimed for AAA: muted/secondary text (`--color-text-muted`, oklch 40%) and some non-text contrast may not reach 7:1, and AAA requires manual verification with a screen reader (NVDA/Narrator) and expert review.

## How to test

1. Open `index.html` in a browser (or use Live Server in VS Code).
2. Test keyboard navigation (Tab) and that the skip link works.
3. Test 200% zoom in the browser.
4. Toggle the theme with the moon/sun control in the header (pure CSS, no JS).
5. Run WAVE or Lighthouse for accessibility/performance.
