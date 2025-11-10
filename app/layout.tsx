import Navbar from "@/components/Navbar"; // Import the new Navbar component using relative path
import type { Metadata } from "next";
import {
  Be_Vietnam_Pro,
  Chakra_Petch,
  Exo,
  Exo_2,
  Genos,
  Inter,
  Kanit,
  Manrope,
  Roboto_Mono,
  Source_Code_Pro,
  Space_Grotesk,
  Space_Mono,
  Teko,
  Tektur,
  Unica_One,
  JetBrains_Mono
} from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const roboto_mono = Roboto_Mono({
  subsets: ["latin", "vietnamese"],
  display: "swap",
  variable: "--font-roboto-mono",
});

const manrope = Manrope({
  subsets: ["vietnamese"], // Ensure Vietnamese characters are supported
  display: "swap",
  variable: "--font-manrope",
  weight: ["400", "700"], // Added weights for consistency
});

const space_grotesk = Space_Grotesk({
  subsets: ["latin", "vietnamese"],
  display: "swap",
  variable: "--font-space-grotesk",
});

const chakra_petch = Chakra_Petch({
  subsets: ["latin", "vietnamese"],
  display: "swap",
  variable: "--font-chakra-petch",
  weight: ["400", "700"],
});

const genos = Genos({
  subsets: ["latin", "vietnamese"],
  display: "swap",
  variable: "--font-genos",
  weight: ["400", "700"],
});

const tektur = Tektur({
  subsets: ["latin", "vietnamese"],
  display: "swap",
  variable: "--font-tektur",
  weight: ["400", "700"],
});

const space_mono = Space_Mono({
  subsets: ["latin", "vietnamese"],
  display: "swap",
  variable: "--font-space-mono",
  weight: ["400", "700"],
});

const source_code_pro = Source_Code_Pro({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-source-code-pro",
  weight: ["400", "700"],
});

const exo = Exo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-exo",
  weight: ["400", "700"],
});

const kanit = Kanit({
  subsets: ["vietnamese", "latin"],
  display: "swap",
  variable: "--font-kanit",
  weight: ["400", "700"],
});

const be_vietnam_pro = Be_Vietnam_Pro({
  subsets: ["vietnamese", "latin"],
  display: "swap",
  variable: "--font-be-vietnam-pro",
  weight: ["400", "700"],
});

const exo_2 = Exo_2({
  subsets: ["latin", "vietnamese"],
  display: "swap",
  variable: "--font-exo-2",
  weight: ["400", "700"],
});

const unica_one = Unica_One({
  subsets: ["latin", "vietnamese"],
  display: "swap",
  variable: "--font-unica-one",
  weight: ["400"],
});

const teko = Teko({
  subsets: ["latin", "vietnamese"],
  display: "swap",
  variable: "--font-teko",
  weight: ["400", "700"],
});

const jetbrains_mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
  weight: ["400", "700"],
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
      className={`${inter.variable} ${roboto_mono.variable} ${manrope.variable} ${space_grotesk.variable} ${chakra_petch.variable} ${genos.variable} ${tektur.variable} ${space_mono.variable} ${source_code_pro.variable} ${exo.variable} ${kanit.variable} ${be_vietnam_pro.variable} ${exo_2.variable} ${unica_one.variable} ${teko.variable} ${jetbrains_mono.variable} dark`}
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

