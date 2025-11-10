import React from 'react';

export default function RenderComponentStyles() {
  return (
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
  );
}
