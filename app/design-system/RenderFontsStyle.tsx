import React from 'react';

const fonts = [
  { name: "Space Grotesk", cssFamily: "var(--font-space-grotesk)" },
  { name: "Chakra Petch", cssFamily: "var(--font-chakra-petch)" },
  { name: "Genos", cssFamily: "var(--font-genos)" },
  { name: "Tektur", cssFamily: "var(--font-tektur)" },
  { name: "Space Mono", cssFamily: "var(--font-space-mono)" },
  { name: "JetBrains Mono", cssFamily: "var(--font-jetbrains-mono)" },
  { name: "JetBrainsMonoNL", cssFamily: "'JetBrainsMonoNL', monospace" },
  {
    name: "JetBrainsMonoNL Nerd Font Mono",
    cssFamily: "'JetBrainsMonoNL', monospace",
  },
  { name: "Hasklig", cssFamily: "var(--font-hasklig)" },
  { name: "Hack Nerd Font Mono", cssFamily: "var(--font-source-code-pro)" },
  { name: "Source Code Pro", cssFamily: "var(--font-source-code-pro)" },
  { name: "Roboto Mono", cssFamily: "var(--font-roboto-mono)" },
  { name: "Kanit", cssFamily: "var(--font-kanit)" },
  { name: "Be Vietnam Pro", cssFamily: "var(--font-be-vietnam-pro)" },
];

export default function RenderFontsStyle() {
  return (
    <div>
      <h3>Fonts Style</h3>
      {fonts.map((font) => (
        <div
          key={font.name}
          className="mb-12 p-6 border border-gray-700 rounded-lg"
        >
          <h2
            className="text-3xl font-semibold mb-4"
            style={{
              fontFamily: font.cssFamily,
              fontFeatureSettings: '"zero" 1',
            }}
          >
            {font.name}
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-medium mb-2">
                Heading Example (48px)
              </h3>
              <p
                className="text-5xl"
                style={{
                  fontFamily: font.cssFamily,
                  fontFeatureSettings: '"zero" 1',
                }}
              >
                Mẫu Chữ Tiếng Việt với JetBrainsMonoNL
              </p>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-2">
                Vietnamese Text Example (24px)
              </h3>
              <p
                className="text-2xl"
                style={{
                  fontFamily: font.cssFamily,
                  fontFeatureSettings: '"zero" 1',
                }}
              >
                Đây là một đoạn văn bản tiếng Việt mẫu để kiểm tra hiển thị
                của font JetBrainsMonoNL. Font này được thiết kế đặc biệt cho
                lập trình, với các ký tự có độ rộng cố định (monospaced) và
                không có các ký tự nối (ligatures).
              </p>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-2">
                Numbers and Symbols (24px)
              </h3>
              <p
                className="text-2xl"
                style={{
                  fontFamily: font.cssFamily,
                  fontFeatureSettings: '"zero" 1',
                }}
              >
                Chúng ta sẽ kiểm tra các dấu tiếng Việt như: á à ả ạ ã, é è ẻ
                ẹ ẽ, í ì ỉ ị ĩ, ó ò ỏ ọ õ, ú ù ủ ụ ũ, ý ỳ ỷỵ ỹ, đ.
              </p>
            </div>
            {font.cssFamily.includes("monospace") && (
              <div>
                <h3 className="text-xl font-medium mb-2">
                  Code Example (18px)
                </h3>
                <pre className="bg-gray-800 p-4 rounded-md overflow-x-auto">
                  <code
                    className="text-lg"
                    style={{
                      fontFamily: font.cssFamily,
                      fontFeatureSettings: '"zero" 1',
                    }}
                  >
                    {
                      '// Một đoạn code mẫu bằng tiếng Việt\nconst chaoTheGioi: string = "Xin chào thế giới!";\n\nfunction inLoiChao(ten: string): void {\n  console.log(`Chào bạn, ${ten}!`);\n}\n\ninLoiChao("Người dùng");\n\n// Kiểm tra các toán tử không có ligatures\nlet soA: number = 10;\nlet soB: number = 20;\n\nif (soA === soB) {\n  console.log("soA bằng soB");\n} else if (soA !== soB) {\n  console.log("soA không bằng soB");\n}\n\nconst giaTriMacDinh: string = "Không có giá trị";\nconst ketQua: string = null ?? giaTriMacDinh; // Toán tử nullish coalescing\n\nconsole.log(`Kết quả: ${ketQua}`);'
                    }
                  </code>
                </pre>
              </div>
            )}
            {font.name === "Latin Modern Roman" && (
              <p className="text-sm text-gray-400">
                Note: "Latin Modern Roman" requires custom font import (e.g.,
                self-hosting) for full functionality. Using a generic serif
                fallback here.
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
