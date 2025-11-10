import React from 'react';

export default function RenderAnimationsAndTransitions() {
  return (
    <div className="mb-12">
      <h3 className="text-2xl font-semibold mb-4">
        Animations & Transitions
      </h3>
      <div className="space-y-4">
        <p>
          Motion in the HUD is minimal, purposeful, and designed to enhance
          the futuristic experience without being distracting.
        </p>
        <ul className="list-disc list-inside ml-4">
          <li>
            <strong>Hover Transitions:</strong> <code>120ms</code> to{" "}
            <code>180ms</code> with a{" "}
            <code>cubic-bezier(0.2, 0.8, 0.2, 1)</code> easing function.
          </li>
          <li>
            <strong>Selection/Activation:</strong> <code>150ms</code> to{" "}
            <code>220ms</code> transitions involving glow scaling and opacity
            changes.
          </li>
          <li>
            <strong>Scan Effect:</strong> Subtle vertical scan line shimmer,
            typically <code>1.2s</code> to <code>2s</code> looped, using a
            low-opacity gradient translate.
          </li>
          <li>
            <strong>Flicker Effect:</strong> Small, brief opacity jitter (
            <code>0.06s</code> to <code>0.12s</code>) to simulate a CRT-like
            neon flicker.
          </li>
          <li>
            <strong>Micro-movement:</strong> Slow parallax effects on
            background elements or central models (<code>6s</code> to{" "}
            <code>12s</code> ease).
          </li>
        </ul>
        <p>
          <strong>Example Keyframes (CSS):</strong>
        </p>
        <pre className="bg-gray-800 p-4 rounded-md overflow-x-auto">
          <code className="text-lg text-white">
            {`@keyframes neon-flicker {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.92; }
}
@keyframes scan-line {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
}`}
          </code>
        </pre>
      </div>
    </div>
  );
}
