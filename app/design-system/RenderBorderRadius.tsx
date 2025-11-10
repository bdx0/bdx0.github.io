import React from 'react';

export default function RenderBorderRadius() {
  return (
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
  );
}
