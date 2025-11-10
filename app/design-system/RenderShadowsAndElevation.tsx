import React from 'react';

export default function RenderShadowsAndElevation() {
  return (
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
  );
}
