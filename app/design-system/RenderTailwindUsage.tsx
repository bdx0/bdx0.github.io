import React from 'react';

export default function RenderTailwindUsage() {
  return (
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
  );
}
