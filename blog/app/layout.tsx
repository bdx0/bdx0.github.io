import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "My Personal Blog",
  description: "Welcome to my blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Lora:ital@0;1&family=Montserrat:wght@400;700&display=swap" rel="stylesheet" />
        {/* Consider adding a cyberpunk-themed favicon if available */}
      </head>
      <body className="font-sans antialiased"> {/* Use sans font by default */}
        <header className="p-4 border-b border-gray-700/50 bg-gray-800/80 backdrop-blur-sm"> {/* Darker, slightly transparent header with blur */}
          <nav className="max-w-4xl mx-auto flex justify-between items-center"> {/* Use justify-between for spacing */}
            <Link href="/" className="text-xl font-bold text-blue-400 hover:text-green-400">Blog</Link> {/* Standard blue/green */}
            <div className="flex gap-6"> {/* Spacing for nav links */}
              <Link href="/about" className="text-gray-200 hover:text-green-400 transition-colors duration-200">About</Link>
            </div>
          </nav>
        </header>
        <main className="max-w-4xl mx-auto p-4 md:p-8"> {/* More padding on medium screens and up */}
          {children}
        </main>
        {/* Optional: Footer with cyberpunk elements */}
        <footer className="mt-16 py-8 text-center text-gray-600 text-sm border-t border-gray-700/50">
          <p>&copy; {new Date().getFullYear()} My Personal Blog. Powered by Cyberpunk.</p>
        </footer>
      </body>
    </html>
  );
}
