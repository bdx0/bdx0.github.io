import React from 'react';

export default function RenderSpacingSystem() {
  return (
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
  );
}
