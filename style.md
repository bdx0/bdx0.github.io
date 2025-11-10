# Cyberpunk HUD — Detailed Style Guide

> Comprehensive style system and Tailwind-ready tokens inspired by the provided Cyberpunk HUD screenshot.

---

## Overview

This style guide documents the visual language, design tokens, components, and usage patterns for a futuristic, cyberpunk heads-up display (HUD). The UI is characterized by high-contrast elements, vibrant neon accents set against a very dark, textured background. The layout emphasizes symmetry, grid-aligned panels, and a central anatomical figure. Key visual priorities include:

*   **High Information Density:** Efficiently presents complex data with clear visual hierarchy.
*   **Neon Accent Colors:** Utilized sparingly for interactive affordances, status indicators, and critical highlights.
*   **Condensed Display Typography:** Employs thin, geometric, and technical fonts to evoke a sci-fi aesthetic for headings and prominent UI elements.
*   **Micro-interactions:** Incorporates subtle animations like scan lines, neon glows, and flicker effects to enhance the futuristic feel and provide visual feedback.
*   **Modular Components:** Features adaptable cards and inventory grids for organizing information and interactive items.

This guide serves as a foundational resource for developing new components, defining design tokens, configuring Tailwind CSS, and implementing consistent UI elements across the project.

---

## Design Tokens

### Color Palette

The color palette is designed to create a high-contrast, immersive cyberpunk experience.

| Token Name      | Value                 | Description                                     | Usage                                                              |
| :-------------- | :-------------------- | :---------------------------------------------- | :----------------------------------------------------------------- |
| `--bg-900`      | `#06060A`             | Primary background: very dark, near-black       | Main application background                                        |
| `--panel-bg`    | `rgba(10,12,16,0.8)`  | Panel background: semi-transparent dark         | Background for UI panels, cards, and modular sections              |
| `--ui-line`     | `#2B2E34`             | UI lines: subtle dark gray                      | Borders, dividers, subtle separators                               |
| `--neon-cyan`   | `#00E6FF`             | Primary accent: vibrant cyan                    | Selected states, active elements, highlights, battery/RAM meters   |
| `--neon-magenta`| `#FF2D6A`             | Secondary accent: vibrant magenta               | Negative/alert states, warnings, decorative labels                 |
| `--neon-green`  | `#7CFF6B`             | Support accent: bright green                    | Success indicators, positive feedback                              |
| `--neon-yellow` | `#FFD34B`             | Support accent: bright yellow                   | Caution, informational alerts                                      |
| `--neon-orange` | `#FF8C42`             | Support accent: bright orange                   | Secondary highlights, alternative alerts                           |
| `--muted-gray`  | `#9AA0A6`             | Muted text: soft gray                           | Secondary text, disabled states, less important information        |
| `--neutral-body`| `#C7CED6`             | Body text: light gray                           | Standard readable text for paragraphs and descriptions             |
| `--neutral-strong`| `#E8EEF2`           | Strong labels: off-white                        | Important labels, primary headings, high-emphasis text             |
| `--accent-primary`| `#A6FFF4`           | Primary accent: light cyan                      | Code highlights, subtle interactive elements                       |
| `--danger`      | `#FF4D6D`             | Danger: bright red                              | Error messages, critical warnings                                  |

**Notes:** Neon accents should be used sparingly to maintain their impact and avoid visual clutter. Ensure a minimum contrast ratio of 4.5:1 for all readable text on dark backgrounds. Decorative neon elements may have lower contrast.

---

## Typography

The typography system combines condensed, technical display fonts for headings and prominent UI elements with monospaced or narrow sans-serif fonts for data, code, and annotations. All fonts are carefully selected for their cyberpunk aesthetic and Vietnamese language support.

**Font Families Used:**

*   **`--font-space-grotesk`**: Modern sans-serif with a geometric and slightly condensed feel. Used for general display and headings.
*   **`--font-chakra-petch`**: Geometric sans-serif with a square design and tapered corners, giving a futuristic and clean look. Used for display and UI elements.
*   **`--font-genos`**: Modern display typeface with a futuristic, industrial, and technical aesthetic, characterized by sharp, angular, and geometrically constructed characters. Used for display.
*   **`--font-tektur`**: Display sans-serif with a blocky, industrial, and geometric design, featuring octagonal outlines. Used for display.
*   **`--font-space-mono`**: Monospaced typeface with geometric and grotesque influences. Ideal for code, data, and terminal-like displays.
*   **`--font-jetbrains-mono`**: Monospaced font designed for developers, featuring programming ligatures. Used for code examples and technical text.
*   **`JetBrainsMonoNL`**: Self-hosted monospaced font, a variant of JetBrains Mono without programming ligatures, explicitly configured with `font-feature-settings: "zero" 1;` for a slashed zero. Used for code and data where ligatures are undesirable.
*   **`--font-hasklig`**: Self-hosted monospaced font that adds programming ligatures. Used for code examples where ligatures enhance readability.
*   **`--font-source-code-pro`**: Monospaced font designed by Adobe for coding environments, emphasizing readability. Used for code and technical text.
*   **`--font-roboto-mono`**: Monospaced font optimized for screen readability. Used for code, data, and numerical displays.
*   **`--font-kanit`**: Contemporary and futuristic humanist sans-serif with geometric curves. Offers full Vietnamese support. Used for display and headings.
*   **`--font-be-vietnam-pro`**: Neo Grotesk style, explicitly designed with refined Vietnamese letterforms and diacritics for optimal readability. Versatile for body and UI text.
*   **`--font-exo-2`**: Geometric sans-serif typeface with a technological and futuristic feel. Supports Vietnamese. Used for display and body text.
*   **`--font-unica-one`**: Condensed unicase sans-serif style, suitable for headlines and short texts. Supports Vietnamese.
*   **`--font-teko`**: Tall, condensed design, suitable for modern editorial layouts or UI design. Supports Vietnamese.
*   **`--font-rajdhani`**: Features modularized letterforms with a squared and condensed appearance, technical and futuristic. Supports Vietnamese.
*   **`--font-michroma`**: Modern reinterpretation of the rounded-square sans genre, evoking a 1960s futuristic feel. Supports Vietnamese.

**Font Weights:**
The project primarily uses `400` (Regular), `600` (SemiBold), and `700` (Bold) weights to maintain a clean, legible, and impactful aesthetic. Specific fonts may include additional weights as defined in their `next/font/google` configuration.

**Font Sizes & Line Heights (Tailwind CSS Utility Classes):**
The project leverages Tailwind CSS's responsive font size scale.

*   `text-sm`: 14px (e.g., for notes, small labels)
*   `text-base`: 16px (default body text)
*   `text-lg`: 18px (e.g., code examples)
*   `text-xl`: 20px (e.g., subheadings)
*   `text-2xl`: 24px (e.g., larger body text, Vietnamese examples)
*   `text-3xl`: 30px (e.g., section titles)
*   `text-4xl`: 36px (e.g., main headings)
*   `text-5xl`: 48px (e.g., prominent display text)

Line heights are typically managed by Tailwind's default `leading-normal` or `leading-relaxed` utilities, or explicitly set where precise control is needed (e.g., `line-height: 1.75` for prose).

**Font Usage and Pairing:**
*   **Headings (`h1`, `h2`, `h3`, `h4`):** Primarily use `font-display` (which includes `Rajdhani`, `Teko`, `Exo`, `Unica One`, `Kanit`, `Michroma`, `Space Grotesk`, `Orbitron`) for a condensed, geometric, and impactful look.
*   **Body Text (`p`, `span`):** Uses `font-sans` (which includes `Exo 2`, `Be Vietnam Pro`, `Space Grotesk`, `Chakra Petch`, `Genos`, `Tektur`, `Manrope`, `Inter`) for readability at various sizes, with strong Vietnamese support.
*   **Monospaced Text (`code`, `pre`):** Uses `font-mono` (which includes `JetBrains Mono`, `Hasklig`, `JetBrainsMonoNL`, `Source Code Pro`, `Space Mono`, `Roboto Mono`) for code examples, numerical data, and terminal-like output, ensuring character alignment.

**Font Features:**
*   `font-feature-settings: "zero" 1;`: Explicitly applied to monospaced fonts like `JetBrainsMonoNL` to ensure a slashed zero, distinguishing it from the letter 'O'.

---

## Spacing System

The project employs a modular spacing system based on a base unit of **4px**. This ensures consistent and harmonious spacing throughout the UI.

*   **Base Unit:** `1u = 4px`
*   **Scale:**
    *   `xxs`: `4px` (`1u`)
    *   `xs`: `8px` (`2u`)
    *   `sm`: `12px` (`3u`)
    *   `md`: `16px` (`4u`)
    *   `lg`: `24px` (`6u`)
    *   `xl`: `32px` (`8u`)
    *   `xxl`: `48px` (`12u`)

**Grid & Layout:**
*   **Larger Layouts:** Utilizes a 12-column grid with gutters of `16px` (`4u`). The maximum container width is typically `1280px` to `1600px`.
*   **Panel Grids:** Inner panels and item cards within the HUD use a compact grid system, often with `72px` to `96px` square items and `8px` gaps.

---

## Component Styles

### Panels / Cards

*   **Background:** `var(--panel-bg)` (semi-transparent dark) to allow subtle background textures to show through.
*   **Borders:** `1px` inner stroke or thin neon hairline for section separators, using `var(--ui-line)` or neon accent colors.
*   **Padding:** `md` (`16px`) for general panel content. Tighter panels may use `8px` to `12px`.
*   **Corners:** Small `border-radius` of `4px` (`--hud-sm`) for informational cards. Some accent chips may use `6px` to `8px` (`--hud-md`) or `9999px` (`--hud-pill`) for fully rounded shapes.

### Inventory Grid

*   **Item Tiles:** Fixed `72px` to `96px` square dimensions.
*   **Item Border:** `1px` neon-tinted outline (`ring-2 ring-neon-cyan/60`) when selected, otherwise a subtle desaturated stroke (`border border-[rgba(255,255,255,0.04)]`).
*   **Icon:** Centered within the tile, scaled to `48%` to `64%` of the tile size.
*   **Quantity Badge:** Small rounded pill (`rounded-full`) positioned at the top-right, with `11px` text.

### Tooltip / Details Panel

*   **Width:** `320px` to `420px`, adaptable based on content.
*   **Background:** Fully opaque dark panel (`bg-[#0a0a0b]`) with `8px` to `12px` padding.
*   **Callout Accent:** A `4px` vertical neon stripe on the left or top edge, using `var(--neon-cyan)`.
*   **Divider:** `1px` subtle texture line or glow effect.

### Buttons / Tabs

*   **Buttons:** Flat design with a neon outline and a subtle glow effect on hover.
*   **Primary CTA:** Filled with `var(--neon-cyan)` background, using dark text or light text depending on contrast for readability.

### Icons & Glyphs

*   **Style:** Utilizes square, low-detail glyphs.
*   **Stroke:** Prefers line icons with `1.5px` to `2px` stroke width.
*   **Accents:** Small neon fills are used for status indicators.
*   **Format:** SVG is preferred for crisp vector icons. Inline SVG allows for easy color overrides.

---

## Shadows & Elevation

The HUD design emphasizes *glow-based* elevation rather than traditional drop shadows, creating a futuristic and ethereal effect.

**Shadow Tokens (CSS `box-shadow` examples):**

*   `--glow-xs`: `0 2px 6px rgba(0,230,255,0.06)`
*   `--glow-sm`: `0 8px 28px rgba(0,230,255,0.08)`
*   `--glow-neon`: `0 0 18px rgba(0,230,255,0.18), 0 0 36px rgba(255,45,106,0.06)` (combines cyan and magenta glows)
*   `--neon-blue-glow`: `0 0 10px #00f0ff, 0 0 20px #00f0ff`
*   `--neon-green-glow`: `0 0 10px #00ff99, 0 0 20px #00ff99`

**Usage Rules:**
*   **Inner Glow:** Used for embedded displays or elements that appear recessed.
*   **Outer Glow:** Applied to active or highlighted cards and interactive elements.
*   **Avoid Heavy Shadows:** Keep shadows soft, subtle, and tinted with accent colors.

---

## Animations & Transitions

Motion in the HUD is minimal, purposeful, and designed to enhance the futuristic experience without being distracting.

*   **Hover Transitions:** `120ms` to `180ms` with a `cubic-bezier(0.2, 0.8, 0.2, 1)` easing function for smooth, responsive feedback.
*   **Selection/Activation:** `150ms` to `220ms` transitions involving glow scaling and opacity changes.
*   **Scan Effect:** A subtle vertical scan line shimmer, typically `1.2s` to `2s` looped, using a low-opacity gradient translate.
*   **Flicker Effect:** Small, brief opacity jitter (`0.06s` to `0.12s`) to simulate a CRT-like neon flicker.
*   **Micro-movement:** Slow parallax effects on background elements or central models (`6s` to `12s` ease) for subtle depth.

**Example Keyframes (CSS):**

```css
@keyframes neon-flicker {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.92; }
}
@keyframes scan-line {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
}
```

**Accessibility:** Always respect `prefers-reduced-motion` to disable non-essential animations for users who prefer less motion.

---

## Border Radius

*   **Small Cards:** `4px` (`--hud-sm`)
*   **Buttons / Chips:** `6px` to `8px` (`--hud-md`)
*   **Rounded Badges / Avatars:** `9999px` (`--hud-pill`) for a fully rounded, pill-like shape.
*   **Special Panels:** `2px` or sharp corners for specific technical or central HUD elements.

---

## Opacity & Transparency

Opacity and transparency are crucial for layering information and creating depth in the HUD.

*   **Background Overlay:** `0.75` to `0.85` for subtle dimming of content behind active elements.
*   **Panel Surface:** `0.85` to `0.95` to ensure readability of content while maintaining a semi-transparent effect.
*   **Disabled/Ghost Elements:** `0.36` to `0.48` to visually indicate non-interactiveness.
*   **Hover/Active Glows:** Uses additive blending and higher alpha values (`0.12` to `0.25`) for a luminous effect.

---

## Accessibility Notes

*   **Contrast:** Maintain a minimum contrast ratio of 4.5:1 for all body text to ensure readability. Neon accents are primarily decorative and should not be the sole indicator of essential information.
*   **Focus States:** Provide clear and distinct keyboard focus states using outlines and non-color cues to assist users navigating with keyboards.
*   **Reduced Motion:** Respect the `prefers-reduced-motion` media query to disable non-essential animations and transitions for users with motion sensitivities.
*   **ARIA Labels:** Utilize appropriate ARIA attributes for complex interactive components to convey their purpose and state to assistive technologies.

---

## Assets & Iconography

*   **System Icons:** Designed on a `32px` or `48px` grid. Exported at `1x`, `2x`, and `3x` resolutions for various display densities.
*   **Format:** SVG is preferred for crisp, scalable vector icons.
*   **Stroke:** Icons typically feature `1.5px` to `2px` stroke widths.
*   **Color:** Small neon fills are used for status indicators. Inline SVG allows for dynamic color overrides via CSS.
*   **Sprite Formats:** Acceptable for micro icons, but inline SVG is preferred for greater control and flexibility.

---

## Common Tailwind CSS Usage in Project

This section outlines how the defined design tokens are translated into practical Tailwind CSS utility classes for consistent application.

**Tailwind Configuration Extensions (from `tailwind.config.js`):**

```javascript
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,html}'], // Adjusted for project structure
  theme: {
    extend: {
      colors: {
        'bg-900': 'var(--bg-900)',
        'panel-bg': 'var(--panel-bg)',
        'ui-line': 'var(--ui-line)',
        'neon-cyan': 'var(--neon-cyan)',
        'neon-magenta': 'var(--neon-magenta)',
        'neon-green': 'var(--neon-green)',
        'neon-yellow': 'var(--neon-yellow)',
        'neon-orange': 'var(--neon-orange)',
        'muted-gray': 'var(--muted-gray)',
        'neutral-body': 'var(--neutral-body)',
        'neutral-strong': 'var(--neutral-strong)',
        'accent-primary': 'var(--accent-primary)',
        'danger': 'var(--danger)',
      },
      fontFamily: {
        display: ['var(--font-rajdhani)', 'var(--font-teko)', 'var(--font-exo)', 'var(--font-unica-one)', 'var(--font-kanit)', 'var(--font-space-grotesk)', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'var(--font-hasklig)', 'var(--font-jetbrains-mono-nl)', 'var(--font-source-code-pro)', 'var(--font-space-mono)', 'var(--font-roboto-mono)', 'ui-monospace', 'monospace'],
        body: ['var(--font-manrope)', 'var(--font-inter)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-exo-2)', 'var(--font-be-vietnam-pro)', 'var(--font-space-grotesk)', 'var(--font-chakra-petch)', 'var(--font-genos)', 'var(--font-tektur)', 'var(--font-manrope)', 'var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '1u': '4px', '2u': '8px', '3u': '12px', '4u': '16px',
        '6u': '24px', '8u': '32px', '12u': '48px',
      },
      boxShadow: {
        'neon-xs': 'var(--glow-xs)',
        'neon-sm': 'var(--glow-sm)',
        'neon-lg': 'var(--glow-neon)',
        'neon-blue-glow': 'var(--neon-blue-glow)',
        'neon-green-glow': 'var(--neon-green-glow)',
      },
      borderRadius: {
        'hud-sm': '4px',
        'hud-md': '6px',
        'hud-lg': '8px',
        'hud-pill': '9999px',
      },
      keyframes: {
        'scan': { '0%': { transform: 'translateY(-100%)' }, '100%': { transform: 'translateY(100%)' } },
        'neon-flicker': { '0%, 100%': { opacity: '1' }, '50%': { opacity: '0.92' } }
      },
      animation: {
        'scan-anim': 'scan 1.8s linear infinite',
        'neon-flicker': 'neon-flicker 2s ease-in-out infinite'
      }
    }
  }
}
```

**Utility Class Examples:**

*   **Panel:** `bg-panel-bg p-4u rounded-hud-sm border border-ui-line`
*   **Selected Item:** `ring-2 ring-neon-cyan/60 shadow-neon-sm`
*   **Tooltip:** `bg-panel-bg p-3u rounded-hud-md text-sm text-neutral-body`
*   **Heading:** `text-4xl font-bold font-display text-neutral-strong`
*   **Body Text:** `text-base font-body text-neutral-body`
*   **Code Block:** `bg-bg-900 text-accent-primary font-mono text-lg`

---

## Example Component Reference Design Code (React + Tailwind)

### InventoryItem Component

```jsx
// components/InventoryItem.jsx
import React from 'react';

export default function InventoryItem({ icon, name, qty, equipped }) {
  return (
    <div
      className={`
        w-[96px] h-[96px] p-2u rounded-hud-sm relative
        bg-panel-bg border border-ui-line
        ${equipped ? 'ring-2 ring-neon-cyan/70 shadow-neon-sm' : ''}
      `}
    >
      <div className="absolute top-1u right-1u text-[11px] px-1u rounded-hud-pill bg-bg-900 text-neutral-body">
        {qty}
      </div>
      <div className="flex items-center justify-center h-full">
        <img src={icon} alt={name} className="max-w-[60%] max-h-[60%]" />
      </div>
      <div className="absolute left-2u bottom-1u text-xs text-neutral-body font-sans">
        {name}
      </div>
    </div>
  );
}
```

### ItemTooltip Component

```jsx
// components/ItemTooltip.jsx
import React from 'react';

export default function ItemTooltip({ title, lines }) {
  return (
    <div className="w-80 bg-panel-bg p-4u rounded-hud-md shadow-neon-sm border border-ui-line">
      <div className="text-lg font-display font-semibold text-neutral-strong mb-2u">
        {title}
      </div>
      <div className="text-sm text-neutral-body space-y-1u">
        {lines.map((l) => (
          <div key={l}>{l}</div>
        ))}
      </div>
    </div>
  );
}
```

---

## Patterns & Examples

*   **Inventory Detail Flow:**
    *   **Interaction:** Grid item hover triggers a preview tooltip.
    *   **Activation:** Clicking an item opens a detailed panel sliding from the right, featuring a subtle scan animation on its header.
*   **State Indicators:**
    *   Combine color, icon, and label to convey status (e.g., "EQUIPPED" in `neon-cyan` with a bolt icon).
*   **Error/Warning Feedback:**
    *   Utilize `neon-magenta` with a small shake or flicker animation, accompanied by a brief tooltip explanation.

---

## Responsive & Layout Considerations

*   **Narrow Screens:** Side panels should collapse into navigable drawers. The central anatomical figure or main content area may shift to a scrollable region.
*   **Type Scale Adjustment:** Implement a smaller type scale (e.g., reduce all font sizes by one step) for improved readability on compact displays.
*   **Grid Adaptation:** Adjust grid tile sizes (e.g., to `56px` squares) to fit smaller viewports.

---

## Implementation Checklist

*   [x] Add color tokens to `:root` CSS variables in `globals.css`.
*   [x] Extend Tailwind CSS configuration with custom color, font, spacing, shadow, and border-radius tokens.
*   [ ] Build base components: `Panel`, `InventoryGrid`, `Tooltip`, `HUDTitle`.
*   [x] Create motion tokens (keyframes) and ensure `prefers-reduced-motion` is respected.
*   [ ] Conduct an accessibility audit: verify contrast ratios, keyboard navigation, and ARIA labels.

---

## Appendix — CSS Variable Starter (from `globals.css`)

```css
:root{
  --bg-900: #06060A;
  --panel-bg: rgba(10,12,16,0.85);
  --ui-line: #2B2E34;
  --neon-cyan: #00E6FF;
  --neon-magenta: #FF2D6A;
  --neon-green: #7CFF6B;
  --neon-yellow: #FFD34B;
  --neon-orange: #FF8C42;
  --muted-gray: #9AA0A6;
  --neutral-body: #C7CED6;
  --neutral-strong: #E8EEF2;
  --accent-primary: #A6FFF4;
  --danger: #FF4D6D;

  /* Font Variables */
  --font-inter: 'Inter', sans-serif;
  --font-roboto-mono: 'Roboto Mono', monospace;
  --font-manrope: 'Manrope', sans-serif;
  --font-space-grotesk: 'Space Grotesk', sans-serif;
  --font-chakra-petch: 'Chakra Petch', sans-serif;
  --font-genos: 'Genos', sans-serif;
  --font-tektur: 'Tektur', sans-serif;
  --font-space-mono: 'Space Mono', monospace;
  --font-source-code-pro: 'Source Code Pro', monospace;
  --font-exo: 'Exo', sans-serif;
  --font-kanit: 'Kanit', sans-serif;
  --font-be-vietnam-pro: 'Be Vietnam Pro', sans-serif;
  --font-exo-2: 'Exo 2', sans-serif;
  --font-unica-one: 'Unica One', sans-serif;
  --font-teko: 'Teko', sans-serif;
  --font-rajdhani: 'Rajdhani', sans-serif;
  --font-jetbrains-mono: 'JetBrains Mono', monospace;
  --font-jetbrains-mono-nl: 'JetBrainsMonoNL', monospace; /* Self-hosted */

  /* Shadow Variables */
  --glow-xs: 0 2px 6px rgba(0,230,255,0.06);
  --glow-sm: 0 8px 28px rgba(0,230,255,0.08);
  --glow-neon: 0 0 18px rgba(0,230,255,0.18), 0 0 36px rgba(255,45,106,0.06);
  --neon-blue-glow: 0 0 10px #00f0ff, 0 0 20px #00f0ff;
  --neon-green-glow: 0 0 10px #00ff99, 0 0 20px #00ff99;
}
```

---

This detailed style guide provides a comprehensive overview of the Cyberpunk HUD's visual language, design tokens, and implementation patterns. It aims to ensure consistency and maintain the distinct aesthetic across all UI elements.