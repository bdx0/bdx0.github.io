import React from 'react';

export default function RenderAnimationsAndTransitions() {
  return (
    <div className="mb-12">
      <h3 className="text-2xl font-semibold mb-4">7. Animation & Transition Tokens (Hoạt ảnh & Chuyển tiếp)</h3>
      <p className="mb-4">
        Chuyển động trong HUD là tối thiểu, có mục đích và được thiết kế để tăng cường trải nghiệm tương lai mà không gây mất tập trung. Các token hoạt ảnh này có thể được áp dụng để tùy chỉnh các hoạt ảnh mặc định của Material Design.
      </p>
      <div className="space-y-4">
        <ul className="list-disc list-inside ml-4 space-y-1 mb-4">
          <li>
            <strong>Chuyển tiếp di chuột:</strong> `120ms` đến `180ms` với hàm easing `cubic-bezier(0.2, 0.8, 0.2, 1)` cho phản hồi mượt mà, nhạy bén.
          </li>
          <li>
            <strong>Chọn/Kích hoạt:</strong> Chuyển tiếp `150ms` đến `220ms` liên quan đến việc thay đổi tỷ lệ phát sáng và độ mờ.
          </li>
          <li>
            <strong>Hiệu ứng quét:</strong> Hiệu ứng nhấp nháy scan line dọc tinh tế, thường lặp lại `1.2s` đến `2s`, sử dụng gradient mờ có độ mờ thấp.
          </li>
          <li>
            <strong>Hiệu ứng nhấp nháy:</strong> Rung động độ mờ nhỏ, ngắn (`0.06s` đến `0.12s`) để mô phỏng hiệu ứng nhấp nháy neon giống CRT.
          </li>
          <li>
            <strong>Chuyển động vi mô:</strong> Hiệu ứng thị sai chậm trên các yếu tố nền hoặc các mô hình trung tâm (`6s` đến `12s` ease) để tạo chiều sâu tinh tế.
          </li>
        </ul>

        <h4 className="text-xl font-semibold mt-6 mb-2">Ví dụ trực quan:</h4>
        <div className="p-4 border border-ui-line rounded-lg bg-panel-bg flex flex-col space-y-4">
          <div>
            <h5 className="text-lg font-medium mb-2">Chuyển tiếp di chuột:</h5>
            <button className="px-4 py-2 bg-panel-bg text-neutral-body rounded-md border border-ui-line
                               transition-all duration-150 ease-in-out
                               hover:bg-neon-cyan hover:text-bg-900 hover:shadow-neon-blue-glow">
              Hover Me
            </button>
          </div>

          <div>
            <h5 className="text-lg font-medium mb-2">Hiệu ứng nhấp nháy:</h5>
            <div className="w-24 h-12 bg-neon-magenta border border-neon-magenta rounded-md flex items-center justify-center
                            animate-neon-flicker">
              Flicker
            </div>
          </div>
        </div>

        <h4 className="text-xl font-semibold mt-6 mb-2">Ví dụ Keyframes (CSS):</h4>
        <pre className="bg-bg-900 p-4 rounded-md overflow-x-auto">
          <code className="text-lg text-white">
            {`@keyframes neon-flicker {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.92; }
}
@keyframes scan-line {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
}`}
          </code>
        </pre>
        <p className="text-sm text-gray-500 mt-4">
          **Khả năng tiếp cận:** Luôn tôn trọng `prefers-reduced-motion` để tắt các hoạt ảnh không cần thiết cho người dùng không muốn nhiều chuyển động.
        </p>
      </div>
    </div>
  );
}
