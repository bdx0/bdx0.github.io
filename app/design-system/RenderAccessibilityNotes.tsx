import React from 'react';

export default function RenderAccessibilityNotes() {
  return (
    <div className="mb-12">
      <h3 className="text-2xl font-semibold mb-4">Ghi chú về khả năng tiếp cận (Accessibility Notes)</h3>
      <p className="mb-4">
        Các nguyên tắc này là phổ quát và cần được duy trì khi tùy chỉnh Material Design.
      </p>
      <div className="space-y-4">
        <ul className="list-disc list-inside ml-4 space-y-1">
          <li>
            <strong>Độ tương phản:</strong> Duy trì tỷ lệ tương phản tối thiểu 4.5:1 cho tất cả văn bản chính để đảm bảo khả năng đọc. Các điểm nhấn neon chủ yếu mang tính trang trí và không nên là chỉ báo duy nhất cho thông tin thiết yếu.
          </li>
          <li>
            <strong>Trạng thái focus:</strong> Cung cấp các trạng thái focus bàn phím rõ ràng và khác biệt bằng cách sử dụng đường viền và các tín hiệu không màu để hỗ trợ người dùng điều hướng bằng bàn phím.
          </li>
          <li>
            <strong>Giảm chuyển động:</strong> Tôn trọng truy vấn phương tiện `prefers-reduced-motion` để tắt các hoạt ảnh và chuyển tiếp không cần thiết cho người dùng nhạy cảm với chuyển động.
          </li>
          <li>
            <strong>Nhãn ARIA:</strong> Sử dụng các thuộc tính ARIA thích hợp cho các thành phần tương tác phức tạp để truyền đạt mục đích và trạng thái của chúng cho các công nghệ hỗ trợ.
          </li>
        </ul>
      </div>
    </div>
  );
}
