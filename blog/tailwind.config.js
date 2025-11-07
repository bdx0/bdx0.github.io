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
        'cyber-bg': '#0a0a1a', // Very dark blue/purple background
        'cyber-text': '#e0e0e0', // Light gray text
        'neon-blue': '#00f0ff', // Bright neon blue
        'neon-green': '#00ff99', // Bright neon green
        'neon-purple': '#a020f0', // A touch of neon purple
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        serif: ['Lora', 'serif'],
        mono: ['Fira Code', 'monospace'],
      },
      // Add subtle glow effect for hover states if possible with Tailwind
      boxShadow: {
        'neon-blue-glow': '0 0 10px #00f0ff, 0 0 20px #00f0ff',
        'neon-green-glow': '0 0 10px #00ff99, 0 0 20px #00ff99',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
module.exports = config;