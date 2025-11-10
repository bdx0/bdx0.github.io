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
      <h3 className="text-2xl font-semibold mb-4">1. Màu sắc (Color Tokens)</h3>
      <p className="mb-4">
        Bảng màu được thiết kế để tạo ra trải nghiệm cyberpunk có độ tương phản cao, sống động. Các token màu này sẽ được sử dụng để ghi đè bảng màu mặc định của Material Design, áp dụng cho các yếu tố như nền, văn bản, trạng thái và điểm nhấn.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {colors.map((color) => (
          <div
            key={color.name}
            className="p-4 bg-panel-bg border border-ui-line rounded-lg"
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
      <p className="text-sm text-gray-500 mt-4">
        **Lưu ý:** Các điểm nhấn neon nên được sử dụng tiết kiệm để duy trì tác động và tránh gây rối mắt. Đảm bảo tỷ lệ tương phản tối thiểu 4.5:1 cho tất cả văn bản dễ đọc trên nền tối. Các yếu tố neon trang trí có thể có độ tương phản thấp hơn.
      </p>
    </div>
  );
}
