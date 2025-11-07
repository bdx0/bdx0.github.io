import Navbar from "@/components/Navbar"; // Import the new Navbar component using relative path
import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "BDX0 Cyberpunk Blog",
  description: "A cyberpunk-themed personal blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Orbitron:wght@400;500;600;700&family=Roboto+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased bg-bg-900 text-neutral-body min-h-screen flex flex-col">
        <Providers>
          <Navbar />
          <main className="flex-grow max-w-6xl mx-auto w-full" style={{ padding: '16px' }}>
            {children}
          </main>
          <footer 
            className="text-center text-sm border-t"
            style={{ 
              padding: '16px 0',
              color: '#9AA0A6',
              borderColor: 'rgba(255,255,255, 0.04)' 
            }}
          >
            <p>
              &copy; {new Date().getFullYear()} BDX0 Cyberpunk Blog. All systems operational.
            </p>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
