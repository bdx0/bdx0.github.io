import React from 'react';

const shadowTokens = [
  { name: '--glow-xs', cssVar: '--glow-xs', value: '0 2px 6px rgba(0,230,255,0.06)' },
  { name: '--glow-sm', cssVar: '--glow-sm', value: '0 8px 28px rgba(0,230,255,0.08)' },
  { name: '--glow-neon', cssVar: '--glow-neon', value: '0 0 18px rgba(0,230,255,0.18), 0 0 36px rgba(255,45,106,0.06)' },
  { name: '--neon-blue-glow', cssVar: '--neon-blue-glow', value: '0 0 10px #00f0ff, 0 0 20px #00f0ff' },
  { name: '--neon-green-glow', cssVar: '--neon-green-glow', value: '0 0 10px #00ff99, 0 0 20px #00ff99' },
];

export default function RenderShadowsAndElevation() {
  return (
    <div className="mb-12">
      <h3 className="text-2xl font-semibold mb-4">4. Elevation & Shadow Tokens (Bóng đổ & Độ cao)</h3>
      <p className="mb-4">
        Thiết kế HUD nhấn mạnh độ cao dựa trên *hiệu ứng phát sáng* thay vì bóng đổ truyền thống, tạo ra hiệu ứng tương lai và siêu thực. Các token bóng đổ này sẽ thay thế hoặc bổ sung cho hệ thống bóng đổ của Material Design.
      </p>
      <div className="space-y-4">
        <h4 className="text-xl font-semibold mb-2">Shadow Tokens (ví dụ `box-shadow` CSS):</h4>
        <ul className="list-disc list-inside ml-4 space-y-1 mb-4">
          {shadowTokens.map((token) => (
            <li key={token.name}>
              <code>{token.name}</code>: <code>{token.value}</code>
            </li>
          ))}
        </ul>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 border border-ui-line rounded-lg bg-panel-bg">
          {shadowTokens.map((token) => (
            <div key={`visual-${token.name}`} className="flex flex-col items-center justify-center p-4">
              <div
                className="w-24 h-24 bg-bg-900 rounded-lg flex items-center justify-center text-xs text-neutral-body"
                style={{ boxShadow: `var(${token.cssVar})` }}
              >
                {token.name.replace('--', '')}
              </div>
              <p className="text-sm text-neutral-body mt-2">{token.name}</p>
            </div>
          ))}
        </div>

        <h4 className="text-xl font-semibold mt-6 mb-2">Quy tắc sử dụng:</h4>
        <ul className="list-disc list-inside ml-4 space-y-1">
          <li>
            <strong>Phát sáng bên trong:</strong> Dùng cho các màn hình nhúng hoặc các yếu tố trông như bị lõm vào.
          </li>
          <li>
            <strong>Phát sáng bên ngoài:</strong> Áp dụng cho các thẻ hoạt động hoặc được làm nổi bật và các yếu tố tương tác.
          </li>
          <li>
            <strong>Tránh bóng đổ nặng:</strong> Giữ bóng đổ mềm mại, tinh tế và có màu sắc của các màu nhấn.
          </li>
        </ul>
      </div>
    </div>
  );
}
