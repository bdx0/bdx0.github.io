"use client";

import { useEffect } from "react";

export default function LegacyLabRedirect() {
  useEffect(() => {
    window.location.replace("/apps");
  }, []);

  return null;
}
