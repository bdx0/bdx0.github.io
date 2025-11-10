import React from 'react';

const fonts = [
  { name: "Space Grotesk", cssFamily: "var(--font-space-grotesk)" },
  { name: "Chakra Petch", cssFamily: "var(--font-chakra-petch)" },
  { name: "Genos", cssFamily: "var(--font-genos)" },
  { name: "Tektur", cssFamily: "var(--font-tektur)" },
  { name: "Space Mono", cssFamily: "var(--font-space-mono)" },
  { name: "JetBrains Mono", cssFamily: "var(--font-jetbrains-mono)" },
  { name: "JetBrainsMonoNL", cssFamily: "'JetBrainsMonoNL', monospace" },
  { name: "Hasklig", cssFamily: "var(--font-hasklig)" },
  { name: "Source Code Pro", cssFamily: "var(--font-source-code-pro)" },
  { name: "Roboto Mono", cssFamily: "var(--font-roboto-mono)" },
  { name: "Kanit", cssFamily: "var(--font-kanit)" },
  { name: "Be Vietnam Pro", cssFamily: "var(--font-be-vietnam-pro)" },
  { name: "Exo 2", cssFamily: "var(--font-exo-2)" },
  { name: "Unica One", cssFamily: "var(--font-unica-one)" },
  { name: "Teko", cssFamily: "var(--font-teko)" },
  { name: "Rajdhani", cssFamily: "var(--font-rajdhani)" },
  { name: "Michroma", cssFamily: "var(--font-michroma)" },
  { name: "Manrope", cssFamily: "var(--font-manrope)" }, // Added missing font
  { name: "Inter", cssFamily: "var(--font-inter)" },     // Added missing font
  { name: "Exo", cssFamily: "var(--font-exo)" },         // Added missing font
];

export default function RenderTypography() {
  return (
    <div className="mb-12">
      <h3 className="text-2xl font-semibold mb-4">2. Typography Tokens (Kiểu chữ)</h3>
      <p className="mb-4">
        Hệ thống typography kết hợp các font hiển thị cô đọng, kỹ thuật cho tiêu đề và các yếu tố UI nổi bật với các font monospaced hoặc sans-serif hẹp cho dữ liệu, code và chú thích. Tất cả các font được lựa chọn cẩn thận vì tính thẩm mỹ cyberpunk và hỗ trợ tiếng Việt. Các token typography này sẽ được sử dụng để ghi đè font mặc định của Material Design.
      </p>

      <h4 className="text-xl font-semibold mt-6 mb-2">Các họ font được sử dụng:</h4>
      <ul className="list-disc list-inside ml-4 space-y-1">
        <li>
          <code>--font-space-grotesk</code>: Sans-serif hiện đại với cảm giác hình học và hơi cô đọng. Dùng cho hiển thị chung và tiêu đề.
        </li>
        <li>
          <code>--font-chakra-petch</code>: Sans-serif hình học với thiết kế vuông và các góc vát, mang lại vẻ ngoài tương lai và sạch sẽ. Dùng cho hiển thị và các yếu tố UI.
        </li>
        <li>
          <code>--font-genos</code>: Kiểu chữ hiển thị hiện đại với tính thẩm mỹ tương lai, công nghiệp và kỹ thuật, đặc trưng bởi các ký tự sắc nét, góc cạnh và được xây dựng hình học. Dùng cho hiển thị.
        </li>
        <li>
          <code>--font-tektur</code>: Sans-serif hiển thị với thiết kế khối, công nghiệp và hình học, có đường viền hình bát giác. Dùng cho hiển thị.
        </li>
        <li>
          <code>--font-space-mono</code>: Kiểu chữ monospaced với ảnh hưởng hình học và grotesque. Lý tưởng cho code, dữ liệu và hiển thị giống terminal.
        </li>
        <li>
          <code>--font-jetbrains-mono</code>: Font monospaced được thiết kế cho các nhà phát triển, có các ligatures lập trình. Dùng cho ví dụ code và văn bản kỹ thuật.
        </li>
        <li>
          <code>JetBrainsMonoNL</code>: Font monospaced tự host, một biến thể của JetBrains Mono không có ligatures lập trình, được cấu hình rõ ràng với `font-feature-settings: "zero" 1;` cho số không có gạch chéo. Dùng cho code và dữ liệu khi không muốn có ligatures.
        </li>
        <li>
          <code>--font-hasklig</code>: Font monospaced tự host có thêm ligatures lập trình. Dùng cho ví dụ code khi ligatures tăng cường khả năng đọc.
        </li>
        <li>
          <code>--font-source-code-pro</code>: Font monospaced được Adobe thiết kế cho môi trường lập trình, nhấn mạnh khả năng đọc. Dùng cho code và văn bản kỹ thuật.
        </li>
        <li>
          <code>--font-roboto-mono</code>: Font monospaced được tối ưu hóa cho khả năng đọc trên màn hình. Dùng cho code, dữ liệu và hiển thị số.
        </li>
        <li>
          <code>--font-kanit</code>: Sans-serif humanist đương đại và tương lai với các đường cong hình học. Hỗ trợ đầy đủ tiếng Việt. Dùng cho hiển thị và tiêu đề.
        </li>
        <li>
          <code>--font-be-vietnam-pro</code>: Phong cách Neo Grotesk, được thiết kế rõ ràng với các hình dạng chữ cái tiếng Việt tinh tế và dấu phụ để tối ưu khả năng đọc. Đa năng cho văn bản chính và UI.
        </li>
        <li>
          <code>--font-exo-2</code>: Kiểu chữ sans-serif hình học với cảm giác công nghệ và tương lai. Hỗ trợ tiếng Việt. Dùng cho hiển thị và văn bản chính.
        </li>
        <li>
          <code>--font-unica-one</code>: Phong cách sans-serif unicase cô đọng, phù hợp cho tiêu đề và các đoạn văn bản ngắn. Hỗ trợ tiếng Việt.
        </li>
        <li>
          <code>--font-teko</code>: Thiết kế cao, cô đọng, phù hợp cho bố cục biên tập hiện đại hoặc thiết kế UI. Hỗ trợ tiếng Việt.
        </li>
        <li>
          <code>--font-rajdhani</code>: Có các hình dạng chữ cái mô-đun hóa với vẻ ngoài vuông vắn và cô đọng, kỹ thuật và tương lai. Hỗ trợ tiếng Việt.
        </li>
        <li>
          <code>--font-michroma</code>: Phiên bản hiện đại của thể loại sans vuông tròn, gợi lên cảm giác tương lai của những năm 1960. Hỗ trợ tiếng Việt.
        </li>
      </ul>

      <h4 className="text-xl font-semibold mt-6 mb-2">Trọng lượng font (Font Weights):</h4>
      <p className="mb-4">
        Dự án chủ yếu sử dụng các trọng lượng `400` (Regular), `600` (SemiBold) và `700` (Bold) để duy trì tính thẩm mỹ sạch sẽ, dễ đọc và có tác động. Các font cụ thể có thể bao gồm các trọng lượng bổ sung như được định nghĩa trong cấu hình `next/font/google` của chúng.
      </p>

      <h4 className="text-xl font-semibold mt-6 mb-2">Kích thước font và chiều cao dòng (Font Sizes & Line Heights - Tailwind CSS Utility Classes):</h4>
      <p className="mb-2">Dự án tận dụng thang kích thước font phản hồi của Tailwind CSS.</p>
      <ul className="list-disc list-inside ml-4 space-y-1">
        <li>`text-sm`: 14px (ví dụ: cho ghi chú, nhãn nhỏ)</li>
        <li>`text-base`: 16px (văn bản chính mặc định)</li>
        <li>`text-lg`: 18px (ví dụ: ví dụ code)</li>
        <li>`text-xl`: 20px (ví dụ: tiêu đề phụ)</li>
        <li>`text-2xl`: 24px (ví dụ: văn bản chính lớn hơn, ví dụ tiếng Việt)</li>
        <li>`text-3xl`: 30px (ví dụ: tiêu đề phần)</li>
        <li>`text-4xl`: 36px (ví dụ: tiêu đề chính)</li>
        <li>`text-5xl`: 48px (ví dụ: văn bản hiển thị nổi bật)</li>
      </ul>
      <p className="mt-2">
        Chiều cao dòng thường được quản lý bởi các tiện ích `leading-normal` hoặc `leading-relaxed` mặc định của Tailwind, hoặc được đặt rõ ràng khi cần kiểm soát chính xác (ví dụ: `line-height: 1.75` cho văn xuôi).
      </p>

      <h4 className="text-xl font-semibold mt-6 mb-2">Sử dụng và ghép nối font (Font Usage and Pairing):</h4>
      <ul className="list-disc list-inside ml-4 space-y-1">
        <li>
          **Tiêu đề (`h1`, `h2`, `h3`, `h4`):** Chủ yếu sử dụng `font-display` (bao gồm `Rajdhani`, `Teko`, `Exo`, `Unica One`, `Kanit`, `Michroma`, `Space Grotesk`, `Orbitron`) cho vẻ ngoài cô đọng, hình học và có tác động.
        </li>
        <li>
          **Văn bản chính (`p`, `span`):** Sử dụng `font-sans` (bao gồm `Exo 2`, `Be Vietnam Pro`, `Space Grotesk`, `Chakra Petch`, `Genos`, `Tektur`, `Manrope`, `Inter`) để dễ đọc ở các kích thước khác nhau, với hỗ trợ tiếng Việt mạnh mẽ.
        </li>
        <li>
          **Văn bản monospaced (`code`, `pre`):** Sử dụng `font-mono` (bao gồm `JetBrains Mono`, `Hasklig`, `JetBrainsMonoNL`, `Source Code Pro`, `Space Mono`, `Roboto Mono`) cho ví dụ code, dữ liệu số và đầu ra giống terminal, đảm bảo căn chỉnh ký tự.
        </li>
      </ul>

      <h4 className="text-xl font-semibold mt-6 mb-2">Tính năng font (Font Features):</h4>
      <ul className="list-disc list-inside ml-4 space-y-1">
        <li>
          `font-feature-settings: "zero" 1;`: Được áp dụng rõ ràng cho các font monospaced như `JetBrainsMonoNL` để đảm bảo số không có gạch chéo, phân biệt nó với chữ 'O'.
        </li>
      </ul>
    </div>
  );
}
