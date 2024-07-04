import RootLayout from "@/components/RootLayout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RootLayout>
      <Component {...pageProps} />
    </RootLayout>
  );
}

export default MyApp;

// import React from "react";

// export default function MdxLayout({ children }: React.PropsWithChildren<{}>) {
//   // Create any shared layout or styles here
//   return (
//     <div
//       style={{
//         maxWidth: "800px",
//         margin: "0 auto",
//         padding: "2rem 1rem",
//       }}
//       className="bg-blue-600"
//     >
//       {children}
//     </div>
//   );
// }
