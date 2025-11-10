import React from 'react';

export default function RenderPatternsAndExamples() {
  return (
    <div className="mb-12">
      <h3 className="text-2xl font-semibold mb-4">Patterns & Examples</h3>
      <div className="space-y-4">
        <ul className="list-disc list-inside ml-4">
          <li>
            <strong>Inventory Detail Flow:</strong> Grid item hover triggers a
            preview tooltip; clicking an item opens a detailed panel sliding
            from the right, featuring a subtle scan animation on its header.
          </li>
          <li>
            <strong>State Indicators:</strong> Combine color, icon, and label
            to convey status (e.g., "EQUIPPED" in <code>neon-cyan</code> with
            a bolt icon).
          </li>
          <li>
            <strong>Error/Warning Feedback:</strong> Utilize{" "}
            <code>neon-magenta</code> with a small shake or flicker animation,
            accompanied by a brief tooltip explanation.
          </li>
        </ul>
      </div>
    </div>
  );
}
