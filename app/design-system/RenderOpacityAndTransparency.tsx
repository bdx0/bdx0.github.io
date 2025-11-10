import React from 'react';

const opacityTokens = [
  { name: 'Lớp phủ nền', value: 0.8 }, // Using an average value for demonstration
  { name: 'Bề mặt panel', value: 0.9 }, // Using an average value for demonstration
  { name: 'Các yếu tố bị vô hiệu hóa/mờ', value: 0.4 }, // Using an average value for demonstration
  { name: 'Phát sáng khi di chuột/hoạt động', value: 0.2 }, // Using an average value for demonstration
];

export default function RenderOpacityAndTransparency() {
  return (
    <div className="mb-12">
      <h3 className="text-2xl font-semibold mb-4">6. Opacity & Transparency Tokens (Độ mờ & Độ trong suốt)</h3>
      <p className="mb-4">
        Độ mờ và độ trong suốt rất quan trọng để phân lớp thông tin và tạo chiều sâu trong HUD. Các token này có thể được sử dụng để tùy chỉnh các giá trị mặc định của Material Design.
      </p>
      <div className="space-y-4">
        <ul className="list-disc list-inside ml-4 space-y-1 mb-4">
          <li>
            <strong>Lớp phủ nền:</strong> `0.75` đến `0.85` để làm mờ tinh tế nội dung phía sau các yếu tố hoạt động.
          </li>
          <li>
            <strong>Bề mặt panel:</strong> `0.85` đến `0.95` để đảm bảo khả năng đọc nội dung trong khi vẫn duy trì hiệu ứng bán trong suốt.
          </li>
          <li>
            <strong>Các yếu tố bị vô hiệu hóa/mờ:</strong> `0.36` đến `0.48` để chỉ ra trực quan rằng không thể tương tác.
          </li>
          <li>
            <strong>Phát sáng khi di chuột/hoạt động:</strong> Sử dụng pha trộn cộng thêm và giá trị alpha cao hơn (`0.12` đến `0.25`) cho hiệu ứng phát sáng.
          </li>
        </ul>

        <div className="p-4 border border-ui-line rounded-lg bg-gradient-to-br from-bg-900 to-panel-bg relative overflow-hidden">
          <div className="absolute inset-0 bg-repeat" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'10\' height=\'10\' viewBox=\'0 0 10 10\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%239C92AC\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'3\'/%3E%3C/g%3E%3C/svg%3E")' }}></div>
          <div className="relative z-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {opacityTokens.map((token) => (
              <div key={token.name} className="flex flex-col items-center justify-center p-4">
                <div
                  className="w-24 h-24 bg-neon-cyan flex items-center justify-center text-xs text-neutral-strong"
                  style={{ opacity: token.value }}
                >
                  {token.value}
                </div>
                <p className="text-sm text-neutral-body mt-2 text-center">{token.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
