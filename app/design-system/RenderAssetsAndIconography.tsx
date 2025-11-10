import React from 'react';

export default function RenderAssetsAndIconography() {
  return (
    <div className="mb-12">
      <h3 className="text-2xl font-semibold mb-4">8. Assets & Iconography Tokens (Tài sản & Iconography)</h3>
      <p className="mb-4">
        Các token này áp dụng cho việc thay thế hoặc bổ sung các icon mặc định của Material Design.
      </p>
      <div className="space-y-4">
        <ul className="list-disc list-inside ml-4 space-y-1 mb-4">
          <li>
            <strong>Icon hệ thống:</strong> Được thiết kế trên lưới `32px` hoặc `48px`. Xuất ở độ phân giải `1x`, `2x` và `3x` cho các mật độ hiển thị khác nhau.
          </li>
          <li>
            <strong>Định dạng:</strong> SVG được ưu tiên cho các icon vector sắc nét, có thể mở rộng.
          </li>
          <li>
            <strong>Đường nét:</strong> Icon thường có độ rộng đường nét `1.5px` đến `2px`.
          </li>
          <li>
            <strong>Màu sắc:</strong> Các vùng điền neon nhỏ được sử dụng cho các chỉ báo trạng thái. SVG nội tuyến cho phép ghi đè màu động thông qua CSS.
          </li>
          <li>
            <strong>Định dạng Sprite:</strong> Chấp nhận được cho các icon nhỏ, nhưng SVG nội tuyến được ưu tiên để kiểm soát và linh hoạt hơn.
          </li>
        </ul>

        <h4 className="text-xl font-semibold mt-6 mb-2">Ví dụ trực quan:</h4>
        <div className="p-4 border border-ui-line rounded-lg bg-panel-bg grid grid-cols-3 gap-4 items-center justify-items-center">
          <div className="flex flex-col items-center">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--neutral-body)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-settings">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .3 1.4l1.1 3.4a.2 0 0 1-.1.3l-3.4 1.1a1.65 1.65 0 0 0-1.4.3c-.7.5-1.5.8-2.4.8s-1.7-.3-2.4-.8a1.65 1.65 0 0 0-1.4-.3l-3.4-1.1a.2.2 0 0 1-.1-.3l1.1-3.4a1.65 1.65 0 0 0 .3-1.4c-.5-.7-.8-1.5-.8-2.4s.3-1.7.8-2.4a1.65 1.65 0 0 0-.3-1.4l-1.1-3.4a.2.2 0 0 1 .1-.3l3.4-1.1a1.65 1.65 0 0 0 1.4-.3c.7-.5 1.5-.8 2.4-.8s1.7.3 2.4.8a1.65 1.65 0 0 0 1.4.3l3.4 1.1a.2.2 0 0 1 .1.3l-1.1 3.4a1.65 1.65 0 0 0-.3 1.4c.5.7.8 1.5.8 2.4s-.3 1.7-.8 2.4z"></path>
            </svg>
            <p className="text-sm text-neutral-body mt-2 text-center">Đường nét mặc định (1.5px)</p>
          </div>

          <div className="flex flex-col items-center">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--neon-cyan)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-settings">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .3 1.4l1.1 3.4a.2 0 0 1-.1.3l-3.4 1.1a1.65 1.65 0 0 0-1.4.3c-.7.5-1.5.8-2.4.8s-1.7-.3-2.4-.8a1.65 1.65 0 0 0-1.4-.3l-3.4-1.1a.2.2 0 0 1-.1-.3l1.1-3.4a1.65 1.65 0 0 0 .3-1.4c-.5-.7-.8-1.5-.8-2.4s.3-1.7.8-2.4a1.65 1.65 0 0 0-.3-1.4l-1.1-3.4a.2.2 0 0 1 .1-.3l3.4-1.1a1.65 1.65 0 0 0 1.4-.3c.7-.5 1.5-.8 2.4-.8s1.7.3 2.4.8a1.65 1.65 0 0 0 1.4.3l3.4 1.1a.2.2 0 0 1 .1.3l-1.1 3.4a1.65 1.65 0 0 0-.3 1.4c.5.7.8 1.5.8 2.4s-.3 1.7-.8 2.4z"></path>
            </svg>
            <p className="text-sm text-neutral-body mt-2 text-center">Đường nét dày hơn (2.5px) & Neon</p>
          </div>

          <div className="flex flex-col items-center">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="var(--neon-green)" stroke="none" strokeWidth="0" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check-circle">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-8.93"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <p className="text-sm text-neutral-body mt-2 text-center">Điền màu Neon (Trạng thái)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
