import Link from "next/link";

export const metadata = {
  title: "Design System - Fonts",
};

const fonts = [
  { name: "Space Grotesk", cssFamily: "var(--font-space-grotesk)" },
  { name: "Chakra Petch", cssFamily: "var(--font-chakra-petch)" },
  { name: "Genos", cssFamily: "var(--font-genos)" },
  { name: "Tektur", cssFamily: "var(--font-tektur)" },
  { name: "Space Mono", cssFamily: "var(--font-space-mono)" },
  { name: "JetBrains Mono", cssFamily: "var(--font-jetbrains-mono)" },
  { name: "JetBrainsMonoNL", cssFamily: "'JetBrainsMonoNL', monospace" },
  {
    name: "JetBrainsMonoNL Nerd Font Mono",
    cssFamily: "'JetBrainsMonoNL', monospace",
  },
  { name: "Hasklig", cssFamily: "var(--font-hasklig)" },
  { name: "Hack Nerd Font Mono", cssFamily: "var(--font-source-code-pro)" },
  { name: "Source Code Pro", cssFamily: "var(--font-source-code-pro)" },
  { name: "Roboto Mono", cssFamily: "var(--font-roboto-mono)" },
  { name: "Kanit", cssFamily: "var(--font-kanit)" },
  { name: "Be Vietnam Pro", cssFamily: "var(--font-be-vietnam-pro)" },
];

const colors = [
  {
    name: "bg-900",
    value: "#06060A",
    description: "Primary background: very dark, near-black",
  },
  {
    name: "panel-bg",
    value: "rgba(10,12,16,0.8)",
    description: "Panel background: semi-transparent dark",
  },
  {
    name: "ui-line",
    value: "#2B2E34",
    description: "UI lines: subtle dark gray",
  },
  {
    name: "neon-cyan",
    value: "#00E6FF",
    description: "Primary accent: vibrant cyan",
  },
  {
    name: "neon-magenta",
    value: "#FF2D6A",
    description: "Secondary accent: vibrant magenta",
  },
  {
    name: "neon-green",
    value: "#7CFF6B",
    description: "Support accent: bright green",
  },
  {
    name: "neon-yellow",
    value: "#FFD34B",
    description: "Support accent: bright yellow",
  },
  {
    name: "neon-orange",
    value: "#FF8C42",
    description: "Support accent: bright orange",
  },
  {
    name: "muted-gray",
    value: "#9AA0A6",
    description: "Muted text: soft gray",
  },
  {
    name: "neutral-body",
    value: "#C7CED6",
    description: "Body text: light gray",
  },
  {
    name: "neutral-strong",
    value: "#E8EEF2",
    description: "Strong labels: off-white",
  },
  {
    name: "accent-primary",
    value: "#A6FFF4",
    description: "Primary accent: light cyan",
  },
  { name: "danger", value: "#FF4D6D", description: "Danger: bright red" },
];

export default function DesignSystemPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Design System - Font Showcase</h1>
      <p className="mb-4">
        This page showcases various fonts, with a focus on their rendering for
        academic, technical, and Vietnamese content.
      </p>
      <h2 className="text-3xl font-bold mb-6">Design Tokens</h2>
      <div className="mb-12">
        <h3 className="text-2xl font-semibold mb-4">Color Palette</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {colors.map((color) => (
            <div
              key={color.name}
              className="p-4 border border-gray-700 rounded-lg"
            >
              <div
                className="w-full h-20 rounded-md mb-2"
                style={{ backgroundColor: color.value }}
              ></div>
              <p className="font-semibold text-lg">{color.name}</p>
              <p className="text-sm text-gray-400">{color.value}</p>
              <p className="text-xs text-gray-500">{color.description}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-12">
        <h3 className="text-2xl font-semibold mb-4">Typography</h3>
        <div className="space-y-4">
          <p>
            The typography system combines condensed, technical display fonts
            for headings and prominent UI elements with monospaced or narrow
            sans-serif fonts for data, code, and annotations. All fonts are
            carefully selected for their cyberpunk aesthetic and Vietnamese
            language support.
          </p>
          <p>
            <strong>Font Families Used:</strong>
          </p>
          <ul className="list-disc list-inside ml-4">
            <li>
              <code>--font-space-grotesk</code>: Modern sans-serif with a
              geometric and slightly condensed feel.
            </li>
            <li>
              <code>--font-chakra-petch</code>: Geometric sans-serif with a
              square design and tapered corners.
            </li>
            <li>
              <code>--font-genos</code>: Futuristic, industrial, and technical
              aesthetic.
            </li>
            <li>
              <code>--font-tektur</code>: Blocky, industrial, and geometric
              design.
            </li>
            <li>
              <code>--font-space-mono</code>: Monospaced with geometric and
              grotesque influences.
            </li>
            <li>
              <code>--font-jetbrains-mono</code>: Monospaced with programming
              ligatures.
            </li>
            <li>
              <code>JetBrainsMonoNL</code>: Self-hosted monospaced without
              ligatures, with slashed zero.
            </li>
            <li>
              <code>--font-hasklig</code>: Self-hosted monospaced with
              programming ligatures.
            </li>
            <li>
              <code>--font-source-code-pro</code>: Monospaced for coding
              environments.
            </li>
            <li>
              <code>--font-roboto-mono</code>: Monospaced optimized for screen
              readability.
            </li>
            <li>
              <code>--font-kanit</code>: Contemporary and futuristic humanist
              sans-serif with geometric curves.
            </li>
            <li>
              <code>--font-be-vietnam-pro</code>: Neo Grotesk with refined
              Vietnamese letterforms.
            </li>
            <li>
              <code>--font-exo-2</code>: Geometric sans-serif with a
              technological and futuristic feel.
            </li>
            <li>
              <code>--font-unica-one</code>: Condensed unicase sans-serif style.
            </li>
            <li>
              <code>--font-teko</code>: Tall, condensed design.
            </li>
            <li>
              <code>--font-rajdhani</code>: Modularized letterforms with a
              squared and condensed appearance.
            </li>
            <li>
              <code>--font-michroma</code>: Modern reinterpretation of the
              rounded-square sans genre.
            </li>
          </ul>
          <p>
            <strong>Font Weights:</strong> 400 (Regular), 600 (SemiBold), and
            700 (Bold).
          </p>
          <p>
            <strong>Font Sizes (Tailwind CSS Utility Classes):</strong>{" "}
            <code>text-sm</code> (14px), <code>text-base</code> (16px),{" "}
            <code>text-lg</code> (18px), <code>text-xl</code> (20px),{" "}
            <code>text-2xl</code> (24px), <code>text-3xl</code> (30px),{" "}
            <code>text-4xl</code> (36px), <code>text-5xl</code> (48px).
          </p>
        </div>
      </div>
      <div className="mb-12">
        <h3 className="text-2xl font-semibold mb-4">Spacing System</h3>
        <div className="space-y-4">
          <p>
            The project employs a modular spacing system based on a base unit of{" "}
            <strong>4px</strong> (<code>1u</code>).
          </p>
          <p>
            <strong>Scale:</strong>
          </p>
          <ul className="list-disc list-inside ml-4">
            <li>
              <code>xxs</code>: 4px (<code>1u</code>)
            </li>
            <li>
              <code>xs</code>: 8px (<code>2u</code>)
            </li>
            <li>
              <code>sm</code>: 12px (<code>3u</code>)
            </li>
            <li>
              <code>md</code>: 16px (<code>4u</code>)
            </li>
            <li>
              <code>lg</code>: 24px (<code>6u</code>)
            </li>
            <li>
              <code>xl</code>: 32px (<code>8u</code>)
            </li>
            <li>
              <code>xxl</code>: 48px (<code>12u</code>)
            </li>
          </ul>
          <p>
            <strong>Grid & Layout:</strong> Utilizes a 12-column grid with
            gutters of <code>16px</code> (<code>4u</code>). Maximum container
            width is typically <code>1280px</code> to <code>1600px</code>.
          </p>
        </div>
      </div>
      <div className="mb-12">
        <h3 className="text-2xl font-semibold mb-4">Component Styles</h3>
        <div className="space-y-4">
          <p>
            This section outlines the styling guidelines for various UI
            components, ensuring consistency and adherence to the cyberpunk
            aesthetic.
          </p>

          <h4 className="text-xl font-medium mb-2">Panels / Cards</h4>
          <ul className="list-disc list-inside ml-4">
            <li>
              <strong>Background:</strong> <code>var(--panel-bg)</code>{" "}
              (semi-transparent dark).
            </li>
            <li>
              <strong>Borders:</strong> <code>1px</code> inner stroke or thin
              neon hairline using <code>var(--ui-line)</code> or neon accent
              colors.
            </li>
            <li>
              <strong>Padding:</strong> <code>md</code> (16px) for general
              content; <code>8px</code> to <code>12px</code> for tighter panels.
            </li>
            <li>
              <strong>Corners:</strong> Small <code>border-radius</code> of{" "}
              <code>4px</code> (<code>--hud-sm</code>).
            </li>
          </ul>

          <h4 className="text-xl font-medium mb-2">Inventory Grid</h4>
          <ul className="list-disc list-inside ml-4">
            <li>
              <strong>Item Tiles:</strong> Fixed <code>72px</code> to{" "}
              <code>96px</code> square dimensions.
            </li>
            <li>
              <strong>Item Border:</strong> <code>1px</code> neon-tinted outline
              (<code>ring-2 ring-neon-cyan/60</code>) when selected, otherwise
              subtle desaturated stroke.
            </li>
            <li>
              <strong>Icon:</strong> Centered, scaled to <code>48%</code> to{" "}
              <code>64%</code> of tile size.
            </li>
            <li>
              <strong>Quantity Badge:</strong> Small rounded pill at top-right,{" "}
              <code>11px</code> text.
            </li>
          </ul>

          <h4 className="text-xl font-medium mb-2">Tooltip / Details Panel</h4>
          <ul className="list-disc list-inside ml-4">
            <li>
              <strong>Width:</strong> <code>320px</code> to <code>420px</code>,
              adaptable.
            </li>
            <li>
              <strong>Background:</strong> Fully opaque dark panel (
              <code>bg-[#0a0a0b]</code>) with <code>8px</code> to{" "}
              <code>12px</code> padding.
            </li>
            <li>
              <strong>Callout Accent:</strong> <code>4px</code> vertical neon
              stripe on left or top edge, using <code>var(--neon-cyan)</code>.
            </li>
            <li>
              <strong>Divider:</strong> <code>1px</code> subtle texture line or
              glow effect.
            </li>
          </ul>

          <h4 className="text-xl font-medium mb-2">Buttons / Tabs</h4>
          <ul className="list-disc list-inside ml-4">
            <li>
              <strong>Buttons:</strong> Flat design with neon outline + subtle
              glow on hover.
            </li>
            <li>
              <strong>Primary CTA:</strong> Filled <code>var(--neon-cyan)</code>{" "}
              background, with contrasting text.
            </li>
          </ul>

          <h4 className="text-xl font-medium mb-2">Icons & Glyphs</h4>
          <ul className="list-disc list-inside ml-4">
            <li>
              <strong>Style:</strong> Square, low-detail glyphs; line icons with{" "}
              <code>1.5px</code> to <code>2px</code> stroke.
            </li>
            <li>
              <strong>Accents:</strong> Small neon fills for status indicators.
            </li>
            <li>
              <strong>Format:</strong> SVG preferred for crisp vectors; inline
              SVG for color overrides.
            </li>
          </ul>
        </div>
      </div>
      <div className="mb-12">
        <h3 className="text-2xl font-semibold mb-4">Shadows & Elevation</h3>
        <div className="space-y-4">
          <p>
            The HUD design emphasizes <strong>glow-based</strong> elevation
            rather than traditional drop shadows, creating a futuristic and
            ethereal effect.
          </p>
          <p>
            <strong>
              Shadow Tokens (CSS <code>box-shadow</code> examples):
            </strong>
          </p>
          <ul className="list-disc list-inside ml-4">
            <li>
              <code>--glow-xs</code>:{" "}
              <code>0 2px 6px rgba(0,230,255,0.06)</code>
            </li>
            <li>
              <code>--glow-sm</code>:{" "}
              <code>0 8px 28px rgba(0,230,255,0.08)</code>
            </li>
            <li>
              <code>--glow-neon</code>:{" "}
              <code>
                0 0 18px rgba(0,230,255,0.18), 0 0 36px rgba(255,45,106,0.06)
              </code>{" "}
              (combines cyan and magenta glows)
            </li>
            <li>
              <code>--neon-blue-glow</code>:{" "}
              <code>0 0 10px #00f0ff, 0 0 20px #00f0ff</code>
            </li>
            <li>
              <code>--neon-green-glow</code>:{" "}
              <code>0 0 10px #00ff99, 0 0 20px #00ff99</code>
            </li>
          </ul>
          <p>
            <strong>Usage Rules:</strong>
          </p>
          <ul className="list-disc list-inside ml-4">
            <li>
              <strong>Inner Glow:</strong> Used for embedded displays or
              elements that appear recessed.
            </li>
            <li>
              <strong>Outer Glow:</strong> Applied to active or highlighted
              cards and interactive elements.
            </li>
            <li>
              <strong>Avoid Heavy Shadows:</strong> Keep shadows soft, subtle,
              and tinted with accent colors.
            </li>
          </ul>
        </div>
      </div>
      <div className="mb-12">
        <h3 className="text-2xl font-semibold mb-4">
          Animations & Transitions
        </h3>
        <div className="space-y-4">
          <p>
            Motion in the HUD is minimal, purposeful, and designed to enhance
            the futuristic experience without being distracting.
          </p>
          <ul className="list-disc list-inside ml-4">
            <li>
              <strong>Hover Transitions:</strong> <code>120ms</code> to{" "}
              <code>180ms</code> with a{" "}
              <code>cubic-bezier(0.2, 0.8, 0.2, 1)</code> easing function.
            </li>
            <li>
              <strong>Selection/Activation:</strong> <code>150ms</code> to{" "}
              <code>220ms</code> transitions involving glow scaling and opacity
              changes.
            </li>
            <li>
              <strong>Scan Effect:</strong> Subtle vertical scan line shimmer,
              typically <code>1.2s</code> to <code>2s</code> looped, using a
              low-opacity gradient translate.
            </li>
            <li>
              <strong>Flicker Effect:</strong> Small, brief opacity jitter (
              <code>0.06s</code> to <code>0.12s</code>) to simulate a CRT-like
              neon flicker.
            </li>
            <li>
              <strong>Micro-movement:</strong> Slow parallax effects on
              background elements or central models (<code>6s</code> to{" "}
              <code>12s</code> ease).
            </li>
          </ul>
          <p>
            <strong>Example Keyframes (CSS):</strong>
          </p>
          <pre className="bg-gray-800 p-4 rounded-md overflow-x-auto">
            <code className="text-lg text-white">
              {`@keyframes neon-flicker {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.92; }
}
@keyframes scan-line {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
}`}
            </code>
          </pre>
        </div>
      </div>
      <div className="mb-12">
        <h3 className="text-2xl font-semibold mb-4">Border Radius</h3>
        <div className="space-y-4">
          <ul className="list-disc list-inside ml-4">
            <li>
              <strong>Small Cards:</strong> <code>4px</code> (
              <code>--hud-sm</code>)
            </li>
            <li>
              <strong>Buttons / Chips:</strong> <code>6px</code> to{" "}
              <code>8px</code> (<code>--hud-md</code>)
            </li>
            <li>
              <strong>Rounded Badges / Avatars:</strong> <code>9999px</code> (
              <code>--hud-pill</code>) for a fully rounded, pill-like shape.
            </li>
            <li>
              <strong>Special Panels:</strong> <code>2px</code> or sharp corners
              for specific technical or central HUD elements.
            </li>
          </ul>
        </div>
      </div>
      <div className="mb-12">
        <h3 className="text-2xl font-semibold mb-4">Opacity & Transparency</h3>
        <div className="space-y-4">
          <p>
            Opacity and transparency are crucial for layering information and
            creating depth in the HUD.
          </p>
          <ul className="list-disc list-inside ml-4">
            <li>
              <strong>Background Overlay:</strong> <code>0.75</code> to{" "}
              <code>0.85</code> for subtle dimming of content behind active
              elements.
            </li>
            <li>
              <strong>Panel Surface:</strong> <code>0.85</code> to{" "}
              <code>0.95</code> to ensure readability of content while
              maintaining a semi-transparent effect.
            </li>
            <li>
              <strong>Disabled/Ghost Elements:</strong> <code>0.36</code> to{" "}
              <code>0.48</code> to visually indicate non-interactiveness.
            </li>
            <li>
              <strong>Hover/Active Glows:</strong> Uses additive blending and
              higher alpha values (<code>0.12</code> to <code>0.25</code>) for a
              luminous effect.
            </li>
          </ul>
        </div>
      </div>
      <div className="mb-12">
        <h3 className="text-2xl font-semibold mb-4">Accessibility Notes</h3>
        <div className="space-y-4">
          <ul className="list-disc list-inside ml-4">
            <li>
              <strong>Contrast:</strong> Maintain a minimum contrast ratio of
              4.5:1 for all body text. Neon accents are decorative and should
              not be the sole indicator of essential information.
            </li>
            <li>
              <strong>Focus States:</strong> Provide clear and distinct keyboard
              focus states using outlines and non-color cues.
            </li>
            <li>
              <strong>Reduced Motion:</strong> Respect the{" "}
              <code>prefers-reduced-motion</code> media query to disable
              non-essential animations and transitions.
            </li>
            <li>
              <strong>ARIA Labels:</strong> Utilize appropriate ARIA attributes
              for complex interactive components to convey their purpose and
              state to assistive technologies.
            </li>
          </ul>
        </div>
      </div>
      <div className="mb-12">
        <h3 className="text-2xl font-semibold mb-4">Assets & Iconography</h3>
        <div className="space-y-4">
          <ul className="list-disc list-inside ml-4">
            <li>
              <strong>System Icons:</strong> Designed on a <code>32px</code> or{" "}
              <code>48px</code> grid. Exported at <code>1x</code>,{" "}
              <code>2x</code>, and <code>3x</code> resolutions.
            </li>
            <li>
              <strong>Format:</strong> SVG is preferred for crisp, scalable
              vector icons.
            </li>
            <li>
              <strong>Stroke:</strong> Icons typically feature{" "}
              <code>1.5px</code> to <code>2px</code> stroke widths.
            </li>
            <li>
              <strong>Accents:</strong> Small neon fills are used for status
              indicators. Inline SVG allows for dynamic color overrides via CSS.
            </li>
            <li>
              <strong>Sprite Formats:</strong> Acceptable for micro icons, but
              inline SVG is preferred for greater control and flexibility.
            </li>
          </ul>
        </div>
      </div>
      <div className="mb-12">
        <h3 className="text-2xl font-semibold mb-4">
          Common Tailwind CSS Usage
        </h3>
        <div className="space-y-4">
          <p>
            This section outlines how the defined design tokens are translated
            into practical Tailwind CSS utility classes for consistent
            application.
          </p>
          <p>
            <strong>Utility Class Examples:</strong>
          </p>
          <ul className="list-disc list-inside ml-4">
            <li>
              <strong>Panel:</strong>{" "}
              <code>bg-panel-bg p-4u rounded-hud-sm border border-ui-line</code>
            </li>
            <li>
              <strong>Selected Item:</strong>{" "}
              <code>ring-2 ring-neon-cyan/60 shadow-neon-sm</code>
            </li>
            <li>
              <strong>Tooltip:</strong>{" "}
              <code>
                bg-panel-bg p-3u rounded-hud-md text-sm text-neutral-body
              </code>
            </li>
            <li>
              <strong>Heading:</strong>{" "}
              <code>text-4xl font-bold font-display text-neutral-strong</code>
            </li>
            <li>
              <strong>Body Text:</strong>{" "}
              <code>text-base font-body text-neutral-body</code>
            </li>
            <li>
              <strong>Code Block:</strong>{" "}
              <code>bg-bg-900 text-accent-primary font-mono text-lg</code>
            </li>
          </ul>
        </div>
      </div>
      <div className="mb-12">
        <h3 className="text-2xl font-semibold mb-4">
          Example Component Reference Design Code (React + Tailwind)
        </h3>
        <div className="space-y-4">
          <h4 className="text-xl font-medium mb-2">InventoryItem Component</h4>
          <pre className="bg-gray-800 p-4 rounded-md overflow-x-auto">
            <code className="text-lg text-white">
              {`// components/InventoryItem.jsx
import React from 'react';

export default function InventoryItem({ icon, name, qty, equipped }) {
  return (
    <div
      className={\`
        w-[96px] h-[96px] p-2u rounded-hud-sm relative
        bg-panel-bg border border-ui-line
        \${equipped ? 'ring-2 ring-neon-cyan/70 shadow-neon-sm' : ''}
      \`}
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
}`}
            </code>
          </pre>

          <h4 className="text-xl font-medium mb-2">ItemTooltip Component</h4>
          <pre className="bg-gray-800 p-4 rounded-md overflow-x-auto">
            <code className="text-lg text-white">
              {`// components/ItemTooltip.jsx
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
}`}
            </code>
          </pre>
        </div>
      </div>
      <div className="mb-12">
        <h3 className="text-2xl font-semibold mb-4">Patterns & Examples</h3>
        <div className="space-y-4">
          <ul className="list-disc list-inside ml-4">
            <li>
              <strong>Inventory Detail Flow:</strong> Grid item hover triggers a
              preview tooltip; clicking an item opens a detailed panel sliding
              from the right, featuring a subtle scan animation on its header.
            </li>
            <li>
              <strong>State Indicators:</strong> Combine color, icon, and label
              to convey status (e.g., "EQUIPPED" in <code>neon-cyan</code> with
              a bolt icon).
            </li>
            <li>
              <strong>Error/Warning Feedback:</strong> Utilize{" "}
              <code>neon-magenta</code> with a small shake or flicker animation,
              accompanied by a brief tooltip explanation.
            </li>
          </ul>
        </div>
      </div>
      <div className="mb-12">
        <h3 className="text-2xl font-semibold mb-4">
          Responsive & Layout Considerations
        </h3>
        <div className="space-y-4">
          <ul className="list-disc list-inside ml-4">
            <li>
              <strong>Narrow Screens:</strong> Side panels should collapse into
              navigable drawers. The central anatomical figure or main content
              area may shift to a scrollable region.
            </li>
            <li>
              <strong>Type Scale Adjustment:</strong> Implement a smaller type
              scale (e.g., reduce all font sizes by one step) for improved
              readability on compact displays.
            </li>
            <li>
              <strong>Grid Adaptation:</strong> Adjust grid tile sizes (e.g., to{" "}
              <code>56px</code> squares) to fit smaller viewports.
            </li>
          </ul>
        </div>
      </div>
      <div className="mb-12">
        <h3 className="text-2xl font-semibold mb-4">
          Implementation Checklist
        </h3>
        <div className="space-y-4">
          <ul className="list-disc list-inside ml-4">
            <li>
              [x] Add color tokens to <code>:root</code> CSS variables in{" "}
              <code>globals.css</code>.
            </li>
            <li>
              [x] Extend Tailwind CSS configuration with custom color, font,
              spacing, shadow, and border-radius tokens.
            </li>
            <li>
              [ ] Build base components: <code>Panel</code>,{" "}
              <code>InventoryGrid</code>, <code>Tooltip</code>,{" "}
              <code>HUDTitle</code>.
            </li>
            <li>
              [x] Create motion tokens (keyframes) and ensure{" "}
              <code>prefers-reduced-motion</code> is respected.
            </li>
            <li>
              [ ] Conduct an accessibility audit: verify contrast ratios,
              keyboard navigation, and ARIA labels.
            </li>
          </ul>
        </div>
      </div>
      <div className="mb-12">
        <h3 className="text-2xl font-semibold mb-4">
          Appendix — CSS Variable Starter (from <code>globals.css</code>)
        </h3>
        <div className="space-y-4">
          <pre className="bg-gray-800 p-4 rounded-md overflow-x-auto">
            <code className="text-lg text-white">
              {`:root{\n  --bg-900: #06060A;\n  --panel-bg: rgba(10,12,16,0.85);\n  --ui-line: #2B2E34;\n  --neon-cyan: #00E6FF;\n  --neon-magenta: #FF2D6A;\n  --neon-green: #7CFF6B;\n  --neon-yellow: #FFD34B;\n  --neon-orange: #FF8C42;\n  --muted-gray: #9AA0A6;\n  --neutral-body: #C7CED6;\n  --neutral-strong: #E8EEF2;\n  --accent-primary: #A6FFF4;\n  --danger: #FF4D6D;\n\n  /* Font Variables */\n  --font-inter: 'Inter', sans-serif;\n  --font-roboto-mono: 'Roboto Mono', monospace;\n  --font-manrope: 'Manrope', sans-serif;\n  --font-space-grotesk: 'Space Grotesk', sans-serif;\n  --font-chakra-petch: 'Chakra Petch', sans-serif;\n  --font-genos: 'Genos', sans-serif;\n  --font-tektur: 'Tektur', sans-serif;\n  --font-space-mono: 'Space Mono', monospace;\n  --font-source-code-pro: 'Source Code Pro', monospace;\n  --font-exo: 'Exo', sans-serif;\n  --font-kanit: 'Kanit', sans-serif;\n  --font-be-vietnam-pro: 'Be Vietnam Pro', sans-serif;\n  --font-exo-2: 'Exo 2', sans-serif;\n  --font-unica-one: 'Unica One', sans-serif;\n  --font-teko: 'Teko', sans-serif;\n  --font-rajdhani: 'Rajdhani', sans-serif;\n  --font-jetbrains-mono: 'JetBrains Mono', monospace;\n  --font-jetbrains-mono-nl: 'JetBrainsMonoNL', monospace; /* Self-hosted */\n\n  /* Shadow Variables */\n  --glow-xs: 0 2px 6px rgba(0,230,255,0.06);\n  --glow-sm: 0 8px 28px rgba(0,230,255,0.08);\n  --glow-neon: 0 0 18px rgba(0,230,255,0.18), 0 0 36px rgba(255,45,106,0.06);\n  --neon-blue-glow: 0 0 10px #00f0ff, 0 0 20px #00f0ff;\n  --neon-green-glow: 0 0 10px #00ff99, 0 0 20px #00ff99;\n}`}
            </code>
          </pre>
        </div>
      </div>{" "}
      {/* End of Design Tokens section wrapper */}
      <div>
        <h3>Fonts Style</h3>
        {fonts.map((font) => (
          <div
            key={font.name}
            className="mb-12 p-6 border border-gray-700 rounded-lg"
          >
            <h2
              className="text-3xl font-semibold mb-4"
              style={{
                fontFamily: font.cssFamily,
                fontFeatureSettings: '"zero" 1',
              }}
            >
              {font.name}
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium mb-2">
                  Heading Example (48px)
                </h3>
                <p
                  className="text-5xl"
                  style={{
                    fontFamily: font.cssFamily,
                    fontFeatureSettings: '"zero" 1',
                  }}
                >
                  Mẫu Chữ Tiếng Việt với JetBrainsMonoNL
                </p>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2">
                  Vietnamese Text Example (24px)
                </h3>
                <p
                  className="text-2xl"
                  style={{
                    fontFamily: font.cssFamily,
                    fontFeatureSettings: '"zero" 1',
                  }}
                >
                  Đây là một đoạn văn bản tiếng Việt mẫu để kiểm tra hiển thị
                  của font JetBrainsMonoNL. Font này được thiết kế đặc biệt cho
                  lập trình, với các ký tự có độ rộng cố định (monospaced) và
                  không có các ký tự nối (ligatures).
                </p>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2">
                  Numbers and Symbols (24px)
                </h3>
                <p
                  className="text-2xl"
                  style={{
                    fontFamily: font.cssFamily,
                    fontFeatureSettings: '"zero" 1',
                  }}
                >
                  Chúng ta sẽ kiểm tra các dấu tiếng Việt như: á à ả ạ ã, é è ẻ
                  ẹ ẽ, í ì ỉ ị ĩ, ó ò ỏ ọ õ, ú ù ủ ụ ũ, ý ỳ ỷỵ ỹ, đ.
                </p>
              </div>
              {font.cssFamily.includes("monospace") && (
                <div>
                  <h3 className="text-xl font-medium mb-2">
                    Code Example (18px)
                  </h3>
                  <pre className="bg-gray-800 p-4 rounded-md overflow-x-auto">
                    <code
                      className="text-lg"
                      style={{
                        fontFamily: font.cssFamily,
                        fontFeatureSettings: '"zero" 1',
                      }}
                    >
                      {
                        '// Một đoạn code mẫu bằng tiếng Việt\nconst chaoTheGioi: string = "Xin chào thế giới!";\n\nfunction inLoiChao(ten: string): void {\n  console.log(`Chào bạn, ${ten}!`);\n}\n\ninLoiChao("Người dùng");\n\n// Kiểm tra các toán tử không có ligatures\nlet soA: number = 10;\nlet soB: number = 20;\n\nif (soA === soB) {\n  console.log("soA bằng soB");\n} else if (soA !== soB) {\n  console.log("soA không bằng soB");\n}\n\nconst giaTriMacDinh: string = "Không có giá trị";\nconst ketQua: string = null ?? giaTriMacDinh; // Toán tử nullish coalescing\n\nconsole.log(`Kết quả: ${ketQua}`);'
                      }
                    </code>
                  </pre>
                </div>
              )}
              {font.name === "Latin Modern Roman" && (
                <p className="text-sm text-gray-400">
                  Note: "Latin Modern Roman" requires custom font import (e.g.,
                  self-hosting) for full functionality. Using a generic serif
                  fallback here.
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-12 text-center">
        <Link href="/" className="text-blue-400 hover:underline">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
