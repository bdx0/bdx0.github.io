import Navbar from "@/components/Navbar"; // Import the new Navbar component using relative path
import type { Metadata } from "next";
import { JetBrains_Mono, Tektur } from "next/font/google";

import { Providers } from "./providers";

const jetbrains_mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

const tektur = Tektur({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-tektur",
});

export const metadata: Metadata = {
  title: "BDX0 Material Design 3 Blog",
  description: "A Material Design 3 themed personal blog",
};

import Footer from "@/components/Footer"; // Import the new Footer component

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jetbrains_mono.variable} ${tektur.variable}`}
      suppressHydrationWarning
      style={{ minHeight: "100vh" }}
    >
      <head />
      <body style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Providers>
          <Navbar />
          <main
            className="flex-grow max-w-6xl mx-auto w-full"
          >
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}