# Cyberpunk HUD — Detailed Style Guide

> Comprehensive style system and Tailwind-ready tokens inspired by the provided Cyberpunk HUD screenshot.

---

## Overview

This style guide documents the visual language, tokens, components and usage patterns for a futuristic, cyberpunk heads-up display (HUD). The UI is high-contrast, neon-accented on a very dark, textured background. Layout favors symmetric, grid-aligned panels and a central anatomical figure. Visual priorities:

* **High information density** with clear hierarchy
* **Neon accent colors** for affordances and status
* **Thin, condensed display typography** for a sci-fi feel
* **Micro-interactions**: scan/flicker, neon glows, subtle motion
* **Modular cards** and inventory grids for items

Use this guide for new components, design tokens, Tailwind configuration, and example implementations.

---

## Design Tokens

### Color tokens (semantic)

```json
{
  "bg-900": "#06060A",
  "panel-bg": "rgba(10,12,16,0.8)",
  "ui-line": "#2B2E34",

  "neon-cyan": "#00E6FF",
  "neon-magenta": "#FF2D6A",
  "neon-green": "#7CFF6B",
  "neon-yellow": "#FFD34B",
  "neon-orange": "#FF8C42",

  "muted-gray": "#9AA0A6",
  "accent-primary": "#A6FFF4",
  "danger": "#FF4D6D"
}
```

**Notes:** Use neon accents sparingly for interactive affordances (selected, equipped, important warnings). Keep base panels very dark; use slightly desaturated borders for separation.

---

## Color Palette — detailed

* **Primary background:** `#06060A` (very dark, near-black)
* **Panel background:** `rgba(10,12,16,0.75)` (allows subtle backdrop texture)
* **Primary accent (cyan):** `#00E6FF` — used for selected states, highlights, battery/RAM meters
* **Secondary accent (magenta):** `#FF2D6A` — used for negative/alert states and decorative labels
* **Support accents:** neon-green `#7CFF6B`, neon-yellow `#FFD34B`, neon-orange `#FF8C42`
* **Neutral text:** `#C7CED6` for body, `#E8EEF2` for strong labels

Contrast: ensure 4.5:1 for readable text on dark surfaces; neon accents may be used for non-body text and icons where contrast is less strict.

---

## Typography

The Cyberpunk HUD uses condensed, technical display fonts for headings and a monospaced / narrow sans for labels and data.

**Suggested fonts:**

* Headings / UI display: `Orbitron` or `Rajdhani` (condensed geometric) — use for large HUD headings.
* Labels / numerical: `Roboto Mono`, `Space Mono`, or `JetBrains Mono` — use for stats, numbers, memory/ram values.
* Body / annotations: `Inter` or `IBM Plex Sans` (variable weight) for readability at small sizes.

**Tokenized sizes & weights (desktop HUD):**

* H1 HUD Title: 48px / 56px condensed, weight 600 — letter-spacing: 0.02em
* H2 Panel Title: 18–20px, weight 600
* HUD label (small): 12px, weight 500, uppercase
* Numeric / stat: 20px, weight 700 (monospaced or semi-mono)
* Body / tooltip: 13px, weight 400

**Usage rules:**

* Use condensed display for hierarchy (titles), mono for precise data alignment, and a neutral sans for longer text/tooltip.
* Keep tracking tight on headings and slightly loose on small body text for legibility.

---

## Spacing System

Base spacing unit: **4px** (1u = 4px)

* xxs: 4px (1u)
* xs: 8px (2u)
* sm: 12px (3u)
* md: 16px (4u)
* lg: 24px (6u)
* xl: 32px (8u)
* xxl: 48px (12u)

**Grid & layout:**

* Use a 12-column grid for larger layouts with gutters = 16px (4u) and container max-width 1280–1600px.
* Panels inside the HUD use a compact grid: item cards 72–96px squares with 8px gaps.

---

## Component Styles

### Panels / Cards

* Background: `panel-bg` with 1px inner stroke (slightly lighter/darker depending on top edge) or thin neon hairline for section separators.
* Padding: `md` (16px) for panel content; tight panels may use 8–12px.
* Corners: mostly small radius (4px) for informational cards; some accent chips use 8px–12px.

### Inventory Grid

* Item tiles: fixed 72–96px squares
* Item border: 1px neon-tinted outline when selected, otherwise subtle desaturated stroke
* Icon: centered, scaled to 48–64% of tile
* Quantity badge: small rounded pill top-right, text 11px

### Tooltip / Details panel

* Width: 320–420px (depending on content)
* Background: fully opaque dark panel with 8–12px padding
* Callout accent: left or top vertical neon stripe (4px)
* Divider: 1px subtle texture line or glow

### Buttons / Tabs

* Buttons: flat with neon outline + subtle glow on hover
* Primary CTA: filled neon-cyan with dark text or light text depending on contrast

### Icons & Glyphs

* Use square, low-detail glyphs. Prefer line icons with 1.5–2px stroke and small neon fills for status.

---

## Shadows & Elevation

This HUD uses *glow-based* elevation rather than traditional drop shadows.

**Shadow tokens (CSS box-shadow examples):**

```css
--glow-xs: 0 2px 6px rgba(0,230,255,0.06);
--glow-sm: 0 8px 28px rgba(0,230,255,0.08);
--glow-neon: 0 0 18px rgba(0,230,255,0.18), 0 0 36px rgba(255,45,106,0.06);
```

Use inner-glow for embedded displays (inset) and outer glow for active/highlighted cards. Avoid heavy opaque shadows; keep them soft and colored.

---

## Animations & Transitions

Motion vocabulary should be minimal and purposeful.

* **Hover transitions:** 120–180ms cubic-bezier(0.2, 0.8, 0.2, 1)
* **Selection/Activate:** 150–220ms with glow scale and opacity change
* **Scan fx:** subtle vertical scan shimmer — 1.2–2s looped, low opacity gradient translate
* **Flicker:** small, brief opacity jitter (0.06–0.12s) for neon CRT-like effect
* **Micro-movement:** parallax on the central model and background particles — 6–12s slow ease

**Example keyframes:**

```css
@keyframes neon-flicker { 0%{opacity:1} 50%{opacity:0.92} 100%{opacity:1} }
@keyframes scan-line { 0%{transform:translateY(-100%)} 100%{transform:translateY(100%)} }
```

Use `prefers-reduced-motion` to disable non-essential motion.

---

## Border Radius

* Small cards: 4px
* Buttons / chips: 6–8px
* Rounded badges / avatars: 9999px (pill)
* Special panels (central HUD frame): 2px or sharp corners for tech aesthetic

---

## Opacity & Transparency

* Background overlay: 0.75–0.85
* Panel surface: 0.85–0.95 (opaque for readability)
* Disabled/ghost: 0.36–0.48
* Hover/active glows: use additive blending and higher alpha (0.12–0.25)

---

## Accessibility Notes

* Maintain minimum contrast of 4.5:1 for body text. Neon accents are decorative and should not carry essential information alone — always pair with shape/label.
* Provide keyboard focus states with clear outlines and non-color cues.
* Respect `prefers-reduced-motion`.

---

## Assets & Iconography

* Use 32px/48px grid for system icons, export at 1x/2x/3x.
* Use SVG for crisp vector icons; keep strokes to 1.5–2px.
* Sprite formats OK for micro icons but prefer inline SVG for color overrides.

---

## Common Tailwind CSS Usage

**Tailwind config suggestions** (partial):

```js
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,html}'],
  theme: {
    extend: {
      colors: {
        'neon-cyan': '#00E6FF',
        'neon-magenta': '#FF2D6A',
        'neon-green': '#7CFF6B',
        'panel-bg': 'rgba(10,12,16,0.75)'
      },
      fontFamily: {
        display: ['Orbitron', 'Rajdhani', 'sans-serif'],
        mono: ['Roboto Mono', 'ui-monospace', 'monospace'],
        body: ['Inter', 'system-ui']
      },
      spacing: {
        '1u': '4px',
        '2u': '8px',
        '3u': '12px',
        '4u': '16px'
      },
      boxShadow: {
        'neon-sm': '0 8px 28px rgba(0,230,255,0.08)',
        'neon-lg': '0 0 18px rgba(0,230,255,0.18)'
      },
      keyframes: {
        'scan': { '0%': { transform: 'translateY(-100%)' }, '100%': { transform: 'translateY(100%)' } }
      },
      animation: {
        'scan-anim': 'scan 1.8s linear infinite'
      }
    }
  }
}
```

**Utility examples**

* Panel: `bg-panel-bg p-4u rounded-sm border border-[rgba(255,255,255,0.04)]`
* Selected item: `ring-2 ring-neon-cyan/60 shadow-neon-sm`
* Tooltip: `bg-[#0b0b0d] p-3 rounded-md text-sm`

---

## Example component reference (React + Tailwind)

```jsx
// InventoryItem.jsx
export default function InventoryItem({icon, name, qty, equipped}){
  return (
    <div className={`w-20 h-20 p-2 rounded-sm relative bg-[rgba(12,14,18,0.85)] border border-[rgba(255,255,255,0.04)] ${equipped? 'ring-2 ring-neon-cyan/70 shadow-neon-sm':''}`}>
      <div className="absolute top-1 right-1 text-[11px] px-1 rounded-full bg-[rgba(0,0,0,0.6)]">{qty}</div>
      <div className="flex items-center justify-center h-full">
        <img src={icon} alt={name} className="max-w-[60%] max-h-[60%]" />
      </div>
      <div className="absolute left-2 bottom-1 text-xs text-[#C7CED6]">{name}</div>
    </div>
  )
}
```

**Tooltip example**

```jsx
function ItemTooltip({title, lines}){
  return (
    <div className="w-80 bg-[#0a0a0b] p-4 rounded-md shadow-neon-sm border border-[rgba(255,255,255,0.03)]">
      <div className="text-[13px] font-display font-semibold text-white mb-2">{title}</div>
      <div className="text-sm text-[#C7CED6] space-y-1">{lines.map(l=> <div key={l}>{l}</div>)}</div>
    </div>
  )
}
```

---

## Patterns & Examples

* **Inventory detail flow:** grid -> hover preview -> click opens detail panel sliding from right with scan animation on header
* **State indicators:** use color + icon + label (e.g., equipped: cyan bolt icon + "EQUIPPED")
* **Error/warning:** combine neon magenta + small shake or flicker + short tooltip explanation

---

## Responsive & Layout Considerations

* On narrow screens, collapse side panels into drawers; move central figure to scrollable area
* Use smaller type scale (reduce by 1 step) and convert grid tiles to 56px

---

## Implementation Checklist

* [ ] Add tokens to `:root` CSS variables
* [ ] Extend Tailwind with color/font/spacing tokens
* [ ] Build base components: `Panel`, `InventoryGrid`, `Tooltip`, `HUDTitle`
* [ ] Create motion tokens and respect `prefers-reduced-motion`
* [ ] Accessibility audit: contrast, keyboard nav, aria labels

---

## Appendix — CSS variable starter

```css
:root{
  --bg-900: #06060A;
  --panel-bg: rgba(10,12,16,0.85);
  --neon-cyan: #00E6FF;
  --neon-magenta: #FF2D6A;
  --muted: #C7CED6;
}
```

---

If you want, I can export this guide as a printable PDF or provide a ready-to-drop Tailwind config and React component library scaffold.
