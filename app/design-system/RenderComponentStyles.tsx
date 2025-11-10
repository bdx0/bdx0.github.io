import React from 'react';

export default function RenderComponentStyles() {
  return (
    <div className="mb-12">
      <h3 className="text-2xl font-semibold mb-4">Phong cách thành phần (Theming Material Design Components)</h3>
      <p className="mb-4">
        Phần này mô tả cách áp dụng phong cách Cyberpunk HUD vào các thành phần Material Design.
      </p>

      <h4 className="text-xl font-medium mb-2">Panels / Cards (Thẻ Material Design)</h4>
      <ul className="list-disc list-inside ml-4 space-y-1">
        <li>
          <strong>Nền:</strong> Sử dụng `var(--panel-bg)` (tối bán trong suốt) để cho phép các kết cấu nền tinh tế hiển thị qua.
        </li>
        <li>
          <strong>Đường viền:</strong> `1px` đường viền bên trong hoặc đường viền neon mỏng cho các đường phân cách phần, sử dụng `var(--ui-line)` hoặc màu nhấn neon.
        </li>
        <li>
          <strong>Padding:</strong> `md` (`16px`) cho nội dung panel chung. Các panel chặt chẽ hơn có thể sử dụng `8px` đến `12px`.
        </li>
        <li>
          <strong>Bo góc:</strong> `border-radius` nhỏ `4px` (`--hud-sm`) cho các thẻ thông tin. Một số chip nhấn có thể sử dụng `6px` đến `8px` (`--hud-md`) hoặc `9999px` (`--hud-pill`) cho các hình dạng tròn hoàn toàn.
        </li>
      </ul>

      <h4 className="text-xl font-medium mt-6 mb-2">Inventory Grid (Lưới các mục)</h4>
      <ul className="list-disc list-inside ml-4 space-y-1">
        <li>
          <strong>Ô mục:</strong> Kích thước vuông cố định `72px` đến `96px`.
        </li>
        <li>
          <strong>Đường viền mục:</strong> `1px` đường viền màu neon (`ring-2 ring-neon-cyan/60`) khi được chọn, nếu không thì là một đường viền mờ nhạt tinh tế (`border border-[rgba(255,255,255,0.04)]`).
        </li>
        <li>
          <strong>Icon:</strong> Căn giữa trong ô, được chia tỷ lệ từ `48%` đến `64%` kích thước ô.
        </li>
        <li>
          <strong>Badge số lượng:</strong> Hình viên thuốc tròn nhỏ (`rounded-full`) được đặt ở trên cùng bên phải, với văn bản `11px`.
        </li>
      </ul>

      <h4 className="text-xl font-medium mt-6 mb-2">Tooltip / Details Panel (Tooltip Material Design)</h4>
      <ul className="list-disc list-inside ml-4 space-y-1">
        <li>
          <strong>Chiều rộng:</strong> `320px` đến `420px`, có thể điều chỉnh dựa trên nội dung.
        </li>
        <li>
          <strong>Nền:</strong> Panel tối hoàn toàn mờ (`bg-[#0a0a0b]`) với padding `8px` đến `12px`.
        </li>
        <li>
          <strong>Điểm nhấn Callout:</strong> Một sọc neon dọc `4px` ở cạnh trái hoặc trên cùng, sử dụng `var(--neon-cyan)`.
        </li>
        <li>
          <strong>Đường phân chia:</strong> `1px` đường kết cấu tinh tế hoặc hiệu ứng phát sáng.
        </li>
      </ul>

      <h4 className="text-xl font-medium mt-6 mb-2">Buttons / Tabs (Nút và Tab Material Design)</h4>
      <ul className="list-disc list-inside ml-4 space-y-1">
        <li>
          <strong>Nút:</strong> Thiết kế phẳng với đường viền neon và hiệu ứng phát sáng tinh tế khi di chuột qua.
        </li>
        <li>
          <strong>CTA chính:</strong> Được điền bằng nền `var(--neon-cyan)`, sử dụng văn bản tối hoặc văn bản sáng tùy thuộc vào độ tương phản để dễ đọc.
        </li>
      </ul>

      <h4 className="text-xl font-medium mt-6 mb-2">Icons & Glyphs (Icon Material Design)</h4>
      <ul className="list-disc list-inside ml-4 space-y-1">
        <li>
          <strong>Phong cách:</strong> Sử dụng các glyphs vuông, chi tiết thấp.
        </li>
        <li>
          <strong>Đường nét:</strong> Ưu tiên các icon đường nét với độ rộng đường nét `1.5px` đến `2px`.
        </li>
        <li>
          <strong>Điểm nhấn:</strong> Các vùng điền neon nhỏ được sử dụng cho các chỉ báo trạng thái.
        </li>
        <li>
          <strong>Định dạng:</strong> SVG được ưu tiên cho các icon vector sắc nét. SVG nội tuyến cho phép ghi đè màu động thông qua CSS.
        </li>
      </ul>
    </div>
  );
}
