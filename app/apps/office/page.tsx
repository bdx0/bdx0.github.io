import type { Metadata } from "next";

import OfficeKitClient from "./OfficeKitClient";

export const metadata: Metadata = {
  title: "Office Kit",
  description:
    "Local-first office utilities for text, lists, dates, units, timestamps, UUID/hash, PDF, Excel/CSV, QR codes, encoding, and JSON.",
};

export default function OfficeKitPage() {
  return <OfficeKitClient />;
}
