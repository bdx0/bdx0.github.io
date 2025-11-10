import React from 'react';

const fonts = [
  { name: "Space Grotesk", cssFamily: "var(--font-space-grotesk)" },
  { name: "Chakra Petch", cssFamily: "var(--font-chakra-petch)" },
  { name: "Genos", cssFamily: "var(--font-genos)" },
  { name: "Tektur", cssFamily: "var(--font-tektur)" },
  { name: "Space Mono", cssFamily: "var(--font-space-mono)" },
  { name: "JetBrains Mono", cssFamily: "var(--font-jetbrains-mono)" },
  { name: "JetBrainsMonoNL", cssFamily: "'JetBrainsMonoNL', monospace" },
  {
    name: "JetBrainsMonoNL Nerd Font Mono",
    cssFamily: "'JetBrainsMonoNL', monospace",
  },
  { name: "Hasklig", cssFamily: "var(--font-hasklig)" },
  { name: "Hack Nerd Font Mono", cssFamily: "var(--font-source-code-pro)" },
  { name: "Source Code Pro", cssFamily: "var(--font-source-code-pro)" },
  { name: "Roboto Mono", cssFamily: "var(--font-roboto-mono)" },
  { name: "Kanit", cssFamily: "var(--font-kanit)" },
  { name: "Be Vietnam Pro", cssFamily: "var(--font-be-vietnam-pro)" },
];

export default function RenderTypography() {
  return (
    <div className="mb-12">
      <h3 className="text-2xl font-semibold mb-4">Typography</h3>
      <div className="space-y-4">
        <p>
          The typography system combines condensed, technical display fonts
          for headings and prominent UI elements with monospaced or narrow
          sans-serif fonts for data, code, and annotations. All fonts are
          carefully selected for their cyberpunk aesthetic and Vietnamese
          language support.
        </p>
        <p>
          <strong>Font Families Used:</strong>
        </p>
        <ul className="list-disc list-inside ml-4">
          <li>
            <code>--font-space-grotesk</code>: Modern sans-serif with a
            geometric and slightly condensed feel.
          </li>
          <li>
            <code>--font-chakra-petch</code>: Geometric sans-serif with a
            square design and tapered corners.
          </li>
          <li>
            <code>--font-genos</code>: Futuristic, industrial, and technical
            aesthetic.
          </li>
          <li>
            <code>--font-tektur</code>: Blocky, industrial, and geometric
            design.
          </li>
          <li>
            <code>--font-space-mono</code>: Monospaced with geometric and
            grotesque influences.
          </li>
          <li>
            <code>--font-jetbrains-mono</code>: Monospaced with programming
            ligatures.
          </li>
          <li>
            <code>JetBrainsMonoNL</code>: Self-hosted monospaced without
            ligatures, with slashed zero.
          </li>
          <li>
            <code>--font-hasklig</code>: Self-hosted monospaced with
            programming ligatures.
          </li>
          <li>
            <code>--font-source-code-pro</code>: Monospaced for coding
            environments.
          </li>
          <li>
            <code>--font-roboto-mono</code>: Monospaced optimized for screen
            readability.
          </li>
          <li>
            <code>--font-kanit</code>: Contemporary and futuristic humanist
            sans-serif with geometric curves.
          </li>
          <li>
            <code>--font-be-vietnam-pro</code>: Neo Grotesk with refined
            Vietnamese letterforms.
          </li>
          <li>
            <code>--font-exo-2</code>: Geometric sans-serif with a
            technological and futuristic feel.
          </li>
          <li>
            <code>--font-unica-one</code>: Condensed unicase sans-serif style.
          </li>
          <li>
            <code>--font-teko</code>: Tall, condensed design.
          </li>
          <li>
            <code>--font-rajdhani</code>: Modularized letterforms with a
            squared and condensed appearance.
          </li>
          <li>
            <code>--font-michroma</code>: Modern reinterpretation of the
            rounded-square sans genre.
          </li>
        </ul>
        <p>
          <strong>Font Weights:</strong> 400 (Regular), 600 (SemiBold), and
          700 (Bold).
        </p>
        <p>
          <strong>Font Sizes (Tailwind CSS Utility Classes):</strong>{" "}
          <code>text-sm</code> (14px), <code>text-base</code> (16px),{" "}
          <code>text-lg</code> (18px), <code>text-xl</code> (20px),{" "}
          <code>text-2xl</code> (24px), <code>text-3xl</code> (30px),{" "}
          <code>text-4xl</code> (36px), <code>text-5xl</code> (48px).
        </p>
      </div>
    </div>
  );
}
