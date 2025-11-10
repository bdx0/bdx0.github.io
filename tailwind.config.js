/** @type {import('tailwindcss').Config} */
const config = {
  important: true,
  darkMode: "class",
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Cyberpunk HUD Color Palette
        'bg-900': '#06060A', // Primary background: very dark, near-black
        'panel-bg': 'rgba(10,12,16,0.8)', // Panel background
        'ui-line': '#2B2E34', // UI lines
        
        // Neon accents
        'neon-cyan': '#00E6FF', // Primary accent: selected states, highlights
        'neon-magenta': '#FF2D6A', // Secondary accent: negative/alert states
        'neon-green': '#7CFF6B', // Support accent
        'neon-yellow': '#FFD34B', // Support accent
        'neon-orange': '#FF8C42', // Support accent
        
        // Neutral text
        'muted-gray': '#9AA0A6',
        'neutral-body': '#C7CED6', // Body text
        'neutral-strong': '#E8EEF2', // Strong labels
        'accent-primary': '#A6FFF4',
        'danger': '#FF4D6D',
      },
      fontFamily: {
        display: ['var(--font-teko)', 'var(--font-exo)', 'var(--font-unica-one)', 'var(--font-kanit)', 'var(--font-space-grotesk)', 'sans-serif'], // Condensed geometric for headings
        mono: ['var(--font-hasklig)', 'var(--font-jetbrains-mono-nl)', 'var(--font-source-code-pro)', 'var(--font-jetbrains-mono)', 'var(--font-space-mono)', 'var(--font-roboto-mono)', 'Space Mono', 'JetBrains Mono', 'ui-monospace', 'monospace'], // Monospaced for stats/numbers
        body: ['var(--font-manrope)', 'var(--font-inter)', 'IBM Plex Sans', 'system-ui', 'sans-serif'], // Manrope for body text, with Vietnamese support
        sans: ['var(--font-exo-2)', 'var(--font-be-vietnam-pro)', 'var(--font-space-grotesk)', 'var(--font-chakra-petch)', 'var(--font-genos)', 'var(--font-tektur)', 'var(--font-manrope)', 'var(--font-inter)', 'system-ui', 'sans-serif'], // Default sans-serif, with Vietnamese support
      },
      spacing: {
        '1u': '4px', // Base spacing unit
        '2u': '8px',
        '3u': '12px',
        '4u': '16px',
        '6u': '24px',
        '8u': '32px',
        '12u': '48px',
      },
      boxShadow: {
        'neon-xs': '0 2px 6px rgba(0,230,255,0.06)',
        'neon-sm': '0 8px 28px rgba(0,230,255,0.08)',
        'neon-lg': '0 0 18px rgba(0,230,255,0.18), 0 0 36px rgba(255,45,106,0.06)',
        'neon-blue-glow': '0 0 10px #00f0ff, 0 0 20px #00f0ff',
        'neon-green-glow': '0 0 10px #00ff99, 0 0 20px #00ff99',
      },
      borderRadius: {
        'hud-sm': '4px', // Small cards
        'hud-md': '6px', // Buttons/chips
        'hud-lg': '8px', // Larger elements
        'hud-pill': '9999px', // Rounded badges/avatars
      },
      keyframes: {
        'scan': { 
          '0%': { transform: 'translateY(-100%)' }, 
          '100%': { transform: 'translateY(100%)' } 
        },
        'neon-flicker': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.92' }
        }
      },
      animation: {
        'scan-anim': 'scan 1.8s linear infinite',
        'neon-flicker': 'neon-flicker 2s ease-in-out infinite'
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
module.exports = config;