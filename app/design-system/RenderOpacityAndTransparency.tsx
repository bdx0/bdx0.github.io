import React from 'react';

export default function RenderOpacityAndTransparency() {
  return (
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
  );
}
