import React from 'react';

export default function RenderCssVariableStarter() {
  return (
    <div className="mb-12">
      <h3 className="text-2xl font-semibold mb-4">
        Appendix — CSS Variable Starter (from <code>globals.css</code>)
      </h3>
      <div className="space-y-4">
        <pre className="bg-gray-800 p-4 rounded-md overflow-x-auto">
          <code className="text-lg text-white">
            {`:root{\n  --bg-900: #06060A;\n  --panel-bg: rgba(10,12,16,0.85);\n  --ui-line: #2B2E34;\n  --neon-cyan: #00E6FF;\n  --neon-magenta: #FF2D6A;\n  --neon-green: #7CFF6B;\n  --neon-yellow: #FFD34B;\n  --neon-orange: #FF8C42;\n  --muted-gray: #9AA0A6;\n  --neutral-body: #C7CED6;\n  --neutral-strong: #E8EEF2;\n  --accent-primary: #A6FFF4;\n  --danger: #FF4D6D;\n\n  /* Font Variables */\n  --font-inter: 'Inter', sans-serif;\n  --font-roboto-mono: 'Roboto Mono', monospace;\n  --font-manrope: 'Manrope', sans-serif;\n  --font-space-grotesk: 'Space Grotesk', sans-serif;\n  --font-chakra-petch: 'Chakra Petch', sans-serif;\n  --font-genos: 'Genos', sans-serif;\n  --font-tektur: 'Tektur', sans-serif;\n  --font-space-mono: 'Space Mono', monospace;\n  --font-source-code-pro: 'Source Code Pro', monospace;\n  --font-exo: 'Exo', sans-serif;\n  --font-kanit: 'Kanit', sans-serif;\n  --font-be-vietnam-pro: 'Be Vietnam Pro', sans-serif;\n  --font-exo-2: 'Exo 2', sans-serif;\n  --font-unica-one: 'Unica One', sans-serif;\n  --font-teko: 'Teko', sans-serif;\n  --font-rajdhani: 'Rajdhani', sans-serif;\n  --font-jetbrains-mono: 'JetBrains Mono', monospace;\n  --font-jetbrains-mono-nl: 'JetBrainsMonoNL', monospace; /* Self-hosted */\n\n  /* Shadow Variables */\n  --glow-xs: 0 2px 6px rgba(0,230,255,0.06);\n  --glow-sm: 0 8px 28px rgba(0,230,255,0.08);\n  --glow-neon: 0 0 18px rgba(0,230,255,0.18), 0 0 36px rgba(255,45,106,0.06);\n  --neon-blue-glow: 0 0 10px #00f0ff, 0 0 20px #00f0ff;\n  --neon-green-glow: 0 0 10px #00ff99, 0 0 20px #00ff99;\n}`}
          </code>
        </pre>
      </div>
    </div>
  );
}
