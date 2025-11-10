import React from 'react';

export default function RenderResponsiveLayout() {
  return (
    <div className="mb-12">
      <h3 className="text-2xl font-semibold mb-4">Cân nhắc về bố cục & phản hồi (Responsive & Layout Considerations)</h3>
      <p className="mb-4">
        Các nguyên tắc này là chung và cần được áp dụng khi thiết kế bố cục với Material Design.
      </p>
      <div className="space-y-4">
        <ul className="list-disc list-inside ml-4 space-y-1">
          <li>
            <strong>Màn hình hẹp:</strong> Các panel bên cạnh nên thu gọn thành các ngăn kéo điều hướng. Hình ảnh giải phẫu trung tâm hoặc khu vực nội dung chính có thể chuyển sang vùng có thể cuộn.
          </li>
          <li>
            <strong>Điều chỉnh thang loại:</strong> Triển khai thang loại nhỏ hơn (ví dụ: giảm tất cả kích thước font một bước) để cải thiện khả năng đọc trên màn hình nhỏ gọn.
          </li>
          <li>
            <strong>Thích ứng lưới:</strong> Điều chỉnh kích thước ô lưới (ví dụ: thành các ô vuông `56px`) để phù hợp với các khung nhìn nhỏ hơn.
          </li>
        </ul>
      </div>
    </div>
  );
}
