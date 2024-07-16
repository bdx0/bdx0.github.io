import RootLayout from "@/components/RootLayout";
import "@/styles/globals.css";
import { Viewport } from "next";
import type { AppProps } from "next/app";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: true,
  themeColor: "dark",
};

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RootLayout>
      <Component {...pageProps} />
    </RootLayout>
  );
}
