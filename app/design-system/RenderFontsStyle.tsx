import React from 'react';

const fonts = [
  { name: "Space Grotesk", cssFamily: "var(--font-space-grotesk)", weights: [400, 600, 700], type: "sans" },
  { name: "Chakra Petch", cssFamily: "var(--font-chakra-petch)", weights: [400, 600, 700], type: "sans" },
  { name: "Genos", cssFamily: "var(--font-genos)", weights: [400, 600, 700], type: "sans" },
  { name: "Tektur", cssFamily: "var(--font-tektur)", weights: [400, 600, 700], type: "sans" },
  { name: "Space Mono", cssFamily: "var(--font-space-mono)", weights: [400, 700], type: "mono" },
  { name: "JetBrains Mono", cssFamily: "var(--font-jetbrains-mono)", weights: [400, 600, 700], type: "mono" },
  { name: "JetBrainsMonoNL", cssFamily: "var(--font-jetbrains-mono-nl)", weights: [400, 600, 700], type: "mono" },
  { name: "Hasklig", cssFamily: "var(--font-hasklig)", weights: [400, 600, 700], type: "mono" },
  { name: "Source Code Pro", cssFamily: "var(--font-source-code-pro)", weights: [400, 600, 700], type: "mono" },
  { name: "Roboto Mono", cssFamily: "var(--font-roboto-mono)", weights: [400, 700], type: "mono" },
  { name: "Kanit", cssFamily: "var(--font-kanit)", weights: [400, 600, 700], type: "display" },
  { name: "Be Vietnam Pro", cssFamily: "var(--font-be-vietnam-pro)", weights: [400, 600, 700], type: "sans" },
  { name: "Exo 2", cssFamily: "var(--font-exo-2)", weights: [400, 600, 700], type: "sans" },
  { name: "Unica One", cssFamily: "var(--font-unica-one)", weights: [400], type: "display" },
  { name: "Teko", cssFamily: "var(--font-teko)", weights: [400, 600, 700], type: "display" },
  { name: "Rajdhani", cssFamily: "var(--font-rajdhani)", weights: [400, 600, 700], type: "display" },
  { name: "Michroma", cssFamily: "var(--font-michroma)", weights: [400], type: "display" },
  { name: "Manrope", cssFamily: "var(--font-manrope)", weights: [400, 600, 700], type: "sans" },
  { name: "Inter", cssFamily: "var(--font-inter)", weights: [400, 600, 700], type: "sans" },
  { name: "Exo", cssFamily: "var(--font-exo)", weights: [400, 600, 700], type: "display" },
];

const fontWeightsMap = {
  400: "Regular",
  600: "SemiBold",
  700: "Bold",
};

const fontSizeClasses = {
  "text-sm": "14px",
  "text-base": "16px",
  "text-lg": "18px",
  "text-xl": "20px",
  "text-2xl": "24px",
  "text-3xl": "30px",
  "text-4xl": "36px",
  "text-5xl": "48px",
};

export default function RenderFontsStyle() {
  return (
    <div>
      <h3 className="text-2xl font-semibold mb-4">Trình bày Font (Font Showcase)</h3>
      {fonts.map((font) => (
        <div
          key={font.name}
          className="mb-12 p-6 bg-panel-bg border border-ui-line rounded-lg"
        >
          <h2
            className="text-3xl font-semibold mb-4"
            style={{
              fontFamily: font.cssFamily,
              fontFeatureSettings: font.type === 'mono' ? '"zero" 1' : 'normal',
            }}
          >
            {font.name} ({font.type})
          </h2>

          {font.weights.map((weight) => (
            <div key={weight} className="mb-4">
              <h4 className="text-xl font-medium mb-2">
                Trọng lượng: {fontWeightsMap[weight] || weight} ({weight})
              </h4>
              <p
                className={`text-2xl font-${weight}`}
                style={{
                  fontFamily: font.cssFamily,
                  fontWeight: weight,
                  fontFeatureSettings: font.type === 'mono' ? '"zero" 1' : 'normal',
                }}
              >
                Mẫu Chữ Tiếng Việt với {font.name} - Trọng lượng {fontWeightsMap[weight] || weight}
              </p>
            </div>
          ))}

          <h4 className="text-xl font-medium mt-6 mb-2">Kích thước Font:</h4>
          {Object.entries(fontSizeClasses).map(([tailwindClass, size]) => (
            <div key={tailwindClass} className="mb-2">
              <p
                className={`${tailwindClass}`}
                style={{
                  fontFamily: font.cssFamily,
                  fontFeatureSettings: font.type === 'mono' ? '"zero" 1' : 'normal',
                }}
              >
                {font.name} - {tailwindClass} ({size}): Đây là một đoạn văn bản mẫu.
              </p>
            </div>
          ))}

          {font.type === "mono" && (
            <div className="mt-6">
              <h4 className="text-xl font-medium mb-2">Ví dụ Code (18px)</h4>
              <pre className="bg-bg-900 p-4 rounded-md overflow-x-auto">
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
        </div>
      ))}
    </div>
  );
}
