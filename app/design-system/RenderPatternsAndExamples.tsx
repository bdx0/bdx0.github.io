import React from 'react';

export default function RenderPatternsAndExamples() {
  return (
    <div className="mb-12">
      <h3 className="text-2xl font-semibold mb-4">Các mẫu & Ví dụ (áp dụng cho Material Design Components)</h3>
      <p className="mb-4">
        Phần này mô tả các mẫu tương tác và ví dụ có thể được áp dụng khi tùy chỉnh các thành phần Material Design.
      </p>
      <div className="space-y-4">
        <ul className="list-disc list-inside ml-4 space-y-1">
          <li>
            <strong>Luồng chi tiết kho đồ:</strong>
            <ul className="list-circle list-inside ml-4">
              <li>
                <strong>Tương tác:</strong> Di chuột qua mục lưới kích hoạt tooltip xem trước.
              </li>
              <li>
                <strong>Kích hoạt:</strong> Nhấp vào một mục sẽ mở một panel chi tiết trượt từ bên phải, có hoạt ảnh quét tinh tế trên tiêu đề của nó.
              </li>
            </ul>
          </li>
          <li>
            <strong>Chỉ báo trạng thái:</strong>
            <ul className="list-circle list-inside ml-4">
              <li>
                Kết hợp màu sắc, icon và nhãn để truyền đạt trạng thái (ví dụ: "EQUIPPED" bằng `neon-cyan` với icon tia chớp).
              </li>
            </ul>
          </li>
          <li>
            <strong>Phản hồi lỗi/cảnh báo:</strong>
            <ul className="list-circle list-inside ml-4">
              <li>
                Sử dụng `neon-magenta` với hoạt ảnh rung hoặc nhấp nháy nhỏ, kèm theo giải thích tooltip ngắn gọn.
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}
