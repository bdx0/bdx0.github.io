import React from 'react';

const colors = [
  {
    name: "bg-900",
    value: "#06060A",
    description: "Primary background: very dark, near-black",
  },
  {
    name: "panel-bg",
    value: "rgba(10,12,16,0.8)",
    description: "Panel background: semi-transparent dark",
  },
  {
    name: "ui-line",
    value: "#2B2E34",
    description: "UI lines: subtle dark gray",
  },
  {
    name: "neon-cyan",
    value: "#00E6FF",
    description: "Primary accent: vibrant cyan",
  },
  {
    name: "neon-magenta",
    value: "#FF2D6A",
    description: "Secondary accent: vibrant magenta",
  },
  {
    name: "neon-green",
    value: "#7CFF6B",
    description: "Support accent: bright green",
  },
  {
    name: "neon-yellow",
    value: "#FFD34B",
    description: "Support accent: bright yellow",
  },
  {
    name: "neon-orange",
    value: "#FF8C42",
    description: "Support accent: bright orange",
  },
  {
    name: "muted-gray",
    value: "#9AA0A6",
    description: "Muted text: soft gray",
  },
  {
    name: "neutral-body",
    value: "#C7CED6",
    description: "Body text: light gray",
  },
  {
    name: "neutral-strong",
    value: "#E8EEF2",
    description: "Strong labels: off-white",
  },
  {
    name: "accent-primary",
    value: "#A6FFF4",
    description: "Primary accent: light cyan",
  },
  { name: "danger", value: "#FF4D6D", description: "Danger: bright red" },
];

export default function RenderColorPalette() {
  return (
    <div className="mb-12">
      <h3 className="text-2xl font-semibold mb-4">Color Palette</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {colors.map((color) => (
          <div
            key={color.name}
            className="p-4 border border-gray-700 rounded-lg"
          >
            <div
              className="w-full h-20 rounded-md mb-2"
              style={{ backgroundColor: color.value }}
            ></div>
            <p className="font-semibold text-lg">{color.name}</p>
            <p className="text-sm text-gray-400">{color.value}</p>
            <p className="text-xs text-gray-500">{color.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
