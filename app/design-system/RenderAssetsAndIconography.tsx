import React from 'react';

export default function RenderAssetsAndIconography() {
  return (
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
  );
}
