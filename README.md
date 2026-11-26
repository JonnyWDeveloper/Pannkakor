# Pannkakor – Recipe Site

A small recipe site built with semantic HTML, modern CSS, and accessibility in mind. It has three pages: a start page, a recipe page (pancakes), and a "Share a recipe" form.

## Files

- `index.html` – start page with hero, categories, and recipe cards
- `recept.html` – recipe page with facts, ingredients, and steps
- `dela-recept.html` – demo form with native browser validation
- `style.css` – design system, tokens, reset, and all styling
- `ProjectRules.clinerules` – course requirements and project rules

## Requirements and how they are met

### Structure and accessibility

| Requirement | Met |
| --- | --- |
| Semantic HTML: landmarks (`header`, `nav`, `main`, `footer`), `section` and `article` where appropriate | Yes – all three pages use landmarks; recipe cards are `article`, sections are `section` |
| One `h1` per page and headings in logical order | Yes – one `h1` per page, `h2` for sections |
| Recipe details use suitable elements (`dl` for facts, checkbox list for ingredients, `ol` for steps) | Yes – `dl` for facts, `ul` with checkbox labels, `ol` for steps |
| Images with thoughtful `alt` text (`alt=""` for decorative) | Yes – hero/cards have descriptive alt, serving images have `alt=""` |
| `figure` and `figcaption` where a visible caption adds value | Yes – serving suggestions |
| Current page in the header | The homepage logo marks the homepage, and the corresponding menu link marks each of the other two pages. |
| Keyboard navigation | Skip link, visible focus styles, and native links and form controls |
| CSS reset with source comment | Yes – comment with source (Andy Bell) |
| Colors, fonts, and spacing in variables (tokens), no hardcoded colors | Yes – `:root` with `--color-*`, `--spacing-*` |
| Unit strategy (rem/px) | Rem for scalable typography and spacing, px for borders and minimum target sizes |
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
| Modern colors (`oklch()`) | OKLCH tokens define the light and dark palettes. The course target is WCAG AA contrast, including the hero text over the image. |
| Images – WebP-only, fluid sizing | The three pages reuse three WebP files through `<img>` elements. CSS uses `object-fit: cover` and aspect ratios to fit images to their layouts. |

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

When the demo form passes validation, the browser loads the same page with empty fields and displays a confirmation. The GET request carries no recipe or contact field values. The site stores no submissions.

### Other

| Requirement | Met |
| --- | --- |
| HTML and CSS only | Yes |
| Theme toggle | A native checkbox and CSS `:has()` switch themes on the current page. |

## ARIA policy

`aria-current="page"` is the only ARIA attribute allowed. Use it on the header link for the current page. Use native HTML elements and labels for landmarks, controls, and accessible names.

## Previously reported checks

- **Chrome keyboard checks.** Skip link, theme toggle, and ingredient checkboxes.
- **WAVE.** AIM score 10/10 on all three pages. The homepage reported zero errors, zero contrast errors, and three redundant-link alerts.
- **Lighthouse.** All three pages scored 100 in Performance, Accessibility, Best Practices, and SEO on mobile and desktop.
- **Screen reader.** Manual testing is pending.

## How to test

1. Open `index.html` in a browser (or use Live Server in VS Code).
2. Test keyboard navigation (Tab) and that the skip link works.
3. Check the layout at narrow and wide widths and check that text remains visible at 200% text size.
4. Switch themes with the moon/sun control in the header and check the hero text contrast in both themes.
5. Submit the form with invalid and then valid example values. Check the error messages, the cleared fields, and the confirmation.
6. Run WAVE and Lighthouse and check navigation and form feedback with a screen reader.
