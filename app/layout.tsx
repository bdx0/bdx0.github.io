import Navbar from "@/components/Navbar"; // Import the new Navbar component using relative path
import type { Metadata } from "next";
import { Inter, Orbitron, Roboto_Mono, Manrope } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-orbitron",
});

const roboto_mono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-mono",
});

const manrope = Manrope({
  subsets: ["vietnamese"], // Ensure Vietnamese characters are supported
  display: "swap",
  variable: "--font-manrope",
  weight: ["400", "700"], // Added weights for consistency
});

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
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${orbitron.variable} ${roboto_mono.variable} ${manrope.variable} dark`}
    >
      <head />
      <body className="font-sans antialiased bg-bg-900 text-neutral-body min-h-screen flex flex-col">
        <Providers>
          <Navbar />
          <main
            className="flex-grow max-w-6xl mx-auto w-full"
            style={{ padding: "16px" }}
          >
            {children}
          </main>
          <footer
            className="text-center text-sm border-t"
            style={{
              padding: "16px 0",
              color: "#9AA0A6",
              borderColor: "rgba(255,255,255, 0.04)",
            }}
          >
            <p>
              &copy; {new Date().getFullYear()} BDX0 Cyberpunk Blog. All systems
              operational.
            </p>
            <p>
              <a
                href="mailto:baoduy.duong0206@gmail.com?subject=Accessibility Issue Report"
                className="text-neon-cyan hover:text-neon-magenta"
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