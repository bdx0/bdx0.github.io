export default function RenderSpacingSystem() {
  const spacingScale = [
    { name: "xxs", value: 4, unit: "1u", rem: 0.25 },
    { name: "xs", value: 8, unit: "2u", rem: 0.5 },
    { name: "sm", value: 12, unit: "3u", rem: 0.75 },
    { name: "md", value: 16, unit: "4u", rem: 1 },
    { name: "lg", value: 24, unit: "6u", rem: 1.5 },
    { name: "xl", value: 32, unit: "8u", rem: 2 },
    { name: "xxl", value: 48, unit: "12u", rem: 3 },
  ];

  return (
    <div className="mb-12">
      <h3 className="text-2xl font-semibold mb-4">
        3. Spacing Tokens (Hệ thống khoảng cách)
      </h3>
      <p className="mb-4">
        Hệ thống khoảng cách mô-đun dựa trên đơn vị cơ bản <strong>4px</strong>.
        Điều này đảm bảo khoảng cách nhất quán và hài hòa trong toàn bộ UI. Các
        token khoảng cách này có thể được sử dụng để tùy chỉnh hệ thống khoảng
        cách của Material Design.
      </p>

      <h4 className="text-xl font-semibold mt-6 mb-2">Đơn vị cơ bản:</h4>
      <p className="mb-4">`1u = 4px`</p>

      <h4 className="text-xl font-semibold mt-6 mb-2">Thang đo:</h4>
      <ul className="list-disc list-inside ml-4 space-y-1 mb-4">
        {spacingScale.map((s) => (
          <li key={s.name}>
            `{s.name}`: `{s.value}px` (`{s.unit}`)
          </li>
        ))}
      </ul>

      <div className="bg-bg-900 border border-ui-line rounded-lg overflow-hidden p-4">
        <h5 className="font-medium mb-2 text-[#f1f1f7]">
          Visual Spacing Scale
        </h5>
        <div className="space-y-1">
          {spacingScale.map((s) => (
            <div key={`visual-bar-${s.name}`} className="grid grid-cols-[150px_1fr] items-center gap-2">
              <span className="text-sm text-neutral-body">
                {s.name} ({s.value}px / {s.rem}rem)
              </span>
              <div
                className="rounded-sm flex items-center justify-center text-xs text-neutral-strong border border-neon-cyan"
                style={{
                  height: `24px`,
                  width: `${s.value * 2}px`,
                  backgroundColor: `rgba(0, 230, 255, 0.3)`,
                }}
              >
                {s.value}px
              </div>
            </div>
          ))}
        </div>
      </div>

      <h4 className="text-xl font-semibold mt-6 mb-2">Lưới & Bố cục:</h4>
      <ul className="list-disc list-inside ml-4 space-y-1 mb-4">
        <li>
          **Bố cục lớn hơn:** Sử dụng lưới 12 cột với khoảng cách giữa các cột
          là `16px` (`4u`). Chiều rộng container tối đa thường là `1280px` đến
          `1600px`.
        </li>
        <li>
          **Lưới panel:** Các panel bên trong và thẻ mục trong HUD sử dụng hệ
          thống lưới nhỏ gọn, thường với các mục vuông `72px` đến `96px` và
          khoảng cách `8px`.
        </li>
      </ul>

      <div className="p-4 border border-ui-line rounded-lg bg-bg-900 mt-4">
        <h5 className="text-lg font-medium mb-2">
          Ví dụ Bố cục lớn hơn (16px gutter):
        </h5>
        <div className="grid grid-cols-3 gap-4u">
          <div className="bg-panel-bg h-16 flex items-center justify-center text-neutral-body text-sm rounded-md">
            Cột 1
          </div>
          <div className="bg-panel-bg h-16 flex items-center justify-center text-neutral-body text-sm rounded-md">
            Cột 2
          </div>
          <div className="bg-panel-bg h-16 flex items-center justify-center text-neutral-body text-sm rounded-md">
            Cột 3
          </div>
        </div>

        <h5 className="text-lg font-medium mt-6 mb-2">
          Ví dụ Lưới panel (8px spacing):
        </h5>
        <div className="grid grid-cols-4 gap-2u">
          <div className="w-[72px] h-[72px] bg-panel-bg border border-ui-line flex items-center justify-center text-neutral-body text-xs rounded-md">
            Item 1
          </div>
          <div className="w-[72px] h-[72px] bg-panel-bg border border-ui-line flex items-center justify-center text-neutral-body text-xs rounded-md">
            Item 2
          </div>
          <div className="w-[72px] h-[72px] bg-panel-bg border border-ui-line flex items-center justify-center text-neutral-body text-xs rounded-md">
            Item 3
          </div>
          <div className="w-[72px] h-[72px] bg-panel-bg border border-ui-line flex items-center justify-center text-neutral-body text-xs rounded-md">
            Item 4
          </div>
        </div>
      </div>
    </div>
  );
}
