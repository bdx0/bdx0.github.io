import Link from 'next/link';

export const metadata = {
  title: 'Design System - Fonts',
};

const fonts = [
  { name: 'Times New Roman', cssFamily: '"Times New Roman", Times, serif' },
  { name: 'Georgia', cssFamily: 'Georgia, serif' },
  { name: 'Cambria', cssFamily: 'Cambria, serif' },
  { name: 'Lato', cssFamily: 'Lato, sans-serif' },
  { name: 'Open Sans', cssFamily: '"Open Sans", sans-serif' },
  { name: 'Source Sans Pro', cssFamily:'"Source Sans Pro", sans-serif' },
  { name: 'Latin Modern Roman', cssFamily: '"Latin Modern Roman", serif' }, // Placeholder, requires custom import
  { name: 'Palatino', cssFamily: 'Palatino, "Palatino Linotype", "Palatino LT STD", "Book Antiqua", Georgia, serif' },
  { name: 'Fira Sans', cssFamily: '"Fira Sans", sans-serif' },
  { name: 'Fira Code', cssFamily: '"Fira Code", monospace' },
  { name: 'Source Serif Pro', cssFamily: '"Source Serif Pro", serif' },
  { name: 'Source Code Pro', cssFamily: '"Source Code Pro", monospace' },
];

export default function DesignSystemPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Design System - Font Showcase</h1>

      <p className="mb-4">
        This page showcases various fonts, with a focus on their rendering for academic, technical, and Vietnamese content.
      </p>

      {fonts.map((font) => (
        <div key={font.name} className="mb-12 p-6 border border-gray-700 rounded-lg">
          <h2 className="text-3xl font-semibold mb-4" style={{ fontFamily: font.cssFamily }}>{font.name}</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-medium mb-2">Heading Example (48px)</h3>
              <p className="text-5xl" style={{ fontFamily: font.cssFamily }}>
                The Quick Brown Fox Jumps Over The Lazy Dog.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-2">Vietnamese Text Example (24px)</h3>
              <p className="text-2xl" style={{ fontFamily: font.cssFamily }}>
                Giới thiệu về Kỹ sư Phần mềm (Software Engineer). Đây là một đoạn văn bản tiếng Việt mẫu để kiểm tra hiển thị các dấu thanh và ký tự đặc biệt.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-2">Numbers and Symbols (24px)</h3>
              <p className="text-2xl" style={{ fontFamily: font.cssFamily }}>
                0123456789 !@#$%^&*()_+-=[]{}|;:'",./?
              </p>
            </div>
            {font.cssFamily.includes('monospace') && (
              <div>
                <h3 className="text-xl font-medium mb-2">Code Example (18px)</h3>
                <pre className="bg-gray-800 p-4 rounded-md overflow-x-auto">
                  <code className="text-lg" style={{ fontFamily: font.cssFamily }}>
{`function greet(name: string): void {
  console.log("Hello, " + name + "!");
}

const sum = (a: number, b: number): number => a + b;

// Kiểm tra hiển thị tiếng Việt trong code
const message = "Xin chào thế giới!";`}
                  </code>
                </pre>
              </div>
            )}
            {font.name === 'Latin Modern Roman' && (
              <p className="text-sm text-gray-400">
                Note: "Latin Modern Roman" requires custom font import (e.g., self-hosting) for full functionality. Using a generic serif fallback here.
              </p>
            )}
          </div>
        </div>
      ))}

      <div className="mt-12 text-center">
        <Link href="/" className="text-blue-400 hover:underline">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
