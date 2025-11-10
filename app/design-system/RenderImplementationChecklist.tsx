import React from 'react';

export default function RenderImplementationChecklist() {
  return (
    <div className="mb-12">
      <h3 className="text-2xl font-semibold mb-4">Danh sách kiểm tra triển khai (Implementation Checklist)</h3>
      <p className="mb-4">
        Danh sách này được điều chỉnh để phản ánh việc tùy chỉnh Material Design.
      </p>
      <div className="space-y-4">
        <ul className="list-disc list-inside ml-4 space-y-1">
          <li>
            [x] Thêm các token màu vào biến CSS `:root` trong `globals.css`.
          </li>
          <li>
            [x] Mở rộng cấu hình Tailwind CSS với các token màu, font, khoảng cách, bóng đổ và bo góc tùy chỉnh.
          </li>
          <li>
            [ ] Xây dựng các thành phần cơ bản của Material Design và tùy chỉnh chúng: `Panel`, `InventoryGrid`, `Tooltip`, `HUDTitle`.
          </li>
          <li>
            [x] Tạo các token chuyển động (keyframes) và đảm bảo `prefers-reduced-motion` được tôn trọng.
          </li>
          <li>
            [ ] Thực hiện kiểm tra khả năng tiếp cận: xác minh tỷ lệ tương phản, điều hướng bàn phím và nhãn ARIA.
          </li>
        </ul>
      </div>
    </div>
  );
}
