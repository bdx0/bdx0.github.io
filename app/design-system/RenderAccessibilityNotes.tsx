import React from 'react';

export default function RenderAccessibilityNotes() {
  return (
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
  );
}
