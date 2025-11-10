import React from 'react';

export default function RenderTailwindUsage() {
  return (
    <div className="mb-12">
      <h3 className="text-2xl font-semibold mb-4">Sử dụng Tailwind CSS phổ biến trong dự án</h3>
      <p className="mb-4">
        Phần này phác thảo cách các design token được định nghĩa được chuyển đổi thành các lớp tiện ích Tailwind CSS thực tế để áp dụng nhất quán, đặc biệt khi tùy chỉnh các thành phần Material Design.
      </p>

      <h4 className="text-xl font-semibold mt-6 mb-2">Mở rộng cấu hình Tailwind (từ `tailwind.config.js`):</h4>
      <pre className="bg-bg-900 p-4 rounded-md overflow-x-auto mb-4">
        <code className="text-lg text-white">
          {`module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,html}'], // Adjusted for project structure
  theme: {
    extend: {
      colors: {
        'bg-900': 'var(--bg-900)',
        'panel-bg': 'var(--panel-bg)',
        'ui-line': 'var(--ui-line)',
        'neon-cyan': 'var(--neon-cyan)',
        'neon-magenta': 'var(--neon-magenta)',
        'neon-green': 'var(--neon-green)',
        'neon-yellow': 'var(--neon-yellow)',
        'neon-orange': 'var(--neon-orange)',
        'muted-gray': 'var(--muted-gray)',
        'neutral-body': 'var(--neutral-body)',
        'neutral-strong': 'var(--neutral-strong)',
        'accent-primary': 'var(--accent-primary)',
        'danger': 'var(--danger)',
      },
      fontFamily: {
        display: ['var(--font-rajdhani)', 'var(--font-teko)', 'var(--font-exo)', 'var(--font-unica-one)', 'var(--font-kanit)', 'var(--font-space-grotesk)', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'var(--font-hasklig)', 'var(--font-jetbrains-mono-nl)', 'var(--font-source-code-pro)', 'var(--font-space-mono)', 'var(--font-roboto-mono)', 'ui-monospace', 'monospace'],
        body: ['var(--font-manrope)', 'var(--font-inter)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-exo-2)', 'var(--font-be-vietnam-pro)', 'var(--font-space-grotesk)', 'var(--font-chakra-petch)', 'var(--font-genos)', 'var(--font-tektur)', 'var(--font-manrope)', 'var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '1u': '4px', '2u': '8px', '3u': '12px', '4u': '16px',
        '6u': '24px', '8u': '32px', '12u': '48px',
      },
      boxShadow: {
        'neon-xs': 'var(--glow-xs)',
        'neon-sm': 'var(--glow-sm)',
        'neon-lg': 'var(--glow-neon)',
        'neon-blue-glow': 'var(--neon-blue-glow)',
        'neon-green-glow': 'var(--neon-green-glow)',
      },
      borderRadius: {
        'hud-sm': '4px',
        'hud-md': '6px',
        'hud-lg': '8px',
        'hud-pill': '9999px',
      },
      keyframes: {
        'scan': { '0%': { transform: 'translateY(-100%)' }, '100%': { transform: 'translateY(100%)' } },
        'neon-flicker': { '0%, 100%': { opacity: '1' }, '50%': { opacity: '0.92' } }
      },
      animation: {
        'scan-anim': 'scan 1.8s linear infinite',
        'neon-flicker': 'neon-flicker 2s ease-in-out infinite'
      }
    }
  }
}
`}
        </code>
      </pre>

      <h4 className="text-xl font-semibold mt-6 mb-2">Ví dụ về lớp tiện ích:</h4>
      <div className="p-4 border border-ui-line rounded-lg bg-panel-bg space-y-4">
        <div>
          <h5 className="text-lg font-medium mb-2">Panel:</h5>
          <div className="bg-panel-bg p-4u rounded-hud-sm border border-ui-line text-neutral-body">
            Đây là một Panel mẫu.
          </div>
        </div>
        <div>
          <h5 className="text-lg font-medium mb-2">Selected Item:</h5>
          <div className="bg-panel-bg p-2u rounded-hud-sm border border-ui-line ring-2 ring-neon-cyan/60 shadow-neon-sm text-neutral-body w-fit">
            Mục được chọn
          </div>
        </div>
        <div>
          <h5 className="text-lg font-medium mb-2">Tooltip:</h5>
          <div className="bg-panel-bg p-3u rounded-hud-md text-sm text-neutral-body w-fit">
            Đây là một Tooltip.
          </div>
        </div>
        <div>
          <h5 className="text-lg font-medium mb-2">Heading:</h5>
          <h4 className="text-4xl font-bold font-display text-neutral-strong">
            Tiêu đề Mẫu
          </h4>
        </div>
        <div>
          <h5 className="text-lg font-medium mb-2">Body Text:</h5>
          <p className="text-base font-body text-neutral-body">
            Đây là một đoạn văn bản chính mẫu.
          </p>
        </div>
        <div>
          <h5 className="text-lg font-medium mb-2">Code Block:</h5>
          <pre className="bg-bg-900 p-4 rounded-md overflow-x-auto">
            <code className="text-accent-primary font-mono text-lg">
              {`const example = "code";`}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
}
