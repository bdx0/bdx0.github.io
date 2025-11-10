import React from 'react';

export default function RenderImplementationChecklist() {
  return (
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
  );
}
