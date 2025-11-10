import React from 'react';

const borderRadiusTokens = [
  { name: 'Thẻ nhỏ', cssVar: '--hud-sm', value: '4px' },
  { name: 'Nút / Chip', cssVar: '--hud-md', value: '6px' },
  { name: 'Badge / Avatar tròn', cssVar: '--hud-pill', value: '9999px' },
  { name: 'Panel đặc biệt (2px)', cssVar: '2px', value: '2px' },
  { name: 'Panel đặc biệt (sắc nét)', cssVar: '0px', value: '0px' },
];

export default function RenderBorderRadius() {
  return (
    <div className="mb-12">
      <h3 className="text-2xl font-semibold mb-4">5. Border Radius Tokens (Bo góc)</h3>
      <p className="mb-4">
        Các token bo góc này sẽ được sử dụng để ghi đè các giá trị mặc định của Material Design.
      </p>
      <div className="space-y-4">
        <ul className="list-disc list-inside ml-4 space-y-1 mb-4">
          <li>
            <strong>Thẻ nhỏ:</strong> `4px` (`--hud-sm`)
          </li>
          <li>
            <strong>Nút / Chip:</strong> `6px` đến `8px` (`--hud-md`)
          </li>
          <li>
            <strong>Badge / Avatar tròn:</strong> `9999px` (`--hud-pill`) cho hình dạng tròn hoàn toàn, giống viên thuốc.
          </li>
          <li>
            <strong>Panel đặc biệt:</strong> `2px` hoặc các góc sắc nét cho các yếu tố kỹ thuật hoặc HUD trung tâm cụ thể.
          </li>
        </ul>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 border border-ui-line rounded-lg bg-panel-bg">
          {borderRadiusTokens.map((token) => (
            <div key={token.name} className="flex flex-col items-center justify-center p-4">
              <div
                className="w-20 h-20 bg-neon-cyan/20 border border-neon-cyan flex items-center justify-center text-xs text-neutral-body"
                style={{ borderRadius: token.cssVar.startsWith('--') ? `var(${token.cssVar})` : token.cssVar }}
              >
                {token.value}
              </div>
              <p className="text-sm text-neutral-body mt-2">{token.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
