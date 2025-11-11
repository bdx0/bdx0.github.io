import Navbar from "@/components/Navbar"; // Import the new Navbar component using relative path
import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";

import { Providers } from "./providers";

const jetbrains_mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "BDX0 Material Design 3 Blog",
  description: "A Material Design 3 themed personal blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <head />
      <body>
        <Providers>
          <Navbar />
          <main
            className="flex-grow max-w-6xl mx-auto w-full"
          >
            {children}
          </main>
          <footer
            className="text-center text-sm border-t"
          >
            <p>
              &copy; {new Date().getFullYear()} BDX0 Material Design 3 Blog. All systems
              operational.
            </p>
            <p>
              <a
                href="mailto:baoduy.duong0206@gmail.com?subject=Accessibility Issue Report"
              >
                Report an accessibility issue
              </a>
            </p>
          </footer>
        </Providers>
      </body>
    </html>
  );
}