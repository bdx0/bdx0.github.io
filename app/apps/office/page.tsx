import type { Metadata } from "next";

import OfficeKitClient from "./OfficeKitClient";

export const metadata: Metadata = {
  title: "Office Kit",
  description:
    "Local-first Office Kit with 28 grouped utilities for text, documents, data, calculations, QR generation, images, files, PDF, Excel/CSV, encoding, and developer workflows.",
};

export default function OfficeKitPage() {
  return <OfficeKitClient />;
}
