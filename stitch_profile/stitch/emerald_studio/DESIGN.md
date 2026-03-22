# Design System Document

## 1. Overview & Creative North Star
**Creative North Star: The Digital Curator**
This design system is built for a Full Stack Developer who views code as a craft. Moving away from the high-density, cluttered aesthetics of typical engineering portfolios, this system adopts an "Editorial Tech" approach. It balances the precision of development with the airy, thoughtful layout of a high-end gallery or architectural journal. 

The goal is to break the "standard template" look through **intentional asymmetry**, generous use of whitespace (breathing room), and a hierarchy defined by tonal depth rather than structural lines. By utilizing subtle shifts in warm neutrals and a single, piercing emerald accent, the interface feels sophisticated, permanent, and premium.

---

## 2. Colors & Surface Architecture
The palette is rooted in a "Warm Minimalist" foundation, using soft off-whites and deep charcoals to create a high-contrast yet easy-on-the-eye reading environment.

### Core Palette
- **Primary (Accent):** `#00694b` (Emerald) — Used sparingly for high-impact CTAs and critical status indicators.
- **Surface (Foundation):** `#fbf9f4` — A soft, parchment-like white that feels more premium than pure `#FFFFFF`.
- **On-Surface (Text):** `#1b1c19` — A deep charcoal for maximum legibility.
- **Secondary (Muted):** `#655d58` — Used for meta-data, descriptions, and less emphasized text.

### The Rules of Engagement
*   **The "No-Line" Rule:** 1px solid borders are strictly prohibited for sectioning. To separate content, use background color shifts. For example, a project grid should sit on `surface_container_low` (`#f5f3ee`) while the main body remains on `surface` (`#fbf9f4`).
*   **Surface Hierarchy & Nesting:** Treat the UI as physical layers.
    *   *Lowest Tier:* `surface_container_lowest` (#ffffff) — Reserved for floating cards or primary content blocks.
    *   *Base Tier:* `surface` (#fbf9f4) — The main canvas.
    *   *High Tier:* `surface_container_highest` (#e4e2dd) — Used for footer backgrounds or deep-set UI elements.
*   **The Glass & Gradient Rule:** For navigation bars or floating action buttons, use "Glassmorphism." Apply `surface` at 80% opacity with a `20px` backdrop-blur. Use subtle linear gradients (e.g., `primary` to `primary_container`) for main CTAs to add a sense of "liquid" depth.

---

## 3. Typography
The typography leverages a dual-sans approach to distinguish between "Storytelling" and "Utility."

*   **Display & Headlines (Manrope):** Bold, geometric, and authoritative. Use `display-lg` (3.5rem) with tighter letter-spacing (-0.02em) for hero sections. This conveys a "Modern Architectural" feel.
*   **Body & Labels (Inter):** Highly legible and neutral. Use `body-lg` (1rem) for long-form content.
*   **Hierarchy as Identity:** Use extreme scale differences to create rhythm. A `display-lg` headline should often be paired with a much smaller `label-md` (0.75rem) uppercase sub-head to create an editorial, "poster" look.

---

## 4. Elevation & Depth
In this system, depth is felt, not seen through heavy shadows.

*   **The Layering Principle:** Avoid shadows where possible. Instead, place a `#ffffff` card on a `#f5f3ee` background. The slight change in value creates a "Soft Lift."
*   **Ambient Shadows:** If a floating effect is required (e.g., a modal), use a "Sunken Shadow": `0 20px 40px rgba(27, 28, 25, 0.05)`. The shadow must be tinted with the `on-surface` color to feel natural.
*   **The "Ghost Border" Fallback:** If a border is required for accessibility, use `outline_variant` (#bccac1) at **15% opacity**. It should be a suggestion of a boundary, not a hard stop.
*   **Glassmorphism:** Use semi-transparent backgrounds for persistent elements like Navigation Bars to allow the "scrolling" content to bleed through, maintaining a sense of spatial awareness.

---

## 5. Components

### Buttons
*   **Primary:** Solid `primary` (#00694b) with `on_primary` (#ffffff) text. Border-radius `md` (0.375rem). No shadow; use a subtle scale-up effect (1.02x) on hover.
*   **Secondary:** `surface_container_high` (#eae8e3) background with `on_surface`. Blends into the background until hovered.
*   **Tertiary:** Text-only with a 2px underline in `primary_fixed_dim` (#61dcab) that expands on hover.

### Cards & Lists
*   **The Rule:** Forbid divider lines.
*   **Implementation:** Use the Spacing Scale `8` (2.75rem) to separate items. For project cards, use `surface_container_low` with a `xl` (0.75rem) border-radius.
*   **Project Thumbnails:** Use a very subtle inner-glow instead of an outer shadow to make the images feel "inset" into the page.

### Chips
*   **Style:** Small, `label-sm` typography. Background: `secondary_container` (#e9ddd7) with 10% opacity. Use for tech stacks (e.g., "React", "Node.js").

### Input Fields
*   **Style:** Minimalist. Only a bottom border of `outline_variant` at 40% opacity. On focus, the border animates to `primary` and a subtle `surface_variant` background-fill slides up from the bottom.

---

## 6. Do's and Don'ts

### Do's
*   **Do** use asymmetrical layouts. Place a headline on the left and a paragraph on the far right, leaving a "void" in the middle.
*   **Do** prioritize typography over icons. Let the words carry the weight.
*   **Do** use the `20` (7rem) spacing token for major section breaks to ensure the design feels expensive and unhurried.
*   **Do** use the Emerald accent (`#0DA175`) only for things that require action or indicate success.

### Don'ts
*   **Don't** use 100% black. Always use the charcoal `on_surface` (#1b1c19).
*   **Don't** use standard 4-column card grids. Try a 2-column wide layout or a staggered masonry look to avoid the "Bootstrap" feel.
*   **Don't** use heavy gradients. If using a gradient, keep the hues within 10 degrees of each other on the color wheel.
*   **Don't** use icons without a clear functional purpose. Avoid "icon-dusting" where icons are added just for decoration.