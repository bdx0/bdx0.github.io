import React from 'react';

export default function RenderResponsiveLayout() {
  return (
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
  );
}
