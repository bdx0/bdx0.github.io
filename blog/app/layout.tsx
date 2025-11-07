import Navbar from "@/components/Navbar"; // Import the new Navbar component using relative path
import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Lora:ital@0;1&family=Montserrat:wght@400;700&display=swap"
          rel="stylesheet"
        />
        {/* Consider adding a cyberpunk-themed favicon if available */}
      </head>
      <body className="font-sans antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Providers>
          {" "}
          {/* Use sans font by default */}
          <Navbar /> {/* Integrate the Navbar component here */}
          <main className="max-w-4xl mx-auto p-4 md:p-8">
            {" "}
            {/* More padding on medium screens and up */}
            {children}
          </main>
          {/* Optional: Footer with cyberpunk elements */}
          <footer className="mt-16 py-8 text-center text-gray-500 dark:text-gray-400 text-sm border-t border-gray-200 dark:border-gray-700/50">
            <p>
              &copy; {new Date().getFullYear()} My Personal Blog. Powered by
              Cyberpunk.
            </p>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
